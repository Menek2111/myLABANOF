import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import ConnectionManager from '../api/ConnectionManager';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import ind from '../images/individuo.jpg'
import { useNavigate } from 'react-router-dom'


import { Dna } from 'react-loader-spinner'
import ModalDeleteIndividuo from '../UI/modalDeleteIndividuo'
import ProfiloBiologicoIndividuo from '../tabelle/profiloBiologicoIndividuo';
import GeneralitàIndividuo from '../tabelle/generalitàIndividuo';

import DropdownDistretti from '../UI/dropDownDistretti';
import CaratteristicheDellaDeposizione from '../tabelle/caratteristicheDellaDeposizione';

function PrintIndividuoPDF(props) {
    const navigate = useNavigate();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    //INFORMAZIONI GENERALI---------------------------------------------------------
    const getIndividuoById = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividuoById(JSON.stringify({ id: sessionStorage.getItem('individuoSelezionato') }));
        return res
    }
    const [individuo, setIndividuo] = useState()

    const getCaratteristicheDeposizioneByIndividuo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteristicheDeposizioneByIndividuo(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato') }));
        return res
    }
    const [caratteristicheDeposizione, setCaratteristicheDeposizione] = useState()
    //INFORMAZIONI GENERALI----------------------------------------------------------

    const location = useLocation();
    useEffect(() => {
        aggiorna()
        window.print();
    }, [location]);

    let aggiorna = () => {
        getIndividuoById().then(res => {
            console.log('GetIndividuoById', res)
            switch (res.response) {
                case 'success':
                    setIndividuo(res)
                    break
                case 'error':
                    break
                default:
                    break
            }
        })
        getCaratteristicheDeposizioneByIndividuo().then(res => {
            console.log('getCaratteristicheDeposizioneByIndividuo', res)
            switch (res.response) {
                case 'success':
                    setCaratteristicheDeposizione(res.results)
                    break
                case 'error':
                    break
                default:
                    break
            }
        })
    }

    let vuoto = () => {

    }

    return (
        <div className='bg-white'>
            <div className='d-flex w-100 justify-content-center'>
                <img className='mx-2' src={ind} style={{ height: '10vh' }} />
                {individuo ? (<p style={centerMiddle} className=''>{individuo.tomba.nome + ' ' + individuo.individuo.nome} <br /> Creato da: {individuo.utente.email} <br /> Data: {individuo.individuo.dataCreazione} </p>
                ) : (<div></div>)}
            </div>
            {individuo ? (<div className=''>
                <GeneralitàIndividuo editable={false} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={vuoto} callback={aggiorna} />

                <div className='my-2'></div>
                <ProfiloBiologicoIndividuo editable={false} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={vuoto} callback={aggiorna} />
                <div className='my-2'></div>
                {caratteristicheDeposizione ? (<CaratteristicheDellaDeposizione editable={false} individuo={caratteristicheDeposizione} onIndividuoChange={vuoto} callback={aggiorna} />
                ) : (
                    <></>
                )}

                <Ossa />

            </div>) : (<div></div>)
            }

        </div >


    );
}

function Ossa(props) {
    const getOssaIndividuoByDistretto = async (e) => {
        let cm = new ConnectionManager();
        if (e != 2) {
            return await cm.getOssaIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: e }));
        } else {
            return await cm.getDentiIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: e }));
        }
    }
    const [ossa, setOssa] = useState()
    function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        getOssaIndividuoByDistretto(1).then(res => {
            if (res.response === 'success') {
                setOssa(res.results.sort(compare))
            } else {
                setOssa([])
            }
        })
    }, [])


    let checkDistretto = (e) => {
        if (e != 2) {
            return (<Table className="col" bordered striped hover size="">
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

                    {ossa ? (ossa.map(osso => (

                        <tr>

                            <td>{osso.nome}</td>


                            <td>{osso.lato}</td>


                            <td><Form.Check
                                type="checkbox"
                                defaultChecked={true}
                                disabled /></td>


                            <td>{osso.lvlIntegrita}</td>

                            <td>{osso.lvlQualita}</td>

                            <td><Form.Check
                                type="checkbox"
                                defaultChecked={true}
                                disabled /></td>

                            <td>{osso.catalogazioneDescrizione}</td>

                            <td>{osso.indagineRadiologica}</td>

                            <td>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={true}
                                    disabled
                                />
                            </td>

                            <td>{osso.altreAnalisi}</td>
                        </tr>

                    ))) : (<></>)}
                </tbody>
            </Table>)
        } else {
            return (<Table className="col" bordered striped hover size="">
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
                </tbody>
            </Table>)
        }
    }

    return (<div>
        <h5>Distretto CRANIO</h5>
        <div>
            {checkDistretto(1)}
        </div>
    </div>)


}


export default PrintIndividuoPDF;