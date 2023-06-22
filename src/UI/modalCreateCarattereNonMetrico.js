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

function ModalCreateCarattereNonMetrico(props) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('caratteri ricevuti', props.caratteri)
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const [tipoCarattereNonMetrico, setTipoCarattereNonMetrico] = useState()
    const [lato, setLato] = useState()
    const [valore, setValore] = useState(false)

    let booleanToValue = (bool) => {
        if (bool) return 1
        else return 0
    }

    const createCarattereNonMetricoSpecifico = async (event) => {

        event.preventDefault();

        let cm = new ConnectionManager();
        var params = {
            individuo: sessionStorage.getItem('individuoSelezionato'),
            tipoCarattereNonMetrico: tipoCarattereNonMetrico,
            lato: lato,
            valore: booleanToValue(valore),
        }
        await cm.createCarattereNonMetricoSpecifico(JSON.stringify(params)).then(res => {
            console.log('Creazione carattere metrico', res)
            switch (res.response) {
                case 'success':
                    props.callback()
                    handleClose()
                    break
                case 'alreadyExist':
                    alert('Questo carattere non metrico è già presente...')
                    break
                default:
                    break
            }
        })
    }

    return (
        <div>
            <Button onClick={handleShow}>Aggiungi carattere metrico</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Creazione nuovo carattere metrico</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createCarattereNonMetricoSpecifico}>
                    <Modal.Body>
                        <div className='row justify-content-around'>
                            <Form.Group className="col mb-2" controlId="formBasicPassword">
                                <Form.Label>Carattere metrico</Form.Label>
                                <Form.Select onChange={(e) => setTipoCarattereNonMetrico(e.target.value)} required>
                                    <option></option>
                                    {props.caratteri.map(car => (<option key={car.id} value={car.id}>{car.nome}</option>))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className=" col mb-2 w-25" >
                                <Form.Label>Lato</Form.Label>
                                <Form.Select onChange={(e) => setLato(e.target.value)} required>
                                    <option></option>
                                    <option>Destro</option>
                                    <option>Sinistro</option>
                                    <option>Unico</option>
                                    <option>Incerto</option>
                                </Form.Select>
                            </Form.Group>
                        </div>


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
export default ModalCreateCarattereNonMetrico;