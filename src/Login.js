
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './images/logo.png'
import google from './images/google-logo.png'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from './api/ConnectionManager';

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {

        //Controllo se il token è ancora valido, se lo è impedisco la visualizzazione della pagina
        checkJWT().then(
            res => {
                if (res.response == 'success') {
                    navigate('/home')
                }
            }
        )

        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    localStorage.setItem('profile', JSON.stringify(res.data))
                    sessionStorage.setItem('access_token', user.access_token)
                    register(res.data)
                    navigate('/home')
                })
                .catch((err) => console.log(err));
        }
    },
        [user, navigate]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        sessionStorage.removeItem('access_token')
    };

    const register = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.register(JSON.stringify(e));
        console.log(res)
        return res;
    }

    const checkJWT = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.checkJWT();
        console.log(res)
        return res;
    }

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

                            <div>
                                <p>Per poter utilizzare quest'applicazione è necessario effettuare l'accesso tramite Google</p>
                                <p>Non possiedi un account Google?<br />Crealo ora gratuitamente: <a href='#'>Crea account Google</a></p>

                                <button className='btn border btn-primary' onClick={() => login()}>
                                    <img className='bg-white p-1 rounded rounded-circle' src={google} style={{ height: '5vh' }} alt="google logo" /> Accedi con Google
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;