/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          void: "#02040a",
          dark: "#040816",
          navy: "#070e24",
          card: "rgba(9, 18, 44, 0.7)",
          cardHover: "rgba(14, 28, 68, 0.85)",
          border: "rgba(56, 189, 248, 0.18)",
          borderGlow: "rgba(56, 189, 248, 0.45)",
          cyan: "#00f0ff",
          blue: "#3b82f6",
          indigo: "#6366f1",
          purple: "#a855f7",
          pink: "#ec4899",
        }
      },
      fontFamily: {
        axiforma: ['Axiforma', 'Outfit', 'Inter', 'sans-serif'],
        sans: ['Axiforma', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #8b5cf6 100%)',
        'glow-gradient': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)',
        'radial-vignette': 'radial-gradient(circle at 50% 30%, rgba(14, 28, 68, 0.5) 0%, rgba(2, 4, 10, 0.95) 80%)',
      }
    },
  },
  plugins: [],
}

