const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const url = require('url')
const ipc = electron.ipcMain

let win

function createWindow() {
    win = new BrowserWindow({
        width: 880,
        height: 600,
        resizable: false,
        frame: true
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'templates/index.html'),
        protocol: 'file',
        slashes: true
    }))
    //win.webContents.openDevTools()
}

//Este archivo modificado esta en una rama (branch)


app.on('ready', createWindow)
ipc.on('infoProject', (event, args)=>{
    win.webContents.send('valores', args)
})