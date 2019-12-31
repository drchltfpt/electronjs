const { ipcMain } = require('electron');
const windowSet = require('../lib/window-set.js');

// Event open course page
ipcMain.on('open-course', (event, user) => {
  windowSet.openCourse();
  windowSet.closeLogin();
  // Send user info to course page
  ipcMain.once('ready-get-user-info', (event) => {
    event.reply('get-user-info', user);
  });
});

// Event open course page
ipcMain.on('open-quiz', (event, course, user) => {
  windowSet.openQuiz();
  windowSet.closeCourse();
  // Send user info to course page
  ipcMain.once('ready-get-data', (event) => {
    event.reply('get-data', course, user);
  });
});

// Get event open register window
ipcMain.on('open-register', () => {
  windowSet.openRegister();
  windowSet.closeLogin();
});

// Get event open admin window
ipcMain.on('open-admin', (event, user) => {
  windowSet.openAdmin();
  windowSet.closeLogin();
});

// Get event open login window
ipcMain.on('open-login', () => {
  windowSet.openLogin();
  windowSet.closeRegister();
});

ipcMain.on('open-congrats', (event, result, user) => {
  windowSet.openCongrats();
  // Send user result page
  ipcMain.once('ready-get-data', (event) => {
    event.reply('get-data', result, user);
  });
  windowSet.closeQuiz();
});

ipcMain.on('open-course-congrats', (event, user) => {
  windowSet.openCourse();
  windowSet.closeCongrats();
  // Send user info to course page
  ipcMain.once('ready-get-user-info', (event) => {
    event.reply('get-user-info', user);
  });
});

ipcMain.on('open-fail', (event, result, questionNumber,user) => {
  windowSet.openFail();
  windowSet.closeQuiz();
  // Send user result page
  ipcMain.once('ready-get-data-fail', (event) => {
    event.reply('get-data-fail', result, questionNumber, user);
  });
});

ipcMain.on('open-course-fail', (event, user) => {
  windowSet.openCourse();
  windowSet.closeFail();
  // Send user info to course page
  ipcMain.once('ready-get-user-info', (event) => {
    event.reply('get-user-info', user);
  });
});

// Get event logout-admin
ipcMain.on('logout-admin', () => {
  windowSet.openLogin();
  windowSet.closeAdmin();
});

module.exports = {
  windowSet: windowSet,
};