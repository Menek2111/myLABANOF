import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import ConnectionManager from '../api/ConnectionManager';

function ModalCreateDente(props) {
    useEffect(() => {

    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        resetState()
    }
    const handleShow = () => setShow(true);

    const [nome, setNome] = useState('')
    const [integro, setIntegro] = useState('')
    const [lvlIntegrita, setLvlIntegrita] = useState('')
    const [lvlQualita, setLvlQualita] = useState()
    const [commento, setCommento] = useState()
    const [indagineRadiologica, setIndagineRadiologica] = useState()
    const [campionamento, setCampionamento] = useState()
    const [modificazioniOdontoiatrici, setModificazioniOdontoiatrici] = useState()
    const [restauriOdontoiatrici, setRestauriOdontoiatrici] = useState()

    let resetState = () => {
        setNome('')
        setIntegro('')
        setLvlIntegrita('')
        setLvlQualita('')
        setCommento('')
        setIndagineRadiologica('')
        setCampionamento('')
        setModificazioniOdontoiatrici('')
        setRestauriOdontoiatrici('')
    }

    const createOsso = async (event) => {
        event.preventDefault();

        let cm = new ConnectionManager();
        var params = {
            tipoDente: nome,
            integro: integro,
            lvlIntegrita: lvlIntegrita,
            lvlQualita: lvlQualita,
            commento: commento,
            indagineRadiologica: indagineRadiologica,
            campionamento: campionamento,
            modificazioniOdontoiatrici: modificazioniOdontoiatrici,
            restauriOdontoiatrici: restauriOdontoiatrici,
            individuo: props.individuo
        }
        await cm.createDente(JSON.stringify(params)).then(res => {
            console.log('CreateOsso', res)
            switch (res.response) {
                case 'success':
                    props.callback()
                    handleClose()
                    break
                case 'alreadyExist':
                    alert('Questo dente è già presente...')
                    break
                default:
                    break
            }

        })
    }

    return (
        <div onClick={handleShow} >
            <Button>Aggiungi dente</Button>
            <Modal
                onClick={e => e.stopPropagation()}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p>Creazione osso: </p>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={createOsso}>
                    <Modal.Body>
                        <Table bordered striped size="sm">
                            <tbody>
                                <tr>
                                    <th className='w-25'>Dente</th>
                                    <td>
                                        <Form.Select onChange={(e) => setNome(e.target.value)} required>
                                            <option></option>
                                            {props.tipoOssa.map(tipoOsso => (<option key={tipoOsso.id} value={tipoOsso.id}>{tipoOsso.nome}</option>))}
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Integro</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => {
                                                setIntegro((state) => !state)
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Livello di integrità</th>
                                    <td><input type="number" max='3' min='0' className='form-control' onChange={(e) => setLvlIntegrita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Livello di qualità</th>
                                    <td><input type="number" max='3' min='0' className='form-control' onChange={(e) => setLvlQualita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Modificazioni odontoiatrici</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => setModificazioniOdontoiatrici((state) => !state)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Restauri odontoiatrici</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => setRestauriOdontoiatrici((state) => !state)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Commenti</th>
                                    <td><input className='form-control' onChange={(e) => setCommento(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Indagine radiologica</th>
                                    <td>
                                        <Form.Select onChange={(e) => setIndagineRadiologica(e.target.value)}>
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
                                    <th>Campionamento</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => setCampionamento((state) => !state)} />
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
    )
}
export default ModalCreateDente;