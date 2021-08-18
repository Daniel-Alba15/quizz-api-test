const { body, validationResult } = require('express-validator');

const ApiResponse = require('../utils/response');
const db = require('../db');

exports.createQuestion = async (req, res) => {
    try {
        const { rows } = await db.query(
            'INSERT INTO questions(category, difficulty, question, correct_answer, quiz_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [req.body.category, req.body.difficulty, req.body.createQuestion, req.body.correct_answer, req.body.quiz_id]
        );

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        return res.status(400).json(new ApiResponse({ success: false, error: e.message }));
    }
};


exports.editQuestion = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse({ success: false, error: errors.array() }));
    }

    try {
        const { rows } = await db.query(
            `UPDATE questions 
            SET category = $1, difficulty = $2, question = $3, correct_answer = $4, quiz_id = $5) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [req.body.category, req.body.difficulty, req.body.createQuestion, req.body.correct_answer, req.body.quiz_id]
        );

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        return res.status(400).json(new ApiResponse({ success: false, error: e.message }));
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const { rows } = await db.query(
            `SELECT question_id, category, difficulty, question, correct_answer, quizzes.id AS test_id, quizzes.name AS test_name 
        FROM questions INNER JOIN quizzes ON questions.quiz_id = quizzes.id`
        );

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        return res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, please try again' }));
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await db.query('DELETE FROM questions WHERE question_id = $1', [req.params.id]);

        res.json(new ApiResponse());
    } catch (e) {
        return res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, please try again' }));
    }
};