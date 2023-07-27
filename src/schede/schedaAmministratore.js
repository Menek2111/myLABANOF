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
import ModalUploadImage from '../UI/modalUploadImage';
import ListaImmagini from '../component/listaImmagini';



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

    const getClassiPatologie = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getClassiPatologie();
        return res;
    }
    const [listaClassiPatologie, setListaClassiPatologie] = useState([])

    const getTraumaGenerale = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTraumaGenerale();
        return res;
    }
    const [listaTraumi, setListaTraumi] = useState([])

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


    const getAllOssa = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllOssa()
        return res
    }
    const [ossa, setOssa] = useState()
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
        getTraumaGenerale().then(res => {
            console.log('getTraumaGenerale', res)
            switch (res.response) {
                case 'success':
                    setListaTraumi(res.results)
                    break
                case 'empty':
                    setListaTraumi([])
                    break
                case 'error':
                    setListaTraumi([])
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
        getClassiPatologie().then(res => {
            if (res.response == 'success') {
                setListaClassiPatologie(res.results)
            }
        })
        getAllOssa().then(res => {
            console.log('getallossa', res)
            if (res.response == 'success') {
                setOssa(res.results)
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


                                    <div className='py-2 border rounded' style={{ backgroundColor: '#fbfcfe' }} >
                                        <h3 className='border-bottom mb-3'>Richieste di accesso e gestione ruoli</h3>
                                        <div className='border rounded p-3'>
                                            {listaUtenti ? (<RichiesteRegistrazione col='col-12' listaUtenti={listaUtenti} callback={aggiorna} />
                                            ) : (<></>)}
                                        </div>

                                    </div>

                                    <div className='mt-5 py-2 border rounded' style={{ backgroundColor: '#fbfcfe' }}>
                                        <h3 className='border-bottom mb-3'>Gestione patologie</h3>
                                        <div className='row'>
                                            <Patologie col="col-6" patologie={listaPatologie} odontoiatrico={false} callback={aggiorna} />
                                            <Patologie col="col-6" patologie={listaPatologie} odontoiatrico={true} callback={aggiorna} />
                                            {listaClassiPatologie ? (<ClassiPatologie col="col-12 mt-5" classi={listaClassiPatologie} callback={aggiorna} />) : (<></>)}
                                        </div>
                                    </div>

                                    <div className='mt-5 py-2 border rounded' style={{ backgroundColor: '#fbfcfe' }}>
                                        <h3 className='border-bottom mb-3'>Gestione traumi</h3>
                                        <div className='row'>
                                            <Traumi col='col-12' traumi={listaTraumi} callback={aggiorna} />
                                        </div>
                                    </div>


                                    <div className='mt-5 py-2 border rounded' style={{ backgroundColor: '#fbfcfe' }}>
                                        <h3 className='border-bottom mb-3'>Gestione caratteri</h3>

                                        <div className='row'>

                                            <h4>Cranio</h4>
                                            <Caratteri col='col-6' caratteri={listaCaratteriMetrici} m={true} distrettoNome='Cranio' callback={aggiorna} />
                                            <Caratteri col='col-6' caratteri={listaCaratteriNonMetrici} m={false} distrettoNome='Cranio' callback={aggiorna} />

                                            <h4>Colonna</h4>
                                            <Caratteri col='col-6' caratteri={listaCaratteriMetrici} m={true} distrettoNome='Colonna' callback={aggiorna} />
                                            <Caratteri col='col-6' caratteri={listaCaratteriNonMetrici} m={false} distrettoNome='Colonna' callback={aggiorna} />


                                            <h4>Torace</h4>
                                            <Caratteri col='col-6' caratteri={listaCaratteriMetrici} m={true} distrettoNome='Torace' callback={aggiorna} />
                                            <Caratteri col='col-6' caratteri={listaCaratteriNonMetrici} m={false} distrettoNome='Torace' callback={aggiorna} />


                                            <h4>Arti Superiori</h4>
                                            <Caratteri col='col-6' caratteri={listaCaratteriMetrici} m={true} distrettoNome='Arti superiori' callback={aggiorna} />
                                            <Caratteri col='col-6' caratteri={listaCaratteriNonMetrici} m={false} distrettoNome='Arti superiori' callback={aggiorna} />

                                            <h4>Arti Inferiori</h4>
                                            <Caratteri col='col-6' caratteri={listaCaratteriMetrici} m={true} distrettoNome='Arti inferiori' callback={aggiorna} />
                                            <Caratteri col='col-6' caratteri={listaCaratteriNonMetrici} m={false} distrettoNome='Arti inferiori' callback={aggiorna} />

                                        </div>
                                    </div>

                                    <div className='mt-5 py-2 border rounded' style={{ backgroundColor: '#fbfcfe' }}>
                                        <h3 className='border-bottom mb-3'>Gestione ossa</h3>
                                        <div className='row'>
                                            {ossa ? (<Ossa col='col-12' ossa={ossa} callback={aggiorna} />) : (<></>)}
                                        </div>
                                    </div>

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

    const createPatologiaGeneraleEPerDistretto = async (e) => {
        let cm = new ConnectionManager();
        var params
        if (props.odontoiatrico) {
            params = { patologia: nome, odontoiatrico: 1 }
        } else {
            params = { patologia: nome, odontoiatrico: 0 }
        }

        let res = await cm.createPatologiaGeneraleEPerDistretto(JSON.stringify(params))
        console.log('createPatologiaGeneraleEPerDistretto', res)
        props.callback()
    }
    const [nome, setNome] = useState()

    let isOdontoiatrica = (patologia) => {
        if (patologia.odontoiatrico == 1) {
            return <PatologiaGenerale patologia={patologia} callback={props.callback} />
        }
    }
    let isNotOdontoiatrica = (patologia) => {
        if (patologia.odontoiatrico == 0) {
            return <PatologiaGenerale patologia={patologia} callback={props.callback} />
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
                    <tr>
                        <td className='d-flex mt-4'>
                            <Form onSubmit={createPatologiaGeneraleEPerDistretto} className='d-flex w-100'>
                                <input className='form-control' onChange={(e) => setNome(e.target.value)} placeholder='Nome patologia...' type='text' required />
                                <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                            </Form>
                        </td>
                    </tr>
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
                    {props.patologie.map(patologia => isNotOdontoiatrica(patologia)
                    )}
                    <tr>
                        <td className='d-flex mt-4'>
                            <Form onSubmit={createPatologiaGeneraleEPerDistretto} className='d-flex w-100'>
                                <input className='form-control' onChange={(e) => setNome(e.target.value)} placeholder='Nome patologia...' type='text' required />
                                <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                            </Form>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }

}
function PatologiaGenerale(props) {
    const editPatologiaGenerale = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.patologia.id, nome: nome }
        let res = await cm.editPatologiaGenerale(JSON.stringify(params))
        console.log('editPatologiaGenerale', res)
        props.callback()
    }
    const [nome, setNome] = useState(props.patologia.nome)

    const deletePatologiaGeneraleEPerDistretto = async (e) => {

        if (window.confirm('sei sicurio?')) {
            let cm = new ConnectionManager();
            var params = { id: props.patologia.id }
            let res = await cm.deletePatologiaGeneraleEPerDistretto(JSON.stringify(params))
            console.log('editPatologiaGenerale', res)
            props.callback()
        }
    }

    return (<tr>
        <td className='d-flex'>
            <input className='form-control' type='text' defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
            <button className='btn btn-primary mx-1' onClick={() => editPatologiaGenerale()}><FiSave /></button>
            <button className='btn btn-outline-danger mx-1' onClick={() => deletePatologiaGeneraleEPerDistretto()}><FiTrash2 /></button>
        </td>
    </tr>)
}
function Traumi(props) {

    const createTraumaGenerale = async (e) => {
        let cm = new ConnectionManager();
        var params = { trauma: nome }

        let res = await cm.createTraumaGenerale(JSON.stringify(params))
        console.log('createTraumaGenerale', res)
        props.callback()
        document.getElementById('formTrauma').value = ''
    }
    const [nome, setNome] = useState()


    return (<div className={props.col}>
        <Table hover striped size='sm' bordered>
            <thead>
                <tr>
                    <th>Traumi</th>
                </tr>
            </thead>
            <tbody >
                {props.traumi.map(trauma =>

                    <TraumaGenerale trauma={trauma} callback={props.callback} />

                )}
                <tr>
                    <td className='d-flex mt-4'>
                        <Form className='d-flex w-100' onSubmit={createTraumaGenerale}>
                            <input className='form-control' id="formTrauma" placeholder='Nome trauma...' type='text' required onChange={(e) => setNome(e.target.value)} />
                            <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                        </Form>
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>)
}
function TraumaGenerale(props) {

    const editTraumaGenerale = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.trauma.id, nome: nome }
        let res = await cm.editTraumaGenerale(JSON.stringify(params))
        console.log('editPatologiaGenerale', res)
        props.callback()
    }
    const [nome, setNome] = useState(props.trauma.nome)

    const deleteTraumaGenerale = async (e) => {
        if (window.confirm('sei sicurio?')) {
            let cm = new ConnectionManager();
            var params = { id: props.trauma.id }
            let res = await cm.deleteTraumaGenerale(JSON.stringify(params))
            console.log('deleteTraumaGenerale', res)
            props.callback()
        }
    }

    return (<tr className='w-100'>
        <td className='d-flex w-100'>
            <input className='form-control' type='text' defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
            <button className='btn btn-primary mx-1' onClick={() => editTraumaGenerale()}><FiSave /></button>
            <button className='btn btn-outline-danger mx-1' onClick={() => deleteTraumaGenerale()}><FiTrash2 /></button>
        </td>
    </tr>)
}
function Caratteri(props) {

    const createCarattereMetricoGeneraleEPerDistretto = async (e) => {
        e.preventDefault()

        let cm = new ConnectionManager();
        var params = { nome: nome, distretto: getDistrettoId(props.distrettoNome) }
        let res = await cm.createCarattereMetricoGeneraleEPerDistretto(JSON.stringify(params))
        console.log('createCarattereMetricoGenerale', res)
        props.callback()
        document.getElementById('formCarattereMetrico').value = ''
    }
    const createCarattereNonMetricoGeneraleEPerDistretto = async (e) => {
        e.preventDefault()
        let cm = new ConnectionManager();
        var params = { nome: nome, distretto: getDistrettoId(props.distrettoNome) }
        let res = await cm.createCarattereNonMetricoGeneraleEPerDistretto(JSON.stringify(params))
        console.log('createCarattereNonMetricoGeneraleEPerDistretto', res)
        props.callback()
        document.getElementById('formCarattereNonMetrico').value = ''
    }
    const [nome, setNome] = useState()

    let getDistrettoId = (nome) => {
        switch (nome) {
            case 'Cranio':
                return 1
            case 'Denti':
                return 2
            case 'Colonna':
                return 3
            case 'Torace':
                return 4
            case 'Arti superiori':
                return 5
            case 'Arti inferiori':
                return 6
            case 'NMR':
                return 7
            default:
                return null
        }
    }

    let getCaratteriByDistretto = () => {
        let array = []

        props.caratteri.map(car => {
            if (car.distrettoNome == props.distrettoNome) {
                array.push(car)
            }
        })

        return array.map((carattere => <CarattereGenerale carattere={carattere} m={props.m} callback={props.callback} />))
    }

    return <div className={props.col}>
        <Table hover striped size='sm' bordered >
            <thead>
                <tr>
                    <th>{props.m ? (<>Caratteri metrici</>) : (<>Caratteri non metrici</>)}</th>
                </tr>
            </thead>
            <tbody>
                {getCaratteriByDistretto()}
                <tr>
                    <td className='d-flex mt-4'>

                        {props.m ? (
                            <Form className='d-flex w-100' onSubmit={createCarattereMetricoGeneraleEPerDistretto}>
                                <input className='form-control' id="formCarattereMetrico" placeholder='Nome carattere metrico...' type='text' required onChange={(e) => setNome(e.target.value)} />
                                <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                            </Form>
                        ) : (
                            <Form className='d-flex w-100' onSubmit={createCarattereNonMetricoGeneraleEPerDistretto}>
                                <input className='form-control' id="formCarattereNonMetrico" placeholder='Nome carattere non metrico...' type='text' required onChange={(e) => setNome(e.target.value)} />
                                <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                            </Form>
                        )}

                    </td>
                </tr>
            </tbody>
        </Table>

    </div>
}
function CarattereGenerale(props) {
    const editCarattereMetricoGenerale = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id, nome: nome }
        let res = await cm.editCarattereMetricoGenerale(JSON.stringify(params))
        console.log('editCarattereMetricoGenerale', res)
    }

    const editCarattereNonMetricoGenerale = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id, nome: nome }
        let res = await cm.editCarattereNonMetricoGenerale(JSON.stringify(params))
        console.log('editCarattereNonMetricoGenerale', res)
    }

    const deleteCarattereMetricoGeneraleEPerDistretto = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id }
        let res = await cm.deleteCarattereMetricoGeneraleEPerDistretto(JSON.stringify(params))
        console.log('deleteCarattereMetricoGeneraleEPerDistretto', res)
        props.callback()
    }
    const deleteCarattereNonMetricoGeneraleEPerDistretto = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id }
        let res = await cm.deleteCarattereNonMetricoGeneraleEPerDistretto(JSON.stringify(params))
        console.log('deleteCarattereNonMetricoGeneraleEPerDistretto', res)
        props.callback()
    }

    const [nome, setNome] = useState(props.carattere.nome)

    return (<tr>
        <td className='d-flex'>
            <input className='form-control' type='text' defaultValue={nome} onChange={(e) => setNome(e.target.value)} />

            {props.m ? (
                <>
                    <button className='btn btn-primary mx-1' onClick={() => editCarattereMetricoGenerale()}><FiSave /></button>
                    <button className='btn btn-outline-danger mx-1' onClick={() => deleteCarattereMetricoGeneraleEPerDistretto()}><FiTrash2 /></button>
                </>
            ) : (
                <>
                    <button className='btn btn-primary mx-1' onClick={() => editCarattereNonMetricoGenerale()}><FiSave /></button>
                    <button className='btn btn-outline-danger mx-1' onClick={() => deleteCarattereNonMetricoGeneraleEPerDistretto()}><FiTrash2 /></button>
                </>
            )}
        </td>
    </tr>)
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



    const deleteAccount = async () => {
        let cm = new ConnectionManager();

        if (window.confirm('Sei sicuro di voler rifiutare questa richiesta?')) {

            let res = await cm.deleteAccount(JSON.stringify({ id: props.utente.id }));
            console.log('deleteAccount', res)
            if (res.response == 'success') {
                props.callback()

            } else {
                alert('Impossibile eliminare account')
            }

        }
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
                <Button variant='outline-danger' className='mx-2' onClick={() => deleteAccount()}>Rifiuta</Button>
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
function ClassiPatologie(props) {

    const createClassePatologia = async (e) => {
        let cm = new ConnectionManager();
        var params = { classe: nome }

        let res = await cm.createClassePatologia(JSON.stringify(params))
        console.log('createClassePatologia', res)
        props.callback()
        document.getElementById('formClasse').value = ''
    }
    const [nome, setNome] = useState()


    return (<div className={props.col}>
        <Table hover striped size='sm' bordered>
            <thead>
                <tr>
                    <th>Classi Patologie</th>
                </tr>
            </thead>
            <tbody >

                {props.classi.map(classe =>

                    < ClassePatologiaGenerale classe={classe} callback={props.callback} />

                )}
                <tr>
                    <td className='d-flex mt-4'>
                        <Form className='d-flex w-100' onSubmit={createClassePatologia}>
                            <input className='form-control' id="formClasse" placeholder='Nome classe patologia...' type='text' required onChange={(e) => setNome(e.target.value)} />
                            <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                        </Form>
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>)
}
function ClassePatologiaGenerale(props) {
    const [nome, setNome] = useState(props.classe.nome)

    const editClassePatologia = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.classe.id, nome: nome }
        let res = await cm.editClassePatologia(JSON.stringify(params))
        console.log('editClassePatologia', res)
        props.callback()
    }


    const deleteClassePatologia = async (e) => {
        if (window.confirm('sei sicurio?')) {
            let cm = new ConnectionManager();
            var params = { id: props.classe.id }
            let res = await cm.deleteClassePatologia(JSON.stringify(params))
            console.log('deleteClassePatologia', res)
            props.callback()
        }
    }

    return (<tr className='w-100'>
        <td className='d-flex w-100'>
            <input className='form-control' type='text' defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
            <button className='btn btn-primary mx-1' onClick={() => editClassePatologia()} ><FiSave /></button>
            <button className='btn btn-outline-danger mx-1' onClick={() => deleteClassePatologia()} ><FiTrash2 /></button>
        </td>
    </tr>)
}



