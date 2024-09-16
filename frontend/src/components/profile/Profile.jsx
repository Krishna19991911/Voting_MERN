import React from 'react'
import {useState,useEffect} from 'react'

const Profile = () => {
    const [users, setUsers] = useState("");
  
    useEffect(() => {
      // Fetch data from the backend
      const fetchUsers = async () => {
        try {
          const token = await  localStorage.getItem('token');
          console.log(token)
          const response = await fetch('http://localhost:2005/user/profile',{
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
               'Authorization':`Bearer ${token}`
            }
          });
         // console.log(response)
          const data = await response.json();
      //   console.log(data)
         console.log(data.user)
         setUsers(data.user);
          console.log(users)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchUsers();
    },[]); // The empty array ensures this runs only once after the component mounts
  
    return (
      <div>
        
        <p className="font-bold text-center">
        {users? "Have a look on your Profile ...":"Please Login First"}
        </p>
        <div className="flex justify-center m-5">
        <table border="5" className="border border-gray-600 w-4/12 " style={{ textAlign: "left" }}>
        <tbody>
          <tr>
            <th style={{width:"200px"}}>Name</th>
           {users?<td >{users.name}</td>:<td></td>} 
          </tr>
          <tr>
            <th>Age</th>
           {users?<td>{users.age}</td>:<td></td>} 
          </tr>
          <tr>
            <th>Email</th>
           {users?<td>{users.email}</td>:<td></td>} 
          </tr>
          <tr>
            <th>Address</th>
           {users?<td>{users.address}</td>:<td></td>} 
          </tr>
          <tr>
            <th>Role</th>
           {users?<td>{users.role}</td>:<td></td>} 
          </tr>
        </tbody>
      </table>
      </div>
      </div>
    );
  };
  
  export default Profile;
