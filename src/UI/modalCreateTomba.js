import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'


import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCreateTomba() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [num, setNum] = useState('');
    const [coord, setCoord] = useState('');

    useEffect(() => {

    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API

    const creaTomba = async (nome, nMinIndividui, coordinate) => {
        let cm = new ConnectionManager();
        var params = { nome: nome, nMinIndividui: nMinIndividui, coordinate: coordinate }
        await cm.createTomba(JSON.stringify(params)).then(res => {
            if (res.error == null) {
                navigate('/')
            }
        })

    }


    return (
        <div>
            <Nav.Link className='w-100' variant="primary" onClick={handleShow}>
                Crea nuova tomba
            </Nav.Link >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Creazione nuova tomba</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome tomba</Form.Label>
                            <Form.Control type="text" onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Numero minimo di individui</Form.Label>
                            <Form.Control type="number" onChange={(e) => setNum(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Coordinate tomba</Form.Label>
                            <Form.Control type="text" onChange={(e) => setCoord(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi senza salvare
                    </Button>
                    <Button variant="primary" onClick={(e) => creaTomba(nome, num, coord)}>Salva</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default ModalCreateTomba;