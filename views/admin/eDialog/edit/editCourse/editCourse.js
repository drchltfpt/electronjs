const args = dialog.argument;

// Set placeholder for each input type text
function setAttributePage() {
    document.querySelector("#id-course").value = args[0].id;
    document.querySelector("#name-course").placeholder = args[0].name;
    document.querySelector("#descript-course").placeholder = args[0].descript;
    document.querySelector("#total-course").placeholder = args[0].total_time;

    // Set selected with each valid-course data
    args[0].valid == 0 ? document.querySelector(".unavailable").checked = true : document.querySelector(".available").checked = true;
}

// Validate input field
function validate(name, descript, total_time) {
    // Check valid name
    if (!name) {
        resetErrorMessage();
        document.querySelector('#name_error_msg').innerHTML = "Please enter name👿";
        document.querySelector('#name-course').focus();
        document.querySelector('#name_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#name_error_msg').style.display = "none";
    }

    // Check valid descript
    if (!descript) {
        resetErrorMessage();
        document.querySelector('#descript_error_msg').innerHTML = "Please enter descript👿";
        document.querySelector('#descript-course').focus();
        document.querySelector('#descript_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#descript_error_msg').style.display = "none";
    }

    // Check valid Total time
    if (!total_time) {
        resetErrorMessage();
        document.querySelector('#total_time_error_msg').innerHTML = "Please enter total time👿";
        document.querySelector('#total-course').focus();
        document.querySelector('#total_time_error_msg').style.display = "block";
        return false;
    } else if (isNaN(total_time)) {
        resetErrorMessage();
        document.querySelector('#total_time_error_msg').innerHTML = "Total time must a number👿";
        document.querySelector('#total-course').focus();
        document.querySelector('#total_time_error_msg').style.display = "block";
        return false;
    } else if (Number.parseInt(total_time) < 10) {
        resetErrorMessage();
        document.querySelector('#total_time_error_msg').innerHTML = "Total time must bigger than 10 seconds👿";
        document.querySelector('#total-course').focus();
        document.querySelector('#total_time_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#total_time_error_msg').style.display = "none";
    }
    return true;
}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#name_error_msg').style.display = "none";
    document.querySelector('#descript_error_msg').style.display = "none";
    document.querySelector('#total_time_error_msg').style.display = "none";
}

// Show message alert with each category
function showMessageAlert(message) {
    $(".alert-message").css("opacity", "0.2");
    $(".success").text(message);
    $(".success").css("color", "limegreen");
    $(".success").css("opacity", "1");
    $(".success").css("display", "block");
}

setAttributePage();

document.querySelector('#dialog-ok')
    .addEventListener('click', async () => {
        const id = document.querySelector('#id-course').value;
        const name = document.querySelector('#name-course').value.trim();
        const descript = document.querySelector('#descript-course').value.trim();
        const valid = document.querySelector('.unavailable').checked == true ? 0 : 1;
        const total_time = document.querySelector('#total-course').value;

        // If all field is validate then show message and exit dialog
        if (validate(name, descript, total_time)) {
            showMessageAlert("Edit Course successfully 🌝🌝🌝!");
            setTimeout(() => {
                dialog.exit({
                    action: 'ok',
                    id: id,
                    name: name,
                    descript: descript,
                    valid: valid,
                    total_time: total_time,
                    args: args,
                });
            }, 1200);
        }
    });
