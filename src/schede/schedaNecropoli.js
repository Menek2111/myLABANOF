import React, { useState, useEffect } from 'react';

import ConnectionManager from '../api/ConnectionManager';
import { useLocation } from 'react-router-dom';

import ListaIndividui from '../component/listaIndividui'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import indThumb from '../images/icons/necropoli.PNG'

import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import ModalEditTomba from '../UI/modalEditTomba'
import ModalDeleteTomba from '../UI/modalDeleteTomba';
import ModalCreateIndividuo from '../UI/modalCreateIndividuo';
import Loading from '../UI/loading';
import ModalCreateTomba from '../UI/modalCreateTomba';
import ListaTombe from '../component/listaTombe';
import ModalEditNecropoli from '../UI/modalEditNecropoli';
import ModalDeleteNecropoli from '../UI/modalDeleteNecropoli';



function SchedaTomba() {
    const navigate = useNavigate();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const getTombeByNecropoli = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getTombeByNecropoli(JSON.stringify({ id: sessionStorage.getItem('necropoliSelezionata') }));
        return res;
    }
    const [tombe, setTombe] = useState()

    const getNecropoliById = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getNecropoliById(JSON.stringify({ id: sessionStorage.getItem('necropoliSelezionata') }));
        return res;
    }
    const [tombaInfo, setTombaInfo] = useState()


    const location = useLocation();
    useEffect(() => {
        aggiorna()
    }, [location]);

    let aggiorna = () => {
        getTombeByNecropoli().then(res => {
            console.log('getTombeByNecropoli', res)
            switch (res.response) {
                case 'success':
                    setTombe(res.results)
                    break
                case 'empty':
                    setTombe([])
                    break
                case 'error':
                    setTombe([])
                    break
                default:
                    break
            }
        })
        getNecropoliById().then(res => {
            console.log('getNecropoliById', res)
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
                                        <p style={centerMiddle} className='ms-2'>Identificativo necropoli: {tombaInfo.nome}</p>
                                    ) : (<div></div>)}

                                </div>

                                <div className='col d-flex flex-column justify-content-center'>
                                    {tombaInfo ? (<div className='d-flex justify-content-end'>
                                        <ModalEditNecropoli tomba={tombaInfo} callback={aggiorna} />
                                        <ModalDeleteNecropoli tomba={tombaInfo} />
                                    </div>) : (<div></div>)}

                                </div>
                            </div>

                            <div className='h-50'>

                                <div className='row justify-content-center' >
                                    <div className='col-3 d-flex flex-column justify-content-center'>
                                        <ModalCreateTomba tomba={tombaInfo} necropoli={tombaInfo} />
                                    </div>
                                </div>

                                {tombe ? (<ListaTombe colonna="col-lg-3 col-sm-6" tombe={tombe} />
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