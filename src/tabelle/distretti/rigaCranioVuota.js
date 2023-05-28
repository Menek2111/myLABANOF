import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function RigaCranioVuota(props) {






    const handleSubmit = (event) => {

    };

    useEffect(() => {

    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <tr onClick={handleShow}>
            <td>{props.tipoOsso.nome}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <div onClick={e => e.stopPropagation()}>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size='xl'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p>Creazione osso: {props.tipoOsso.nome}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Table bordered striped hover size="sm">
                                <tbody>
                                    <tr>
                                        <th>Osso</th>
                                        <th>Materiale rivenuto</th>
                                        <th>Integro</th>
                                        <th>Livello di integrità</th>
                                        <th>Livello di qualità</th>
                                        <th>Restaurato</th>
                                        <th>Catalogazione e descrizione</th>
                                        <th>Indagine radiologica</th>
                                        <th>Campionamento</th>
                                        <th>Altre analisi</th>
                                    </tr>
                                    <tr>


                                        <td>
                                            <input className='form-control' defaultValue={props.tipoOsso.nome} disabled />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                        <td>
                                            <input className='form-control' />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Annulla
                            </Button>
                            <Button variant="primary" type="submit">SALVA</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </tr>
    )
}
export default RigaCranioVuota;