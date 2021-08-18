const express = require('express');
const router = express.Router();

const quizesController = require('../controllers/quizController');

router.get('/', quizesController.getAllQuizes);
router.post('/', quizesController.createQuiz);
router.post('/submit', quizesController.submitQuiz);
router.put('/:id', quizesController.editQuiz);
router.delete('/:id', quizesController.deleteQuizz);


module.exports = router;