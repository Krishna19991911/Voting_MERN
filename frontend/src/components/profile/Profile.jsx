import React from 'react'
import {useState,useEffect} from 'react'

const Profile = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch data from the backend
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:2005/user/profile');
         // console.log(response)
          const data = await response.json();
         console.log(data)
          setUsers(data.user);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchUsers();
    }, []); // The empty array ensures this runs only once after the component mounts
  
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.age} years old
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Profile;
