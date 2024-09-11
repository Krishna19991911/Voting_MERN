const express = require('express')
const router = express.Router()
const {jwtAuthMiddleware,genToken} = require('../jwt')
const User = require('../models/user')

// User signup route(New user will be created)
router.post('/signup',async (req,res)=>{
    try{
        // Assuming the request body contains the person data
        const data = req.body;
     //   console.log(data.role)
        const checkAdmin = await User.find({role:'admin'})
      //  console.log(checkAdmin) 
         if(checkAdmin && (data.role=='admin')){
             console.log("Admin is already Existed")
          return res.status(500).json({error:'Admin already existed'})
         }
        // Create a new user documnet using the mongoose model
        const newUser = new User(data);
        

        // save the person to the database
        const response = await newUser.save();
         console.log("data saved")

         const payload = {
             id:response.id
         }
         console.log(JSON.stringify(payload))
         const token = genToken(payload)
         console.log("Token is:",token)

         res.status(200).json({response:response,token:token})
            }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})

    }
})

//Login Route(User will login to the syatem)
router.post('/login',async(req,res)=>{
    try{
        // Extract aadharCardNumber and password from request body
        const {aadharCardNumber,password} = req.body
        // Find the user by aadharCardNumber 
        const user = await User.findOne({aadharCardNumber:aadharCardNumber})
        console.log(user)

        // If user doesn't exist or password does not match , return error
        if(!user || !( await user.comparePassword(password) )){
            return res.status(404).json({error:'Error wrong AadharCardNumber or password'})
        }

        // generate tokens
        const payload={
            id:user.id
        }
        const token = genToken(payload)
        console.log("Login successfully")
        // return token as response
        res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:'Internal Server Error'})
    }
})

// profile route(User can see his/her profile)
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
try{
const userData = req.user;
const userId = userData.id;
const user = await User.findById(userId)
res.status(200).json({user})
}
catch(err){
    
    console.log(err)
    res.status(500).json({Error:'Internal Token Error'})
}
})

// Edit the user password by putting password in url
router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try{
        // extract the userid from token
        const userId = req.user;
        // extract the current and new password from body
        const{currentPassword,newPassword} = req.body
        // find the user by userid
        const user = await User.findById(userId)

        // if password does not match , return error 
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).josn({error:'Wrong Password'})
        }

        // update the new password
        user.password = newPassword;
        await user.save()
        
       
 // comment added
        console.log("password updated");
        res.status(200).json({message:'Password updated'})

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})


module.exports = router;