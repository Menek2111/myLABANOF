import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Import classi
import ConnectionManager from '../api/ConnectionManager';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCreatePatologia(props) {

    const [tipoPatologia, setTipoPatologia] = useState('')
    const [descrizione, setDescrizione] = useState('')
    const [litica, setLitica] = useState('')
    const [proliferativa, setProliferativa] = useState('')


    useEffect(() => {

    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setTipoPatologia('')
        setDescrizione('')
        setLitica('')
        setProliferativa('')
        setShow(false);
    }
    const handleShow = () => setShow(true);



    let booleanToValue = (val) => {
        if (val) {
            return 1
        } else {
            return 0
        }
    }

    const createPatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        var params = {
            tipoPatologia: tipoPatologia,
            osso: props.osso,
            litica: booleanToValue(litica),
            proliferativa: booleanToValue(proliferativa),
            descrizione: descrizione
        }
        await cm.createPatologiaSpecifica(JSON.stringify(params)).then(res => {
            console.log('createPatologiaSpecifica', res)
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
                <Form onSubmit={createPatologiaSpecifica}>
                    <Modal.Header closeButton>
                        <Modal.Title>Creazione nuova patologia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Patologia</Form.Label>
                            <Form.Select onChange={(e) => setTipoPatologia(e.target.value)} required>
                                <option></option>
                                {props.patologie.map(pato => <option key={pato.id} value={pato.id}>{pato.nome}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control type="text" onChange={(e) => setDescrizione(e.target.value)} />
                        </Form.Group>
                        <div className='mb-3 d-flex justify-content-center'>
                            <Form.Group className="mx-3 text-center" controlId="formBasicPassword">
                                <Form.Label>Litica</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    onChange={(e) => setLitica(e.target.value)}
                                    defaultChecked={false}
                                />
                            </Form.Group>
                            <Form.Group className="mx-3 text-center" controlId="formBasicPassword">
                                <Form.Label>Proliferativa</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    onChange={(e) => setProliferativa(e.target.value)}
                                    defaultChecked={false}
                                />
                            </Form.Group>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Chiudi senza salvare
                        </Button>
                        <Button variant="primary" type='submit'>Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );
}
export default ModalCreatePatologia;