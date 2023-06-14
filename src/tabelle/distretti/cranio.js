import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";

import RigaCranio from './rigaCranio'
import ModalCreateOsso from "../../UI/modalCreateOsso";
import Loading from '../../UI/loading'

function Cranio(props) {
    const [ossa, setOssa] = useState()
    const [tipoOssa, setTipoOssa] = useState([])

    const getOssaIndividuoByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: 'Cranio' }));
        return res;
    }
    const getOssaByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaByDistretto(JSON.stringify({ distretto: 'Cranio' }));
        return res;
    }

    useEffect(() => {
        getOssaByDistretto().then(res => {
            console.log('NomeTipoOssa', res.results)
            setTipoOssa(res.results.sort(compareTipoOssa))
        })
        getOssaIndividuoByDistretto().then(res => {
            if (res.response === 'success') {
                console.log('OssaIndividuo', res.results)
                setOssa(res.results.sort(compare))
            } else {
                setOssa([])
            }
        })

    }, []);

    let aggiorna = () => {
        getOssaIndividuoByDistretto().then(res => {
            if (res.response === 'success') {
                console.log('aggiorna', res.results)
                setOssa(res.results.sort(compare))
            } else {
                setOssa([])
            }
        })
    }

    function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }
    function compareTipoOssa(a, b) {
        if (a.tipoOsso < b.tipoOsso) {
            return -1;
        }
        if (a.tipoOsso > b.tipoOsso) {
            return 1;
        }
        return 0;
    }

    let checkOssa = () => {
        if (ossa.length == 0) {
            return <div className="">Non sono presenti ossa...</div>
        } else {
            return (<Table className="col" bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th>Osso</th>
                        <th>Materiale rivenuto</th>
                        <th>Integro</th>
                        <th>Livello di integrità</th>
                        <th>Livello di qualità</th>
                        <th>Restaurato</th>
                        <th>Catalogazione e descrizione</th>
                        <th>Indagine radiologica</th>
                        <th>Campionamento</th>
                        <th>Altre analisi</th>
                    </tr>
                </thead>
                <tbody>
                    {ossa.map(osso => <RigaCranio key={osso.id} osso={osso} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />)}
                </tbody>
            </Table>)
        }
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {
            return (<div className="d-flex justify-content-end">
                <ModalCreateOsso tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
            </div>)
        }
    }


    return (
        <div>
            <h5 className='border-bottom mb-2'>Ossa</h5>

            <div className="border rounded p-2">

                {ossa ? (checkOssa()) : (<Loading />)}

                {tipoOssa ? (
                    <div>
                        {checkUser()}
                    </div >
                ) : (
                    <div></div>
                )
                }
            </div>
        </div>
    )
}
export default Cranio;