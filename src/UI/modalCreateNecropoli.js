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

import necropoli from '../images/icons/necropoli.PNG'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCreateNecropoli() {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const navigate = useNavigate();

    const [nome, setNome] = useState('');

    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setNome('')
        setReady(true)
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Chiamate API

    const createTomba = async (e) => {
        let cm = new ConnectionManager();
        var params = { nome: nome }

        let res = await cm.createNecropoli(JSON.stringify(params))
        console.log('createNecropoli', res)
        if (res.response === 'success') {
            sessionStorage.setItem('necropoliSelezionata', res.results)
        }
    }

    let creaTomba = (event) => {
        event.preventDefault();

        setReady(false)
        createTomba().then(() => {
            setTimeout(() => {
                handleClose()
                navigate('/necropoli')
            }, 500);
        })
    }
    if (localStorage.getItem('ruolo') != 0 && localStorage.getItem('ruolo') != 1) {

        return (
            <div className='py-2'>
                <Button style={centerMiddle} className='w-100 d-flex justify-content-start' variant="outline-primary" onClick={handleShow}>
                    <img className='me-1 p-0 rounded' src={necropoli} style={{ height: '7vh' }} />
                    <p className='m-0 ps-2'> Crea necropoli</p>
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
                            <Modal.Title>Creazione nuova necropoli</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nome necropoli</Form.Label>
                                <Form.Control type="text" onChange={(e) => setNome(e.target.value)} required />
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
export default ModalCreateNecropoli;