/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '300px',
      },
      keyframes: {
        float: {
          '0%,100%': {
            translate: '1rem 1rem',
          },
          '50%': {
            translate: '-1rem -1rem',
          },
        },
        float2: {
          '0%,100%': {
            translate: '-1rem -1rem',
          },
          '50%': {
            translate: '1rem 1rem',
          },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        float2: 'float2 7s ease-in-out infinite',
        float3: 'float3 7s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-3d')],
};
