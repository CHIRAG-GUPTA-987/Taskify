import React, { useContext} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import UserContext from '../context/users/userContext';

const Navbar = props => {
    const navigateTo = useNavigate();
    const userContext = useContext(UserContext);
    const {authToken, setAuthToken} = userContext;
    const location = useLocation();
    const LogOut = async () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        props.showAlert('Logged out successfully', 'success');
        navigateTo('/Login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">i-Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'? "active": ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'? "active": ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {authToken===null && <div>
                            <Link className="btn btn-primary mx-1" to="/Login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/SignUp" role="button">Register</Link>
                        </div>}
                        {authToken!=null && <div className="btn btn-primary mx-1" onClick={LogOut} role="button">Logout</div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;