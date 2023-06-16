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


function ModalDeleteTomba(props) {
    const navigate = useNavigate();

    const deleteText = 'Si sono sicuro'
    const [testo, setText] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (testo === deleteText) {
            deleteAPi().then(res => console.log('Eliminazione: ' + res))
        } else {
            var text = document.getElementById('formText')
            text.classList.add('border-danger')

            var feedback = document.getElementById('formFeedback')
            feedback.classList.remove('d-none')
            feedback.classList.add('d-block')
        }
    };

    useEffect(() => {
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteAPi = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.tomba.id }
        await cm.deleteTomba(JSON.stringify(params)).then(res => {
            console.log('DeleteTomba', res)
            switch (res.response) {
                case 'success':
                    alert('Tomba eliminata con successo')
                    navigate('/home')
                    break
                case 'error':
                    alert('Impossibile eliminare la tomba, verificare che questa sia vuota')
                    handleClose()
                    break
                default:
                    break
            }
        })
    }

    return (
        <div>
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
                        <p>Vuoi eliminare questa tomba?</p>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className='my-5'>
                            Non sarà possibile eliminare la tomba finché questa non sarà completemante vuota, se vuoi eliminare la tomba dovrai spostare o eliminare gli individui appartenenti a questa tomba
                        </div>

                        <Form.Group controlId="formText">
                            <Form.Label>Scrivere <b>'{deleteText}'</b> per eliminare la tomba</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setText(e.target.value)}
                                onClick={(e) => {
                                    var text = document.getElementById('formText')
                                    text.classList.remove('border-danger')

                                    var feedback = document.getElementById('formFeedback')
                                    feedback.classList.remove('d-block')
                                    feedback.classList.add('d-none')
                                }} />
                            <p className='p-0 m-o text-danger d-none' id="formFeedback">Incorretto</p>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="danger" type="submit">ELIMINA</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );
}
export default ModalDeleteTomba;