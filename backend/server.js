const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
const jwtAuthMiddleware = require('./jwt')

app.use(cors()); // Cross Origin Resource Sharing
app.use(express.json());

const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT =   2005;


app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)

app.listen(PORT,()=>{
    console.log("Listening on port",PORT)
})