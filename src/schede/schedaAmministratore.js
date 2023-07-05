import React, { useState, useEffect, version } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from "../api/ConnectionManager";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import skull from '../images/skull (3).jpg';
import colonna from '../images/colonna.png';

import { FiEdit2 } from "react-icons/fi";
import {
    FiTrash2, FiSave
} from "react-icons/fi";


import { IconContext } from "react-icons";
import { Tab, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'


function SchedaAmministratore() {
    const navigate = useNavigate();

    const getUserInfo = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: localStorage.getItem('userID') }
        let res = await cm.getUserInfo(JSON.stringify(params))
        return res
    }

    //CHIAMATE PER OTTENERE I DATI --------------------------------------------------
    const getPatologieGenerali = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getPatologieGenerali();
        return res;
    }
    const [listaPatologie, setListaPatologie] = useState([])

    const getCaratteriMetrici = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetrici();
        return res;
    }
    const [listaCaratteriMetrici, setListaCaratteriMetrici] = useState([])

    const getCaratteriNonMetrici = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriNonMetrici();
        return res;
    }
    const [listaCaratteriNonMetrici, setListaCaratteriNonMetrici] = useState([])

    const getUsersRegisterRequests = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getUsersRegisterRequests()
        return res
    }
    const [listaUtenti, setListaUtenti] = useState()

    //CHIAMATE PER OTTENERE I DATI (END)--------------------------------------------------

    let aggiorna = () => {
        getPatologieGenerali().then(res => {
            console.log('getPatologieGenerali', res)
            switch (res.response) {
                case 'success':
                    setListaPatologie(res.results)
                    break
                case 'empty':
                    setListaPatologie([])
                    break
                case 'error':
                    setListaPatologie([])
                    break
                default:
                    break
            }
        })
        getCaratteriMetrici().then(res => {
            console.log('getCaratteriMetrici', res)
            switch (res.response) {
                case 'success':
                    setListaCaratteriMetrici(res.results)
                    break
                case 'empty':
                    setListaCaratteriMetrici([])
                    break
                case 'error':
                    setListaCaratteriMetrici([])
                    break
                default:
                    break
            }
        })
        getCaratteriNonMetrici().then(res => {
            console.log('getCaratteriNonMetrici', res)
            switch (res.response) {
                case 'success':
                    setListaCaratteriNonMetrici(res.results)
                    break
                case 'empty':
                    setListaCaratteriNonMetrici([])
                    break
                case 'error':
                    setListaCaratteriNonMetrici([])
                    break
                default:
                    break
            }
        })
        getUsersRegisterRequests().then(res => {
            if (res.response == 'success') {
                setListaUtenti(res.results)
            }
        })
    }

    //USE EFFECT -------------------------------------------------------------------------
    useEffect(() => {
        getUserInfo().then(res => {
            if (res.response == 'success') {
                if (res.results[0].ruolo != 3) {
                    navigate('/home')
                }
            }
        })
        aggiorna()
    }, [])
    //USE EFFECT (END) -------------------------------------------------------------------

    //RENDER SCHEDA ----------------------------------------------------------------------
    return (
        <div className='px-4 py-2 containerPrincipale' >
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col h-100 bg-white w-100 rounded border'>
                            <div className='row  border-bottom rounded-top justify-content-between'>
                                <div className='col py-2 d-flex'>
                                    <div className='w-100'>
                                        <h1 className='text-center'>Scheda amministratore</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='row justify-content-start p-2' style={{ overflowY: 'scroll', height: '80vh' }}>
                                    {/*listaPatologie ? (
                                        <>
                                            <Patologie odontoiatrico={false} col="col-2" patologie={listaPatologie} />
                                            <Patologie odontoiatrico={true} col="col-2" patologie={listaPatologie} />
                                        </>
                                    ) : (<></>)*/}

                                    {/*listaCaratteriMetrici ? (<Caratteri caratteri={listaCaratteriMetrici} col="col-2" />) : (<></>)*/}

                                    {listaUtenti ? (<RichiesteRegistrazione col='col-12' listaUtenti={listaUtenti} callback={aggiorna} />
                                    ) : (<></>)}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
    //RENDER SCHEDA (END) ----------------------------------------------------------------
}

