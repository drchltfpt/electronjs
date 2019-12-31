const { app } = require('electron');
const model = require('./model/model.js');
const windowConstroller = require('./controller/window-controller.js');

// Start application
app.on('ready', async () => {
  await model.initialize();
  windowConstroller.windowSet.openLogin();
});
