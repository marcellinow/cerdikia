const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()], // Add React plugin for Vite
  build: {
    base: "/cerdikia/", // Clear the output directory before building
  },
});
