require('dotenv').config();
const express = require('express');
const cors = require('cors');

// database
const dbConnection = require('./db');
dbConnection();

// routesImport
const authRoute = require("./routes/auth")
const professionalRoute = require('./routes/professional')


// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin: "https://profolio-client.onrender.com"
}))
app.get("/",(req, res) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("API is Running");
})



// routes
app.use('/api/auth', authRoute)
app.use('/api/professional', professionalRoute)


app.listen(process.env.PORT, () => {
    console.log("Server Started")
})
