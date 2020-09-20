const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')


// 检测更新
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text, mainWindow) {
  mainWindow.webContents.send('message', text)
}

function updateHandle(mainWindow) {
  autoUpdater.on('error', function (error) {
    sendUpdateMessage('检查更新出错' + error)
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage('正在检查更新…')
  });
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage('检测到新版本，正在下载…')
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('现在使用的已经是最新版本')
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  });

  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    // 渲染层回复立即更新，则自动退出当前程序，然后进行程序更新
    ipcMain.on('updateNow', (e, arg) => {
      console.log('开始更新');
      autoUpdater.quitAndInstall();
    });

    // 询问渲染层是否立即更新
    mainWindow.webContents.send('isUpdateNow')
  });

  ipcMain.on('checkForUpdate', () => {
    // 执行自动更新检查
    // 这里有两种"checkForUpdates"和"checkForUpdatesAndNotify"
    // 区别在于checkForUpdatesAndNotify检查到新版本时会调用系统的通知组件通知用户有新版本可供下载
    // 大家可以根据实际需要自行选择
    // autoUpdater.checkForUpdates();
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// 打印标签 - webcontent方式

function initPrintEvent(printWindow, mainWindow, url) {
  ipcMain.on('print-start', (event, obj) => {
    console.log('print-start')
    printWindow.webContents.send('print-edit', obj);
  })
  // 获得打印机列表
  ipcMain.on('getPrinters', () => {
    console.log('received getPrinters msg');
    const printers = printWindow.webContents.getPrinters();
    mainWindow.send('printerList', { printers, url })
  })
  // 验证打印机状态并打印
  ipcMain.on('tagPrint', (event, deviceName) => {
    const printers = printWindow.webContents.getPrinters();
    console.log('printers：', printers)
    printers.forEach(element => {
      if (element.name === deviceName && element.status !== 0) {
        mainWindow.send('print-error', deviceName + '打印机异常');
        printWindow.webContents.print({
          silent: false,
          printBackground: false,
          deviceName: ''
        },
          (data) => {
            console.log("回调", data);
          });
      } else if (element.name === deviceName && !element.status) { // 打印机正常
        console.log(element.status + '-' + deviceName)
        printWindow.webContents.print({
          silent: true,
          printBackground: false,
          deviceName: element.name
        }, (success, failureReason) => {
          if (success) {
            console.log('print success')
          }
          if (failureReason === 'cancelled') {
            console.log('print cancelled');
          }
          if (failureReason === 'failed') {
            console.log('print failed');
          }
        });
      }
    });

  })
}

module.exports  = {
  updateHandle,
  initPrintEvent
}