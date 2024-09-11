const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next)=>{

    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'})
// Extract the jwt token from the request headers
const token = req.headers.authorization.split(' ')[1];
if(!token) return status(401).json({error:'Unauthorized'})
try{
    // Verify the jwt token
    const decoded = jwt.verify(token,'12345');
    // Attach user information to the request object
    req.user = decoded;
    next();
}
catch(err){
    console.log(err);
    res.status(401).json({error:'Invalid token'})
}
}

// Function to generate jwt token
const genToken = (userData)=>{
    // Generate a new jwt token using user data
    return jwt.sign(userData,'12345',{expiresIn:30000})
}

module.exports = {jwtAuthMiddleware,genToken}