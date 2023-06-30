import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'

function CaratteristicheDellaDeposizione(props) {

    function checkEditableValue() {
        if (props.editable) {
            return editableTable()
        } else {
            return uneditableTable()
        }
    }

    const [luogoRitrovamento, setLuogoRitrovamento] = useState(props.individuo.luogoRitrovamento);
    const [tipoSepoltura, setTipoSepolutura] = useState(props.individuo.tipoSepoltura)
    const [tipoTerreno, setTipoTerreno] = useState(props.individuo.tipoTerreno)
    const [fauna, setFauna] = useState(props.individuo.fauna)
    const [clima, setClima] = useState(props.individuo.clima)
    const [effettiPersonali, setEffettiPersonali] = useState(props.individuo.effettiPersonali)
    const [ossaAnimali, SetOssaAnimali] = useState(props.individuo.ossaAnimali)
    const [informazioniAnteMortem, setInformazioniAnteMortem] = useState(props.individuo.informazioniAnteMortem)
    const [altro, setAltro] = useState(props.individuo.altro)

    const propsLink = props;
    useEffect(() => {
        propsLink.onIndividuoChange(luogoRitrovamento, tipoSepoltura, tipoTerreno, fauna, clima, effettiPersonali, ossaAnimali, informazioniAnteMortem, altro)
    }, [luogoRitrovamento, tipoSepoltura, tipoTerreno, fauna, clima, effettiPersonali, ossaAnimali, informazioniAnteMortem, altro]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Generalità</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Luogo ritrovamento</th>
                        <td><input className="form-control" defaultValue={luogoRitrovamento} onChange={(e) => setLuogoRitrovamento(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Tipo sepoltura</th>
                        <td><input className="form-control" defaultValue={tipoSepoltura} onChange={(e) => setTipoSepolutura(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Tipo terreno</th>
                        <td><input className="form-control" defaultValue={tipoTerreno} onChange={(e) => setTipoTerreno(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Fauna</th>
                        <td><input className="form-control" defaultValue={fauna} onChange={(e) => setFauna(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Clima</th>
                        <td><input className="form-control" defaultValue={clima} onChange={(e) => setClima(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Effetti personali</th>
                        <td><input className="form-control" defaultValue={effettiPersonali} onChange={(e) => setEffettiPersonali(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Ossa animali</th>
                        <td><input className="form-control" defaultValue={ossaAnimali} onChange={(e) => SetOssaAnimali(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Informazioni ante mortem</th>
                        <td><input className="form-control" defaultValue={informazioniAnteMortem} onChange={(e) => setInformazioniAnteMortem(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Altro</th>
                        <td><input className="form-control" defaultValue={altro} onChange={(e) => setAltro(e.target.value)} /></td>
                    </tr>
                </tbody>
            </Table>

        </div>)
    }

    function uneditableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Caratteristiche della sepoltura</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Luogo ritrovamento</th>
                        <td>{props.individuo.luogoRitrovamento}</td>
                    </tr>
                    <tr>
                        <th>Tipo sepoltura</th>
                        <td>{props.individuo.tipoSepoltura}</td>
                    </tr>
                    <tr>
                        <th>Tipo terreno</th>
                        <td>{props.individuo.tipoTerreno}</td>
                    </tr>
                    <tr>
                        <th>Fauna</th>
                        <td>{props.individuo.fauna}</td>
                    </tr>
                    <tr>
                        <th>Clima</th>
                        <td>{props.individuo.clima}</td>
                    </tr>
                    <tr>
                        <th>Effetti personali</th>
                        <td>{props.individuo.effettiPersonali}</td>
                    </tr>
                    <tr>
                        <th>Ossa animali</th>
                        <td>{props.individuo.ossaAnimali}</td>
                    </tr>
                    <tr>
                        <th>Informazioni ante mortem</th>
                        <td>{props.individuo.informazioniAnteMortem}</td>
                    </tr>
                    <tr>
                        <th>Altro</th>
                        <td>{props.individuo.altro}</td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }

    return <div className="col-6 mt-5">
        <div className="border rounded p-2">
            {checkEditableValue()}

        </div>
    </div>
}


export default CaratteristicheDellaDeposizione;