
## API Reference

### The Base-URL for all api calls:

    https://quizz-api-test.herokuapp.com/

### Response format


Response is Json, structure is as follows:

    {
        "success": boolean | TRUE or FALSE,
        "data": mix | depend on the request,
        "error": mix | depend on the request (if any)
    }

## API calls

#### Create a quiz

```http
  POST /api/quiz
```

`name`: **Required**, quiz name.

#### Get all quizzes

```http
  GET /api/quiz
```

#### Edit a quiz

```http
  PUT /api/quiz
```

`name`: **Required**, quiz name.


#### Delete a quiz

```http
  DELETE /api/quiz/${id}
```

#### Submit a quiz

```http
  POST /api/quiz/submit
```
`quiz_id`: **Required**, number.

`user_id`: **Required**, number.

`answers`: **Required**, array of objects with the folling structure:

  - `question_id`: **Required**, number.
  - `answer`: **Required**, boolean.

#### Register a user

```http
  POST /api/user
```

`email`: **Required**, string.

#### Delete a user

```http
  DELETE api/user/${id}
```

#### Edit a user

```http
  PUT /api/user
```

`email`: **Required**, string.


#### Get a user

```http
  GET /api/user/${id}
```

#### Get all users

```http
  GET /api/user/
```


#### Get all questions  


```http
  GET /api/question/
```

#### Create a question

```http
  POST /api/question/
```

`category`: **Required**, string.

`difficulty`: **Required**, string.

`question`: **Required**, string.

`correct_answer`: **Required**, boolean.

`quiz_id`: **Required**, number.


#### Edit a question

```http
  PUT /api/question/
```

`category`: **Required**, string.

`difficulty`: **Required**, string.

`question`: **Required**, string.

`correct_answer`: **Required**, boolean.

`quiz_id`: **Required**, number.


#### Delete a question

```http
  DELETE /api/question/${id}
```
