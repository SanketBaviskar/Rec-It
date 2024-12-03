// import { app, BrowserWindow } from "electron";
// import path from "path";
// import { isDev } from "./util.js";
// app.on("ready", () => {
//   const mainWindow = new BrowserWindow({});
//   if (isDev()) {
//     mainWindow.loadURL("http://localhost:5123");
//   } else {
//     mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
//   }
// });
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
let mainWindow = null;
let childWindow = null;
app.on("ready", () => {
    // Main window setup
    mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
    // Handle request to open a new window
    ipcMain.on("open-new-window", (event, data) => {
        if (childWindow)
            return; // Prevent multiple child windows
        childWindow = new BrowserWindow({});
        const childURL = isDev()
            ? `http://localhost:5123/component?data=${encodeURIComponent(JSON.stringify(data))}`
            : `file://${path.join(app.getAppPath(), "/dist-react/component.html")}?data=${encodeURIComponent(JSON.stringify(data))}`;
        childWindow.loadURL(childURL);
        childWindow.on("closed", () => {
            childWindow = null;
        });
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
