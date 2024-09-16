import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'

function Votingpage() {
    const [candidates,setCandidates] = useState([]);
    const [ isAdmin,setIsAdmin] = useState(false)
    const [user,setUser] = useState("")

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

   useEffect(()=>{
       const checkRole = async()=>{
           try{
               const token = localStorage.getItem('token')
               
               const response = await fetch('http://localhost:2005/user/checkRole',{
                   method:'GET',
                   headers:{
                   'Content-type':'application/json',
                   'Authorization':`Bearer ${token}`
                   }
               })
               console.log(response)
               const data = await response.json();
               console.log(data)
               if(data.role =='admin'){
               setIsAdmin(true)
               setUser("Admin")}
               else{
               setIsAdmin(false)
               setUser("Voter")}
           }catch(err){
               console.log("error")
               

           }
       }
       checkRole()
    },[])


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
            Welcome!! {user} on the Voting page <br/> 
            Have a Vote please <br/> <br/>
      {isAdmin?<button> <NavLink to="/admin/addCandidate">Add Candidate </NavLink></button>:""}
            <ul>
          {candidates.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.age} years old 
            {!isAdmin? <button id={user._id} onClick={handleVote}> Vote</button>: <>
            <button id={user._id}> Edit </button>
            <button id={user._id}> Delete </button> </>
            }
            </li>
          ))}
        </ul>
        </div>
    )
}

export default Votingpage
