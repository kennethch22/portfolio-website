import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-bg-primary': '#0B0F14',
        'cyber-bg-secondary': '#05070A',
        'cyber-neon-teal': '#00E5B0',
        'cyber-neon-blue': '#00A3FF',
        'cyber-text-muted': '#94A3B8',
        'cyber-text-primary': '#E2E8F0',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 229, 176, 0.5)',
        'neon-strong': '0 0 40px rgba(0, 229, 176, 0.8)',
      }
    },
  },
  plugins: [],
};

export default config;
