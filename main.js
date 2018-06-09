const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready', function() {
	mainWindow = new BrowserWindow({});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file',
		slashes: true
	}));

	mainWindow.on('close', function () {
		app.quit();
	});

	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

	Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add item'
	});

	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'addWindow.html'),
		protocol: 'file',
		slashes: true
	}));
}

const mainMenuTemplate = [
	{
		label: 'file',
		submenu: [
			{
				label: 'Add item',
				click(){
					createAddWindow();
				}
			},
			{
				label: 'Remove item'
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];