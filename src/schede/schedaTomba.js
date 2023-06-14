import React, { useState, useEffect } from 'react';

import ConnectionManager from '../api/ConnectionManager';
import { useLocation } from 'react-router-dom';

import ListaIndividui from '../component/listaIndividui'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import indThumb from '../images/icons/tomb.png'

import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import ModalEditTomba from '../UI/modalEditTomba'
import ModalDeleteTomba from '../UI/modalDeleteTomba';
import ModalCreateIndividuo from '../UI/modalCreateIndividuo';
import Loading from '../UI/loading';



function SchedaTomba() {
    const navigate = useNavigate();

    const [individui, setIndividui] = useState()
    const [tombaInfo, setTombaInfo] = useState()



    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const getIndividuiByTomba = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividuiByTomba(JSON.stringify({ tomba: sessionStorage.getItem('tombaSelezionata') }));
        return res;
    }
    const getTombaById = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTombaById(JSON.stringify({ id: sessionStorage.getItem('tombaSelezionata') }));
        return res;
    }


    const location = useLocation();
    useEffect(() => {
        getIndividuiByTomba().then(res => {
            switch (res.response) {
                case 'success':
                    setIndividui(res.results)
                    break
                case 'empty':
                    setIndividui([])
                    break
                case 'error':
                    break
                default:
                    break
            }
        })

        getTombaById().then(res => {
            console.log('getTombaById', res)
            switch (res.response) {
                case 'success':
                    setTombaInfo(res.results[0])
                    break
                case 'empty':
                    setTombaInfo(null)
                    break
                case 'error':
                    setTombaInfo(null)
                    break
                default:
                    break
            }
        })


    }, [location]);

    let aggiorna = () => {
        getTombaById().then(res => {
            console.log('getTombaById', res)
            switch (res.response) {
                case 'success':
                    setTombaInfo(res.results[0])
                    break
                case 'empty':
                    setTombaInfo(null)
                    break
                case 'error':
                    setTombaInfo(null)
                    break
                default:
                    break
            }
        })
    }


    return (
        <div className='px-4 py-2 containerPrincipale' >
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col h-100 bg-white w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <img src={indThumb} style={{ height: '10vh' }} alt="individuo" />
                                    </div>

                                    {tombaInfo ? (
                                        <p style={centerMiddle} className=''>Identificativo tomba: {tombaInfo.nome} <br />Numero minimo di individui: {tombaInfo.nMinIndividui} <br />Coordinate: {tombaInfo.coordinate}</p>
                                    ) : (<div></div>)}

                                </div>

                                <div className='col d-flex flex-column justify-content-center'>
                                    <ModalCreateIndividuo tomba={tombaInfo} />
                                </div>

                                <div className='col d-flex flex-column justify-content-center'>
                                    {tombaInfo ? (<div className='d-flex justify-content-end'>
                                        <ModalEditTomba tomba={tombaInfo} callback={aggiorna} />
                                        <ModalDeleteTomba tomba={tombaInfo} />
                                    </div>) : (<div></div>)}

                                </div>
                            </div>

                            <div className='h-50'>
                                {individui ? (<ListaIndividui colonna="col-lg-3 col-sm-6" individui={individui} />
                                ) : (<Loading />)}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaTomba;