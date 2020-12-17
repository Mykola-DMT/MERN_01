import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {

    return (
        <nav>

            {/*<div className="nav-wrapper indigo lighten-1" style={{padding: '0 2rem'}}>*/}
            <div className="nav-wrapper grey darken-2" style={{padding: '0 2rem'}}>
                <li className="brand-logo"><NavLink to="/home">Film Master</NavLink></li>
                {/*<span className="brand-logo">Film Master</span>*/}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/film">Films</NavLink></li>
                    <li><NavLink to="/film/add">Add Film</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
