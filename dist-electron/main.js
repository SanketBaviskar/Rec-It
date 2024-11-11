import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // In development, load from localhost
    if (isDev()) {
        win.loadURL("http://localhost:5173");
    }
    else {
        // In production, load the built files
        win.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
    }
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
