import React from 'react'
import {Link,NavLink} from 'react-router-dom'

function Home() {
    return (
        <div>
            Welcome on the home page!!
            Aao to welcome jao to bhed kam 😂 <br/><br/>
            <button>
                <NavLink to="user/login">Login</NavLink>
            </button>
            <button>
                <NavLink to="user/signup">Signup</NavLink>
            </button>
            <button>
                <NavLink to="user/profile">Profile</NavLink>
            </button>
        </div>
    )
}

export default Home