function Patologie(props) {

    let isOdontoiatrica = (patologia) => {
        if (patologia.odontoiatrico == 1) {
            return (<tr>
                <td>{patologia.nome}</td>
            </tr>)
        }
    }

    if (props.odontoiatrico) {
        return (<div className={props.col}>
            <Table hover striped size='sm' bordered >
                <thead>
                    <tr>
                        <th>Patologie odontoiatriche</th>
                    </tr>
                </thead>
                <tbody>
                    {props.patologie.map(patologia =>
                        isOdontoiatrica(patologia)
                    )}
                </tbody>
            </Table>
        </div>)
    } else {
        return (<div className={props.col}>
            <Table hover striped size='sm' bordered >
                <thead>
                    <tr>
                        <th>Patologia</th>
                    </tr>
                </thead>
                <tbody>
                    {props.patologie.map(patologia =>
                        <tr>
                            <td>{patologia.nome}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>)
    }



}

function Caratteri(props) {

    return <div className={props.col}>

        <Table hover striped size='sm' bordered >
            <thead>
                <tr>
                    <th>Caratteri metrici</th>
                </tr>
            </thead>
            <tbody>
                {props.caratteri.map((carattere => <tr>
                    <td>
                        {carattere.nome}
                    </td>
                </tr>))}
            </tbody>
        </Table>

    </div>
}

function RichiesteRegistrazione(props) {

    function checkPermission(utente, i) {
        if (utente.ruolo == i) {
            return <RigaAccount utente={utente} callback={props.callback} />
        } else {
            return <></>
        }
    }


    return (
        <div className={props.col}>

            <h5 className='border-bottom mb-2'>Richieste di accesso</h5>
            <Table striped size='sm' bordered>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaUtenti.map(utente =>
                            checkPermission(utente, 0)
                        )
                    }
                </tbody>
            </Table>

            <div className='my-5'></div>


            <h5 className='border-bottom mb-2'>Utenti in sola lettura</h5>
            <Table striped size='sm' bordered>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaUtenti.map(utente =>
                            checkPermission(utente, 1)
                        )
                    }
                </tbody>
            </Table>


            <div className='my-5'></div>


            <h5 className='border-bottom mb-2'>Utenti in lettura e scrittura</h5>
            <Table striped size='sm' bordered>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaUtenti.map(utente =>
                            checkPermission(utente, 2)
                        )
                    }
                </tbody>
            </Table>

            <div className='my-5'></div>


            <h5 className='border-bottom mb-2'>Amministratori</h5>
            <Table striped size='sm' bordered>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaUtenti.map(utente =>
                            checkPermission(utente, 3)
                        )
                    }
                </tbody>
            </Table>
        </div>
    )

}

function RigaAccount(props) {
    const editRuoloAccountById = async (e) => {
        let cm = new ConnectionManager();
        var params = { ruolo: ruolo, id: props.utente.id }
        let res = await cm.editRuoloAccountById(JSON.stringify(params))
        return res
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        editRuoloAccountById().then(res => {
            if (res.response == 'success') {
                props.callback()
            }
        })
    }

    const [ruolo, setRuolo] = useState()

    let isAdmin = () => {
        if (props.utente.ruolo != 3) {
            return (<Form className='d-flex' onSubmit={handleSubmit}>
                <Form.Select className='mx-2' required onChange={(e) => setRuolo(e.target.value)} defaultValue={props.utente.ruolo}>
                    <option></option>
                    <option value='1'>Solo lettura</option>
                    <option value='2'>Lettura e scrittura</option>
                    <option value='3'>Admin</option>
                </Form.Select>
                <Button type='submit'>Accetta</Button>
                <Button variant='outline-danger' className='mx-2'>Rifiuta</Button>
            </Form>)
        } else {
            return (<Form className='d-flex' onSubmit={handleSubmit} >
                <Form.Select className='mx-2' disabled required onChange={(e) => setRuolo(e.target.value)} defaultValue={props.utente.ruolo}>
                    <option></option>
                    <option value='1'>Solo lettura</option>
                    <option value='2'>Lettura e scrittura</option>
                    <option value='3'>Admin</option>
                </Form.Select>
            </Form>)
        }
    }

    return (<tr>
        <td>{props.utente.name}</td>
        <td>{props.utente.email}</td>

        <td>
            {isAdmin()}
        </td>
    </tr>)
}

export default SchedaAmministratore;