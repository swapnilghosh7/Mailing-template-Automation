const {app, BrowserWindow,Menu} = require('electron');
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
// const template = [
//   {
//     label: 'File',
//     submenu: [
//       { role: 'quit' },
//       { label: 'Save',
//       	role: 'save' },
//       { label: 'Open',
//       	role: 'Open' },
// 	   { label: 'Save As',
// 	  	role: 'SaveAs' }
//     ]
//   }
// ]

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

app.on('ready', createWindow)