export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devtools: {
    enabled: false,
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: "2026-01-01",
});
