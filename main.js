const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Cerdikia",
    width: 800,
    height: 600,
  });
  const startUrl = url.format({
    pathname: path.join(__dirname, "src/index.html"),
    protocol: "file",
  });
  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
