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
             const data = await response.json();
            // console.log(data)
             alert('login done')
             localStorage.setItem('token',data.token)
             setLoginData({
                 aadharCardNumber:'',
                 password:''
             })
            // window.location.href='http://localhost:5173/user/votingpage'
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
    <p className="font-bold text-center">Login to continue...</p>
<div className="flex justify-center items-center mt-5 ">
    <div className="text-center w-3/12 border border-zinc-600 rounded-md h-auto mb-3">
    <div className="flex font-bold mb-5 bg-blue-600 h-14 items-center justify-center rounded-md text-white">LOGIN</div> 
    <div>
        <form className="flex flex-col">
<input type="text" placeholder="Aadhar Card Number" name="aadharCardNumber" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={loginData.aadharCardNumber} onChange={handleChange}></input>
<input type="text" placeholder="Password"  name="password" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={loginData.password} onChange={handleChange}></input>
<div className="items-center">
<button className="bg-orange-600 hover:bg-orange-400 text-white w-32 mt-3 rounded-xl h-12 mb-5 text-lg" onClick={handleLogin}>Login</button> </div>
        </form>
    </div>
    </div>
</div>

           
        </div>
    )
}

export default Login
