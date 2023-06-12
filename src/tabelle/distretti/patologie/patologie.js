import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../../api/ConnectionManager";
import ModalCreateTrauma from "../../../UI/modalCreateTrauma";
import RigaPatologia from "./rigaPatologia";
import ModalCreatePatologia from "../../../UI/modalCreatePatologia";


function Patologie(props) {

    const [patologie, setPatologie] = useState([])
    const [listaPatologie, setListaPatologie] = useState()

    const aggiorna = () => {
        getPatologiaSpecifica().then(res => {
            console.log('getPatologiaSpecifica', res)
            if (res.response === 'success') {
                setPatologie(res.results)
            }
        })
    }

    const getPatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getPatologiaSpecifica(JSON.stringify({ osso: props.osso }));
        return res;
    }

    const getPatologiaByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getPatologiaByDistretto(JSON.stringify({ distretto: 1 }));
        return res;
    }

    useEffect(() => {
        getPatologiaSpecifica().then(res => {
            console.log('getPatologiaSpecifica', res)
            if (res.response === 'success') {
                setPatologie(res.results)
            }
        })

        getPatologiaByDistretto().then(res => {
            console.log('getPatologiaByDistretto', res)
            if (res.response === 'success') {
                setListaPatologie(res.results)
            }
        })
    }, []);


    let getPatologie = () => {
        if (patologie.length == 0) {
            return <div className="border rounded p-2 mb-4">Non sono presenti patologie...</div>
        } else {
            return (
                <div className="border rounded p-2 mb-4">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Patologia</th>
                                <th>Descrizione</th>
                                <th>Litica</th>
                                <th>Proliferativa</th>
                                {checkUser2()}
                            </tr>
                        </thead>
                        <tbody>
                            {patologie ? (patologie.map(patologia =>
                                <RigaPatologia key={patologia.id} patologia={patologia} patologie={listaPatologie} callback={aggiorna} />
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
            return <td></td>
        }
    }


    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {

            return <ModalCreatePatologia osso={props.osso} distretto={1} patologie={listaPatologie} callback={aggiorna} />

        }
    }



    //<ModalCreateTrauma traumi={traumi} distretto={1} osso={props.osso} />
    return (<div className="">
        <div className='border-bottom mb-2 d-flex justify-content-between'>
            <h5 className=''>Patologie</h5>
            {listaPatologie ? (checkUser()) : (<div></div>)}
        </div>

        {listaPatologie ? (

            getPatologie()
        ) : (
            <div></div>
        )}

        <div className="d-flex justify-content-end">
        </div>

    </div >)
}
export default Patologie;