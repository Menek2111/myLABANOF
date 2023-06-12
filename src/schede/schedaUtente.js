import React, { useState, useEffect } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConnectionManager from '../api/ConnectionManager';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom'

import LogOutButton from '../UI/logOutButton'
import ListaIndividui from '../component/listaIndividui';

import Loading from '../UI/loading'

function SchedaUtente() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState()

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [individui, setIndividui] = useState([])

    const getIndividuiByUser = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividuiByUser(JSON.stringify({ user: sessionStorage.getItem('profiloSelezionato') }));
        return res;
    }

    const getUserInfo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getUserInfo(JSON.stringify({ id: sessionStorage.getItem('profiloSelezionato') }));
        return res;
    }

    useEffect(() => {
        getIndividuiByUser().then(res => {
            console.log('getIndividuiByUser', res.results)
            switch (res.response) {
                case 'success':
                    setIndividui(res.results)
                    break
                case 'empty':
                    setIndividui([])
                    break
                case 'error':
                    setIndividui([])
                    break
                default:
                    break
            }
        })

        getUserInfo().then(res => {
            console.log('getUserInfo', res)
            switch (res.response) {
                case 'success':
                    setProfile(res.results[0])
                    break
                case 'empty':
                    setProfile(null)
                    break
                case 'error':
                    setProfile(null)
                    break
                default:
                    break
            }
        })
    }, []);

    let checkLogOut = () => {
        if (profile.id == localStorage.getItem('userID')) {
            return <Button variant='outline-danger' disabled>Elimina profilo</Button>
        } else {
            return <div></div>
        }
    }

    let checkArrayIndividui = () => {
        if (individui.length == 0) {
            return <div className=' h-100 d-flex flex-column justify-content-center text-center'>Non sono presenti individui...</div>
        } else {
            return (individui ? (
                <ListaIndividui colonna="col-3" individui={individui} navigator={navigate} />) : (<Loading />))
        }
    }

    return (
        <div className='px-4 py-2 containerPrincipale' >
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col h-100 bg-white w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>

                                        {profile ? (<div className='d-flex'>
                                            <img referrerpolicy="no-referrer" className='rounded' src={profile.picture} style={{ height: '10vh' }} alt="individuo" />

                                            <div className='mx-2'>
                                                <h5>{profile.name}</h5>
                                                <p>{profile.email}</p>
                                            </div>
                                        </div>) : (<div></div>)}


                                    </div>
                                </div>
                                <div className='col-2 d-flex flex-column justify-content-center'>
                                    <div className='d-flex justify-content-around'>

                                        {profile ? (checkLogOut()) : (<div></div>)}

                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '75vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {checkArrayIndividui()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaUtente;