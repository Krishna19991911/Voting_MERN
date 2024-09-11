const mongoose  = require('mongoose')
require('dotenv').config()

// Define the mongodb connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/voting' 

// set up MongoDB Connection
mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to local mongodb")
})
db.on('error',()=>{
    console.log("MongoDB Connection error")
})
db.on('disconnected',()=>{
    console.log("MongoDB disConnected")
})

// Export database connection 
module.exports = db