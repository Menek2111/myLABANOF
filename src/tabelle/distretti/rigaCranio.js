import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import DettagliOsso from './dettagliOsso';


function RigaCranio(props) {

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

    }, []);

    const valueToBoolean = (val) => {
        if (val === 1) {
            return true
        } else {
            return false
        }
    }

    //<td><Button onClick={handleShow}>Modifica</Button></td>

    return (
        <tr onClick={handleShow}>
            <td>{props.osso.nome}</td>
            <td>{props.osso.lato}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.osso.integro)}
                    disabled
                /></td>
            <td>{props.osso.lvlIntegrita}</td>
            <td>{props.osso.lvlQualita}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.osso.restaurato)}
                    disabled
                /></td>
            <td>{props.osso.catalogazioneDescrizione}</td>
            <td>{props.osso.indagineRadiologica}</td>
            <td>{props.osso.campionamento}</td>
            <td>{props.osso.altreAnalisi}</td>

            <Modal
                onClick={e => e.stopPropagation()}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName='my-modal'
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p>{props.osso.nome}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='row'>

                    <DettagliOsso osso={props.osso} />

                    <div className='col'>
                        <div className='border-bottom mb-2 d-flex justify-content-between'>
                            <h5 className=''>Traumi</h5>
                            <Button className='p-1'>Aggiungi</Button>
                        </div>
                        <Table bordered striped hover size="sm">
                            <tbody>
                                <tr>
                                    <th>Trauma</th>
                                    <th>Datazione</th>
                                    <th>Descrizione</th>
                                </tr>
                                <tr>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                </tr>
                            </tbody>
                        </Table>

                        <div className='border-bottom mb-2 d-flex justify-content-between'>
                            <h5 className=''>Patologie</h5>
                            <Button className='p-1'>Aggiungi</Button>
                        </div>
                        <Table bordered striped hover size="sm">
                            <tbody>
                                <tr>
                                    <th>Patologia</th>
                                    <th>Descrizione</th>
                                    <th>Litica</th>
                                    <th>Proliferativa</th>
                                </tr>
                                <tr>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Annulla
                    </Button>
                    <Button variant="primary" type='submit'>MODIFICA</Button>
                </Modal.Footer>
            </Modal>
        </tr >
    )

    /*

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

                        <Form.Group controlId="formText"> </Form.Group>

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
    */
}
export default RigaCranio;