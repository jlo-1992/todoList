import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  router: {
    base: "/todoList/",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "nuxt-swiper",
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
});
