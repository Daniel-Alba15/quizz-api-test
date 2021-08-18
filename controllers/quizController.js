const { body, validationResult } = require('express-validator');

const db = require('../db/index');

const questions = require('../utils/questions');
const ApiResponse = require('../utils/response');


exports.getAllQuizes = async (req, res) => {
    const response = [];

    try {
        const { rows } = await db.query('SELECT * FROM quizzes');

        for (let i = 0; i < rows.length; i++) {
            const formatResponse = {};
            formatResponse.id = rows[i].id;
            formatResponse.quiz_name = rows[i].name;
            const results = await db.query('SELECT * FROM questions WHERE quiz_id = $1', [rows[i].id]);
            formatResponse.results = results.rows

            response.push(formatResponse);
        }

        res.json(new ApiResponse({ data: response }));
    } catch (e) {
        res.status(400).json(new ApiResponse({ success: false, error: e.message }));
    }
};

exports.createQuiz = [
    body('name').not().isEmpty().trim().escape(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: errors.array() }));
        }

        try {
            const { rows } = await db.query('INSERT INTO quizzes(name) VALUES($1) RETURNING id', [quizName]);

            const quizId = rows[0].id;
            const { results } = await questions.getQuestions();

            for (let i = 0; i < results.length; i++) {
                let { category, difficulty, question, correct_answer } = results[i];
                await db.query(
                    'INSERT INTO questions(category, difficulty, question, correct_answer, quiz_id) VALUES($1, $2, $3, $4, $5)',
                    [category, difficulty, question, correct_answer, quizId]
                );
            }

            res.json(new ApiResponse());
        } catch (e) {
            return res.status(400).json(new ApiResponse({ success: false, error: e.message }));
        }
    }
];

exports.editQuiz = [
    body('name').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: errors.array() }));
        }

        try {
            const { rows } = await db.query('UPDATE quizzes SET name = $1 WHERE id = $2 RETURNING *', [req.body.name, req.params.id]);

            res.json(new ApiResponse({ data: rows }));
        } catch (e) {
            return res.status(400).json(new ApiResponse({ success: false, error: e.message }));
        }
    }
];

exports.deleteQuizz = async (req, res) => {
    try {
        await db.query('DELETE FROM quizzes WHERE id = $1', [req.params.id]);

        res.json(new ApiResponse());
    } catch (e) {
        return res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, please try again' }));
    }
};


exports.submitQuiz = [
    body('quiz_id').not().isEmpty().isHexadecimal(),
    body('user_id').not().isEmpty().isHexadecimal(),
    body('answers').not().isEmpty().isArray(),

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: errors.array() }));
        }

        try {
            await db.query('INSERT INTO user_quiz(user_id, quiz_id) VALUES($1, $2)', [req.body.user_id, req.body.quiz_id]);

            for (let i = 0; i < req.body.answers.length; i++) {
                console.log(req.body.answers[i].answer);
                await db.query('INSERT INTO user_answers(answer, user_id, question_id) VALUES ($1, $2, $3)', [req.body.answers[i].answer, req.body.user_id, req.body.answers[i].question_id]);
            }

            res.json(new ApiResponse());
        } catch (e) {
            return res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, please try again' }));
        }
    }
];