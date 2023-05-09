import React, { useState, useEffect } from 'react';
import individuo from '../images/individuo.jpg'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutButton from '../UI/logOutButton';

function PaginaUtente() {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        setProfile(JSON.parse(sessionStorage.getItem('profile')));
    }, []);

    return (
        <div>
            {profile ? (
                <div className='container bg-white mt-3 rounded'>
                    <div className='row justify-content-center'>
                        <div className='col'>
                            <div className='text-center p-3 d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <img className="rounded" style={{ height: '10vh', width: 'auto' }} src={profile.picture} alt="user" />
                                    <div className='mx-3'>
                                        <h3>{profile.name}</h3>
                                        <p className='p-0 m-0'>{profile.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <LogOutButton />
                                </div>
                            </div>
                            <div className='border border-bottom'></div>
                            <div className='row p-2'>
                                <h6>I miei individui:</h6>
                                <div className='col-4 text-center p-1'>
                                    <div className='border d-flex rounded p-1'>
                                        <img className="rounded" style={{ height: '15vh', width: 'auto' }} src={individuo} alt="user" />
                                        <div className='d-flex flex-column text-start'>
                                            <span>👤 Creatore: Luca Bergami</span>
                                            <span>📅 Data creazione: 08/05/2023</span>
                                            <span>✏️ Ultima modifica: 08/05/2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    NO
                </div>
            )}
        </div>
    );
}
export default PaginaUtente;