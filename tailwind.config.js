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
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-900
        primary: {
          DEFAULT: "var(--color-primary)", // gray-700
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // blue-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-900
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-900
        },
        success: {
          DEFAULT: "var(--color-success)", // green-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-600
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        surface: "var(--color-surface)", // gray-100
        "text-primary": "var(--color-text-primary)", // gray-900
        "text-secondary": "var(--color-text-secondary)", // gray-600
        cta: {
          DEFAULT: "var(--color-cta)", // blue-500
          foreground: "var(--color-cta-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 5vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.5rem, 6vw, 3rem)',
        'fluid-hero': 'clamp(1.5rem, 4vw, 3.5rem)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)', // 8px
        'sm': 'var(--spacing-sm)', // 12px
        'md': 'var(--spacing-md)', // 16px
        'lg': 'var(--spacing-lg)', // 24px
        'xl': 'var(--spacing-xl)', // 32px
        '2xl': 'var(--spacing-2xl)', // 48px
        '3xl': 'var(--spacing-3xl)', // 64px
        '4xl': 'var(--spacing-4xl)', // 96px
        'thumb-zone': '75px',
        'touch-target': '44px',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'floating': 'var(--shadow-floating)',
        'spatial-sm': '0 1px 3px rgba(45, 55, 72, 0.12)',
        'spatial-md': '0 4px 6px -1px rgba(45, 55, 72, 0.1)',
        'spatial-lg': '0 10px 15px -3px rgba(45, 55, 72, 0.1)',
        'spatial-xl': '0 20px 25px -5px rgba(45, 55, 72, 0.1)',
        'ar-depth': '0 8px 32px rgba(45, 55, 72, 0.12)',
      },
      animation: {
        'pulse-ar': 'pulse-ar 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'scarcity-glow': 'scarcity-glow 3s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.6s ease-out forwards',
        'confidence-sweep': 'confidence-sweep 0.6s ease-out',
      },
      keyframes: {
        'pulse-ar': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scarcity-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'confidence-sweep': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      backdropBlur: {
        'ar': '20px',
      },
      transitionTimingFunction: {
        'spatial': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        'spatial': '300ms',
        'confidence': '600ms',
      },
      zIndex: {
        'ar-camera': '50',
        'spatial-nav': '40',
        'floating-ui': '30',
      },
      gridTemplateColumns: {
        'spatial': 'repeat(auto-fit, minmax(280px, 1fr))',
        'masonry-sm': 'repeat(1, 1fr)',
        'masonry-md': 'repeat(2, 1fr)',
        'masonry-lg': 'repeat(3, 1fr)',
      },
      aspectRatio: {
        'ar-preview': '16 / 9',
        'furniture': '4 / 3',
        'room': '3 / 2',
      },
      letterSpacing: {
        'spatial': '-0.025em',
        'confidence': '-0.015em',
      },
      lineHeight: {
        'spatial': '1.2',
        'comfortable': '1.6',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}