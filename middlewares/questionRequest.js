const { body, validationResult } = require('express-validator');
const ApiResponse = require('../utils/response');


const validQuestionRequest = [
    body('category').not().isEmpty().trim().escape(),
    body('difficulty').not().isEmpty().trim().escape(),
    body('question').not().isEmpty().trim().escape(),
    body('correct_answer').not().isEmpty().isBoolean(),
    body('test_id').isHexadecimal(),


    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ success: false, error: errors.array() }));
        }

        next();
    }
];

module.exports = validQuestionRequest;