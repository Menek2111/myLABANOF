import React, { useEffect, useState } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from "../api/ConnectionManager";


function ModalChangeTheme(props) {


    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selezionaTema = (tema) => {
        localStorage.setItem('tema', tema)
        window.location.reload(false)
    }

    const selezionaFont = (font) => {
        localStorage.setItem('font', font)
        window.location.reload(false)
    }

    return (
        <div>
            <Dropdown.Item style={{ marginRight: '2vw' }} className='w-100 ' variant="primary" onClick={handleShow}>
                Personalizzazione
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
                    <Modal.Title>Personalizzazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='row justify-content-center'>

                        <p className='border-bottom mb-3'>Colore di sfondo</p>

                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#E7CECE', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaMyLabanof')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#FED6A5', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaPastelloArancio')}>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#CEE5B7', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaPastelloVerde')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#A9DFEB', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaPastelloAzzurro')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#A5C1E6', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaPastelloBlue')}></div>
                        </div>
                        <div className='col-2'>
                            <div className='rounded text-center' style={{ width: '5vw', height: '5vw', backgroundColor: '#EBC8DE', cursor: 'pointer' }}
                                onClick={() => selezionaTema('temaPastelloRosa')}></div>
                        </div>
                    </div>



                    <div className='my-4'></div>

                    <p className='border-bottom'>Font</p>


                    <div className='row justify-content-center'>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Roboto', cursor: 'pointer' }}
                                onClick={() => selezionaFont('Roboto')}>
                                Roboto
                            </div>
                        </div>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Open Sans', cursor: 'pointer' }}
                                onClick={() => selezionaFont('OpenSans')}>
                                Open Sans
                            </div>
                        </div>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Lato', cursor: 'pointer' }}
                                onClick={() => selezionaFont('Lato')}>
                                Lato
                            </div>
                        </div>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Montserrat', cursor: 'pointer' }}
                                onClick={() => selezionaFont('Montserrat')}>
                                Montserrat
                            </div>
                        </div>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Poppins', cursor: 'pointer' }}
                                onClick={() => selezionaFont('Poppins')}>
                                Poppins
                            </div>
                        </div>
                        <div className='col-4 p-1'>
                            <div className='rounded text-center border p-3' style={{ fontFamily: 'Mulish', cursor: 'pointer' }}
                                onClick={() => selezionaFont('Mulish')}>
                                Mulish
                            </div>
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