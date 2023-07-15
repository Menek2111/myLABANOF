import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import ConnectionManager from '../api/ConnectionManager';


function GeneralitàIndividuo(props) {

    function checkEditableValue() {
        if (props.editable) {
            return editableTable()
        } else {
            return uneditableTable()
        }
    }

    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllTombe();
        return res;
    }
    const [tombe, setTombe] = useState()

    const [tomba, setTomba] = useState(props.individuo.tomba)

    const [nome, setNome] = useState(props.individuo.nome)
    const [luogo, setLuogo] = useState(props.individuo.luogoRinvenimento)
    const [data, setData] = useState(props.individuo.dataRinvenimento)

    const [stato, setStato] = useState(props.individuo.stato)

    const [pesoIndividuo, setPesoIndividuo] = useState(props.individuo.pesoIndividuo)
    const [pesoCremazione, setPesoCremazione] = useState(props.individuo.pesoCremazione)
    const [volumeCremazione, setVolumeCremazione] = useState(props.individuo.pesoCremazione)

    const propsLink = props
    useEffect(() => {
        propsLink.onIndividuoChange(nome, luogo, data, stato, tomba, pesoIndividuo, pesoCremazione, volumeCremazione)
        getTombe().then(res => {
            console.log('GetTombe', res)
            if (res.response === 'success') {
                setTombe(res.results)
            } else {
                setTombe([])
            }
        })
    }, [data, luogo, nome, stato, tomba, pesoIndividuo, pesoCremazione, volumeCremazione]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Generalità</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Individuo N°</th>
                        <td><input id="inputNome" className="form-control" defaultValue={props.individuo.nome} onChange={(e) => setNome(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Luogo rinvenimento</th>
                        <td><input id="inputLuogo" className="form-control" defaultValue={props.individuo.luogoRinvenimento} onChange={(e) => setLuogo(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Data rinvenimento</th>
                        <td><input id="inputData" type="date" className="form-control" defaultValue={props.individuo.dataRinvenimento} onChange={(e) => setData(e.target.value)} /></td>
                    </tr>

                    <tr>
                        <th>
                            Stato
                        </th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={props.individuo.stato} onChange={(e) => setStato(e.target.value)}>
                                <option></option>
                                <option>Cadavere</option>
                                <option>Mummificato\corificato</option>
                                <option>Saponificato</option>
                                <option>Carbonizzato</option>
                                <option>Scheletrizzato</option>
                                <option>Cremazione</option>
                            </Form.Select>
                        </td>
                    </tr>
                    <tr>
                        <th>Peso individuo (gr)</th>
                        <td><input type="number" id="inputLuogo" className="form-control" defaultValue={props.individuo.pesoIndividuo} onChange={(e) => setPesoIndividuo(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Peso cremazione (gr)</th>
                        <td><input type="number" id="inputLuogo" className="form-control" defaultValue={props.individuo.pesoCremazione} onChange={(e) => setPesoCremazione(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Volume cremazione (gr)</th>
                        <td><input type="number" id="inputLuogo" className="form-control" defaultValue={props.individuo.volumeCremazione} onChange={(e) => setVolumeCremazione(e.target.value)} /></td>
                    </tr>
                </tbody>
            </Table>
            <h5 className='border-bottom my-2'>Tomba di appartenenza</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Tomba</th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={tomba} onChange={(e) => setTomba(e.target.value)}>
                                <option></option>
                                {tombe ? (
                                    tombe.map(tb => (<option value={tb.id}>{tb.nome}</option>))
                                ) : (<></>)}
                            </Form.Select>
                        </td>
                    </tr>

                </tbody>
            </Table>
        </div>)
    }

    function getNomeTombaById() {
        let out = ''
        for (let i = 0; i < tombe.length; i++) {
            if (tombe[i].id == props.individuo.tomba) {
                out = tombe[i].nome
            }
        }
        return out
    }

    function uneditableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Generalità</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className="w-25">Individuo N°</th>
                        <td>{props.individuo.nome}</td>
                    </tr>
                    <tr>
                        <th>Luogo rinvenimento</th>
                        <td>{props.individuo.luogoRinvenimento}</td>
                    </tr>
                    <tr>
                        <th>Data rinvenimento</th>
                        <td>{props.individuo.dataRinvenimento}</td>
                    </tr>
                    <tr>
                        <th>Stato</th>
                        <td>{props.individuo.stato}</td>
                    </tr>
                    <tr>
                        <th>Peso individuo (gr)</th>
                        <td>{props.individuo.pesoIndividuo}</td>
                    </tr>
                    <tr>
                        <th>Peso cremazione (gr)</th>
                        <td>{props.individuo.pesoCremazione}</td>
                    </tr>
                    <tr>
                        <th>Volume cremazione (gr)</th>
                        <td>{props.individuo.volumeCremazione}</td>
                    </tr>

                </tbody>
            </Table>

            <h5 className='border-bottom my-2'>Tomba di appartenenza</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className="w-25">Tomba</th>
                        <td>{tombe ? (getNomeTombaById()) : (<></>)}</td>
                    </tr>
                </tbody>
            </Table>


        </div>)
    }

    return <div className={props.col}>
        <div className="border rounded p-2">
            {checkEditableValue()}

        </div>
    </div>
}


export default GeneralitàIndividuo;