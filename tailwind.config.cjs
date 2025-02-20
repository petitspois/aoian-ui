const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        chat: {
          DEFAULT: "hsl(var(--chat-background))",
          foreground: "hsl(var(--chat-foreground))",
          secondary: "hsl(var(--chat-secondary-background))",
          "secondary-foreground": "hsl(var(--chat-secondary-foreground))",
          primary: "hsl(var(--chat-primary-background))",
          "primary-foreground": "hsl(var(--chat-primary-foreground))",
          border: "hsl(var(--chat-border))",
          bubble: {
            DEFAULT: "hsl(var(--chat-bubble-background))",
            foreground: "hsl(var(--chat-bubble-foreground))",
            border: "hsl(var(--chat-bubble-border))",
          },
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "loading-move": {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY(4px)" },
          "20%": { transform: "translateY(0px)" },
          "30%": { transform: "translateY(-4px)" },
          "40%": { transform: "translateY(0px)" },
        },
        "loading-move-min": {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY(1px)" },
          "20%": { transform: "translateY(0px)" },
          "30%": { transform: "translateY(-1px)" },
          "40%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "loading-move": "loading-move 2s linear infinite",
        "loading-move-min": "loading-move-min 2s linear infinite",
      },
      transitionDelay: {
        400: "400ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
