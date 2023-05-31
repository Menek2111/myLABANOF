import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ConnectionManager from '../../api/ConnectionManager';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DettagliOsso(props) {

    function checkValue(value) {
        if (value === 0) {
            //alert(' false')
            return false
        } else {
            return true
        }
    }

    const [lato, setLato] = useState(props.osso.lato)
    const [integro, setIntegro] = useState(checkValue(props.osso.integro))
    const [lvlIntegrita, setLvlIntegrita] = useState(props.osso.lvlIntegrita)
    const [lvlQualita, setLvlQualita] = useState(props.osso.lvlQualita)
    const [restaurato, setRestaurato] = useState(checkValue(props.osso.restaurato))
    const [catalogazioneDescrizione, setCatalogazioneDescrizione] = useState(props.osso.catalogazioneDescrizione)
    const [indagineRadiologica, setIndagineRadiologica] = useState(props.osso.indagineRadiologica)
    const [campionamento, setCampionamento] = useState(props.osso.campionamento)
    const [altreAnalisi, setAltreAnalisi] = useState(props.osso.altreAnalisi)

    const [editable, setEditable] = useState(false)

    const editOsso = async () => {

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
            lato: lato,
            integro: booleanToValue(integro),
            lvlIntegrita: lvlIntegrita,
            lvlQualita: lvlQualita,
            restaurato: booleanToValue(restaurato),
            catalogazioneDescrizione: catalogazioneDescrizione,
            indagineRadiologica: indagineRadiologica,
            campionamento: campionamento,
            altreAnalisi: altreAnalisi,
            individuo: props.osso.individuo,
            id: props.osso.id
        }

        console.log('parametri', params)

        await cm.editOsso(JSON.stringify(params)).then(res => {
            console.log(res)
            if (res.response === 'success') {
                console.log('sql', res.sql)
                window.location.reload(false);
            }
        })
    }

    useEffect(() => {


    }, [lato, integro, lvlIntegrita, lvlQualita, restaurato, catalogazioneDescrizione, indagineRadiologica, campionamento, altreAnalisi]);


    return (
        <Form className='col-3' onSubmit={editOsso}>
            {editable ? (
                <div>
                    <div className='border-bottom mb-2 d-flex justify-content-between'>
                        <h5 className=''>Informazioni</h5>
                        <div>
                            <Button variant='outline-danger' className='p-1 mb-1 mx-1' onClick={() => setEditable((state) => !state)} >Annulla</Button>
                            <Button className='p-1 mb-1' type='submit' >SALVA</Button>
                        </div>
                    </div>

                    <Table bordered striped hover size="sm">
                        <tbody>
                            <tr>
                                <th className='w-25'>Osso</th>
                                <td><input className='form-control' defaultValue={props.osso.nome} disabled /></td>
                            </tr>
                            <tr>
                                <th>Materiale rivenuto</th>
                                <td>
                                    <Form.Select defaultValue={props.osso.lato} onChange={(e) => setLato(e.target.value)}>
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
                                        defaultChecked={integro}
                                        onChange={() => {
                                            setIntegro((state) => !state)
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Livello di integrità</th>
                                <td><input type='number' className='form-control' defaultValue={props.osso.lvlIntegrita} onChange={(e) => setLvlIntegrita(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Livello di qualità</th>
                                <td><input type='number' className='form-control' defaultValue={props.osso.lvlQualita} onChange={(e) => setLvlQualita(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Restaurato</th>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        defaultChecked={restaurato}
                                        onChange={() => setRestaurato((state) => !state)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Catalogazione e descrizione</th>
                                <td><input className='form-control' defaultValue={props.osso.catalogazioneDescrizione} onChange={(e) => setCatalogazioneDescrizione(e.target.value)} /></td>
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
                                <th>Campionamento</th>
                                <td><input className='form-control' defaultValue={props.osso.campionamento} onChange={(e) => setCampionamento(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Altre analisi</th>
                                <td><input className='form-control' defaultValue={props.osso.altreAnalisi} onChange={(e) => setAltreAnalisi(e.target.value)} /></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div>
                    <div className='border-bottom mb-2 d-flex justify-content-between'>
                        <h5 className=''>Informazioni</h5>
                        <Button className='p-1 mb-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                    </div>

                    <Table bordered striped hover size="sm">
                        <tbody>
                            <tr>
                                <th className='w-25'>Osso</th>
                                <td>{props.osso.nome}</td>
                            </tr>
                            <tr>
                                <th>Materiale rivenuto</th>
                                <td>{props.osso.lato}</td>
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
                                <th>Restaurato</th>
                                <td><Form.Check
                                    type="checkbox"
                                    defaultChecked={restaurato}
                                    disabled /></td>
                            </tr>
                            <tr>
                                <th>Catalogazione e descrizione</th>
                                <td>{props.osso.catalogazioneDescrizione}</td>
                            </tr>
                            <tr>
                                <th>Indagine radiologica</th>
                                <td>{props.osso.indagineRadiologica}</td>
                            </tr>
                            <tr>
                                <th>Campionamento</th>
                                <td>{props.osso.campionamento}</td>
                            </tr>
                            <tr>
                                <th>Altre analisi</th>
                                <td>{props.osso.altreAnalisi}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </Form>
    )
}
export default DettagliOsso;