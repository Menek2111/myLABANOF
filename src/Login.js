
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
        setProfile(JSON.parse(sessionStorage.getItem('profile')));
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
                    sessionStorage.setItem('profile', JSON.stringify(res.data))
                    setProfile(res.data);
                    register(res.data)
                    navigate('/')
                })
                .catch((err) => console.log(err));
        }
    },
        [user, navigate]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        sessionStorage.removeItem('profile')
        setProfile(null);
    };

    return (
        <div className='bg-info' style={{ width: '100vw', height: '100vh' }}>
            <div className='container p-3 h-100'>
                <div className=' h-100 d-flex align-items-center justify-content-center'>
                    <div className='row bg-white shadow rounded text-center d-flex'>
                        <div className='col-lg col-sm-12'>
                            <img src={logo} style={{ height: '39vh' }} alt="logo"></img>
                        </div>
                        <div className='col-lg col-sm-12'>
                            <h2 className='p-3'>Applicazione LABANOF</h2>
                            <div className='border border-bottom'></div>
                            {profile ? (
                                <div>
                                    <p className='py-2 p-0 m-0 text-start'>Hai efettuato l'accesso come:</p>
                                    <div className='d-flex'>
                                        <div>
                                            <img className="rounded" src={profile.picture} alt="user" />
                                        </div>
                                        <div className='mx-2 text-start'>
                                            <h3>{profile.name}</h3>
                                            <p>Email: {profile.email}</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-danger' onClick={logOut}>Log out</button>
                                </div>

                            ) : (

                                <div>
                                    <p>Per poter utilizzare quest'applicazione è necessario effettuare l'accesso tramite Google</p>
                                    <p>Non possiedi un account Google?<br />Crealo ora gratuitamente: <a href='#'>Crea account Google</a></p>

                                    <button className='btn border btn-primary' onClick={() => login()}>
                                        <img className='bg-white p-1 rounded rounded-circle' src={google} style={{ height: '5vh' }} alt="google logo" /> Accedi con Google
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;