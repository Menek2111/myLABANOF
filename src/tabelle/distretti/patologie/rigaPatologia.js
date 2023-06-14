import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ConnectionManager from '../../../api/ConnectionManager';

function RigaPatologia(props) {

    const [editable, setEditable] = useState(false);

    let valueToBoolean = (val) => {
        if (val == 1) {
            return true
        } else {
            return false
        }
    }
    let booleanToValue = (val) => {
        if (val) {
            return true
        } else {
            return false
        }
    }

    const [tipoPatologia, setTipoPatologia] = useState(props.patologia.tipoPatologia)
    const [descrizione, setDescrizione] = useState(props.patologia.descrizione)
    const [litica, setLitica] = useState(valueToBoolean(props.patologia.litica))
    const [proliferativa, setProliferativa] = useState(valueToBoolean(props.patologia.proliferativa))


    const editPatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        var params = {
            osso: props.patologia.osso,
            tipoPatologia: tipoPatologia,
            descrizione: descrizione,
            litica: booleanToValue(litica),
            proliferativa: booleanToValue(proliferativa),
            id: props.patologia.id
        }
        await cm.editPatologiaSpecifica(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                props.callback()
                setEditable(false)
            }
        })
    }

    const deletePatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        var params = {
            id: props.patologia.id
        }
        await cm.deletePatologiaSpecifica(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                props.callback()
            }
        })
    }

    useEffect(() => {
    }, []);



    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return
        } else {

            return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                <Button className='p-1 mx-1' variant='danger' onClick={() => deletePatologiaSpecifica()}>Elimina</Button>
            </td>)
        }
    }


    return editable ? (
        <tr>
            <td>
                <Form.Select defaultValue={tipoPatologia} onChange={(e) => setTipoPatologia(e.target.value)} disabled>
                    <option></option>
                    {props.patologie.map(pato => <option key={pato.id} value={pato.id}>{pato.nome}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Control required type="text" defaultValue={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={litica}
                    onChange={() => setLitica((state) => !state)}
                />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={proliferativa}
                    onChange={() => setProliferativa((state) => !state)}
                />
            </td>
            <td className='text-center' style={{ whiteSpace: 'nowrap', width: '1%' }}>
                <Button variant="secondary" className='p-1' onClick={() => setEditable((state) => !state)}>Annulla</Button>
                <Button variant="primary" className='p-1 mx-1' onClick={() => editPatologiaSpecifica()}>Salva</Button>

            </td>
        </tr >

    ) : (
        <tr>
            <td>{props.patologia.nome}</td >
            <td>{props.patologia.descrizione}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.patologia.litica)}
                    disabled
                />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.patologia.proliferativa)}
                    disabled
                />
            </td>

            {checkUser()}

        </tr >
    )
}


export default RigaPatologia;