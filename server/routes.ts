import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import TelegramBot from 'node-telegram-bot-api';

// Simple in-memory cache for API responses
type CacheEntry = {
  data: any;
  expiry: number;
};

// Memory cache with expiration
class ResponseCache {
  private cache: Map<string, CacheEntry>;
  private readonly DEFAULT_TTL_MS = 60 * 1000; // 1 minute default TTL
  
  constructor() {
    this.cache = new Map();
    
    // Clean up expired cache entries periodically
    setInterval(() => this.cleanExpiredEntries(), 30000);
  }
  
  get(key: string): any {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Return null if expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  set(key: string, data: any, ttlMs: number = this.DEFAULT_TTL_MS): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }
  
  invalidate(keyPattern: string): void {
    // Delete all keys matching the pattern using array from keys
    Array.from(this.cache.keys()).forEach(key => {
      if (key.includes(keyPattern)) {
        this.cache.delete(key);
      }
    });
  }
  
  private cleanExpiredEntries(): void {
    const now = Date.now();
    // Use array from entries for compatibility
    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    });
  }
}

// Initialize response cache
const apiCache = new ResponseCache();

// Telegram bot instance cache
let telegramBotInstance: TelegramBot | null = null;

// Helper to format inquiry data for notifications - optimized and minified
const formatInquiryNotification = (data: any): string => `🔔 NEW CASE INQUIRY 🔔

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🏷️ Case Type: ${data.caseType}
📝 Message:
${data.message}

Submitted: ${new Date().toLocaleString()}`;

// Performance metrics middleware
const performanceMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Only measure API endpoints
  if (!req.path.startsWith('/api/')) return next();
  
  const startTime = process.hrtime();
  
  // Add response hook
  const originalSend = res.send;
  res.send = function(body) {
    const diff = process.hrtime(startTime);
    const responseTime = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to ms
    
    // Add timing headers
    res.set('Server-Timing', `total;dur=${responseTime.toFixed(2)}`);
    
    // Log response time for API endpoints
    if (responseTime > 100) { // Only log slow responses
      console.log(`⚠️ Slow API: ${req.method} ${req.path} - ${responseTime.toFixed(2)}ms`);
    }
    
    return originalSend.call(this, body);
  };
  
  next();
};

// Cache control middleware for static assets
const cacheControlMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Set cache headers for static assets
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|ttf|eot|webp)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  }
  next();
};

// Get singleton telegram bot instance
const getTelegramBot = (): TelegramBot | null => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) return null;
  
  if (!telegramBotInstance) {
    try {
      telegramBotInstance = new TelegramBot(botToken);
    } catch (error) {
      console.error('Failed to initialize Telegram bot:', error);
      return null;
    }
  }
  
  return telegramBotInstance;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Add performance monitoring middleware
  app.use(performanceMetricsMiddleware);
  
  // Add cache control middleware
  app.use(cacheControlMiddleware);
  
  // Send Telegram notification route (optimized)
  app.post("/api/telegram/send", async (req: Request, res: Response) => {
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
      // Use cached bot instance
      const bot = getTelegramBot();
      if (!bot) {
        throw new Error('Failed to initialize bot');
      }
      
      await bot.sendMessage(chatId, message);
      
      // Set no-cache headers
      res.setHeader('Cache-Control', 'no-store');
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send notification" });
    }
  });

  // Case inquiry form submission (optimized)
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      // Validate with schema
      const validatedData = insertInquirySchema.parse(req.body);
      
      // Store in database
      const inquiry = await storage.createInquiry(validatedData);
      
      // Send Telegram notification if available
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (botToken && chatId) {
        try {
          // Use cached bot instance (non-blocking)
          const bot = getTelegramBot();
          if (bot) {
            bot.sendMessage(chatId, formatInquiryNotification(validatedData))
              .catch(err => console.error('Telegram notification failed:', err));
          }
        } catch (telegramError) {
          // Non-blocking error; continue response
        }
      }
      
      // Invalidate inquiries cache
      apiCache.invalidate('/api/inquiries');
      
      // Set no-cache headers
      res.setHeader('Cache-Control', 'no-store');
      
      // Return success response
      return res.status(201).json({
        message: "Inquiry submitted successfully",
        inquiry,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, return detailed error messages
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      } else {
        // For other errors
        return res.status(500).json({
          message: "Failed to process your inquiry",
        });
      }
    }
  });

  // Get all inquiries with caching
  app.get("/api/inquiries", async (req: Request, res: Response) => {
    try {
      // Check cache first
      const cacheKey = `/api/inquiries`;
      const cachedData = apiCache.get(cacheKey);
      
      if (cachedData) {
        // Add cache indicator header
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('Cache-Control', 'private, max-age=60');
        return res.json(cachedData);
      }
      
      // If not in cache, get from storage
      const inquiries = await storage.getAllInquiries();
      
      // Cache the response (60 seconds)
      apiCache.set(cacheKey, inquiries, 60 * 1000);
      
      // Add cache headers
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('Cache-Control', 'private, max-age=60');
      
      return res.json(inquiries);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve inquiries",
      });
    }
  });

  // Initialize optimized HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
