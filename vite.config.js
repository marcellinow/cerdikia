const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  root: "./src", // Set the root directory for Vite
  plugins: [react()], // Add React plugin for Vite [react()], // Add React plugin for Vite
  build: {
    outDir: "../dist", // Output directory for the build", // Output directory for the build
    emptyOutDir: true, // Clear the output directory before buildingr the output directory before building
  },
});
