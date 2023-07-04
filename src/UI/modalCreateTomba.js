import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-loader-spinner'
//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'

import tomb from '../images/icons/tomb.png'


import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCreateTomba(props) {
    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [num, setNum] = useState('');
    const [coord, setCoord] = useState('');
    const [necropoli, setNecropoli] = useState('')

    const [ready, setReady] = useState(false)

    const getNecropoli = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllNecropoli();
        return res;
    }
    const [listaNecropoli, setListaNecropoli] = useState([])

    useEffect(() => {
        setReady(true)

        getNecropoli().then(res => {
            console.log('getNecropoli', res)
            if (res.response === 'success') {
                setListaNecropoli(res.results)
            } else {
                setListaNecropoli([])
            }
        })
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setNome('')
        setNum('')
        setCoord('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Chiamate API

    const createTomba = async (e) => {
        let cm = new ConnectionManager();
        var params
        if (props.necropoli != null) {
            params = { nome: nome, nMinIndividui: num, coordinate: coord, necropoli: props.necropoli.id }
        } else {
            params = { nome: nome, nMinIndividui: num, coordinate: coord, necropoli: necropoli }

        }


        let res = await cm.createTomba(JSON.stringify(params))
        if (res.response === 'success') {
            console.log('response', res.response)
            sessionStorage.setItem('tombaSelezionata', res.results)
        }
    }

    let creaTomba = (event) => {
        event.preventDefault();

        setReady(false)
        createTomba().then(() => {
            setTimeout(() => {
                navigate('/tomba')
            }, 500);
        })
    }


    let checkProps = () => {
        if (props.necropoli != null) {
            return (<Form.Select required aria-label="Default select example" disabled>
                <option value={props.necropoli.id}>{props.necropoli.nome}</option>
            </Form.Select>)
        } else {
            return (<Form.Select aria-label="Default select example" onChange={(e) => setNecropoli(e.target.value)}>
                <option></option>
                {listaNecropoli ? (listaNecropoli.map(necropoli => <option key={necropoli.id} value={necropoli.id}>{necropoli.nome}</option>))
                    : (<></>)}
            </Form.Select>)
        }
    }
    if (localStorage.getItem('ruolo') != 0 && localStorage.getItem('ruolo') != 1) {

        return (
            <div className='py-2'>
                <Button style={centerMiddle} className='w-100 d-flex justify-content-start' variant="outline-primary" onClick={handleShow}>
                    <img className='me-1 p-0 rounded' src={tomb} style={{ height: '7vh' }} />
                    <p className='m-0 ps-2'> Crea tomba</p>
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    centered
                >
                    <Form onSubmit={creaTomba}>
                        <Modal.Header closeButton>
                            <Modal.Title>Creazione nuova tomba</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Necropoli di appartenenza: <span className='text-secondary' style={{ fontSize: '0.8em' }}>(Non obbligatorio)</span></Form.Label>

                                {checkProps()}

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nome tomba</Form.Label>
                                <Form.Control type="text" onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Numero minimo di individui</Form.Label>
                                <Form.Control type="number" onChange={(e) => setNum(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Coordinate tomba</Form.Label>
                                <Form.Control type="text" onChange={(e) => setCoord(e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            {ready ? (
                                <div>
                                    <Button className='mx-2' variant="secondary" onClick={handleClose}>
                                        Chiudi senza salvare
                                    </Button>

                                    <Button variant="primary" type='submit'>Salva</Button>
                                </div>
                            ) : (<ProgressBar
                                width='100%'
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor='#EDF2FC'
                                barColor='#0B5ED7'
                            />)}
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div >
        );
    } else {
        return <></>
    }
}
export default ModalCreateTomba;