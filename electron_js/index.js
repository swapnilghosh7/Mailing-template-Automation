const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
let fs = require('fs')

let win  

function createWindow() { 
   win = new BrowserWindow({width: 900, height: 600,  webPreferences: {
    nodeIntegration: true
  }}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }));

}  

app.on('ready', createWindow)