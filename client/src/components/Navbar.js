import React, {useContext} from 'react'
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHendler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1">
                <a href="/" className="brand-logo">pips</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/create" >Создать</Link></li>
                    <li><Link to="/links">Ссылки</Link></li>
                    <li><a href="/" onClick={logoutHendler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}