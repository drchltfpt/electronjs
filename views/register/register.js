const { remote, ipcRenderer } = require('electron');
const model = remote.require('./model/model.js');

// Get all users
async function getUsers() {
    let data = await model.getUsers();
    return data;
}

// Function insert user when register successful 
async function insertUser(user) {
    let data = await model.insertUser(user);
    return data;
}

// Class validate input register
class Validator {
    // Function checking valid student name
    static validateUsername(username) {
        const regexUsername = /^[a-z0-9_.-]{3,16}$/;
        if (!username) {
            return false;
        }
        if (!regexUsername.test(username)) {
            return false;
        }
        return true;
    }

    static validateFullname(fullname) {
        const regexFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;

        if (!fullname) {
            return false;
        }

        if (!regexFullname.test(fullname)) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email) {
            return false;
        }

        if (!regexEmail.test(email)) {
            return false;
        }
        return true;
    }

    static validatePassword(password) {

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$/;

        if (!password) {
            return false;
        }

        if (!regexPassword.test(password)) {
            return false;
        }
        return true;
    }
}

// Reset all notifies
function resetNotify() {
    $('#username-exist').css("display", "none");
    $('#email-exist').css("display", "none");
    $('#notifySuccess').css("display", "none");
}

// Reset form input value
function resetForm() {
    $("#fullname").val("");
    $('#username').val("");
    $('#password').val("");
    $('#password-confirm').val("");
    $('#email').val("");
}

// Event on submit form 
$('form').on('submit', async (e) => {
    e.preventDefault();
    // reset notify when click submit
    resetNotify();
    // Get all users to validate coincident username and email
    const arrayUsers = await getUsers();

    // Get fullname value
    const _fullname = $('#fullname').val();
    if (!Validator.validateFullname(_fullname)) {
        return false;
    }
    // Get username value
    const _username = $('#username').val();
    if (!Validator.validateUsername(_username)) {
        return false;
    }

    // Get password value
    const _password = $('#password').val();
    if (!Validator.validatePassword(_password)) {
        return false;
    }
    // Get password confirm value
    const passwordConfirm = $('#password-confirm').val();
    if(passwordConfirm.localeCompare(_password) === -1) {
        return false;
    }
    // Get email value
    const _email = $('#email').val();
    if (!Validator.validateEmail(_email)) {
        return false;
    }

    // Checking username and email
    for (i = 0; i < arrayUsers.length; i++) {
        if (_username === arrayUsers[i].username && _email === arrayUsers[i].email) {
            $("#username-exist").css("display", "inline-block");
            $("#email-exist").css("display", "inline-block");
            return false;
        }
        if (_username === arrayUsers[i].username) {
            $("#username-exist").css("display", "inline-block");
            return false;
        }

        if (_email === arrayUsers[i].email) {
            $("#email-exist").css("display", "inline-block");
            return false;
        }

    }

    
    // Create new object to insert if register valid
    const userObject = {
        username: _username,
        password: _password,
        email: _email,
        fullname: _fullname,
    };

    // Insert user
    await insertUser(userObject);
    // Display success notify
    $('#notifySuccess').css("display", "inline-block");
    // Reset form
    resetForm();
});

// Evenet on click login button
$('#login-button').click(() => {
    ipcRenderer.send('open-login');
});


