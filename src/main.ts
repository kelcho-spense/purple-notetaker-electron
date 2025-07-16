import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import electronSquirrelStartup from 'electron-squirrel-startup';
import { getViteCSPForEnvironment, SECURITY_HEADERS } from './security';

// Declare Vite globals
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Required for file system access in preload
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      enableWebSQL: false,
      // Additional security settings
      spellcheck: false,
      // Disable remote module for security (deprecated in newer versions)
    },
    titleBarStyle: 'default',
    icon: undefined, // You can add an icon path here if you have one
    show: false, // Don't show until ready-to-show
    backgroundColor: '#6366f1', // Match your app's theme
  });

  // Configure session security
  const session = mainWindow.webContents.session;

  // Set default CSP via session
  const isDevelopment = !!MAIN_WINDOW_VITE_DEV_SERVER_URL;
  const cspPolicy = getViteCSPForEnvironment(isDevelopment);

  console.log('� Configuring session security with CSP:', cspPolicy);

  // Set CSP header for all responses
  session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [cspPolicy],
        ...Object.entries(SECURITY_HEADERS).reduce((acc, [key, value]) => {
          acc[key] = [value];
          return acc;
        }, {} as Record<string, string[]>)
      }
    });
  });

  // Prevent new window creation
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  // Security: Prevent navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow?.webContents.getURL()) {
      event.preventDefault();
    }
  });

  // Security: The 'new-window' event is deprecated, using setWindowOpenHandler instead
  // This is already handled above with setWindowOpenHandler

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();

    // Focus the window if it's not already focused
    if (mainWindow && !mainWindow.isFocused()) {
      mainWindow.focus();
    }
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools only in development
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// IPC handlers for window controls
ipcMain.handle('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('open-devtools', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Enable live reload for Electron too
if (process.env.NODE_ENV === 'development') {
  // Reload the window when the renderer process crashes
  app.on('web-contents-created', (event, contents) => {
    contents.on('render-process-gone', () => {
      console.log('Renderer process crashed, reloading...');
      if (mainWindow) {
        mainWindow.reload();
      }
    });
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
