import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'

function Votingpage() {
    const [candidates,setCandidates] = useState([]);

    useEffect(()=>{
        const fetchCandidates = async()=>{
            try{
                const response = await fetch('http://localhost:2005/candidate/profile')
                const data = await response.json()
                 //console.log(data)
                
                setCandidates(data)

            }catch(err){
                console.log("Error:",err)
            }
        }
        fetchCandidates()
    },[]);

    // handle votes
    const handleVote=async(e)=>{
        const candidateId=e.target.id;
        const response = await fetch(`http://localhost:2005/candidate/vote/${candidateId}`,{
        method:'POST',
        headers:{
           'Content-Type':'application/json',
              },
        body:JSON.stringify({vote:true})})
    }
    return (
        <div>
            Welcome!! Userrr on the Voting page <br/> 
            Have a Vote please <br/> <br/>
           <button> <NavLink to="/admin/addCandidate">Add Candidate </NavLink></button>
            <ul>
          {candidates.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.age} years old 
              <button id={user._id} onClick={handleVote}> Vote</button>
            </li>
          ))}
        </ul>
        </div>
    )
}

export default Votingpage
