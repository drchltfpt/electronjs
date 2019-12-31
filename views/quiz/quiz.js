const { remote, ipcRenderer } = require('electron');
const quizData = remote.require('./model/model.js');

// Map save user answers
let userAnswers = new Map();
// Map save correct answers
let correctAnswers = new Map();
let questionIds = [];
const alphabetAnswers = ["A", "B", "C", "D"];

// Get all questions by course ID 
async function getQuestions(courseId) {
    let data = await quizData.getQuestionsByCourseId(courseId);
    return data;
}

// Get all answers by question ID
async function getAnswers(questionId) {
    let data = await quizData.getAnswersByQuestionId(questionId);
    return data;
}

// Insert users courses by userID, course ID, course status
async function insertUsersCourses(userId, courseId, courseStatus) {
    let data = await quizData.insertUsersCourses(userId, courseId, courseStatus);
    return data;
}

// Select users courses by user ID and course ID
async function selectUserCourses(userId, courseId) {
    let data = await quizData.selectUserCourses(userId, courseId);
    return data;
}

// Update course status
async function updateCourseStatus(courseStatus, userId, courseId) {
    let data = await quizData.updateCourseStatus(courseStatus, userId, courseId);
    return data;
}
// Send event ready-get-data to controller
ipcRenderer.send('ready-get-data');

// Reset answers
resetForm = () => {
    $('#answers').empty();
}

// Get result to show
function getQuizResult(id) {
    if (userAnswers.get(id) === undefined) return false;
    const userAnswerStr = userAnswers.get(id).sort().toString();
    const correctAnswerStr = correctAnswers.get(id).sort().toString();
    return userAnswerStr === correctAnswerStr;
}

// Show result to result window
async function showResult(user, courseId) {
    const correctIds = questionIds.filter((id) => getQuizResult(id));
    const result = correctIds.length;
    const usersCourses = await selectUserCourses(user.id, courseId);
    // Condition check user do this quiz yet. 
    if (usersCourses.length === 0) {
        // Condition result = passed
        if (result === questionIds.length) {
            // Insert new users courses with status = 1 (passed)
            await insertUsersCourses(user.id, courseId, 1);
            // Open result window
            ipcRenderer.send('open-congrats', result, user);

        } else {
            // Insert new users courses with status = 0 (not pass)
            await insertUsersCourses(user.id, courseId, 0);
            // Open result window
            ipcRenderer.send('open-fail', result, questionIds.length, user);
        }

    } 
    // Condition user did this quiz
    else {
        // Condition result = passed
        if (result === questionIds.length) {
            // Update new users courses with status = 1 (passed)
            await updateCourseStatus(1, user.id, courseId);
            // Open result window
            ipcRenderer.send('open-congrats', result, user);

        } else {
            // Insert new users courses with status = 0 (not pass)
            await updateCourseStatus(0, user.id, courseId);
            // Open result window
            ipcRenderer.send('open-fail', result, questionIds.length, user);
        }
    }
}


