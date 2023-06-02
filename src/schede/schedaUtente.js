import React, { useState, useEffect } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConnectionManager from '../api/ConnectionManager';

import { useNavigate } from 'react-router-dom'

import LogOutButton from '../UI/logOutButton'
import ListaIndividui from '../component/listaIndividui';


function SchedaUtente() {
    const navigate = useNavigate();

    const profile = JSON.parse(localStorage.getItem('profile'))

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [individui, setIndividui] = useState()

    useEffect(() => {
        const getIndividuiByUser = async () => {
            let cm = new ConnectionManager();
            let res = await cm.getIndividuiByUser(JSON.stringify({ user: localStorage.getItem('userID') }));
            return res;
        }
        getIndividuiByUser().then(res => {
            console.log(res.results)
            switch (res.response) {
                case 'success':
                    setIndividui(res.results)
                    break
                case 'empty':
                    setIndividui(null)
                    break
                case 'error':
                    break
                default:
                    break
            }
        })
    }, []);

    return (
        <div className='px-4 py-2 containerPrincipale' >
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col h-100 bg-white w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <img className='rounded' src={profile.picture} style={{ height: '10vh' }} alt="individuo" />

                                        <div className='mx-2'>
                                            <h5>{profile.name}</h5>
                                            <p>{profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-2 d-flex flex-column justify-content-center'>
                                    <div className='d-flex justify-content-around'>
                                        <LogOutButton />
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '75vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {individui ? (
                                    <ListaIndividui individui={individui} navigator={navigate} />) : (<div></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaUtente;