import React,{useState,useContext} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {AuthContext} from '../contextAPI/AuthContext'

function Login() {
    const {handleLogin,handleChange,loginData} = useContext(AuthContext)

     return (
        <div>
    <p className="font-bold text-center">Login to continue...</p>
<div className="flex justify-center items-center mt-5 ">
    <div className="text-center w-3/12 border border-zinc-600 rounded-md h-auto mb-3">
    <div className="flex font-bold mb-5 bg-green-700 h-14 items-center justify-center rounded text-white">LOGIN</div> 
    <div>
        <form className="flex flex-col">
<input type="text" placeholder="Aadhar Card Number" name="aadharCardNumber" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={loginData.aadharCardNumber} onChange={handleChange}></input>
<input type="text" placeholder="Password"  name="password" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={loginData.password} onChange={handleChange}></input>
<div className="items-center">
<button className="bg-yellow-600 hover:bg-yellow-700 text-white w-32 mt-3 rounded-xl h-12 mb-5 text-lg" onClick={handleLogin}>Login</button> </div>
        </form>
    </div>
    </div>
</div>

           
        </div>
    )
}

export default Login
