/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './test.html',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './template/**/*.{vue,js,ts,jsx,tsx}',
    './dev/**/*.{vue,js,ts,jsx,tsx}',
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  presets: [require('tailwind-config-bundler')],
  theme: {
    extend: {},
  },
  plugins: [],
};
