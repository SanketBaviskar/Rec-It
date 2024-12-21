import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { isDev } from './util.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow = null;
let childWindow = null;
app.on('ready', () => {
    // Main window setup with security considerations
    mainWindow = new BrowserWindow({
        width: 1920, // Example width
        height: 1080, // Example height
        webPreferences: {
            nodeIntegration: false, // Disable Node.js in Renderer
            contextIsolation: true, // Protect against prototype pollution
            preload: path.join(__dirname, 'preload.js') // Correct path to preload script
            // for full width and height 
        }
    });
    // Load URL based on development or production environment
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '/dist-react/index.html'));
    }
    // Clean up mainWindow when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // IPC event to open a new window
    ipcMain.on('open-new-window', (event, data) => {
        if (childWindow) {
            return; // Prevent multiple child windows
        }
        childWindow = new BrowserWindow({
            width: 600, // Example width for child window
            height: 400, // Example height for child window
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            }
        });
        // Load URL for the child window with parameters
        const childURL = isDev()
            ? `http://localhost:5123/component?data=${encodeURIComponent(JSON.stringify(data))}`
            : `file://${path.join(__dirname, '/dist-react/component.html')}?data=${encodeURIComponent(JSON.stringify(data))}`;
        childWindow.loadURL(childURL);
        // Clean up childWindow when it is closed
        childWindow.on('closed', () => {
            childWindow = null;
        });
    });
});
// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
