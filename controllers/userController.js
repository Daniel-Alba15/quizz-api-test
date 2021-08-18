const { body, validationResult } = require('express-validator');

const ApiResponse = require('../utils/response');
const db = require('../db');


exports.createUser = [
    body('email').isEmail().normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: 'Invalid email' }));
        }

        try {
            const { rows } = await db.query('INSERT INTO users(email) VALUES($1) RETURNING *', [req.body.email]);

            res.json(new ApiResponse({ data: rows }));
        } catch (e) {
            console.log(e);
            res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, try again' }));
        }
    }
];

exports.deleteUser = async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);

        res.json(new ApiResponse());
    } catch (e) {
        res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, try again' }));
    }
};

exports.editUser = [
    body('email').isEmail().normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: 'Invalid email' }));
        }

        try {
            const { rows } = await db.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [req.body.email, req.params.id]);

            res.json(new ApiResponse({ 'data': rows }));
        } catch (e) {
            res.status(400).json(new ApiResponse({ success: false, error: e.message }));
        }
    }
];

exports.getUser = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, try again' }));
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        res.status(500).json(new ApiResponse({ success: false, error: 'Something went wrong, try again' }));
    }
};