import React from 'react'
import { Link } from 'react-router-dom';


function NavBar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className='container'> 
                <Link className="navbar-brand" to="/">Book Club</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        
                        <li class="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="/logout">Logout</Link></li>
                            </ul>
                            </li>
                    </ul>
                    
                </div>
                </div>
            </nav>
        </div>


    )
}


export default NavBar