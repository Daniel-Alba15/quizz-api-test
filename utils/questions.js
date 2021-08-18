const axios = require('axios');

exports.getQuestions = async () => {
    try {
        const { data } = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
        return data;
    } catch (err) {
        console.error(err);
    }
}