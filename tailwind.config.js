/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "azul": "#2E34A6",
        "azulsel": "#5B61CE",
        "verde": "#37CCA1",
        "verdesel": "#2AC869",
        "cinza": "#E9E2F2",
        "vermelho": "#F65C5C"
      },
      borderWidth: {
        "24" : "24px"
      },
      fontFamily:{
        fredoka: 'var(--font-fredoka)',
      },
      margin: {
        "1/4" : "25%"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
