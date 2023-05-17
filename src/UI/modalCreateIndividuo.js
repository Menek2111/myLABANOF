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

function ModalCreateIndividuo() {
    const navigate = useNavigate();

    const [tomba, setTomba] = useState('');
    const [nome, setNome] = useState('');
    const [tombe, setTombe] = useState([]);

    //Stato per il profilo
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('userID')));
        getTombe().then(res => {
            setTombe(res)
            setTomba(res[0].id)
        })
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const creaIndividuo = async (tomba, nome, creatore) => {

        if (tomba != '' && nome != '') {
            let cm = new ConnectionManager();
            var params = { tomba: tomba, nome: nome, creatore: creatore }
            let res = await cm.createIndividuo(JSON.stringify(params)).then(
                navigate('/')
            );
        }


    }
    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getTombe();
        return res.response;
    }
    return (
        <div>
            <Button className='w-100' variant="primary" onClick={handleShow}>
                Crea nuovo individuo
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
                    <Modal.Title>Creazione nuovo individuo</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <p className='p-2 rounded' style={{ backgroundColor: '#F7F9FC' }}>Non esiste la tomba che stai cercando? <a href="#">Creala</a></p>
                            <Form.Label>Tomba di appartenenza:</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setTomba(e.target.value)}>
                                {tombe ? (tombe.map(tomba => <option key={tomba.id} value={tomba.id}>{tomba.nome}</option>))
                                    : (<option></option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Identificativo individuo</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Chiudi senza salvare
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e) => creaIndividuo(tomba, nome, profile)}>Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );
}
export default ModalCreateIndividuo;