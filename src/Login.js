
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './images/logo.png'

import InstallPWA from "./InstallPWA";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {


    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, []);

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
                })
                .catch((err) => console.log(err));
        }
    },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div className='bg-info' style={{ width: '100vw', height: '100vh' }}>

            <div className='container p-5  '>
                <div className='row justify-content-center'>
                    <div className='col-5 bg-white shadow rounded p-2 text-center'>
                        <img src={logo} className='w-25'></img>
                        <h2>Applicazione LABANOF</h2>
                        <div className='border border-bottom'></div>
                        <br />
                        <br />
                        {profile ? (
                            <div>
                                <div className='mb-5'>
                                    <img className="rounded" src={profile.picture} alt="user image" />
                                    <h3>{profile.name}</h3>
                                    <p>Email: {profile.email}</p>

                                    <button className='btn btn-danger' onClick={logOut}>Log out</button>
                                </div>
                                <div className='p-1'>
                                    <InstallPWA />
                                </div>
                            </div>

                        ) : (
                            <button className='btn btn-primary' onClick={() => login()}>Accedi con Google 🚀 </button>
                        )}
                    </div>
                </div>

            </div>



        </div>
    );
}
export default Login;