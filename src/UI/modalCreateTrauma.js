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

function ModalCreateTrauma(props) {
    const navigate = useNavigate();

    const [trauma, setTrauma] = useState('')
    const [descrizione, setDescrizione] = useState('')
    const [datazione, setDatazione] = useState('')

    useEffect(() => {
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setTrauma('')
        setDescrizione('')
        setDatazione('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Chiamate API


    const createTraumaSpecifico = async (event) => {
        event.preventDefault();

        let cm = new ConnectionManager();

        var params = ''
        if (props.distretto != 2) {
            params = { tipoTrauma: trauma, osso: props.osso, datazione: datazione, descrizione: descrizione }
        } else {
            params = { tipoTrauma: trauma, dente: props.osso, datazione: datazione, descrizione: descrizione }
        }

        await cm.createTraumaSpecifico(JSON.stringify(params)).then(res => {
            console.log('createTraumaSpecifico', res)
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        })
    }

    return (
        <div>
            <Button className='w-100 p-1 mb-1' variant="primary" onClick={handleShow}>
                Aggiungi
            </Button >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Form onSubmit={createTraumaSpecifico}>
                    <Modal.Header closeButton>
                        <Modal.Title>Creazione nuovo trauma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Trauma</Form.Label>
                            <Form.Select onChange={(e) => setTrauma(e.target.value)} required>
                                <option></option>
                                {props.listaTraumi ? (
                                    props.listaTraumi.map(tr => <option key={tr.id} value={tr.id}>{tr.nome}</option>)
                                ) : (<option></option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control type="text" onChange={(e) => setDescrizione(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Datazione</Form.Label>
                            <Form.Select onChange={(e) => setDatazione(e.target.value)} >
                                <option></option>
                                <option>Ante-mortem</option>
                                <option>Peri-mortem</option>
                                <option>Scavenging</option>
                                <option>Post-mortem</option>
                                <option>ND</option>
                            </Form.Select>
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
        </div >
    );
}
export default ModalCreateTrauma;