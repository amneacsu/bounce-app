const electron = require('electron');
const ipc = electron.ipcMain;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 690,
    frame: false,
    resizable: false
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
})

ipc.on('close-main-window', function() {
  app.quit();
});
