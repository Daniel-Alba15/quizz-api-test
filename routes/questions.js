const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');
const validRequestQuestion = require('../middlewares/questionRequest');


router.get('/', questionController.getAllQuestions);
router.post('/', validRequestQuestion, questionController.createQuestion);
router.put('/', validRequestQuestion, questionController.editQuestion);
router.delete('/', questionController.deleteQuestion);


module.exports = router;