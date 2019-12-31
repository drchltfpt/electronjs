const mysql = require('mysql');

class Model {
    constructor() {
        this.connection = null;
    }

    initialize = async () => {
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: null,
            database: 'coursetrain',
            charset: 'utf8'
        });
        this.connection = con;
    };

    // ---> USER
    getUsers = async () => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getUserById = async (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users WHERE id = '${id}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getUserLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    insertUser = async (user) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO users VALUES (null, '${user.username}', '${user.password}', '${user.email}', '${user.fullname}', 'DEV')`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    // <--- END USER

    // ---> COURSE
    getCourses = async () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM courses', function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    updateCourseInvalid = async (courseId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE courses SET valid = 0 WHERE id = ${courseId}`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    // <--- END COURSE

    // ========================== M ===========================
    // Return a promise to get results / Normal connection.query cant'
    getAllCourses = async function () {
        console.log("Da vao get all course")
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `courses`', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getCourseByID = async function (id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `courses` WHERE id = ?', [id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getTop1CourseDESC = async function () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `courses` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getAllAnswers = async function () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `answers`', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getAnswerByID = async function (id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `answers` WHERE id = ?', [id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getAllAnswerByQuestionId = async function (id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `answers` WHERE questionId = ?', [id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getAnswerById = async function (id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `answers` WHERE id = ?', [id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getAllQuestions = async function () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `questions`', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getTop1Question = async function () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `questions` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }


    getQuestionById = async function (id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `questions` WHERE id = ?', [id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    getTop1AnswerDESC = async function () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `answers` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    deleteByID = async function (table, id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM ${table} WHERE ${id} = id`
            this.connection.query(sql, function (error, results, fields) {
                if (error) return reject(error);

                resolve(results.affectedRows);
            });
        });
    }

    updateByID = async function (table, object) {
        return new Promise((resolve, reject) => {
            let sql;

            if (table === 'courses') {
                sql = `UPDATE ${table} SET name = "${object.name}", descript = "${object.descript}", valid = ${object.valid}, total_time =${object.total_time}  WHERE id = ${object.id}`;
            } else if (table === 'questions') {
                sql = `UPDATE ${table} SET category = "${object.category}", type = ${object.type}, content = "${object.content}", correctId = "${object.newCorrectId}"  WHERE id = ${object.id}`;
            } else {
                sql = `UPDATE ${table} SET content = "${object.content}" WHERE id = ${object.id}`;
            }

            this.connection.query(sql, function (error, results, fields) {
                if (error) return reject(error);

                resolve(results.affectedRows);
            });
        });
    }

    addCourse = async function (object) {
        console.log(object)
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `courses` (`name`, `descript`, `valid`, `total_time`) VALUES(?, ?, ?, ?)', [object.name, object.descript, object.valid, object.total_time], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    addQuestion = async function (object) {
        console.log(object)
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `questions` (`category`, `type`, `content`, `correctId`, `courseId`) VALUES(?, ?, ?, ?, ?)', [object.category, object.type, object.content, object.newCorrectId, object.courseId], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    addAnswerByQuestionId = async function (answer, questionId) {
        console.log(answer)
        console.log(questionId)
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `answers` (`content`, `questionId`) VALUES(?, ?)', [answer, questionId], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results);
            });
        });
    }

    updateValidCourseById = async function (object) {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE `courses` SET valid = ?  WHERE id = ?', [object.valid, object.id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results.affectedRows);
            });
        });
    }

    // ========================== M ===========================







    // <--- END COURSE

    // ---> USERS_COURSES
    updateCourseStatus = async (courseStatus, userId, courseId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE users_courses SET status = ${courseStatus} WHERE courseId = ${courseId} AND userId = ${userId}`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    insertUsersCourses = async (userId, courseId ,courseStatus) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO users_courses VALUES (${userId}, ${courseId}, ${courseStatus})`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    
    selectUserCourses = async (userId, courseId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users_courses WHERE userId = ${userId} AND courseId = ${courseId}`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    // <--- END USERS_COURSES

    // ---> QUESTIONS
    getQuestionsByCourseId = async (courseId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM questions WHERE courseId = '${courseId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getCorrectAnswersByQuestionId = async (questionId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT correctId FROM questions WHERE id = '${questionId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    // <--- END QUESTIONS

    // ---> ANSWERS
    getAnswersByQuestionId = async (questionId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM answers WHERE questionId = '${questionId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getAnswersById = async (answerId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM answers WHERE id = '${answerId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    // <--- END ANSWERS

}

const model = new Model();
module.exports = model;

