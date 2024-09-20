import React,{useContext,useEffect} from 'react'
import {Link,NavLink} from 'react-router-dom'
import { GiVote } from "react-icons/gi";
import {AuthContext} from '../contextAPI/AuthContext'


function Header() {
    const {handleLogout} =  useContext(AuthContext)

    return (
        <div>
            <nav className="flex space-x-6 border-b mb-5 px-5 h-14 text-black-200 items-center font-bold font-mono bg-orange-200">
                <Link href="/"><GiVote  size={45}/></Link>
                <ul className="flex space-x-6">
                    <li className=" text-black-500 hover:text-zinc-500"> <button>
                <NavLink to="/">HOME</NavLink>
            </button></li>
                    <li className=" text-black-500 hover:text-zinc-500 cursor-pointer"> <button>
                <NavLink to="user/vote">VOTE</NavLink>
            </button></li>
                    <li className=" text-black-500 hover:text-zinc-500 cursor-pointer"> <button>
                <NavLink to="user/register">REGISTER</NavLink>
            </button></li>
                    <li className=" text-black-500 hover:text-zinc-500 cursor-pointer"> <button>
                <NavLink to="user/profile">PROFILE</NavLink>
            </button></li>
                    <li className=" text-black-500 hover:text-zinc-500 cursor-pointer"> <button>
                <NavLink to="user/login">LOGIN</NavLink>
            </button></li>
                    <li className=" text-black-500 hover:text-zinc-500 cursor-pointer"> <button onClick={handleLogout}>
                LOGOUT
            </button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
