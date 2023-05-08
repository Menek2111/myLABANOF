
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './images/logo.png'
import google from './images/google-logo.png'
import { registerRequest } from './api/registerRequest';
import { useNavigate } from 'react-router-dom'

import InstallPWA from "./InstallPWA";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, []);

    const register = async (e) => {
        const data = await registerRequest(JSON.stringify(e));
        //alert(data.response)
        console.log(data)
    }

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    localStorage.setItem('profile', JSON.stringify(res.data))
                    setProfile(res.data);
                    register(res.data)
                    navigate('/')
                })
                .catch((err) => console.log(err));
        }
    },
        []
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        setProfile(null);
    };

    return (
        <div className='bg-info' style={{ width: '100vw', height: '100vh' }}>

            <div className='container p-3'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 bg-white shadow rounded p-2 text-center'>
                        <img src={logo} style={{ height: '10vh' }} alt="logo"></img>
                        <h2>Applicazione LABANOF</h2>
                        <div className='border border-bottom'></div>
                        <br />
                        <br />
                        {profile ? (
                            <div>
                                <div className='mb-5'>
                                    <img className="rounded" src={profile.picture} alt="user" />
                                    <h3>{profile.name}</h3>
                                    <p>Email: {profile.email}</p>

                                    <button className='btn btn-danger' onClick={logOut}>Log out</button>
                                </div>

                            </div>

                        ) : (
                            <button className='btn border' onClick={() => login()}>
                                <img src={google} style={{ height: '3vh' }} alt="google logo" /> Accedi con Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                <div className='col-lg-5'>
                    <InstallPWA />
                </div>
            </div>




        </div>
    );
}
export default Login;