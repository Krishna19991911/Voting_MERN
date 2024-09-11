import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="flex mb-5">
                <Link href="/">LOGO</Link>
                <ul>
                    <li>Dashboard</li>
                    <li>Voting</li>
                </ul>
            </nav>
            <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
        </div>
    )
}

export default Header
