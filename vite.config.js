const { defineConfig } = require("vite");

module.exports = defineConfig({
  root: "./src", // Set the root directory for Vite
  build: {
    outDir: "../dist", // Output directory for the build
  },
});
