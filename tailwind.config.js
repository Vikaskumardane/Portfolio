/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // muted grey
        input: "var(--color-input)", // charcoal
        ring: "var(--color-ring)", // cyan
        background: "var(--color-background)", // black
        foreground: "var(--color-foreground)", // off-white
        primary: {
          DEFAULT: "var(--color-primary)", // cyan
          foreground: "var(--color-primary-foreground)", // black
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // celestial blue
          foreground: "var(--color-secondary-foreground)", // off-white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // muted grey
          foreground: "var(--color-muted-foreground)", // cyan
        },
        accent: {
          DEFAULT: "var(--color-accent)", // cyan
          foreground: "var(--color-accent-foreground)", // black
        },
        popover: {
          DEFAULT: "var(--color-popover)", // charcoal
          foreground: "var(--color-popover-foreground)", // off-white
        },
        card: {
          DEFAULT: "var(--color-card)", // charcoal
          foreground: "var(--color-card-foreground)", // off-white
        },
        success: {
          DEFAULT: "var(--color-success)", // green-400
          foreground: "var(--color-success-foreground)", // black
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-400
          foreground: "var(--color-warning-foreground)", // black
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        surface: {
          DEFAULT: "var(--color-surface)", // muted grey
          foreground: "var(--color-surface-foreground)", // off-white
        },
      },
      fontFamily: {
        headline: ['Playfair Display', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "cosmic-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 10px rgba(163, 255, 245, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(163, 255, 245, 0.6)" 
          },
        },
        "particle-float": {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)" 
          },
          "33%": { 
            transform: "translateY(-10px) rotate(120deg)" 
          },
          "66%": { 
            transform: "translateY(5px) rotate(240deg)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "cosmic-pulse": "cosmic-pulse 2s ease-in-out infinite",
        "particle-float": "particle-float 6s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        'cosmic': '10px',
      },
      boxShadow: {
        'cosmic': '0 4px 20px rgba(163, 255, 245, 0.1)',
        'cosmic-glow': '0 0 10px rgba(163, 255, 245, 0.3)',
        'cosmic-intense': '0 0 20px rgba(163, 255, 245, 0.6)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}