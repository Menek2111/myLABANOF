import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import ConnectionManager from '../../api/ConnectionManager';

import ModalDeleteOsso from '../../UI/modalDeleteOsso';
import Traumi from './traumi/traumi';
import Patologie from './patologie/patologie';
import ModalDeleteDente from '../../UI/modalDeleteDente';


function RigaDente(props) {

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.callback()
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const valueToBoolean = (val) => {
        if (val == 1) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
    }, []);

    return (
        <tr onClick={handleShow} style={{ cursor: 'pointer' }}>
            <td>{props.osso.nome}</td>
            <td>{props.osso.datazioneCaduta}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    checked={valueToBoolean(props.osso.integro)}
                    disabled
                /></td>
            <td>{props.osso.lvlIntegrita}</td>
            <td>{props.osso.lvlQualita}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    checked={valueToBoolean(props.osso.modificazioniOdontoiatrici)}
                    disabled
                /></td>
            <td>
                <Form.Check
                    type="checkbox"
                    checked={valueToBoolean(props.osso.restauriOdontoiatrici)}
                    disabled
                /></td>
            <td>{props.osso.commento}</td>
            <td>{props.osso.indagineRadiologica}</td>
            <td>
                {props.osso.campionamento}
            </td>

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
                        <p>Dente numero: {props.osso.nome}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='row'>

                    <div className='col-4'>
                        {<DettagliOsso osso={props.osso} callback={props.callback} />}
                    </div>

                    <div className='col'>
                        <Traumi osso={props.osso.id} distretto={props.osso.distretto} />

                        <Patologie osso={props.osso.id} distretto={props.osso.distretto} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Chiudi
                    </Button>

                    <ModalDeleteDente osso={props.osso.id} />
                </Modal.Footer>
            </Modal>
        </tr >
    )
}

