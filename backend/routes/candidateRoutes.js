const express = require('express')
const router = express.Router()
const {jwtAuthMiddleware,genToken} = require('../jwt')
const Candidate = require('../models/candidate')
const User = require('../models/user')

const checkAdminRole = async(userId)=>{
try{
    const user = await User.findById(userId);
    return user.role==='admin';
}catch(err){
    return false;
}
}

// POST route to add a candidate
router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!await checkAdminRole(req.user.id))
        return res.status(404).json({message:'U have not Admin Role'})

        //Assuming the request body contains the candidate data
        const data = req.body
       
        // create a new candidate using the mongoose model
        const newCandidate = new Candidate(data);

        // Save the data into the database
        const response = await newCandidate.save();
        console.log("Candidate data saved")
        res.status(200).json(response)


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})

    }

})

router.get('/profile',async(req,res)=>{
    try{
        const response = await Candidate.find();
      return   res.status(200).json(response)

    }catch(err){
        console.log(err)
    }

})
// Edit the user password by putting password in url
router.put('/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!checkAdminRole(req.user.id))
        return res.status(404).json({message:'U have not Admin Role'})
        //Extract the id from the url
       const candidateId = req.params.candidateId;
       const updatedCandidateData = req.body;
       
       const response = await Candidate.findByIdAndUpdate(candidateId,updatedCandidateData,{
           new:true,
           runValidators:true,
       })

       if(!response){
           return res.status(404).json({error:"Candidate not found"})
       }
       console.log("Data Updated")
       res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

// Delete person by putting id in url
router.delete('/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    try{
        const checkAdminRole = async(userId)=>{
            try{
                const user = await User.findById(userId);
                return user.role==='admin';
            }catch(err){
                return false;
            }
            }

        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndDelete(candidateId) 
        
        if(!response){
            return res.status(403).json({error:'Candidate Not found'})
        }
        console.log("data Deleted");
        res.status(200).json(response)

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

// let's start voting
router.post('/vote/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    // no admin can vote
    // user can only vote once

    candidateId = req.params.candidateId;
    userId= req.user.id

    try{
        // Find the candidate document with the specified candidateId
        const candidate = await Candidate.findById(candidateId)
        const user =  await User.findById(userId);
        if(!candidate){
            console.log(candidate)
            return res.status(404).json({error:'Candidate not found'})
        }
        if(!user){
            return res.status(404).json({error:'user not found'})
        }
        if(user.isVoted){
            res.status(404).json({error:'u have already voted'})
        }
        if(user.role=='admin'){
            res.status(404).json({error:'admin not allowed'})
        }

        // update the candidate document to record the vote
        candidate.votes.push({user:userId})
        candidate.voteCount++;
        await candidate.save();

        // update the user document
        user.isVoted=true;
        await user.save()
        
        res.status(200).json({message:'Vote Recorded successfully'})

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }

})

// get vote counts
router.get('/vote/voteCounts',async(req,res)=>{
    try{
        // find all candidates and sort them by votecount in descending order
         const candidate = await Candidate.find().sort({voteCount:'desc'})

         // map the candidates to only return their name and votecount
         const record = candidate.map((data)=>{
             return{
                 party:data.party,
                 voteCount:data.voteCount
             }
         })
         res.status(200).json(record)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})
module.exports = router;