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


function SchedaAmministratore() {

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
    }

    //USE EFFECT -------------------------------------------------------------------------
    useEffect(() => {
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
                                    <Distretto distrettoId='1' callback={aggiorna} listaPatologie={listaPatologie} listaCaratteriMetrici={listaCaratteriMetrici} listaCaratteriNonMetrici={listaCaratteriNonMetrici} distretto='Cranio' />
                                    <Distretto distrettoId='3' callback={aggiorna} listaPatologie={listaPatologie} listaCaratteriMetrici={listaCaratteriMetrici} listaCaratteriNonMetrici={listaCaratteriNonMetrici} distretto='Colonna' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    //RENDER SCHEDA (END) ----------------------------------------------------------------
}

function Distretto(props) {
    //CHIAMATE API PER CREAZIONE ----------------------------------------------------------
    const createPatologiaGeneraleEPerDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.createPatologiaGeneraleEPerDistretto(JSON.stringify({ patologia: patologia, distretto: props.distrettoId }));
        console.log('createPatologiaGeneraleEPerDistretto', res)
        if (res.response == 'success') {
            props.callback()
        }
    }
    const [patologia, setPatologia] = useState()

    const createCarattereMetricoGeneraleEPerDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.createCarattereMetricoGeneraleEPerDistretto(JSON.stringify({ nome: carattereMetrico, distretto: props.distrettoId }));
        console.log('createCarattereMetricoGeneraleEPerDistretto', res)
        if (res.response == 'success') {
            props.callback()
        }
    }
    const [carattereMetrico, setCarattereMetrico] = useState()
    //CHIAMATE API PER CREAZIONE (END) ----------------------------------------------------

    //IMPOSTO L'IMMAGINE IN BASE AL DISTRETTO ---------------------------------------------
    let imageFromDistretto = (nome) => {
        switch (nome) {
            case 'Cranio':
                return skull
            case 'Colonna':
                return colonna
            default:
                return null
        }
    }
    //IMPOSTO L'IMMAGINE IN BASE AL DISTRETTO (END) ----------------------------------------

    //VARIABILI MODAL ----------------------------------------------------------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //VARIABILI MODAL (END) ----------------------------------------------------------------

    //RENDER BLOCCO DISTRETTO --------------------------------------------------------------
    return (
        <div className='col-3'>
            <div className='p-2 border mx-1 row rounded indCard' style={{ cursor: 'pointer' }} onClick={handleShow}>
                <div className=' rounded m-1 col text-center'>
                    <img src={imageFromDistretto(props.distretto)} className="p-1 rounded" style={{ height: '10vh' }} />
                </div>
                <div className='rounded m-1 col'>
                    <h5>{props.distretto}</h5>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Distretto {props.distretto.toLowerCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='row'>
                    <div className='col px-5'>
                        <div className='row'>
                            <h5 className='border-bottom'>PATOLOGIE</h5>
                            <div className='border rounded px-3 py-2'>
                                <div className='row'>
                                    {
                                        props.listaPatologie.map(patologia =>
                                            <ListaPatologie callback={props.callback} distretto={patologia.distrettoNome} checkDistretto={props.distretto} patologia={patologia} />
                                        )
                                    }
                                </div>
                                <Form onSubmit={createPatologiaGeneraleEPerDistretto}>
                                    <Form.Group className='pt-4 px-2'>
                                        <Form.Label>Crea nuova patologia</Form.Label>
                                        <div className='row justify-content-between'>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nome patologia"
                                                className='col'
                                                onChange={(e) => {
                                                    setPatologia(e.target.value)
                                                }}
                                            />
                                            <Button className='col-3 ms-4' type="submit">CREA</Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>


                        <div className='row mt-5'>
                            <h5 className='border-bottom'>CARATTERI METRICI</h5>
                            <div className='border rounded px-3 py-2'>
                                <div className='row'>
                                    {
                                        props.listaCaratteriMetrici.map(patologia =>
                                            <ListaCaratteriMetrici callback={props.callback} distretto={patologia.distrettoNome} checkDistretto={props.distretto} carattereMetrico={patologia} />
                                        )
                                    }
                                </div>
                                <Form onSubmit={createCarattereMetricoGeneraleEPerDistretto}>
                                    <Form.Group className='pt-4 px-2'>
                                        <Form.Label>Crea nuovo carattere metrico</Form.Label>
                                        <div className='row justify-content-between'>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nome carattere metrico"
                                                className='col'
                                                onChange={(e) => {
                                                    setCarattereMetrico(e.target.value)
                                                }}
                                            />
                                            <Button className='col-3 ms-4' type="submit">CREA</Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
    //RENDER BLOCCO DISTRETTO (END) --------------------------------------------------------

}

function ListaPatologie(props) {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };
    const deletePatologiaGeneraleEPerDistretto = async (id) => {
        let cm = new ConnectionManager();
        let res = await cm.deletePatologiaGeneraleEPerDistretto(JSON.stringify({ id: id }));
        console.log('deletePatologiaGeneraleEPerDistretto', res)
        if (res.response == 'success') {
            props.callback()
        }
    }

    const editPatologiaGenerale = async (id) => {
        let cm = new ConnectionManager();
        let res = await cm.editPatologiaGenerale(JSON.stringify({ nome: nome, id: id }));
        console.log('editPatologiaGenerale', res)
        if (res.response == 'success') {
            props.callback()
            setEditable(false)
        }
    }
    const [editable, setEditable] = useState(false)
    const [nome, setNome] = useState(props.patologia.nome)

    if (props.distretto == props.checkDistretto) {
        return (
            <div className='col-4 mt-2 rounded '>
                <div className='border rounded indCard'>
                    <div className='text-center d-flex justify-content-between p-2' style={centerMiddle}>

                        {editable ? (
                            <Form.Group >
                                <Form.Control defaultValue={props.patologia.nome} onChange={(e) => setNome(e.target.value)} type="email" placeholder="name@example.com" />
                            </Form.Group>
                        ) : (props.patologia.nome)}


                        <div className='d-flex'>
                            {editable ? (<IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button variant='success' className='p-2 mx-1' onClick={() => editPatologiaGenerale(props.patologia.id)}>
                                    <FiSave />
                                </Button>
                            </IconContext.Provider>) : (<IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button className='p-2 mx-1' onClick={() => setEditable(((state) => !state))}>
                                    <FiEdit2 />
                                </Button>
                            </IconContext.Provider>)}


                            <IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button variant='danger' className='p-2' onClick={() => deletePatologiaGeneraleEPerDistretto(props.patologia.id)}>
                                    <FiTrash2 />
                                </Button>
                            </IconContext.Provider>
                        </div>

                    </div>
                </div>
            </div >
        )
    }

    //BLOCCO ELEMENTO (END) ---------------------------------------------------------------
}

