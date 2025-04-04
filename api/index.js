// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  inquiriesMap;
  userCurrentId;
  inquiryCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.inquiriesMap = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.inquiryCurrentId = 1;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Inquiry methods
  async createInquiry(insertInquiry) {
    const id = this.inquiryCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const inquiry = {
      ...insertInquiry,
      id,
      createdAt: now,
      contacted: false
    };
    this.inquiriesMap.set(id, inquiry);
    return inquiry;
  }
  async getInquiry(id) {
    return this.inquiriesMap.get(id);
  }
  async getAllInquiries() {
    return Array.from(this.inquiriesMap.values());
  }
  async updateInquiryContactStatus(id, contacted) {
    const inquiry = this.inquiriesMap.get(id);
    if (!inquiry) return void 0;
    const updatedInquiry = { ...inquiry, contacted };
    this.inquiriesMap.set(id, updatedInquiry);
    return updatedInquiry;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  practiceArea: text("practice_area").notNull(),
  message: text("message").notNull(),
  termsAccepted: boolean("terms_accepted").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  contacted: boolean("contacted").default(false)
});
var insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  contacted: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import TelegramBot from "node-telegram-bot-api";
var ResponseCache = class {
  cache;
  DEFAULT_TTL_MS = 60 * 1e3;
  // 1 minute default TTL
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    setInterval(() => this.cleanExpiredEntries(), 3e4);
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  set(key, data, ttlMs = this.DEFAULT_TTL_MS) {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }
  invalidate(keyPattern) {
    Array.from(this.cache.keys()).forEach((key) => {
      if (key.includes(keyPattern)) {
        this.cache.delete(key);
      }
    });
  }
  cleanExpiredEntries() {
    const now = Date.now();
    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    });
  }
};
var apiCache = new ResponseCache();
var telegramBotInstance = null;
var formatInquiryNotification = (data) => `\u{1F514} NEW CASE INQUIRY \u{1F514}

\u{1F464} Name: ${data.name}
\u{1F4E7} Email: ${data.email}
\u{1F4F1} Phone: ${data.phone}
\u{1F3F7}\uFE0F Case Type: ${data.caseType}
\u{1F4DD} Message:
${data.message}

Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}`;
var performanceMetricsMiddleware = (req, res, next) => {
  if (!req.path.startsWith("/api/")) return next();
  const startTime = process.hrtime();
  const originalSend = res.send;
  res.send = function(body) {
    const diff = process.hrtime(startTime);
    const responseTime = (diff[0] * 1e9 + diff[1]) / 1e6;
    res.set("Server-Timing", `total;dur=${responseTime.toFixed(2)}`);
    if (responseTime > 100) {
      console.log(`\u26A0\uFE0F Slow API: ${req.method} ${req.path} - ${responseTime.toFixed(2)}ms`);
    }
    return originalSend.call(this, body);
  };
  next();
};
var cacheControlMiddleware = (req, res, next) => {
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|ttf|eot|webp)$/)) {
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
  }
  next();
};
var getTelegramBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return null;
  if (!telegramBotInstance) {
    try {
      telegramBotInstance = new TelegramBot(botToken);
    } catch (error) {
      console.error("Failed to initialize Telegram bot:", error);
      return null;
    }
  }
  return telegramBotInstance;
};
async function registerRoutes(app2) {
  app2.use(performanceMetricsMiddleware);
  app2.use(cacheControlMiddleware);
  app2.post("/api/telegram/send", async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      return res.status(503).json({ message: "Notification service not configured" });
    }
    try {
      const bot = getTelegramBot();
      if (!bot) {
        throw new Error("Failed to initialize bot");
      }
      await bot.sendMessage(chatId, message);
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send notification" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        try {
          const bot = getTelegramBot();
          if (bot) {
            bot.sendMessage(chatId, formatInquiryNotification(validatedData)).catch((err) => console.error("Telegram notification failed:", err));
          }
        } catch (telegramError) {
        }
      }
      apiCache.invalidate("/api/inquiries");
      res.setHeader("Cache-Control", "no-store");
      return res.status(201).json({
        message: "Inquiry submitted successfully",
        inquiry
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details
        });
      } else {
        return res.status(500).json({
          message: "Failed to process your inquiry"
        });
      }
    }
  });
  app2.get("/api/inquiries", async (req, res) => {
    try {
      const cacheKey = `/api/inquiries`;
      const cachedData = apiCache.get(cacheKey);
      if (cachedData) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("Cache-Control", "private, max-age=60");
        return res.json(cachedData);
      }
      const inquiries2 = await storage.getAllInquiries();
      apiCache.set(cacheKey, inquiries2, 60 * 1e3);
      res.setHeader("X-Cache", "MISS");
      res.setHeader("Cache-Control", "private, max-age=60");
      return res.json(inquiries2);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve inquiries"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  envDir: path.resolve(import.meta.dirname)
  // Add this line to load env from root
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
if (app.get("env") === "development") {
  (async () => {
    const server = await registerRoutes(app);
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    const port = process.env.PORT || 3002;
    server.listen(port, () => {
      log(`serving on port ${port}`);
    });
  })();
}
var index_default = app;
export {
  index_default as default
};
