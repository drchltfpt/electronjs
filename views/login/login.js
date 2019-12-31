const { remote, ipcRenderer } = require('electron');
const userData = remote.require('./model/model.js');

// Function get user by username and password 
async function getUser(username, password) {
    let data = await userData.getUserLogin(username, password);
    return data;
}

// Event type "enter" to login
$(document).bind('keypress', function (e) {
    if (e.keyCode == 13) {
        $('#login-button').trigger('click');
    }
});

// Event login button be clicked
$('#login-button').click(async () => {
    const _username = $('#username').val();
    const _password = $('#password').val();
    console.log(_username);
    const user = await getUser(_username, _password);

    // Condition check user exist or not
    if (!user && user.length > 0) {
        console.log("Notification");
        $("#notification").css("display", "inline-block");
    } else {
        // Position is PM then login to Admin window
        if (user[0].position === 'PM') {
            console.log("Login pm");
            ipcRenderer.send('open-admin', user[0]);
        }

        // Position is DEV then login to User window
        if (user[0].position === 'DEV') {
            console.log("Login dev");
            ipcRenderer.send('open-course', user[0]);
        }
    }

});

$('#register-button').click(() => {
    ipcRenderer.send('open-register');
});
