CREATE TABLE quizzes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	created_at DATE NOT NULL DEFAULT CURRENT_DATE
)

CREATE TABLE questions(
	question_id SERIAL PRIMARY KEY,
	category VARCHAR(50),
	difficulty VARCHAR(50),
	question VARCHAR(300),
	correct_answer BOOLEAN,
	quiz_id SERIAL,
	created_at DATE NOT NULL DEFAULT CURRENT_DATE,
	FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
)

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(100)
)

CREATE TABLE user_quiz(
	id SERIAL PRIMARY KEY,
	user_id SERIAL,
	quiz_id SERIAL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
)

CREATE TABLE user_answers(
	id SERIAL PRIMARY KEY,
	answer BOOLEAN NOT NULL,
	user_id SERIAL,
	question_id SERIAL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
)