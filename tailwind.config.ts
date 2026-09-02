export default {
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#6E46E6",
          bg: "#F3F3F6",
          "purple-dark": "#4A28AF",
        },
        content: {
          primary: "#3D3D67",
          secondary: "#717191",
        },
      },
    },
  },
  plugins: [],
};
