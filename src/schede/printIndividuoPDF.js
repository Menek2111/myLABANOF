import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'

import Table from 'react-bootstrap/Table';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrintIndividuoPDF(props) {
    const navigate = useNavigate();

    //INFORMAZIONI GENERALI---------------------------------------------------------
    const getAllInfoIndividuo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getAllInfoIndividuo(JSON.stringify({ id: sessionStorage.getItem('individuoSelezionato') }));
        return res
    }
    const [individuo, setIndividuo] = useState()
    const [ossa, setOssa] = useState()
    const [patologieOssa, setPatologieOssa] = useState()
    const [patologieDenti, setPatologieDenti] = useState()
    const [traumaOssa, setTraumaOssa] = useState()
    const [traumaDenti, setTraumaDenti] = useState()
    const [caratteristicheDeposizione, setCaratteristicheDeposizione] = useState()
    //INFORMAZIONI GENERALI----------------------------------------------------------

    const location = useLocation();
    useEffect(() => {
        aggiorna()
    }, [location]);

    let aggiorna = () => {
        getAllInfoIndividuo().then(res => {
            console.log('getAllInfoIndividuo', res)
            if (res.response == 'success') {

                if (res.individuo[0] != null) {
                    setIndividuo(res.individuo[0])
                }

                if (res.ossa != null) {
                    setOssa(res.ossa.sort(function (a, b) { return a.idDistretto - b.idDistretto }))
                }

                if (res.patologieOssa != null) {
                    setPatologieOssa(res.patologieOssa.sort(function (a, b) { return a.isNMR - b.isNMR }))
                }

                if (res.patologieDenti != null) {
                    setPatologieDenti(res.patologieDenti)
                }

                if (res.traumaOssa) {
                    setTraumaOssa(res.traumaOssa)
                }

                if (res.traumaDenti != null) {
                    setTraumaDenti(res.traumaDenti)
                }

                if (res.caratteristicheDeposizione) {
                    setCaratteristicheDeposizione(res.caratteristicheDeposizione)
                }

                setTimeout(() => {
                    window.print()
                    navigate(-1)
                }, 1000);

            }
        })
    }

    let checkNMR = (osso, bool) => {
        if (bool) {
            if (osso.NMR == 1) {
                return (<tr>
                    <td>{osso.nomeTipoOsso}</td>
                    <td>{osso.lato}</td>
                    <td>{osso.integro}</td>
                    <td>{osso.lvlIntegrità}</td>
                    <td>{osso.lvlQualità}</td>
                    <td>{osso.restaurato}</td>
                    <td>{osso.catalogazioneDescrizione}</td>
                    <td>{osso.indagineRadiologica}</td>
                    <td>{osso.campionamento}</td>
                    <td>{osso.altreAnalisi}</td>
                </tr>)
            }
        } else {
            if (osso.NMR == 0) {
                return (<tr>
                    <td>{osso.nomeDistretto}</td>
                    <td>{osso.nomeTipoOsso}</td>
                    <td>{osso.lato}</td>
                    <td>{osso.integro}</td>
                    <td>{osso.lvlIntegrità}</td>
                    <td>{osso.lvlQualità}</td>
                    <td>{osso.restaurato}</td>
                    <td>{osso.catalogazioneDescrizione}</td>
                    <td>{osso.indagineRadiologica}</td>
                    <td>{osso.campionamento}</td>
                    <td>{osso.altreAnalisi}</td>
                </tr>)
            }
        }
    }

    let isNMR = (pat) => {
        if (pat.isNMR != 0) {
            return <span style={{ fontSize: '0.6em' }} className='border rounded p-1'>NMR</span>
        } else {
            return <></>
        }
    }
    return (
        <>

            {individuo ? (
                <>
                    <h5 className='w-100 text-center'>Generalità</h5>
                    <Table striped bordered size='sm'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Luogo Rinvenimento</th>
                                <th>Data Rinvenimento</th>
                                <th>Stato</th>
                                <th>Peso individuo</th>
                                <th>Peso cremazione</th>
                                <th>Volume cremazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{individuo.nome}</td>
                                <td>{individuo.luogoRinvenimento}</td>

                                <td>{individuo.dataRinvenimento}</td>

                                <td>{individuo.stato}</td>

                                <td>{individuo.pesoIndividuo}</td>

                                <td>{individuo.pesoCremazione}</td>

                                <td>{individuo.volumeCremazione}</td>


                            </tr>

                        </tbody>
                    </Table>

                    <h5 className='w-100 text-center'>Profilo biologico</h5>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Sesso biologico</th>
                                <th>Classe di età</th>
                                <th>Età stimata (MIN)</th>
                                <th>Età stimata (MAX)</th>
                                <th>Origine biologica</th>
                                <th>Origine geografica</th>
                                <th>Statura (MIN)</th>
                                <th>Statura (MAX)</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{individuo.sessoBiologico}</td>
                                <td>{individuo.classeEta}</td>

                                <td>{individuo.etaMin}</td>

                                <td>{individuo.etaMax}</td>

                                <td>{individuo.origineBiologica}</td>

                                <td>{individuo.origineGeografica}</td>

                                <td>{individuo.staturaMin}</td>
                                <td>{individuo.staturaMax}</td>


                            </tr>

                        </tbody>
                    </Table>
                </>

            ) : (<></>)}

            {caratteristicheDeposizione ? (<>
                <h5 className='w-100 text-center'>Caratteristiche deposizione</h5>
                <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Luogo ritrovamento</th>
                            <th>Tipo sepoltura</th>
                            <th>Tipo terreno</th>
                            <th>Fauna</th>
                            <th>Clima</th>
                            <th>Effetti personali</th>
                            <th>Ossa animali</th>
                            <th>Informazioni ante mortem</th>
                            <th>Altro</th>
                        </tr>
                    </thead>
                    <tbody>

                        {caratteristicheDeposizione.map(tr =>
                            <tr>
                                <td>{tr.luogoRitrovamento}</td>
                                <td>{tr.tipoSepoltura}</td>
                                <td>{tr.tipoTerreno}</td>
                                <td>{tr.fauna}</td>
                                <td>{tr.clima}</td>
                                <td>{tr.effettiPersonali}</td>
                                <td>{tr.ossaAnimali}</td>
                                <td>{tr.informazioniAnteMortem}</td>
                                <td>{tr.altro}</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </>) : (<></>)}

            {ossa ? (
                <>
                    <div className='border-bottom mt-5 mb-3'></div>
                    <h5 className='w-100 text-center'>OSSA</h5>
                    <Table striped bordered size='sm'>
                        <thead>
                            <tr>
                                <th>Distretto</th>
                                <th>Osso</th>
                                <th>Materiale rinvennuto</th>
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

                            {ossa.map(osso =>
                                checkNMR(osso, false)
                            )}

                        </tbody>
                    </Table>

                    <h5 className='w-100 text-center'>OSSA NMR</h5>
                    <Table striped bordered size='sm'>
                        <thead>
                            <tr>
                                <th>Osso</th>
                                <th>Materiale rinvennuto</th>
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

                            {ossa.map(osso =>
                                checkNMR(osso, true)
                            )}

                        </tbody>
                    </Table>










                </>
            ) : (<></>)}


            {patologieOssa ? (<><h5 className='w-100 text-center'>PATOLOGIE OSSA</h5>
                <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Osso</th>
                            <th>Materiale rinvennuto</th>
                            <th>Patologia</th>
                            <th>Classe patologia</th>
                            <th>Descrizione</th>
                            <th>Litica</th>
                            <th>Proliferativa</th>
                        </tr>
                    </thead>
                    <tbody>

                        {patologieOssa.map(pat =>
                            <tr>
                                <td>{isNMR(pat)}  {pat.nomeOsso}</td>
                                <td>{pat.latoOsso}</td>
                                <td>{pat.nomePatologia}</td>
                                <td>{pat.classePatologiaNome}</td>
                                <td>{pat.descrizione}</td>
                                <td>{pat.litica}</td>
                                <td>{pat.proliferativa}</td>
                            </tr>
                        )}

                    </tbody>
                </Table></>) : (<></>)}


            {patologieDenti ? (<>
                <h5 className='w-100 text-center'>PATOLOGIE DENTI</h5>
                <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Osso</th>
                            <th>Patologia</th>
                            <th>Classe patologia</th>
                            <th>Descrizione</th>
                            <th>Litica</th>
                            <th>Proliferativa</th>
                        </tr>
                    </thead>
                    <tbody>

                        {patologieDenti.map(pat =>
                            <tr>
                                <td>{pat.nomeOsso}</td>
                                <td>{pat.nomePatologia}</td>
                                <td>{pat.classePatologiaNome}</td>
                                <td>{pat.descrizione}</td>
                                <td>{pat.litica}</td>
                                <td>{pat.proliferativa}</td>
                            </tr>
                        )}

                    </tbody>
                </Table></>) : (<></>)}


            {traumaOssa ? (<>


                <h5 className='w-100 text-center'>TRAUMI OSSA</h5>
                <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Osso</th>
                            <th>Materiale rinvenuto</th>
                            <th>Trauma</th>
                            <th>Descrizione</th>
                            <th>Datazione</th>
                        </tr>
                    </thead>
                    <tbody>

                        {traumaOssa.map(tr =>
                            <tr>
                                <td>{tr.nomeOsso}</td>
                                <td>{tr.lato}</td>
                                <td>{tr.nomeTrauma}</td>
                                <td>{tr.descrizione}</td>
                                <td>{tr.datazione}</td>
                            </tr>
                        )}

                    </tbody>
                </Table></>) : (<></>)}

            {traumaDenti ? (<>
                <h5 className='w-100 text-center'>TRAUMI DENTI</h5>
                <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Dente</th>
                            <th>Trauma</th>
                            <th>Descrizione</th>
                            <th>Datazione</th>
                        </tr>
                    </thead>
                    <tbody>

                        {traumaDenti.map(tr =>
                            <tr>
                                <td>{tr.nomeOsso}</td>

                                <td>{tr.nomeTrauma}</td>
                                <td>{tr.descrizione}</td>
                                <td>{tr.datazione}</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </>) : (<></>)}



        </>
    );
}

export default PrintIndividuoPDF;