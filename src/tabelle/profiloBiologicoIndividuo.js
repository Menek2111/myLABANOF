import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function ProfiloBiologicoIndividuo(props) {

    function checkEditableValue() {
        if (props.editable) {
            return editableTable()
        } else {
            return uneditableTable()
        }
    }

    const [sessoBiologico, setSessoBiologico] = useState(props.individuo.sessoBiologico)
    const [classeDiEtà, setClasseDiEtà] = useState(props.individuo.classeDiEta)
    const [origineBiologica, setOrigineBiologica] = useState(props.individuo.origineBiologica)
    const [origineGeografica, setOrigineGeografica] = useState(props.individuo.origineGeografica)

    const [etaMin, setEtaMin] = useState(props.individuo.etaMin)
    const [etaMax, setEtaMax] = useState(props.individuo.etaMax)

    const [staturaMin, setStaturaMin] = useState(props.individuo.staturaMin)
    const [staturaMax, setStaturaMax] = useState(props.individuo.staturaMax)

    const propsLink = props
    useEffect(() => {
        propsLink.onIndividuoChange(sessoBiologico, classeDiEtà, origineBiologica, origineGeografica, etaMin, etaMax, staturaMin, staturaMax)
    }, [sessoBiologico, classeDiEtà, origineBiologica, origineGeografica, etaMin, etaMax, staturaMin, staturaMax]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Profilo biologico</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Sesso biologioco</th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={props.individuo.sessoBiologico} onChange={(e) => setSessoBiologico(e.target.value)}>
                                <option></option>
                                <option value="Femminile">Femminile</option>
                                <option value="Maschile">Maschile</option>
                                <option value="Incerto">Incerto</option>
                            </Form.Select>
                        </td>
                    </tr>
                    <tr>
                        <th>Classe di età</th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={props.individuo.classeDiEta} onChange={(e) => setClasseDiEtà(e.target.value)}>
                                <option></option>
                                <option>0 – 2</option>
                                <option>3 – 6</option>
                                <option>7 – 11</option>
                                <option>12 – 20 </option>
                                <option>21 – 30 </option>
                                <option>31 – 45</option>
                                <option>46 – 60</option>
                                <option>61 – 80</option>
                                <option>{'>'} 80</option>
                            </Form.Select>
                        </td>

                    </tr>
                    <tr>
                        <th>Età stimata (MIN)</th>
                        <td>
                            <input className="form-control" type="number" defaultValue={props.individuo.etaMin} onChange={(e) => setEtaMin(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Età stimata (MAX)</th>
                        <td>
                            <input className="form-control" type="number" defaultValue={props.individuo.etaMax} onChange={(e) => setEtaMax(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Origine biologica</th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={props.individuo.origineBiologica} onChange={(e) => setOrigineBiologica(e.target.value)}>
                                <option></option>
                                <option value="Europea">Europea</option>
                                <option value="Africano">Africano</option>
                                <option value="Asiatico">Asiatico</option>
                                <option value="Indeterminato">Indeterminato</option>
                            </Form.Select>
                        </td>
                    </tr>
                    <tr>
                        <th>Origine geografica</th>
                        <td><input className="form-control" defaultValue={props.individuo.origineGeografica} onChange={(e) => setOrigineGeografica(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Statura MIN (cm)</th>
                        <td className="d-flex">
                            <input className="form-control" type="number" defaultValue={props.individuo.staturaMin} onChange={(e) => setStaturaMin(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Statura MAX (cm)</th>
                        <td>
                            <input className="form-control" type="number" defaultValue={props.individuo.staturaMax} onChange={(e) => setStaturaMax(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }


    function uneditableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Profilo biologico</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Sesso biologioco</th>
                        <td>{props.individuo.sessoBiologico}</td>
                    </tr>
                    <tr>
                        <th>Classe di età</th>
                        <td>{props.individuo.classeDiEta}</td>
                    </tr>
                    <tr>
                        <th>Età stimata (MIN)</th>
                        <td>{props.individuo.etaMin}</td>
                    </tr>
                    <tr>
                        <th>Età stimata (MAX)</th>
                        <td>{props.individuo.etaMax}</td>
                    </tr>
                    <tr>
                        <th>Origine biologica</th>
                        <td>{props.individuo.origineBiologica}</td>
                    </tr>
                    <tr>
                        <th>Origine geografica</th>
                        <td>{props.individuo.origineGeografica}</td>
                    </tr>
                    <tr>
                        <th>Statura (MIN)</th>
                        <td>{props.individuo.staturaMin}</td>
                    </tr>
                    <tr>
                        <th>Statura (MAX)</th>
                        <td>{props.individuo.staturaMax}</td>
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

};

export default ProfiloBiologicoIndividuo;