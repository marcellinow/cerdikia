const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()], // Add React plugin for Vite
  build: {
    outDir: "../dist", // Output directory for the build
    emptyOutDir: true,
    base: "/cerdikia/", // Clear the output directory before building
  },
});
