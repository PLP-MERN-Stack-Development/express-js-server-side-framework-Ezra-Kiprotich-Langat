// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const authrouter = require("./routes/products.js")
const requestLoggerMiddleware = require("./middlewares/requestLoggerMiddleware.js")
const authenticationMiddleware = require("./middlewares/authenticationMiddleware.js")
const validationMiddleware = require("./middlewares/validationMiddleware.js")

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/', authrouter)
app.use(requestLoggerMiddleware);


app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`)
})