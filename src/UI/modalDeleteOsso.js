import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavItem } from 'react-bootstrap';

function ModalDeleteOsso(props) {
    const navigate = useNavigate();


    useEffect(() => {
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteAPi = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.osso }
        //console.log('params', params)
        await cm.deleteOsso(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                console.log('response', res)
                window.location.reload(false)
                //navigate('/individuo/cranio')
            }
        })
    }

    let checkUser = () => {


        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':

                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return (<div></div>)
                } else {
                    return (<div>
                        <Button variant="outline-danger" onClick={handleShow}>
                            Elimina
                        </Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            size="lg"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <p>Vuoi eliminare questo osso?</p>
                                </Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={deleteAPi}>
                                <Modal.Body>

                                    <div className=''>
                                        Questa operazione è irreversibile
                                    </div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Annulla
                                    </Button>
                                    <Button variant="danger" type="submit">ELIMINA</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </div >)
                }
            case '3':
                return (<div>
                    <Button variant="outline-danger" onClick={handleShow}>
                        Elimina
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p>Vuoi eliminare questo osso?</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={deleteAPi}>
                            <Modal.Body>

                                <div className=''>
                                    Questa operazione è irreversibile
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Annulla
                                </Button>
                                <Button variant="danger" type="submit">ELIMINA</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div >)
            default:
                return <></>
        }
    }

    return (
        checkUser()
    );
}
export default ModalDeleteOsso;