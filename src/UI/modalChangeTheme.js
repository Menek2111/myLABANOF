import React, { useState } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalChangeTheme(props) {


    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selezionaTema = (tema) => {
        sessionStorage.setItem('tema', tema)
        window.location.reload(false)
    }

    return (
        <div>
            <Dropdown.Item style={{ marginRight: '2vw' }} className='w-100 ' variant="primary" onClick={handleShow}>
                Tema
            </Dropdown.Item  >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Scegli tema</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='row justify-content-center'>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#E7CECE' }}
                                onClick={() => selezionaTema('temaMyLabanof')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#FED6A5' }}
                                onClick={() => selezionaTema('temaPastelloArancio')}>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#CEE5B7' }}
                                onClick={() => selezionaTema('temaPastelloVerde')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#A9DFEB' }}
                                onClick={() => selezionaTema('temaPastelloAzzurro')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#A5C1E6' }}
                                onClick={() => selezionaTema('temaPastelloBlue')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#EBC8DE' }}
                                onClick={() => selezionaTema('temaPastelloRosa')}></div>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default ModalChangeTheme;