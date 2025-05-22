const mongoose = require('mongoose');

require('dotenv').config();
const connection = mongoose.connect(process.env.MONGO_URI)

connection.then(() => {
    console.log('Connected To Database')
})
connection.catch((error) => {
    console.error(error);
})


module.exports = connection;