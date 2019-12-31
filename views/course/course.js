const { remote, ipcRenderer } = require('electron');
const courseData = remote.require('./model/model.js');
const windowSet = remote.require('./lib/window-set.js');

ipcRenderer.send('ready-get-user-info');
let currentUser = {};

//get user information from controller
ipcRenderer.on('get-user-info', (event, user) => {
    $('.profile').append('<h1>Welcome ' + user.fullname + '</h1>');
    currentUser = user;
});

// Get all courses
async function getCourses() {
    let data = await courseData.getCourses();
    return data;
}

// Get all questions by course ID
async function getQuestionsByCourseId(courseId) {
    let data = await courseData.getQuestionsByCourseId(courseId);
    return data;
}

// Update courses don't have any question
async function updateCourseInvalid(courseId) {
    let data = await courseData.updateCourseInvalid(courseId);
    return data;
}

async function selectUserCourses(userId, courseId) {
    let data = await courseData.selectUserCourses(userId, courseId);
    return data;
}

// Event on window load
$(document).ready(async () => {
    // Get all courses to show
    const courses = await getCourses();
    console.log(currentUser.id);
    // Find valid courses to display
    for (const course of courses) {
        // Get all questions by course id
        const questions = await getQuestionsByCourseId(course.id);
        // If this course don't have any question => set course to invalid
        if (questions.length > 0) {
            // Condition check this course be valid
            if (course.valid === 1) {
                const usersCourses = await selectUserCourses(currentUser.id, course.id);
                console.log(usersCourses);
                // Course valid and status is passed
                if (usersCourses.length > 0 && usersCourses[0].status === 1) {
                    // Add course to grid view with status passed
                    $('#course-list').append(`
                                    <li id='${course.id}-passed'>
                                        <div class="card-front">
                                            <h2>
                                                <b> ${course.name}</b>
                                            </h2> 
                                            <p>${course.descript}</p>
                                        </div>
                                        <div class="card-back">
                                            <h2>
                                                <b>Passed</b>
                                            </h2>
                                        </div>
                                        <div class="all-content">
                                            <h1> ${course.name} </h1>
                                        </div>
                                    </li>`);
                } else {
                    // Add course to grid view and this course can be did
                    $('#course-list').append(`
                                    <li id='${course.id}'>
                                        <div class="card-front">
                                            <h2>
                                                <b> ${course.name}</b>
                                            </h2> 
                            <p>${course.descript}</p>
                                        </div>
                                        <div class="card-back">
                                            <h2>
                                                <b>Click here</b>
                                            </h2>
                                        </div>
                                        <div class="all-content">
                                            <h1> ${course.name} </h1>
                                        </div>
                                    </li>`);
                }
                // Event confirm action when user click on course to do course
                $(`#${course.id}`).click((event) => {
                    Confirm(`Go to do ${course.name}`, 'Are you sure you want to do this Course', 'Yes', 'Cancel', course, currentUser);
                });
            }
        } else {
            // Set course to invalid
            await updateCourseInvalid(course.id);
        }
    }
});

// Event click on logout button
$('#logout-button').click(() => {
    windowSet.openLogin();
    windowSet.closeCourse();
});

// --------------------------------> CONFIRM DIALOG <---------------------------------------

// Show confirm dialog
function Confirm(title, msg, yes, no, course, currentUser) {
    var content =
        `<div class='dialog-ovelay'>
        <div class='dialog'>
            <header>
                <h3> ${title} </h3>
                <i class='fa fa-close'></i>
            </header>
            <div class='dialog-msg'>
                <p> ${msg} </p>
            </div>
            <footer>
                <div class='controls'>
                    <button class='button button-danger doAction'> ${yes} </button>
                    <button class='button button-default cancelAction'> ${no} </button>
                </div>
            </footer>
        </div>
    </div>`;
    $('body').prepend(content);
    $('.doAction').click(function () {
        ipcRenderer.send('open-quiz', course, currentUser);
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
            $(this).remove();
        });
    });
    $('.cancelAction, .fa-close').click(function () {
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
            $(this).remove();
        });
    });
}

