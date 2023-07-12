
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './images/myLabanof.PNG'
import google from './images/google-logo.png'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from './api/ConnectionManager';
import Form from 'react-bootstrap/Form';

import bg from './images/background/bg2.png'


function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    //PROVA OFFLINE
    const [isOnline, setIsOnline] = useState(navigator.onLine);


    //Prova clear chache
    // Function to clear complete cache data
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        alert('Complete Cache Cleared')
        window.location.reload(false)
    };

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
            localStorage.setItem('isOnline', true)
        }

        function offlineHandler() {
            setIsOnline(false);
            localStorage.setItem('isOnline', false)
            alert('Non è prensente la connessione di rete, myLabanof verrà avviato in modalità offline')
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);


        //Controllo se il token è ancora valido, se lo è impedisco la visualizzazione della pagina
        /*
        checkJWT().then(
            res => {
                if (res.response === 'success') {
                    navigate('/home')
                }
            }
        )*/

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
                    register(res.data).then(ress => {
                        if (ress.response === 'success') {
                            localStorage.setItem('userID', ress.userId.id)

                            if (ress.action == 'login') {
                                if (ress.userId.ruolo != 0) {
                                    localStorage.setItem('ruolo', ress.userId.ruolo)
                                    navigate('/home')
                                } else {
                                    alert('La richiesta di accesso è già stata effettuata, dovrai attendere la conferma da parte di un amministratore myLABANOF')
                                }
                            } else {
                                alert('è stata effettuata la richiesta di accesso per: ' + res.data.email)
                            }
                        }
                    })

                })
                .catch((err) => console.log(err));
        }

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    },
        [user, navigate]
    );

    // log out function to log the user out of google and set the profile array to null
    /*
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        sessionStorage.removeItem('access_token')
    };
    */

    const register = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.register(JSON.stringify(e));
        return res;
    }

    const checkJWT = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.checkJWT();
        console.log(res)
        return res;
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} >
            <div className='container p-3 h-100'>
                <div className=' h-100 d-flex align-items-center justify-content-center'>

                    <div className='row bg-white w-75 shadow rounded text-center d-flex'>
                        <div className='col-lg col-sm-12'>
                            <img className='my-3' src={logo} style={{ height: '25vh' }} alt="logo"></img>

                            <div>
                                <h4>Accedi a MyLabanof</h4>
                                {isOnline ? (
                                    <p>You are online.</p>
                                ) : (
                                    <p>You are offline. Please check your internet connection.</p>
                                )}
                                <button onClick={() => clearCacheData()} >
                                    Clear Cache Data</button>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla augue, imperdiet vel maximus id, mattis pulvinar massa. Proin non mi molestie, fermentum diam nec, malesuada sapien.
                                </p>
                            </div>


                            <div className='border border-bottom my-4'></div>
                            <p>Per poter utilizzare quest'applicazione è necessario effettuare l'accesso tramite Google</p>

                            <div className='pb-3 text-center justify-content-center d-flex'>
                                <div className='d-flex flex-column'>
                                    <button className='btn border btn-primary' onClick={() => login()}>
                                        <img className='bg-white p-1 rounded rounded-circle' src={google} style={{ height: '5vh' }} alt="google logo" /> Accedi con Google
                                    </button>
                                    <Form.Check // prettier-ignore
                                        className='pt-2'
                                        type="switch"
                                        id="custom-switch"
                                        label="Ricorda questo dispositivo"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </ div>
    );
}

export default Login;