function Ossa(props) {

    const createTipoOsso = async (e) => {
        let cm = new ConnectionManager();
        var params = { nome: nome, distretto: distretto }

        let res = await cm.createTipoOsso(JSON.stringify(params))
        console.log('createTipoOsso', res)
        props.callback()
        document.getElementById('formTrauma').value = ''
    }
    const [nome, setNome] = useState()
    const [distretto, setDistretto] = useState()

    let getDistrettoId = (nome) => {
        switch (nome) {
            case 1:
                return 'Cranio'
            case 2:
                return 'Denti'
            case 3:
                return 'Colonna'
            case 4:
                return 'Torace'
            case 5:
                return 'Arti superiori'
            case 6:
                return 'Arti inferiori'
            case 7:
                return 'NMR'
            default:
                return null
        }
    }

    return (<div className={props.col}>
        <Table hover striped size='sm' bordered>
            <thead>
                <tr>
                    <th>Ossa</th>
                    <th>Distretto</th>
                </tr>
            </thead>
            <tbody >
                {props.ossa.map(osso =>

                    <OssoGenerale osso={osso} callback={props.callback} />

                )}

                <tr>
                    <td className='d-flex mt-4' >
                        <Form className='d-flex w-100' >
                            <input className='form-control' id="formTrauma" placeholder='Nome osso...' type='text' required onChange={(e) => setNome(e.target.value)} />
                        </Form>
                    </td>
                    <td className='mt-4'>
                        <Form onSubmit={createTipoOsso} className='d-flex mt-4'>
                            <Form.Select onChange={(e) => setDistretto(e.target.value)} required>
                                <option></option>
                                <option value='1'>{getDistrettoId(1)}</option>
                                <option value='2'>{getDistrettoId(2)}</option>
                                <option value='3'>{getDistrettoId(3)}</option>
                                <option value='4'>{getDistrettoId(4)}</option>
                                <option value='5'>{getDistrettoId(5)}</option>
                                <option value='6'>{getDistrettoId(6)}</option>
                                <option value='7'>{getDistrettoId(7)}</option>
                            </Form.Select>
                            <button className='btn btn-primary mx-1' type='submit' >Aggiungi</button>
                        </Form>
                    </td>
                </tr >

            </tbody >
        </Table >
    </div >)
}
function OssoGenerale(props) {
    const [nome, setNome] = useState(props.osso.nome)
    const [distretto, setDistretto] = useState(props.osso.distretto)

    const editTipoOsso = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: props.osso.id, nome: nome, distretto: distretto }
        let res = await cm.editTipoOsso(JSON.stringify(params))
        console.log('editTipoOsso', res)
        props.callback()
    }

    const deleteTipoOsso = async (e) => {
        if (window.confirm('sei sicurio?')) {
            let cm = new ConnectionManager();
            var params = { id: props.osso.id }
            let res = await cm.deleteTipoOsso(JSON.stringify(params))
            console.log('deleteTipoOsso', res)
            props.callback()
        }
    }


    let getDistrettoId = (nome) => {
        switch (nome) {
            case 1:
                return 'Cranio'
            case 2:
                return 'Denti'
            case 3:
                return 'Colonna'
            case 4:
                return 'Torace'
            case 5:
                return 'Arti superiori'
            case 6:
                return 'Arti inferiori'
            case 7:
                return 'NMR'
            default:
                return null
        }
    }

    let checkIfDente = () => {
        if (props.osso.distretto == 2) {
            return (<option value='2'>{getDistrettoId(2)}</option>)
        } else {
            return (<>
                <option value='1'>{getDistrettoId(1)}</option>
                <option value='3'>{getDistrettoId(3)}</option>
                <option value='4'>{getDistrettoId(4)}</option>
                <option value='5'>{getDistrettoId(5)}</option>
                <option value='6'>{getDistrettoId(6)}</option>
                <option value='7'>{getDistrettoId(7)}</option></>)
        }
    }

    return (<tr className='w-100'>
        <td >
            <input className='form-control' type='text' defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
        </td>
        <td className='d-flex w-100'>
            <Form.Select defaultValue={distretto} onChange={(e) => setDistretto(e.target.value)}>
                {checkIfDente()}
            </Form.Select>
            <button className='btn btn-primary mx-1' onClick={() => editTipoOsso()}><FiSave /></button>
            <button className='btn btn-outline-danger mx-1' onClick={() => deleteTipoOsso()}><FiTrash2 /></button>
        </td>
    </tr >)
}

export default SchedaAmministratore;