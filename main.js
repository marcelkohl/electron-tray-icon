const {
  app,
  BrowserWindow,
  Tray,
  screen,
  Menu
} = require('electron')
const path = require('path')

let tray = null
let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    show: false,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      devTools: false
    }
  })

  let contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { type: 'separator' },
    { label: 'Quit', click: ()=>app.quit()},
  ])

  tray = new Tray(path.join(__dirname, 'assets', 'icon.png'))
  // tray.setToolTip("Click to access the window")
  tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
  createWindow()
  // Set App ID for notifications
  app.setAppUserModelId('com.marcelkohl.electron.tray.icon')
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
