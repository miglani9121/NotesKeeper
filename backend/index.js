const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const noteRoutes = require("./routes/noteRoutes")

const app = express();
dotenv.config();
connectDB();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running")
})
app.listen(5000, console.log("Hello World"))

app.use('/api/users', userRoutes) 
app.use('/api/notes', noteRoutes) 
app.use(notFound)
app.use(errorHandler)