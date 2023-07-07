import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";

import RigaCranio from './rigaOssaDistretto'
import RigaDente from './rigaDente'
import ModalCreateOsso from "../../UI/modalCreateOsso";
import Loading from '../../UI/loading'
import { useLocation } from 'react-router-dom';
import ModalCreateDente from "../../UI/modalCreateDente";

function OssaDistretto(props) {
    const [ossa, setOssa] = useState()
    const [tipoOssa, setTipoOssa] = useState([])

    // @todo: rendere dinamica questa funzione
    let getDistrettoId = (nome) => {
        switch (nome) {
            case 'Cranio':
                return 1
            case 'Denti':
                return 2
            case 'Colonna':
                return 3
            case 'Torace':
                return 4
            case 'Arti superiori':
                return 5
            case 'Arti inferiori':
                return 6
            case 'NMR':
                return 7
            default:
                return null
        }
    }

    const getOssaIndividuoByDistretto = async (e) => {
        let cm = new ConnectionManager();
        if (getDistrettoId(props.distretto) != 2) {
            return await cm.getOssaIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: getDistrettoId(props.distretto) }));
        } else {
            return await cm.getDentiIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: getDistrettoId(props.distretto) }));
        }
    }
    const getOssaNMRByIndividuo = async (e) => {
        let cm = new ConnectionManager();
        return await cm.getOssaNMRByIndividuo(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato') }));
    }

    const getOssaByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaByDistretto(JSON.stringify({ distretto: props.distretto }));
        return res;
    }
    const getTipoOssa = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getTipoOssa();
        return res;
    }

    const location = useLocation();
    useEffect(() => {
        aggiorna()
    }, [location]);

    let aggiorna = () => {

        if (getDistrettoId(props.distretto) != 7) {
            getOssaByDistretto().then(res => {
                console.log('getOssaByDistretto', res)
                if (res.response == 'success') {
                    setTipoOssa(res.results.sort(compareTipoOssa))
                } else {
                    setTipoOssa([])
                }
            })
        } else {
            getTipoOssa().then(res => {
                console.log('getTipoOssa', res)
                if (res.response == 'success') {
                    setTipoOssa(res.results.sort(compareTipoOssa))
                } else {
                    setTipoOssa([])
                }
            })
        }

        if (getDistrettoId(props.distretto) != 7) {
            getOssaIndividuoByDistretto().then(res => {
                if (res.response === 'success') {
                    console.log('aggiorna', res.results)
                    setOssa(res.results.sort(compare))
                } else {
                    setOssa([])
                }
            })
        } else {
            getOssaNMRByIndividuo().then(res => {
                if (res.response === 'success') {
                    console.log('aggiorna', res.results)
                    setOssa(res.results.sort(compare))
                } else {
                    setOssa([])
                }
            })
        }

        props.callback()
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
            if (getDistrettoId(props.distretto) != 2) {
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
            } else {
                return (<Table className="col" bordered striped hover size="sm">
                    <thead>
                        <tr>
                            <th>Dente</th>
                            <th>Datazione caduta</th>
                            <th>Integro</th>
                            <th>Livello di integrità</th>
                            <th>Livello di qualità</th>
                            <th>Modificazioni odontoiatrici</th>
                            <th>Restauri odontoiatrici</th>
                            <th>Commenti</th>
                            <th>Indagine radiologica</th>
                            <th>Prelievi/Campionamenti</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ossa.map(osso => <RigaDente key={osso.id} osso={osso} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />)}
                    </tbody>
                </Table>)
            }
        }
    }


    let checkUser = () => {

        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':
                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return (<div></div>)
                } else {
                    return (<div className="d-flex justify-content-end">
                        {getDistrettoId(props.distretto) == 2 ? (
                            <ModalCreateDente tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                        ) : (
                            getDistrettoId(props.distretto) == 7 ? (
                                <ModalCreateOsso tipoOssa={tipoOssa} nmr='true' individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                            ) : (
                                <ModalCreateOsso tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                            )
                        )}

                    </div>)
                }
            case '3':
                return (<div className="d-flex justify-content-end">
                    {getDistrettoId(props.distretto) == 2 ? (
                        <ModalCreateDente tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                    ) : (
                        getDistrettoId(props.distretto) == 7 ? (
                            <ModalCreateOsso tipoOssa={tipoOssa} nmr='true' individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                        ) : (
                            <ModalCreateOsso tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                        ))}

                </div>)
            default:
                return <></>
        }

        /*
        if (localStorage.getItem('ruolo') == 1) {
            return (<></>)
        } else {
            if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                return (<div></div>)
            } else {
                return (<div className="d-flex justify-content-end">
                    {getDistrettoId(props.distretto) == 2 ? (
                        <ModalCreateDente tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                    ) : (
                        <ModalCreateOsso tipoOssa={tipoOssa} individuo={sessionStorage.getItem('individuoSelezionato')} callback={aggiorna} />
                    )}
 
                </div>)
            }
        }*/
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






export default OssaDistretto;