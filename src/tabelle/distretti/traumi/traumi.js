import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../../api/ConnectionManager";
import ModalCreateTrauma from "../../../UI/modalCreateTrauma";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Traumi(props) {

    const [traumi, setTraumi] = useState([])
    const [listaTraumi, setListaTraumi] = useState()

    const getTraumaSpecifico = async () => {
        let cm = new ConnectionManager();
        let res;
        if (props.distretto != 2) {
            res = await cm.getTraumaSpecifico(JSON.stringify({ osso: props.osso }));
        } else {
            res = await cm.getTraumaSpecifico(JSON.stringify({ dente: props.osso }));
        }
        return res;
    }

    const getTraumaGeneraleByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTraumaGenerale();
        return res;
    }

    const aggiorna = () => {
        getTraumaSpecifico().then(res => {

            console.log('getTraumaSpecifico', res)
            if (res.response === 'success') {

                setTraumi(res.results)
            } else {
                setTraumi([])
            }
        })
        getTraumaGeneraleByDistretto().then(res => setListaTraumi(res.results))
    }

    useEffect(() => {
        aggiorna()
    }, []);

    let getTraumi = () => {
        if (traumi.length == 0) {
            return <div className="border rounded p-2 mb-4">Non sono presenti traumi...</div>
        } else {
            return (
                <div className="border rounded p-2 mb-4">
                    <Table bordered striped size="sm">
                        <thead>
                            <tr>
                                <th>Trauma</th>
                                <th>Descrizione</th>
                                <th>Datazione</th>
                                {checkUser2()}
                            </tr>
                        </thead>
                        <tbody>
                            {traumi ? (traumi.map(trauma =>
                                <RigaTrauma key={trauma.id} trauma={trauma} traumi={listaTraumi} callback={aggiorna} />
                            )) : (<tr></tr>)}
                        </tbody>
                    </Table>
                </div >
            )
        }
    }
    let checkUser2 = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return
        } else {
            return <th></th>
        }
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {
            return <ModalCreateTrauma listaTraumi={listaTraumi} distretto={props.distretto} osso={props.osso} callback={aggiorna} />
        }
    }


    return (<div className="">
        <div className='border-bottom mb-2 d-flex justify-content-between'>
            <h5 className=''>Traumi</h5>
            {checkUser()}
        </div>


        {getTraumi()}

        <div className="d-flex justify-content-end">
        </div>

    </div >)
}


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

        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':

                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return
                } else {
                    return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                        <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                        <Button className='p-1 mx-1' variant='danger' onClick={() => deleteTraumaSpecifico()}>Elimina</Button>
                    </td>)
                }
            case '3':
                return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                    <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                    <Button className='p-1 mx-1' variant='danger' onClick={() => deleteTraumaSpecifico()}>Elimina</Button>
                </td>)
            default:
                return <></>
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

export default Traumi;