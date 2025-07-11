import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: colors
    }
  },
  plugins: [require("daisyui")],
}
