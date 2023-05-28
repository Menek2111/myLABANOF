import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function RigaCranio(props) {

    const handleSubmit = (event) => {

    };
    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

    }, []);

    return (
        <tr onClick={handleShow}>
            <td>{props.osso.nome}</td>
            <td>{props.osso.lato}</td>
            <td>{props.osso.integro}</td>
            <td>{props.osso.lvlIntegrita}</td>
            <td>{props.osso.lvlQualita}</td>
            <td>{props.osso.restaurato}</td>
            <td>{props.osso.catalogazioneDescrizione}</td>
            <td>{props.osso.indagineRadiologica}</td>
            <td>{props.osso.campionamento}</td>
            <td>{props.osso.altreAnalisi}</td>

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
                            <p>{props.osso.nome}</p>
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
                                            <input className='form-control' defaultValue={props.osso.nome} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.lato} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.integro} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.lvlIntegrita} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.lvlQualita} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.restaurato} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.catalogazioneDescrizione} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.indagineRadiologica} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.campionamento} />
                                        </td>
                                        <td>
                                            <input className='form-control' defaultValue={props.osso.altreAnalisi} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Annulla
                            </Button>
                            <Button variant="danger" type="submit">ELIMINA</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </tr>
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