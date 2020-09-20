const { app, Menu, ipcMain, dialog, protocol, Tray } = require('electron')
const isDevEnv = require('electron-is-dev')
const path = require('path')
const { BrowserWindow } = require('electron')
const electronHelper = require('./electronHelper')
const { autoUpdater } = require('electron-updater')
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

// const devTron = require('devtron')
// const Store = require('electron-store')

let mainWindow; let printWindow;
app.allowRendererProcessReuse = true;
let appTray;
let willQuitApp = false;  // 控制退出方式
const trayIcon = `${path.join(__dirname, '../electron/public/icon.png')}`

function createMainWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    'width': 1010,
    'height': 716,
    'minWidth': 800,
    'minHeight': 600,
    // frame: false,
    autoHideMenuBar: false,
    // titleBarStyle: 'hidden',
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  });
  // 加载index.html文件
  mainWindow.loadURL(isDevEnv
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`);
  // 打开开发者工具
  isDevEnv && mainWindow.openDevTools();
  // 异步安装插件
  isDevEnv && installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension REDUX_DEVTOOLS:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  isDevEnv && installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension REDUX_DEVTOOLS:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
  mainWindow.once('ready-to-show', () => {
    console.error('end notice')
    autoUpdater.checkForUpdatesAndNotify();
  })
  // 最小化
  const trayMenuTemplate = [
    {
      label: '显示主页面',
      click: function () {
        mainWindow.show();
      }
    },
    {
      label: '退出',
      click: function () {
        app.quit();
      }
    }
  ]

  // 窗口关闭的监听
  mainWindow.on('closed', () => {
    console.log('closed')
    mainWindow = null;
  });
  mainWindow.on('close', (e) => {
    console.log('close')
    if (willQuitApp) {
      mainWindow = null;
      printWindow = null; // 其他窗口也要会回收
    } else { // mac平台，左上角关闭窗口 = 隐藏窗口
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
      e.preventDefault();
    }
  });

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.setMenuBarVisibility(false);
  })

  appTray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  appTray.setToolTip('我的托盘图标');
  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  // 单击右下角小图标显示应用
  appTray.on('click', () => {
    // mainWindow.show();
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
  })
// }
  // 检查自动更新
  electronHelper.updateHandle(mainWindow)
}

// 打印方案一: webcontent

function createPrintWindow() {
  printWindow = new BrowserWindow({
    title: '打印',
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  const url = `file://${path.join(__dirname, '../electron/print/print.html')}`
  printWindow.loadURL(url);
  electronHelper.initPrintEvent(printWindow, mainWindow, url)
}


app.whenReady().then(() => {
  createMainWindow()
  createPrintWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('window-all-closed')
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  console.log('process.platform', process.platform)
  if (process.platform !== 'darwin') {
    console.log('quit')
    app.quit()
  }
});

app.on('before-quit', () => {
  console.log('before-quit')
  willQuitApp = true
});

app.on('activate', () => {
  mainWindow.show()
});

