import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        keploy: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff6e40',
          600: '#f9571f',
          700: '#ea580c',
          800: '#c2410c',
          900: '#7c2d12',
          DEFAULT: '#ff6e40',
        },
        brand: {
          dark: '#0a0d14',
          card: '#111726',
          border: '#1e293b',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