// Function count time to do quiz
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// get user information from main.js
ipcRenderer.on('get-data', async (event, course, user) => {
    // Get total time to do this course
    const minutes = course.total_time * 60,
        display = document.querySelector('#time');
    // Set and display time to do this course 
    startTimer(minutes, display);
    // Time out then submit this quiz
    setTimeout(async () => {
        await showResult(user, course.id);
    }, (minutes * 1000));
    // Get all questions
    const questions = await getQuestions(course.id);
    // Push question to list question ID
    for (let question of questions) {
        questionIds.push(question.id);
    }

    // Set question index
    let questionIndex = 0;

    // First time load quiz window => hidden previous button 
    $('#previous-button').css("display", "none");

    // Set quiz window title by course's name
    $('#title').text(course.name);

    // Set current question number
    $('#question-number').text(`QUESTION ${questionIndex + 1} OF ${questions.length}`);

    // Set content question
    $('#question').text(`${questions[questionIndex].content}`);

    // Get all answers by question ID
    let answers = await getAnswers(questions[questionIndex].id);

    // Get correct answers and set to correct answer map
    for (let question of questions) {
        let correctAnswer = question.correctId.split(',');
        correctAnswers.set(question.id, correctAnswer);
    }
    // Array user's answers of this question
    let userAnswer = [];
    
    // Set count to get value from alphabetAnswers
    let countAnswerAlphabet = 0;
    // Set answer to show
    for (let answer of answers) {
        
        // Show answer to view
        $('#answers').append(`
                <p class="option has-text-grey-dark">
                    <span id="span-${answer.id}" class="has-text-weight-bold is-size-5">${alphabetAnswers[countAnswerAlphabet++]}</span> ${answer.content}
                </p>
        `);

        // Condition check user choosed this answer or not, if user choosed then answer checked
        if (userAnswers.has(questions[questionIndex].id)) {
            userAnswer = userAnswers.get(questions[questionIndex].id);
            for (let i of userAnswer) {
                $(`#span-${i}`).addClass(`pink`);
            }
        }
        // Event click to answer
        document.querySelector(`#span-${answer.id}`).addEventListener('click', function (e) {
            e.preventDefault();
            // Condition check answer checked or not
            if (!(document.querySelector(`#span-${answer.id}`).classList.contains('pink'))) {
                document.querySelector(`#span-${answer.id}`).classList.add('pink');
                userAnswer.push(answer.id);
                userAnswers.set(questions[questionIndex].id, userAnswer);
            } else {
                document.querySelector(`#span-${answer.id}`).classList.remove('pink');
                let index1 = userAnswer.indexOf(answer.id);
                userAnswer.splice(index1, 1);
                userAnswers.set(questions[questionIndex].id, userAnswer);
            }
        });
    }

    // Event on next button click
    $("#next-button").click(async () => {
        questionIndex++;
        // Condition check next button on first quiz window or not
        if (questionIndex <= questions.length - 1) {
            // Hidden next button when user go to first quiz window 
            if (questionIndex == questions.length - 1) {
                $('#next-button').css("display", "none");
            }
            // Set previous display
            $('#previous-button').css("display", "");
            // Reset form
            resetForm();
            // Set window number
            $('#question-number').text(`QUESTION ${questionIndex + 1} OF ${questions.length}`);
            // Set text for question
            $('#question').text(`${questions[questionIndex].content}`);
            // Get all answers of this question
            let answers = await getAnswers(questions[questionIndex].id);
            // Array user's answers of this question
            let currentAnswer = [];
            // Set count to get value from alphabetAnswers
            let countAlphabetAnswer = 0;
            // Show answers
            for (let answer of answers) {
                // Show answer to view
                $('#answers').append(`
                        <p class="option has-text-grey-dark">
                            <span id="span-${answer.id}" class="has-text-weight-bold is-size-5">${alphabetAnswers[countAlphabetAnswer++]}</span> ${answer.content}
                        </p>
                `);
                // Condition check user choosed this answer or not, if user choosed then answer checked
                if (userAnswers.has(questions[questionIndex].id)) {
                    currentAnswer = userAnswers.get(questions[questionIndex].id);
                    for (let i of currentAnswer) {
                        $(`#span-${i}`).addClass(`pink`);
                    }
                }

                // Event click to answer
                $(`#span-${answer.id}`).click(() => {
                    // Condition check answer checked or not
                    if ($(`#span-${answer.id}`).hasClass(`pink`)) {
                        $(`#span-${answer.id}`).removeClass(`pink`);
                        let index1 = currentAnswer.indexOf(answer.id);
                        currentAnswer.splice(index1, 1);
                        userAnswers.set(questions[questionIndex].id, currentAnswer);
                    } else {
                        $(`#span-${answer.id}`).addClass(`pink`);
                        currentAnswer.push(answer.id);
                        userAnswers.set(questions[questionIndex].id, currentAnswer);
                    }
                })
            }
        } else {
            $('#next-button').css("display", "none");
        }

    });
    // Event on previous button click
    $("#previous-button").click(async () => {
        questionIndex--;
        // Condition check previous button on last quiz window or not
        if (questionIndex >= 0) {
            // Hidden previous button when user go to last quiz window 
            if (questionIndex == 0) {
                $('#previous-button').css("display", "none");
            }
            // Set next display
            $('#next-button').css("display", "");
            resetForm();
            $('#question-number').text(`QUESTION ${questionIndex + 1} OF ${questions.length}`);
            $('#question').text(`${questions[questionIndex].content}`);
            let answers = await getAnswers(questions[questionIndex].id);
            
            
            // Array user's answers of this question
            let currentAnswers = [];
            // Set count to get value from alphabetAnswers
            let countAlphabetAnswer = 0;
            // Show answers
            for (let answer of answers) {
                // Show answer to view
                $('#answers').append(`
                    <p class="option has-text-grey-dark">
                        <span id="span-${answer.id}" class="has-text-weight-bold is-size-5">${alphabetAnswers[countAlphabetAnswer++]}</span> ${answer.content}
                    </p>
                `);

                if (userAnswers.has(questions[questionIndex].id)) {
                    currentAnswers = userAnswers.get(questions[questionIndex].id);
                    for (let i of currentAnswers) {
                        $(`#span-${i}`).addClass(`pink`);
                    }
                }
                // Event click to answer
                $(`#span-${answer.id}`).click(() => {
                    // Condition check answer checked or not
                    if ($(`#span-${answer.id}`).hasClass(`pink`)) {
                        $(`#span-${answer.id}`).removeClass(`pink`);
                        let index1 = currentAnswers.indexOf(answer.id);
                        currentAnswers.splice(index1, 1);
                        userAnswers.set(questions[questionIndex].id, currentAnswers);
                    } else {
                        $(`#span-${answer.id}`).addClass(`pink`);
                        currentAnswers.push(answer.id);
                        userAnswers.set(questions[questionIndex].id, currentAnswers);
                    }
                })
            }
        } else {
            $('#previous-button').css("display", "none");
        }
    });

    // Event on submit button
    $('#submit-button').click(async () => {
        await showResult(user, course.id);
    });

});

