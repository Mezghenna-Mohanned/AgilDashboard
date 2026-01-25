export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          sidebar: '#0f172a',
          border: '#334155',
        },
        accent: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
          yellow: '#f59e0b',
          red: '#ef4444',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      },
    },
  },
  plugins: [],
}