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

    useEffect(() => {
        props.onIndividuoChange(sessoBiologico, classeDiEtà, origineBiologica, origineGeografica)

    }, [sessoBiologico, classeDiEtà, origineBiologica, origineGeografica, saveMod]);

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-4'>Profilo biologico</h5>
            <Table bordered striped hover size="sm">
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
                        <td><input className="form-control" defaultValue={props.individuo.classeDiEta} onChange={(e) => setClasseDiEtà(e.target.value)} /></td>

                    </tr>
                    <tr>
                        <th>Età stimata (MIN)</th>
                        <td>---</td>
                    </tr>
                    <tr>
                        <th>Età stimata (MAX)</th>
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
                        <th>Statura (MIN)</th>
                        <td>---</td>
                    </tr>
                    <tr>
                        <th>Statura (MAX)</th>
                        <td>---</td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }


    function uneditableTable() {
        return (<div>
            <h5 className='border-bottom mb-4'>Profilo biologico</h5>
            <Table bordered striped hover size="sm">
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
                        <td>---</td>
                    </tr>
                    <tr>
                        <th>Età stimata (MAX)</th>
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
                        <th>Statura (MIN)</th>
                        <td>---</td>
                    </tr>
                    <tr>
                        <th>Statura (MAX)</th>
                        <td>---</td>
                    </tr>
                </tbody>
            </Table>
        </div>)
    }


    return <div className="col-6">
        {checkEditableValue()}
    </div>

};

export default ProfiloBiologicoIndividuo;