import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'

function GeneralitàIndividuo(props) {

    function checkEditableValue() {
        if (props.editable) {
            return editableTable()
        } else {
            return uneditableTable()
        }
    }

    const [nome, setNome] = useState(props.individuo.nome)
    const [luogo, setLuogo] = useState(props.individuo.luogoRinvenimento)
    const [data, setData] = useState(props.individuo.dataRinvenimento)

    const [stato, setStato] = useState(props.individuo.stato)

    const propsLink = props

    useEffect(() => {
        propsLink.onIndividuoChange(nome, luogo, data, stato)
    }, [data, luogo, nome, stato]);

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
                                <option>Cadavere</option>
                                <option>Mummificato\corificato</option>
                                <option>Saponificato</option>
                                <option>Carbonizzato</option>
                                <option>Scheletrizzato</option>
                                <option>Cremazione</option>
                            </Form.Select>
                        </td>
                    </tr>


                </tbody>
            </Table>
            <h5 className='border-bottom my-2'>Tomba di appartenenza</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Tomba</th>
                        <td>{props.tomba.nome}</td>
                    </tr>
                    <tr>
                        <th>N° minimo di individui</th>
                        <td>{props.tomba.nMinIndividui}</td>
                    </tr>
                    <tr>
                        <th>Coordinate</th>
                        <td>{props.tomba.coordinate}</td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }

    function uneditableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Generalità</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Individuo N°</th>
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

                </tbody>
            </Table>
            <h5 className='border-bottom my-2'>Tomba di appartenenza</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className="w-25">Tomba</th>
                        <td>{props.tomba.nome}</td>
                    </tr>
                    <tr>
                        <th>N° minimo di individui</th>
                        <td>{props.tomba.nMinIndividui}</td>
                    </tr>
                    <tr >
                        <th>Coordinate</th>
                        <td>{props.tomba.coordinate}</td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }

    return <div className="col-6">
        <div className="border rounded p-2">
            {checkEditableValue()}

        </div>
    </div>
}


export default GeneralitàIndividuo;