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

function ModalEditTomba({ tomba }) {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [num, setNum] = useState('');
    const [coord, setCoord] = useState('');

    useEffect(() => {
        setNome(tomba.nome)
        setNum(tomba.nMinIndividui)
        setCoord(tomba.coordinate)
    }, [tomba.nome, tomba.nMinIndividui, tomba.coordinate]);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const modificaTomba = async (nome, nMinIndividui, coordinate) => {
        let cm = new ConnectionManager();
        var params = { id: tomba.id, nome: nome, nMinIndividui: nMinIndividui, coordinate: coordinate }
        await cm.editTomba(JSON.stringify(params)).then(res => {
            if (res.response !== 'error') {
                navigate('/')
            }
        })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                MODIFICA
            </Button >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modifica tomba</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome tomba</Form.Label>
                            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Numero minimo di individui</Form.Label>
                            <Form.Control type="number" value={num} onChange={(e) => setNum(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Coordinate tomba</Form.Label>
                            <Form.Control type="text" value={coord} onChange={(e) => setCoord(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi senza salvare
                    </Button>
                    <Button variant="primary" onClick={(e) => modificaTomba(nome, num, coord)}>Salva</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default ModalEditTomba;