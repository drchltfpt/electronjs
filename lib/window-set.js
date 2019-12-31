const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

appWindow = {
    loginAppWindow: null,
    courseAppWindow: null,
    quizAppWindow: null,
    registerAppWindow: null,
    addminAppWindow: null
}

class Command {

    openLogin = () => {
        // Create the browser window.
        appWindow.loginAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Login Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.loginAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/login/login.html'),
            protocol: 'file',
            slashes: true
        }));

        // Garbage collection handle
        appWindow.loginAppWindow.on('close', function () {
            appWindow.loginAppWindow = null;
        })

        // Garbage collection handle
        appWindow.loginAppWindow.on('closed', function () {
            appWindow.loginAppWindow = null;
        })

    };

    closeLogin = () => {
        appWindow.loginAppWindow.close();
    }

    openAdmin = () => {
        // Create the browser window.
        appWindow.addminAppWindow = new BrowserWindow({
            resizable: false,
            width: 1366,
            height: 768,
            title: "Login Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.addminAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/admin/admin.html'),
            protocol: 'file',
            slashes: true
        }));

    }

    closeAdmin = () => {
        appWindow.addminAppWindow.close();
    }

    openCourse = () => {
        appWindow.courseAppWindow = new BrowserWindow({
            width: 1115,
            height: 700,
            title: "Course Train Application",
            webPreferences: {
                nodeIntegration: true
            },
            minWidth: 1115,
        });

        // appWindow.courseAppWindow.webContents.openDevTools();

        // and load the index.html of the app.
        appWindow.courseAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/course/course.html'),
            protocol: 'file',
            slashes: true
        }));
         
        // appWindow.courseAppWindow.maximize();
    }

    closeCourse = () => {
        appWindow.courseAppWindow.close();
    }

    openQuiz = () => {
        appWindow.quizAppWindow = new BrowserWindow({
            title: "Course Train Application",
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            resizable: false
        });

        appWindow.quizAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/quiz/quiz.html'),
            protocol: 'file',
            slashes: true
        }));
        appWindow.quizAppWindow.setFullScreen(true);

    };

    closeQuiz = () => {
        appWindow.quizAppWindow.close();
    }

    openRegister = () => {
        appWindow.registerAppWindow = new BrowserWindow({
            width: 1060,
            height: 640,
            title: "Register Course Train Application",
            webPreferences: {
                nodeIntegration: true
            },
            resizable: false
        });

        appWindow.registerAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/register/register.html'),
            protocol: 'file',
            slashes: true
        }));

    };

    closeRegister = () => {
        appWindow.registerAppWindow.close();
    }
    openCongrats = () => {
        // Create the browser window.
        appWindow.congratsAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Congratulations",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.congratsAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/result/congrats.html'),
            protocol: 'file',
            slashes: true
        }));

        // Garbage collection handle
        appWindow.congratsAppWindow.on('close', function () {
            appWindow.congratsAppWindow = null;
        })

        // Garbage collection handle
        appWindow.congratsAppWindow.on('closed', function () {
            appWindow.congratsAppWindow = null;
        })
    };

    closeCongrats = () => {
        appWindow.congratsAppWindow.close();
    }
    
    openFail = () => {
        // Create the browser window.
        appWindow.failAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Congratulations",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.failAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/result/fail.html'),
            protocol: 'file',
            slashes: true
        }));

        // Garbage collection handle
        appWindow.failAppWindow.on('close', function () {
            appWindow.failAppWindow = null;
        })

        // Garbage collection handle
        appWindow.failAppWindow.on('closed', function () {
            appWindow.failAppWindow = null;
        })
    };

    closeFail = () => {
        appWindow.failAppWindow.close();
    }
}

const cmd = new Command();

module.exports = cmd;



