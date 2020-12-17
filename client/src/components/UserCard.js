import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const UserCard = ({ user }) => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <div className="row">
            <div className="col s12 m6">
                {/*<div className="card indigo lighten-3">*/}
                <div className="card blue-grey lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">{user.email}</span>



                    </div>
                    <div className="card-action grey darken-2">
                        {/*<Link to={`/changePassword`}>Change Password</Link>*/}
                        <a href="/" onClick={logoutHandler} style={{marginRight:"70%"}}>Logout</a>

                        <Link to={'/home'}>Back</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
