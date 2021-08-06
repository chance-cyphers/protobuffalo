const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const {default: installExtension, REDUX_DEVTOOLS} = require('electron-devtools-installer');

const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
});

const template = [
  {
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { type: "separator" },
      { role: "quit" }
    ]
  },
  {
    label: "File",
    submenu: [
      {
        label: 'Save',
        accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Control+S',
        click: () => {
          mainWindow.send('save-invoked', {"DATA": "STUFF"})
        }
      },
      { role: "close" }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteAndMatchStyle' },
      { role: 'delete' },
      { role: 'selectAll' },
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startSpeaking' },
          { role: 'stopSpeaking' }
        ]
      }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: 'reload' },
      { role: 'toggleDevTools' },
    ]
  }
];

const menu = electron.Menu.buildFromTemplate(template);
electron.Menu.setApplicationMenu(menu);

function createWindow() {
  const width = 900;
  mainWindow = new BrowserWindow({
    width: width,
    height: width * 6 / 8,
    minWidth: width,
    minHeight: width * 6 / 8,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
      isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
});

app.on('activate', () => {

  if (mainWindow === null) {
    createWindow();
  }
});
