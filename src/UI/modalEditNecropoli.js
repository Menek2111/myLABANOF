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

function ModalEditNecropoli(props) {
    const navigate = useNavigate();

    const [nome, setNome] = useState(props.tomba.nome);

    const getNecropoli = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllNecropoli();
        return res;
    }
    const [listaNecropoli, setListaNecropoli] = useState([])

    useEffect(() => {
        console.log('ricevuto', props)

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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const editNecropoli = async (event) => {
        event.preventDefault();

        let cm = new ConnectionManager();
        var params = { id: props.tomba.id, nome: nome }
        await cm.editNecropoli(JSON.stringify(params)).then(res => {
            console.log('editNecropoli', res)
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        })
    }

    return (
        <div>
            <Button className='mx-2' variant="primary" onClick={handleShow}>
                MODIFICA
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
                <Form onSubmit={editNecropoli}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica necropoli</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome tomba</Form.Label>
                            <Form.Control type="text" defaultValue={nome} onChange={(e) => setNome(e.target.value)} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Chiudi senza salvare
                        </Button>
                        <Button variant="primary" type="submit">Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
export default ModalEditNecropoli;