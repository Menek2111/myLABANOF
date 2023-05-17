import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import ConnectionManager from '../api/ConnectionManager';
import { useLocation } from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import indThumb from '../images/individuo.jpg'

import { Dna } from 'react-loader-spinner'
import Table from 'react-bootstrap/Table';


import placeholder from '../images/placeholder.png'


function SchedaIndividuo() {

    const { state } = useLocation();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [individuo, setIndividuo] = useState()

    const getIndividuoById = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividuoById(JSON.stringify({ id: state.individuo }));

        return res;
    }

    useEffect(() => {
        getIndividuoById().then(res => {
            setIndividuo(res)
            console.log(res)
        })
    }, []);


    // backgroundColor: '#F7F9FC'
    return (
        <div className='px-4 py-2' style={{ height: '93vh', backgroundColor: '#F7F9FC' }}>
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col bg-white h-100 w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-11 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <img src={indThumb} style={{ height: '10vh' }} alt="individuo" />
                                    </div>

                                    {individuo ? (
                                        <p style={centerMiddle} className=''>{individuo.tomba.nome + ' ' + individuo.individuo.nome} <br /> Creato da: {individuo.utente.email} <br /> Il: {individuo.individuo.dataCreazione} </p>
                                    ) : (<div></div>)}
                                </div>
                                <div className='col-1 d-flex flex-column justify-content-center'>
                                    <Button className='w-100' variant="primary" >
                                        Modifica
                                    </Button>
                                </div>
                            </div>


                            {individuo ? (
                                <div className='row py-3'>
                                    <div className='col-lg-6'>
                                        <h6 className=''>Generalità</h6>
                                        <Table bordered striped hover size="sm">
                                            <tbody>
                                                <tr>
                                                    <th className='w-25'>Individuo N°</th>
                                                    <td>{individuo.individuo.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>Luogo rinvenimento</th>
                                                    <td>{individuo.individuo.luogoRinvenimento}</td>
                                                </tr>
                                                <tr>
                                                    <th>Data rinvenimento</th>
                                                    <td>{individuo.individuo.dataRinvenimento}</td>
                                                </tr>
                                                <tr>
                                                    <th>Tomba</th>
                                                    <td>{individuo.tomba ? (individuo.tomba.nome) : (individuo.individuo.tomba)}</td>
                                                </tr>
                                                <tr>
                                                    <th>N° minimo di individui</th>
                                                    <td>{individuo.tomba.nMinIndividui}</td>
                                                </tr>

                                            </tbody>
                                        </Table>
                                        <h6 className=''>Profilo biologico</h6>
                                        <Table bordered striped hover size="sm">
                                            <tbody>
                                                <tr>
                                                    <th className='w-25'>Sesso biologioco</th>
                                                    <td>{individuo.individuo.sessoBiologico}</td>
                                                </tr>
                                                <tr>
                                                    <th>Classe di età</th>
                                                    <td>{individuo.individuo.classeDiEtà}</td>
                                                </tr>
                                                <tr>
                                                    <th>Età stimata (MIN)</th>
                                                    <td>---</td>
                                                </tr>
                                                <tr>
                                                    <th>Età stimata (MAX)</th>
                                                    <td>---</td>
                                                </tr>
                                                <tr>
                                                    <th>Origine biologica</th>
                                                    <td>{individuo.individuo.origineBiologica}</td>
                                                </tr>
                                                <tr>
                                                    <th>Origine geografica</th>
                                                    <td>{individuo.individuo.origineBiologica}</td>
                                                </tr>
                                                <tr>
                                                    <th>Statura (MIN)</th>
                                                    <td>---</td>
                                                </tr>
                                                <tr>
                                                    <th>Statura (MAX)</th>
                                                    <td>---</td>
                                                </tr>

                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='row'>

                                            <h6 className=''>Immagini</h6>
                                            <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>   <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>   <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>   <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>   <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>   <div className='col-4 my-1'>
                                                <img alt="placeholder" src={placeholder} className='w-100' />
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            ) : (
                                <div className='d-flex flex-column justify-content-center text-center'>
                                    <div>
                                        <Dna
                                            visible={true}
                                            ariaLabel="dna-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="dna-wrapper"
                                        />
                                    </div>
                                    <div>
                                        Caricamento in corso...
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaIndividuo;