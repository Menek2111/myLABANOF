import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

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



    useEffect(() => {
        props.onIndividuoChange(nome, luogo, data)
    }, [nome, luogo, data, props]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-4'>Generalità</h5>
            <Table bordered striped hover size="sm">
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

                </tbody>
            </Table>
            <h5 className='border-bottom my-4'>Tomba di appartenenza</h5>
            <Table bordered striped hover size="sm">
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
            <h5 className='border-bottom mb-4'>Generalità</h5>
            <Table bordered striped hover size="sm">
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

                </tbody>
            </Table>
            <h5 className='border-bottom my-4'>Tomba di appartenenza</h5>
            <Table bordered striped hover size="sm">
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
        {checkEditableValue()}
    </div>
}


export default GeneralitàIndividuo;