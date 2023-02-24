const mongoose = require('mongoose');


const dbConnection = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to db successfully")
    }).catch((error) => {
        console.log(error.message)
    });
}

module.exports = dbConnection;