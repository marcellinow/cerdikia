const { app, BrowserWindow } = require("electron");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Cerdikia",
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Optional preload script
      nodeIntegration: true,
    },
  });

  const isDev = !app.isPackaged;
  const startUrl = isDev
    ? "http://localhost:5173" // Vite's default dev server port
    : `file://${path.join(__dirname, "dist/index.html")}`;

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
