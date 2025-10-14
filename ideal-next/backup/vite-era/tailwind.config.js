/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // u30d7u30e9u30a4u30deu30eau30abu30e9u30fc
        'deep-blue': '#1a2b5e',
        'deep-purple': '#2e1a5e',
        // u30bbu30abu30f3u30c0u30eau30abu30e9u30fc
        'gold': '#d4af37',
        'silver': '#c0c0c0',
        // u30a2u30afu30bbu30f3u30c8u30abu30e9u30fc
        'neon-blue': '#00b8d4',
        'neon-purple': '#9c27b0',
        // u80ccu666fu8272
        'space-dark': '#0a0a1a',
        'space-light': '#1a1a4a',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to right, #0a0a1a, #1a1a4a)',
        'hero-gradient': 'radial-gradient(circle, rgba(26, 43, 94, 0.8) 0%, rgba(10, 10, 26, 1) 100%)',
      },
      boxShadow: {
        'neon': '0 0 5px rgba(0, 184, 212, 0.5), 0 0 20px rgba(0, 184, 212, 0.3)',
        'neon-purple': '0 0 5px rgba(156, 39, 176, 0.5), 0 0 20px rgba(156, 39, 176, 0.3)',
      },
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 184, 212, 0.5), 0 0 20px rgba(0, 184, 212, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(0, 184, 212, 0.8), 0 0 30px rgba(0, 184, 212, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
