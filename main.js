//require('bootstrap');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const glob = require('glob')
const path = require('path')
    //const crashReport = require('crash-reporter');

var mainWindow;
var debug = false;


function initialize() {
    //crashReport.start();
    loadModules();

    function createWindow() {
        mainWindow = new BrowserWindow({ width: 1200, height: 760, name: 'mainWindow' });
        mainWindow.loadURL(`file://${__dirname}/index.html`)

        mainWindow.on('closed', function() {
            mainWindow = null;
        });

        if (debug) {
            mainWindow.webContents.openDevTools();
            //mainWindow.maximize();
        }
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', function() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function() {
        if (mainWindow == null) {
            createWindow();
        }
    });
}

function loadModules() {
    try {
        // main menu 
        //require(path.join(___dirname, './src/electron/application-menu.js'));
        var dir = path.join(__dirname, 'src/*.js');
        console.log(dir);
        var files = glob.sync(dir);
        files.forEach(function(file) {
            console.log(file);
            require(file);
        });
    } catch (error) {
        console.log(error);
    }
};

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        autoUpdater.createShortcut(function() { app.quit() })
        break
    case '--squirrel-uninstall':
        autoUpdater.removeShortcut(function() { app.quit() })
        break
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit()
        break
    default:
        initialize()
}