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

    const propsLink = props
    useEffect(() => {
        propsLink.onIndividuoChange(sessoBiologico, classeDiEtà, origineBiologica, origineGeografica)
    }, [classeDiEtà, origineBiologica, origineGeografica, sessoBiologico]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-2'>Profilo biologico</h5>
            <Table bordered striped size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Sesso biologioco</th>
                        <td>
                            <Form.Select required aria-label="Default select example" defaultValue={props.individuo.sessoBiologico} onChange={(e) => setSessoBiologico(e.target.value)}>
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
                        <td>Età stimata (MIN)</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Età stimata (MAX)</td>
                        <td>---</td>
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
                        <td>Statura (MIN)</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Statura (MAX)</td>
                        <td>---</td>
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
                        <td>Età stimata (MIN)</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Età stimata (MAX)</td>
                        <td>---</td>
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
                        <td>Statura (MIN)</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Statura (MAX)</td>
                        <td>---</td>
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

};

export default ProfiloBiologicoIndividuo;