function ListaCaratteriMetrici(props) {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const deleteCarattereMetricoGeneraleEPerDistretto = async (id) => {
        let cm = new ConnectionManager();
        let res = await cm.deleteCarattereMetricoGeneraleEPerDistretto(JSON.stringify({ id: id }));
        console.log('deleteCarattereMetricoGeneraleEPerDistretto', res)
        if (res.response == 'success') {
            props.callback()
        }
    }

    const editCarattereMetricoGenerale = async (id) => {
        let cm = new ConnectionManager();
        let res = await cm.editCarattereMetricoGenerale(JSON.stringify({ nome: nome, id: id }));
        console.log('editCarattereMetricoGenerale', res)
        if (res.response == 'success') {
            props.callback()
            setEditable(false)
        }
    }

    const [editable, setEditable] = useState(false)
    const [nome, setNome] = useState(props.carattereMetrico.nome)

    if (props.distretto == props.checkDistretto) {
        return (
            <div className='col-6 mt-2 rounded '>
                <div className='border rounded indCard'>
                    <div className='text-center d-flex justify-content-between p-2' style={centerMiddle}>

                        {editable ? (
                            <Form.Group >
                                <Form.Control defaultValue={props.carattereMetrico.nome} onChange={(e) => setNome(e.target.value)} type="email" placeholder="name@example.com" />
                            </Form.Group>
                        ) : (props.carattereMetrico.nome)}


                        <div className='d-flex'>
                            {editable ? (<IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button variant='success' className='p-2 mx-1' onClick={() => editCarattereMetricoGenerale(props.carattereMetrico.id)}>
                                    <FiSave />
                                </Button>
                            </IconContext.Provider>) : (<IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button className='p-2 mx-1' onClick={() => setEditable(((state) => !state))}>
                                    <FiEdit2 />
                                </Button>
                            </IconContext.Provider>)}


                            <IconContext.Provider
                                value={{ color: 'white' }}
                            >
                                <Button variant='danger' className='p-2' onClick={() => deleteCarattereMetricoGeneraleEPerDistretto(props.carattereMetrico.id)} >
                                    <FiTrash2 />
                                </Button>
                            </IconContext.Provider>
                        </div>

                    </div>
                </div>
            </div >
        )
    }

    //BLOCCO ELEMENTO (END) ---------------------------------------------------------------
}

export default SchedaAmministratore;