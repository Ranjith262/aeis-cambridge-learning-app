/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        cream: '#FFF8F0',
        soft: '#F0F7F4',
        mint: '#A8E6CF',
        peach: '#FFD3B6',
        sky: '#A0D2EB',
        butter: '#FFF5BA',
        coral: '#FFAAA5',
        ink: '#2D3436',
        muted: '#636E72',
        success: '#00B894',
        warning: '#FDCB6E',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(45, 52, 54, 0.08)',
        card: '0 4px 20px rgba(45, 52, 54, 0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
