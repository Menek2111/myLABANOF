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

    useEffect(() => {
        getTraumaSpecifico().then(res => {
            if (res.response === 'success') {
                setTraumi(res.results)
            } else {
                setTraumi(null)
            }
        })

        getTraumaGeneraleByDistretto().then(res => setListaTraumi(res.results))
    }, [traumi]);

    return (<div className="">
        <div className='border-bottom mb-2 d-flex justify-content-between'>
            <h5 className=''>Traumi</h5>
            <ModalCreateTrauma traumi={traumi} distretto={1} osso={props.osso} />
        </div>
        <Table bordered striped hover size="sm">
            <thead>
                <tr>
                    <th>Trauma</th>
                    <th>Descrizione</th>
                    <th>Datazione</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {traumi ? (traumi.map(trauma =>
                    <RigaTraumi key={trauma.id} trauma={trauma} traumi={listaTraumi} />
                )) : (<tr></tr>)}

            </tbody>
        </Table>
        <div className="d-flex justify-content-end">
        </div>

    </div >)
}
export default Traumi;