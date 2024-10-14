/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
             'deep-blue':'#0a4275',
             'deep-red' :'#ca1d1d'
    },
  },
  plugins: [],
}

};