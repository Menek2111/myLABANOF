import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../../api/ConnectionManager";
import RigaTraumi from "./rigaTrauma"
import ModalCreateTrauma from "../../../UI/modalCreateTrauma";

function Traumi(props) {

    const [traumi, setTraumi] = useState([])
    const [listaTraumi, setListaTraumi] = useState()

    const getTraumaSpecifico = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTraumaSpecifico(JSON.stringify({ osso: props.osso }));
        return res;
    }

    const getTraumaGeneraleByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTraumaGeneraleByDistretto(JSON.stringify({ distretto: 1 }));
        return res;
    }

    const aggiorna = () => {
        getTraumaSpecifico().then(res => {
            if (res.response === 'success') {
                setTraumi(res.results)
            } else {
                setTraumi([])
            }
        })
    }

    useEffect(() => {
        getTraumaSpecifico().then(res => {
            if (res.response === 'success') {
                setTraumi(res.results)
            }
        })
        getTraumaGeneraleByDistretto().then(res => setListaTraumi(res.results))
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
                                <RigaTraumi key={trauma.id} trauma={trauma} traumi={listaTraumi} callback={aggiorna} />
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
            return <ModalCreateTrauma listaTraumi={listaTraumi} distretto={1} osso={props.osso} callback={aggiorna} />
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
export default Traumi;