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

import thumb from '../images/individuo.jpg'


function ModalDeleteIndividuo(props) {
    const navigate = useNavigate();

    const deleteText = 'Si sono sicuro'
    const [testo, setText] = useState('')

    useEffect(() => {
        //alert(props.individuo)
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (testo === deleteText) {
            deleteAPi()
        } else {
            var text = document.getElementById('formText')
            text.classList.add('border-danger')

            var feedback = document.getElementById('formFeedback')
            feedback.classList.remove('d-none')
            feedback.classList.add('d-block')
        }
    };

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setText('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const deleteAPi = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.individuo.id }
        await cm.deleteIndividuo(JSON.stringify(params)).then(res => {
            console.log('DeleteIndividuo', res)

            if (res.response === 'success') {
                alert('Eliminazione avvenuta con successo')
                handleClose()
                navigate(-1)
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
                        <h4 className=''>Eliminazione individuo</h4>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className='my-5'>
                            Sei sicuro di voler eliminare questo individuo? Questa operazione è irreversibile
                        </div>


                        <Form.Group controlId="formText">
                            <Form.Label>Scrivere <b>'{deleteText}'</b> per eliminare l'individuo</Form.Label>
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
export default ModalDeleteIndividuo;