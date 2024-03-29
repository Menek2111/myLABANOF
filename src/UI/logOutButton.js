import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogOutButton() {

    const navigate = useNavigate();

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        localStorage.removeItem('userID')
        sessionStorage.removeItem('access_token')
        navigate('/')
    };

    return (
        <button className='btn btn-danger' onClick={() => logOut()}>Log out</button>
    );
}
export default LogOutButton;