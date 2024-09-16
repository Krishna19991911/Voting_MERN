const mongoose  = require('mongoose')
//require('dotenv').config()

// Define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/voting' 

// set up MongoDB Connection
mongoose.connect(mongoURL)

const db = mongoose.connection;
// mongoose.connection.close()

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