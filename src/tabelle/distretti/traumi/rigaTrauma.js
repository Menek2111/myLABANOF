import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ConnectionManager from '../../../api/ConnectionManager';

function RigaTrauma(props) {

    const [editable, setEditable] = useState(false);

    const [tipoTrauma, setTipoTrauma] = useState(props.trauma.tipoTrauma)
    const [descrizione, setDescrizione] = useState(props.trauma.descrizione)
    const [datazione, setDatazione] = useState(props.trauma.datazione)

    const editTraumaSpecifico = async (event) => {

        let cm = new ConnectionManager();
        var params = {
            osso: props.trauma.osso,
            tipoTrauma: tipoTrauma,
            descrizione: descrizione,
            datazione: datazione,
            id: props.trauma.id
        }
        await cm.editTraumaSpecifico(JSON.stringify(params)).then(res => {
            console.log('rigatrauma', res)
            if (res.response === 'success') {
                props.callback()
                setEditable(false)
            }
        })
    }

    const deleteTraumaSpecifico = async () => {
        let cm = new ConnectionManager();
        var params = {
            id: props.trauma.id
        }
        await cm.deleteTraumaSpecifico(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                props.callback()
                setEditable(false)
            }
        })
    }

    useEffect(() => {
        console.log('mucca', props.trauma)
    }, []);


    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return
        } else {
            return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                <Button className='p-1 mx-1' variant='danger' onClick={() => deleteTraumaSpecifico()}>Elimina</Button>
            </td>)
        }
    }

    return editable ? (
        <tr>
            <td>
                <Form.Select defaultValue={props.trauma.tipoTrauma} onChange={(e) => setTipoTrauma(e.target.value)} disabled>
                    <option></option>
                    {props.traumi.map(tr => <option key={tr.id} value={tr.id}>{tr.nome}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Control required type="text" defaultValue={props.trauma.descrizione} onChange={(e) => setDescrizione(e.target.value)} />
            </td>
            <td>
                <Form.Select defaultValue={props.trauma.datazione} onChange={(e) => setDatazione(e.target.value)} required>
                    <option></option>
                    <option>Ante-mortem</option>
                    <option>Peri-mortem</option>
                    <option>Scavenging</option>
                    <option>Post-mortem</option>
                    <option>ND</option>
                </Form.Select>
            </td>
            <td className='text-center' style={{ whiteSpace: 'nowrap', width: '1%' }}>
                <Button variant="secondary" className='p-1' onClick={() => setEditable((state) => !state)}>Annulla</Button>
                <Button variant="primary" className='p-1 mx-1' onClick={() => editTraumaSpecifico()}>Salva</Button>
            </td>
        </tr >
    ) : (
        <tr>
            <td>{props.trauma.nome
            }</td >
            <td>{props.trauma.descrizione}</td>
            <td>{props.trauma.datazione}</td>
            {checkUser()}
        </tr >
    )
}


export default RigaTrauma;