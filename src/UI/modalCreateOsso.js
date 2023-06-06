import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import ConnectionManager from '../api/ConnectionManager';

function ModalCreateOsso(props) {
    useEffect(() => {

    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nome, setNome] = useState()
    const [lato, setLato] = useState()
    const [integro, setIntegro] = useState()
    const [lvlIntegrita, setLvlIntegrita] = useState()
    const [lvlQualita, setLvlQualita] = useState()
    const [restaurato, setRestaurato] = useState()
    const [catalogazioneDescrizione, setCatalogazioneDescrizione] = useState()
    const [indagineRadiologica, setIndagineRadiologica] = useState()
    const [campionamento, setCampionamento] = useState()
    const [altreAnalisi, setAltreAnalisi] = useState()

    const createOsso = async () => {
        let cm = new ConnectionManager();
        var params = {
            tipoOsso: nome,
            lato: lato,
            integro: integro,
            lvlIntegrita: lvlIntegrita,
            lvlQualita: lvlQualita,
            restaurato: restaurato,
            catalogazioneDescrizione: catalogazioneDescrizione,
            indagineRadiologica: indagineRadiologica,
            campionamento: campionamento,
            altreAnalisi: altreAnalisi,
            individuo: props.individuo
        }
        await cm.createOsso(JSON.stringify(params)).then(res => {

            if (res.response === 'success') {
                console.log('sql', res.sql)
                window.location.reload(false);
            }
        })
    }

    return (
        <div onClick={handleShow} >
            <Button>Aggiungi osso</Button>
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
                        <Table bordered striped hover size="sm">
                            <tbody>
                                <tr>
                                    <th className='w-25'>Osso</th>
                                    <td>
                                        <Form.Select onChange={(e) => setNome(e.target.value)} required>
                                            <option></option>
                                            {props.tipoOssa.map(tipoOsso => (<option key={tipoOsso.id} value={tipoOsso.id}>{tipoOsso.nome}</option>))}
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Materiale rivenuto</th>
                                    <td>
                                        <Form.Select onChange={(e) => setLato(e.target.value)} required>
                                            <option></option>
                                            <option>Destro</option>
                                            <option>Sinistro</option>
                                            <option>Unico</option>
                                            <option>Incerto</option>
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
                                    <td><input type="number" className='form-control' onChange={(e) => setLvlIntegrita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Livello di qualità</th>
                                    <td><input type="number" className='form-control' onChange={(e) => setLvlQualita(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Restaurato</th>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => setRestaurato((state) => !state)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Catalogazione e descrizione</th>
                                    <td><input className='form-control' onChange={(e) => setCatalogazioneDescrizione(e.target.value)} /></td>
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
                                    <td><input className='form-control' onChange={(e) => setCampionamento(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th>Altre analisi</th>
                                    <td><input className='form-control' onChange={(e) => setAltreAnalisi(e.target.value)} /></td>
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
export default ModalCreateOsso;