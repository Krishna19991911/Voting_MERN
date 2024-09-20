import React, { useEffect, useState ,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {AuthContext} from '../contextAPI/AuthContext'


function Votingpage() {
    const {isLogin} = useContext(AuthContext)
    const [candidates, setCandidates] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser] = useState("")

    const columns=[
        {
            name:'SNo.',
            selector:row=>row.id,
            cell:(id,row)=>row+1,
            sortable:true
        },
        {
            name:'Party Name',
            selector:row=>row.party,
            sortable:true
        },
        {
            name:'Candidate Name',
            selector:row=>row.name,
            sortable:true
        },
        {
            name:'Actions',
            sortable:true,
            cell:row=>(isLogin?.isAdmin?
                <div>
                    <button className="bg-green-600 hover:bg-green-400 text-white w-16 me-3  rounded-md h-8 text-lg" id={user._id}> Edit </button>
                    <button className="bg-red-600 hover:bg-red-400 text-white w-16  rounded-md h-8 text-lg" id={user._id}> Delete </button>
                </div>:
                (isLogin?  <button className="bg-blue-500 hover:bg-blue-300 text-white w-16 rounded-md h-8 text-lg" id={user._id}> Vote </button> : " ")
              
            )
        }

    ];

    useEffect(() => {
        const fetchCandidates = async () => {
            try {              
                const response = await fetch('http://localhost:2005/candidate/profile')
                const data = await response.json()
                //console.log(data)

                setCandidates(data)

            } catch (err) {
                console.log("Error:", err)
            }
        }
        fetchCandidates()
    }, []);

    // Check user whether it is Admin or not
    useEffect(() => {
        const checkRole = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:2005/user/checkRole', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json();
                if (data.role == 'admin') {
                    setIsAdmin(true)
                    setUser("Admin")
                }
                else {
                    setIsAdmin(false)
                    setUser("Voter")
                }
            } catch (err) {
                console.log("error")
            }
        }
        checkRole()
    }, [])


    // handle votes
    const handleVote = async (e) => {
        const candidateId = e.target.id;
        const response = await fetch(`http://localhost:2005/candidate/vote/${candidateId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vote: true })
        })
    }

    return (
        <div>
            {isLogin ? "" : "Please First Login to continue"}

            <p className="font-bold text-center">Welcome on the Voting
    page...</p>
        <div className="bg-yellow-100 p-1 mt-1 text-center w-1/2 m-auto">"Make your voice count and be part of shaping the future! Our voting platform is simple, secure, and accessible to everyone. Cast your vote in just a few clicks, and ensure your opinions are heard. Join thousands of others in making a difference today—your vote matters!"</div>
        {/* Admin add candidates button */}
         <div className="text-center mt-5 ">   {isAdmin ? <button className="bg-yellow-700 h-10 p-2 hover:bg-yellow-800 hover:scale-105  rounded  text-white"> <NavLink to="/admin/addCandidate">Add Candidate </NavLink></button> : <button className="bg-yellow-700  h-10 p-2 hover:bg-yellow-800 hover:scale-105  rounded  text-white"> <NavLink to="">Check LeaderBoard </NavLink></button>} </div>


            {/* Candidates list */}
            <div className=" w-full m-6">
                <div className="w-2/3 p-2  m-auto ">
<DataTable columns={columns} 
data ={candidates}

/>
                </div>
            </div>

    
        </div>
    )
}

export default Votingpage
