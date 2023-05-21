import React from "react";
import Table from 'react-bootstrap/Table';

function ProfiloBiologicoIndividuo(props) {

    function checkEditableValue() {
        if (props.editable) {
            return editableTable()
        } else {
            return uneditableTable()
        }
    }

    function editableTable() {
        return (<div>
            <h5 className='border-bottom mb-4'>Profilo biologico</h5>
            <Table bordered striped hover size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Sesso biologioco</th>
                        <td><input className="form-control" value={props.individuo.sessoBiologico} /></td>
                    </tr>
                    <tr>
                        <th>Classe di età</th>
                        <td><input className="form-control" value={props.individuo.classeDiEtà} /></td>

                    </tr>
                    <tr>
                        <th>Età stimata (MIN)</th>
                        <td><input className="form-control" /></td>
                    </tr>
                    <tr>
                        <th>Età stimata (MAX)</th>
                        <td><input className="form-control" /></td>
                    </tr>
                    <tr>
                        <th>Origine biologica</th>
                        <td><input className="form-control" value={props.individuo.origineBiologica} /></td>

                    </tr>
                    <tr>
                        <th>Origine geografica</th>
                        <td><input className="form-control" value={props.individuo.origineGeografica} /></td>
                    </tr>
                    <tr>
                        <th>Statura (MIN)</th>
                        <td><input className="form-control" /></td>
                    </tr>
                    <tr>
                        <th>Statura (MAX)</th>
                        <td><input className="form-control" /></td>
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
                        <td>{props.individuo.classeDiEtà}</td>
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
                        <td>{props.individuo.origineBiologica}</td>
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


    return checkEditableValue()

    /*
    return (
        <div>
            <h6 className=''>Profilo biologico</h6>
            <Table bordered striped hover size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Sesso biologioco</th>
                        <td>{individuo.individuo.sessoBiologico}</td>
                    </tr>
                    <tr>
                        <th>Classe di età</th>
                        <td>{individuo.individuo.classeDiEtà}</td>
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
                        <td>{individuo.individuo.origineBiologica}</td>
                    </tr>
                    <tr>
                        <th>Origine geografica</th>
                        <td>{individuo.individuo.origineBiologica}</td>
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
        </div>

    );
    */
};

export default ProfiloBiologicoIndividuo;