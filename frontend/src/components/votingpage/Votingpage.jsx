import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'

function Votingpage() {
    const [candidates,setCandidates] = useState([]);
    const [ isAdmin,setIsAdmin] = useState(false)
    const [user,setUser] = useState("")
    const [isLogin,setIsLogin] = useState(false)

    useEffect(()=>{
        const fetchCandidates = async()=>{
            try{
                const checkLogin = localStorage.getItem('token')
                if(checkLogin)
                setIsLogin(true)
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
            {isLogin?`Welcome!! on the Voting page`:"first login"}
            
      {isAdmin?<button> <NavLink to="/admin/addCandidate">Add Candidate </NavLink></button>:""}
            <ul>
          {candidates.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.age} years old 
            {!isAdmin? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" id={user._id} onClick={handleVote}> Vote</button>: <span>
            <button className="bg-green-600 hover:bg-orange-400 text-white w-20 mt-3 rounded-md h-8 text-lg"  id={user._id}> Edit </button>
            <button className="bg-red-600 hover:bg-orange-400 text-white w-20 mt-3 rounded-md ms-3 h-8 text-lg"  id={user._id}> Delete </button> </span>
            }
            </li>
          ))}
        </ul>
        </div>
    )
}

export default Votingpage