function DettagliOsso(props) {

    function checkValue(value) {
        if (value == 1) {
            return true
        } else {
            return false
        }
    }

    const [integro, setIntegro] = useState(checkValue(props.osso.integro))
    const [lvlIntegrita, setLvlIntegrita] = useState(props.osso.lvlIntegrita)
    const [lvlQualita, setLvlQualita] = useState(props.osso.lvlQualita)
    const [commento, setCommento] = useState(props.osso.commento)
    const [indagineRadiologica, setIndagineRadiologica] = useState(props.osso.indagineRadiologica)
    const [campionamento, setCampionamento] = useState(props.osso.campionamento)
    const [modificazioniOdontoiatrici, setModificazioniOdontoiatrici] = useState(checkValue(props.osso.modificazioniOdontoiatrici))
    const [restauriOdontoiatrici, setRestauriOdontoiatrici] = useState(checkValue(props.osso.restauriOdontoiatrici))

    const [editable, setEditable] = useState(false)

    const editOsso = async (event) => {
        event.preventDefault();
        //alert(integro)

        let cm = new ConnectionManager();
        let booleanToValue = (val) => {
            if (val) {
                return 1
            } else {
                return 0
            }
        }
        var params = {
            tipoOsso: props.osso.tipoOsso,
            integro: booleanToValue(integro),
            lvlIntegrita: lvlIntegrita,
            lvlQualita: lvlQualita,
            commento: commento,
            indagineRadiologica: indagineRadiologica,
            campionamento: campionamento,
            modificazioniOdontoiatrici: booleanToValue(modificazioniOdontoiatrici),
            restauriOdontoiatrici: booleanToValue(restauriOdontoiatrici),
            id: props.osso.id
        }
        await cm.editDente(JSON.stringify(params)).then(res => {
            console.log('editDente', res)
            if (res.response === 'success') {
                props.callback()
                setEditable(false)
            }
        })
    }

    useEffect(() => {
    }, []);

    let checkUser = () => {

        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':

                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return (<div></div>)
                } else {
                    return <Button className='p-1 mb-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                }
            case '3':
                return <Button className='p-1 mb-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
            default:
                return <></>
        }


    }

    return (
        <Form onSubmit={editOsso}>
            {editable ? (
                <div>
                    <div className='border-bottom mb-2 d-flex justify-content-between'>
                        <h5 className=''>Informazioni</h5>
                        <div>
                            <Button variant='outline-danger' className='p-1 mb-1 mx-1' onClick={() => setEditable((state) => !state)} >Annulla</Button>
                            <Button className='p-1 mb-1' type='submit' >SALVA</Button>
                        </div>
                    </div>

                    <div className='row border rounded p-2'>
                        <Table className='col' bordered striped size="sm">
                            <tbody>
                                <tr>
                                    <th className='w-25'>Dente</th>
                                    <td><input className='form-control' defaultValue={props.osso.nome} disabled /></td>
                                </tr>
                                <tr>
                                    <th>Integro</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            defaultChecked={integro}
                                            onChange={() => {
                                                setIntegro((state) => !state)
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Livello di integrità</th>
                                    <td><input type='number' min='0' max='3' className='form-control' defaultValue={props.osso.lvlIntegrita} onChange={(e) => setLvlIntegrita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Livello di qualità</th>
                                    <td><input type='number' min='0' max='3' className='form-control' defaultValue={props.osso.lvlQualita} onChange={(e) => setLvlQualita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Modificazioni odontoiatrici</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            defaultChecked={modificazioniOdontoiatrici}
                                            onChange={() => setModificazioniOdontoiatrici((state) => !state)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Restaurati odontoiatrici</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            defaultChecked={restauriOdontoiatrici}
                                            onChange={() => setRestauriOdontoiatrici((state) => !state)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Commento</th>
                                    <td><input className='form-control' defaultValue={props.osso.commento} onChange={(e) => setCommento(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Indagine radiologica</th>
                                    <td>
                                        <Form.Select defaultValue={props.osso.indagineRadiologica} onChange={(e) => setIndagineRadiologica(e.target.value)}>
                                            <option></option>
                                            <option>RX</option>
                                            <option>TAC</option>
                                            <option>RMN</option>
                                            <option>ECO</option>
                                            <option>microTAC</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Prelievi/Campionamenti</th>
                                    <td><input className='form-control' defaultValue={props.osso.campionamento} onChange={(e) => setCampionamento(e.target.value)} /></td>
                                </tr>
                            </tbody >
                        </Table >
                    </div >
                </div >
            ) : (
                <div>
                    <div className='border-bottom mb-2 d-flex justify-content-between'>
                        <h5 className=''>Informazioni</h5>
                        {checkUser()}
                    </div>

                    <div className='row border rounded p-2'>
                        <Table className='col' bordered striped size="sm">

                            <tbody>
                                <tr>
                                    <th className='w-25'>Dente</th>
                                    <td>{props.osso.nome}</td>
                                </tr>

                                <tr>
                                    <th>Integro</th>
                                    <td><Form.Check
                                        type="checkbox"
                                        defaultChecked={integro}
                                        disabled /></td>
                                </tr>
                                <tr>
                                    <th>Livello di integrità</th>
                                    <td>{props.osso.lvlIntegrita}</td>
                                </tr>
                                <tr>
                                    <th>Livello di qualità</th>
                                    <td>{props.osso.lvlQualita}</td>
                                </tr>
                                <tr>
                                    <th>Modificazioni odontoiatrici</th>
                                    <td><Form.Check
                                        type="checkbox"
                                        defaultChecked={restauriOdontoiatrici}
                                        disabled /></td>
                                </tr>
                                <tr>
                                    <th>Restauri odontoiatrici</th>
                                    <td><Form.Check
                                        type="checkbox"
                                        defaultChecked={restauriOdontoiatrici}
                                        disabled /></td>
                                </tr>
                                <tr>
                                    <th>Commento</th>
                                    <td>{props.osso.commento}</td>
                                </tr>
                                <tr>
                                    <th>Indagine radiologica</th>
                                    <td>{props.osso.indagineRadiologica}</td>
                                </tr>
                                <tr>
                                    <th>Datazione caduta</th>
                                    <td>{props.osso.datazioneCaduta}</td>
                                </tr>
                                <tr>
                                    <th>Prelievi/Campionamenti</th>
                                    <td>{props.osso.campionamento}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
            }
        </Form >
    )
}

export default RigaDente;