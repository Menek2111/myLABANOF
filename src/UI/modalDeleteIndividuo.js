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

        if (testo == deleteText) {
            alert('si')
            deleteAPi().then(res => console.log('Eliminazione: ' + res))
            navigate('/home')
        } else {
            alert('no')
            alert(text)
            var text = document.getElementById('formText')
            text.classList.add('border-danger')

            var feedback = document.getElementById('formFeedback')
            feedback.classList.remove('d-none')
            feedback.classList.add('d-block')
        }
    };

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const eliminaIndividuo = async () => {

    }

    const deleteAPi = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.individuo }
        await cm.deleteIndividuo(JSON.stringify(params)).then(res => {
            if (res.error == null) {
                navigate('/')
            }
        })
    }

    return (
        <div>
            <Button className='w-100' variant="danger" onClick={handleShow}>
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
                        <h4 className='text-danger'>Sei sicuro di voler eliminare l'individuo: --- ?</h4>
                        <p className=' p-0 m-0 text-warning'>Questa operazione sarà irreversibile</p>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className='d-flex border border-danger rounded p-2 my-4' style={{ backgroundColor: '#F7F9FC' }}>
                            <div>
                                <img src={thumb} alt="thumb" style={{ height: '15vh' }} />
                            </div>
                            <div>
                                <p>Individuo: ---</p>
                                <p>Creato da: </p>
                                <p>Creato il:</p>
                            </div>
                        </div>


                        <Form.Group controlId="formText">
                            <Form.Label>Scrivere <b>'{deleteText}'</b> per eliminare l'individuo</Form.Label>
                            <Form.Control required type="text" onChange={(e) => setText(e.target.value)} />
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