import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Suits TV Show inspired colors
        navy: {
          50: '#f0f4f8',
          100: '#d9e2f0',
          200: '#b3c6e1',
          300: '#8da9d2',
          400: '#6f8fc4',
          500: '#5578b7',
          600: '#3f5f9f',
          700: '#2e4a88',
          800: '#1e3870',
          900: '#12295a',
          950: '#0a1e42',
        },
        gold: {
          50: '#fdf9ee',
          100: '#f9efd3',
          200: '#f3dfa7',
          300: '#ebc96f',
          400: '#e4b445',
          500: '#d89c2a',
          600: '#c27d1f',
          700: '#a15c1d',
          800: '#854b1f',
          900: '#703f1e',
          950: '#422010',
        },
        charcoal: {
          50: '#f6f7f9',
          100: '#ebeef2',
          200: '#d8dce3',
          300: '#b8c0cd',
          400: '#939db3',
          500: '#7683a1',
          600: '#606c8e',
          700: '#4e5874',
          800: '#424a60',
          900: '#393f50',
          950: '#242732',
        },
        burgundy: {
          50: '#fdf3f3',
          100: '#fbe5e5',
          200: '#f8cfcf',
          300: '#f2adae',
          400: '#e8797c',
          500: '#db5456',
          600: '#c53a3c',
          700: '#a52e30',
          800: '#8b2a2b',
          900: '#762a2c',
          950: '#411213',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
