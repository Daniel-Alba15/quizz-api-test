require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const quizesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/quiz', quizesRouter);
app.use('/api/question', questionsRouter);
app.use('/api/user', usersRouter);
app.use('/', (req, res) => {
    res.send("Go to ");
});

module.exports = app;