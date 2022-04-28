const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const { EnglishOCR } = require('./lib/ocr');

ipcMain.on('EnglishOCR-message', (event, arg) => {
    EnglishOCR(arg).then((result) => {
        event.reply('EnglishOCR-reply', result);
    });
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            /* 解决抛异常 Uncaught ReferenceError: global is not defined */
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // win.loadFile('dist/index.html');
    win.loadURL('http://localhost:8082/index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
