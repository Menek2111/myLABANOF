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

function ModalCreateIndividuo(props) {
    const navigate = useNavigate();

    const [tomba, setTomba] = useState();
    const [nome, setNome] = useState('');
    const [tombe, setTombe] = useState([]);

    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllTombe();
        return res;
    }

    useEffect(() => {
        getTombe().then(res => {
            console.log('GetTombe', res)
            if (res.response === 'success') {
                setTombe(res.results)
            } else {
                setTombe([])
            }
        })
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setTomba('')
        setNome('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Chiamate API
    const creaIndividuo = async () => {
        let cm = new ConnectionManager();
        var params
        if (props.tomba != null) {
            params = { tomba: props.tomba.id, nome: nome, creatore: localStorage.getItem('userID') }
        } else {
            params = { tomba: tomba, nome: nome, creatore: localStorage.getItem('userID') }
        }
        await cm.createIndividuo(JSON.stringify(params)).then(
            res => {
                console.log('CreateIndividuo', res)

                if (res.response === 'success') {
                    sessionStorage.setItem('individuoSelezionato', res.results)
                    sessionStorage.setItem('individuoSelezionatoCreatore', localStorage.getItem('userID'))

                    navigate('/individuo')
                }

            }
        );

    }

    let checkProps = () => {
        if (props.tomba != null) {
            return (<Form.Select required aria-label="Default select example" disabled>
                <option value={props.tomba.id}>{props.tomba.nome}</option>
            </Form.Select>)
        } else {
            return (<Form.Select required aria-label="Default select example" onChange={(e) => setTomba(e.target.value)}>
                <option></option>
                {tombe ? (tombe.map(tomba => <option key={tomba.id} value={tomba.id}>{tomba.nome}</option>))
                    : (<option></option>)}
            </Form.Select>)
        }
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
                <Form onSubmit={creaIndividuo}>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tomba di appartenenza:</Form.Label>

                            {checkProps()}

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
                        <Button variant="primary" type="submit">Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );
}
export default ModalCreateIndividuo;