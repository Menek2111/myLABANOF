import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import DettagliOsso from './dettagliOsso';
import ModalDeleteOsso from '../../UI/modalDeleteOsso';
import Traumi from './traumi/traumi';
import Patologie from './patologie/patologie';


function RigaCranio(props) {

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    }, []);

    const valueToBoolean = (val) => {
        if (val == 1) {
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

                    <DettagliOsso osso={props.osso} callback={props.callback} />

                    <div className='col'>

                        <Traumi osso={props.osso.id} />

                        <Patologie osso={props.osso.id} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Chiudi
                    </Button>

                    <ModalDeleteOsso osso={props.osso.id} />
                </Modal.Footer>
            </Modal>
        </tr >
    )

}
export default RigaCranio;