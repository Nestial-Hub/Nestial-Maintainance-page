/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'crt-flicker': 'crt-flicker 0.15s infinite',
        'scanline': 'scanline 10s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.3))' },
          '50%': { opacity: 0.95, filter: 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.75))' },
        },
        'crt-flicker': {
          '0%, 100%': { opacity: 0.99 },
          '50%': { opacity: 0.975 },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
