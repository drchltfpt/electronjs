const args = dialog.argument;

// When window load
window.onload = function () {
    // Loop over all Courses to add option to select tag
    for (i = 0; i < args.allCourse.length; i++) {
        var option = document.createElement('option');
        option.text = args.allCourse[i].name;
        option.value = args.allCourse[i].id;
        document.getElementById("courseId-questions").add(option, 0);
    }
};

// Validate input field
function validate(category, content) {
    // Check valid name
    if (!category) {
        resetErrorMessage();
        document.querySelector('#category_error_msg').innerHTML = "Please enter category";
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

    const listAnswer = document.querySelectorAll("input[class='text-answer']");
    // Count all answer
    let countAnswer = 0;
    for (i = 0; i < listAnswer.length; i++) {
        // Get value of answer at index i
        if (listAnswer[i].value && listAnswer[i].value.trim().length != 0) {
            countAnswer++;
        }
    }

    // Count number of checkbox correct question
    const listCheckBox = document.querySelectorAll("input[type='checkbox']");
    let countCorrectId = 0;
    // Loop over all checkbox
    for (i = 0; i < listCheckBox.length; i++) {
        const answer = document.querySelector(`#answer-${i + 1}`).value
        // Check checkbox is checked and have input data then increase number of correctId
        if (listCheckBox[i].checked == true && answer && answer.trim().length != 0) {
            countCorrectId++;
        }
    }

    // Check number of answer at least 3 questions
    if (countAnswer < 3) {
        resetErrorMessage();
        document.querySelector('#corectId_error_msg').innerHTML = "Enter at least 3 questions👿";
        document.querySelector('#corectId_error_msg').style.display = "block";
        return false;
    } else {
        // Check select single correctId and don't select any checkbox
        if (document.querySelector("#type-questions").value == 0) {
            // Check number of valid correctID equal 1
            if (countCorrectId > 1 || countCorrectId == 0) {
                document.querySelector('#corectId_error_msg').innerHTML = "Please choose single answer👿";
                return false;
            }
        } else if (document.querySelector("#type-questions").value == 1) {
            // Check number of valid correctID at least 2 with multiple
            if (countCorrectId < 2 || countCorrectId == 0) {
                document.querySelector('#corectId_error_msg').innerHTML = "Please choose multiple answer👿";
                return false;
            }
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

// Show message alert with each category
function showMessageAlert(message) {
    $(".alert-message").css("opacity", "0.2");
    $(".success").text(message);
    $(".success").css("color", "limegreen");
    $(".success").css("opacity", "1");
    $(".success").css("display", "block");
}

function getArrayCorrectId() {
    // Get array correct Answer
    let correctId = "";
    let correctIdIndex = args.newIdAnswer;

    for (i = 0; i < [...document.querySelectorAll(".selected-answer")].length; i++) {
        const checked = [...document.querySelectorAll(".selected-answer")][i].checked;
        const answer = document.querySelector(`#answer-${i + 1}`).value;

        // Check if input text have data then get it is first correct answer
        if (answer && answer.trim().length != 0) {
            correctIdIndex++;
        }

        // Check checkbox is checked and answer have data then add correctId
        if (checked && answer && answer.trim().length != 0) {
            correctId += `${correctIdIndex},`;
        }
    }

    return correctId;
}

document.querySelector('#dialog-ok')
    .addEventListener('click', () => {
        const category = document.querySelector('#category-questions').value.trim();
        const type = document.querySelector('#type-questions').value.trim();
        const content = document.querySelector('#content-questions').value.trim();
        const courseId = document.querySelector('#courseId-questions').value.trim();

        let arrAnswer = [];
        const listAnswer = document.querySelectorAll("input[class='text-answer']");
        for (i = 0; i < listAnswer.length; i++) {
            // Check have data
            if (listAnswer[i].value) {
                arrAnswer.push(listAnswer[i].value)
            }
        }

        const correctId = getArrayCorrectId();
        const newCorrectId = correctId.substring(0, correctId.length - 1);

        if (validate(category, content)) {
            showMessageAlert("Add Question/Answer successfully 🌝!");
            setTimeout(() => {
                dialog.exit({
                    action: 'ok',
                    category: category,
                    type: type,
                    content: content,
                    newCorrectId: newCorrectId,
                    courseId: courseId,
                    arrAnswer: arrAnswer,
                    args: args
                });
            }, 1200);
        }
    });