import React,{useState} from 'react'
import {Link,NavLink} from 'react-router-dom'

function Login() {
    const [loginData,setLoginData] = useState({
        aadharCardNumber:'',
        password:''
    }) 

    // handle when data changes
    const handleChange=(e)=>{
const {name,value}=e.target;
setLoginData(prevState=>({
    ...prevState,[name]:value
}))
    }

    // handle Login form
    const handleLogin=async(e)=>{
     e.preventDefault();
     // send data to backend
     try{
         const response = await fetch('http://localhost:2005/user/login',{
             method:'POST',
             headers:{
                 'Content-type':'application/json',
             },
             body:JSON.stringify(loginData)
         });
         if(response.ok){
             alert('login done')
             setLoginData({
                 aadharCardNumber:'',
                 password:''
             })
             window.location.href='http://localhost:5173/user/votingpage'
         }
         else{
             console.log("Wrong login details")
         }
     }catch(err){
         console.log('Error:',err)
     }
    }

    // handle form submission

     return (
        <div>
            <h1>Login page</h1>
            <form>
                Aadhar Card No. <input type="text" name="aadharCardNumber" 
                value={loginData.aadharCardNumber}
                onChange={handleChange}></input> <br/> <br/>
                Password <input type="text" name="password" 
                value={loginData.password}
                onChange={handleChange}></input> <br/> <br/>
                <button onClick={handleLogin}>Login</button>
                <button>                    
                    <NavLink to="/">Back to Home page</NavLink>
                    </button>
            </form>

           
        </div>
    )
}

export default Login
