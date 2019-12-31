const args = dialog.argument;
var d1 = document.getElementById('right');

function setPlaceHolder() {
    document.querySelector("#id-questions").value = args.questionById[0].id;
    document.querySelector("#category-questions").placeholder = args.questionById[0].category;
    document.querySelector("#content-questions").placeholder = args.questionById[0].content;
    document.querySelector("#courseId-questions").placeholder = args.questionById[0].courseId;
}

// Get list correct ID 
function getListCorrectId() {
    const correctId = args.questionById[0].correctId;
    const listCorrectId = correctId.split(",");
    return listCorrectId;
}

// Load checkbox with CorrectId is checked and label error
function loadElement() {
    // Add element checkbox
    for (i = 0; i < args.arrAnswerByQId.length; i++) {
        d1.insertAdjacentHTML('beforeend',
            `<label class="container">
                <input id=${args.arrAnswerByQId[i].id} type="checkbox" name="correctId" value="${args.arrAnswerByQId[i].id}">${args.arrAnswerByQId[i].content}</input>
                <span class="checkmark"></span>
            </label>`);
    }

    let listCorrectId = getListCorrectId();
    // Set checkbox is checked 
    for (i = 0; i < document.querySelectorAll("input[type='checkbox']").length; i++) {
        for (j = 0; j < listCorrectId.length; j++) {
            if (listCorrectId[j] == document.querySelectorAll("input[type='checkbox']")[i].value) {
                document.querySelectorAll("input[type='checkbox']")[i].checked = true;
            }
        }
    }

    // Insert label error
    d1.insertAdjacentHTML('beforeend', `</br> <label id="corectId_error_msg"></label>`);
}

// Validate input field
function validate(category, content) {
    // Check valid name
    if (!category) {
        resetErrorMessage();
        document.querySelector('#category_error_msg').innerHTML = "Please enter category👿";
        document.querySelector('#category-questions').focus();
        document.querySelector('#category_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#category_error_msg').style.display = "none";
    }

    // Check valid descript
    if (!content) {
        resetErrorMessage();
        document.querySelector('#content_error_msg').innerHTML = "Please enter content👿";
        document.querySelector('#content-questions').focus();
        document.querySelector('#content_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#content_error_msg').style.display = "none";
    }
    const listCheckBox = document.querySelectorAll("input[type='checkbox']");

    let countCorrectId = 0;
    for (i = 0; i < listCheckBox.length; i++) {
        if (listCheckBox[i].checked == true) {
            countCorrectId++;
        }
    }
    // Check select single correctId and don't select any checkbox
    if (document.querySelector("#type-questions").value == 0) {
        if (countCorrectId > 1 || countCorrectId == 0) {
            resetErrorMessage();
            document.querySelector('#corectId_error_msg').innerHTML = "Please choose single answer👿";
            document.querySelector('#corectId_error_msg').style.display = "block";
            return false;
        }
    } else if (document.querySelector("#type-questions").value == 1) {
        if (countCorrectId < 2 || countCorrectId == 0) {
            resetErrorMessage();
            document.querySelector('#corectId_error_msg').innerHTML = "Please choose multiple answer👿";
            document.querySelector('#corectId_error_msg').style.display = "block";
            return false;
        }
    }

    return true;
}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#category_error_msg').style.display = "none";
    document.querySelector('#content_error_msg').style.display = "none";
    document.querySelector('#corectId_error_msg').style.display = "none";
}

// Show message succesfull
function showMessageAlert(message) {
    $(".alert-message").css("opacity", "0.2");
    $(".success").text(message);
    $(".success").css("color", "limegreen");
    $(".success").css("opacity", "1");
    $(".success").css("display", "block");
}

// Get array correct ID
function getArrayCorrectId() {
    let correctId = "";
    // Lop over all checkbox
    for (i = 0; i < document.querySelectorAll("input[type='checkbox']").length; i++) {
        // Checkbox is checked
        if (document.querySelectorAll("input[type='checkbox']")[i].checked == true) {
            correctId += document.querySelectorAll("input[type='checkbox']")[i].value + ",";
        }
    }

    return correctId;
}

setPlaceHolder();
loadElement();

// Click ok in Dialog 
document.querySelector('#dialog-ok')
    .addEventListener('click', () => {
        const id = args.questionById[0].id;
        const category = document.querySelector('#category-questions').value.trim();
        const type = document.querySelector('#type-questions').value.trim();
        const content = document.querySelector('#content-questions').value.trim();

        const correctId = getArrayCorrectId();
        newCorrectId = correctId.substring(0, correctId.length - 1);
        const courseId = args.questionById[0].courseId
        // If all field is validate then show message and exit dialog
        if (validate(category, content)) {
            showMessageAlert("Edit Question successfully 🌝🌝🌝!");
            setTimeout(() => {
                dialog.exit({
                    action: 'ok',
                    id: id,
                    category: category,
                    type: type,
                    content: content,
                    newCorrectId: newCorrectId,
                    courseId: courseId,
                    args: args
                });
            }, 1200);
        }

    });