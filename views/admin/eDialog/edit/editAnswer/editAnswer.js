const args = dialog.argument;

function setPlacehoder() {
    document.querySelector("#id-answer").value = args.answerByID[0].id;
    document.querySelector("#questionId-answer").placeholder = args.questionById[0].content;
    document.querySelector("#content-answer").placeholder = args.answerByID[0].content;
}

// Validate all input field
function validate(content) {
    // Check valid content
    if (!content) {
        resetErrorMessage();
        document.querySelector('#content_error_msg').innerHTML = "Please enter content👿";
        document.querySelector('#content-answer').focus();
        document.querySelector('#content_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#content_error_msg').style.display = "none";
    }

    return true;
}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#content_error_msg').style.display = "none";
}

// Show message alert with each category
function showMessageAlert(message) {
    $(".alert-message").css("opacity", "0.2");
    $(".success").text(message);
    $(".success").css("color", "limegreen");
    $(".success").css("opacity", "1");
    $(".success").css("display", "block");
}

setPlacehoder();

document.querySelector('#dialog-ok')
    .addEventListener('click', () => {
        const id = document.querySelector('#id-answer').value.trim();
        const questionId = args.questionById[0].id;
        const content = document.querySelector('#content-answer').value.trim();

        // If all field is validate then show message and exit dialog
        if (validate(content)) {
            showMessageAlert("Edit Answer successfully 🌝🌝🌝!");
            setTimeout(() => {
                dialog.exit({
                    action: 'ok',
                    id: id,
                    questionId: questionId,
                    content: content,
                    args: args,
                });
            }, 1200);
        }

    });