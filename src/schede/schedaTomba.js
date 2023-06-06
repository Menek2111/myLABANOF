import React, { useState, useEffect } from 'react';

import ConnectionManager from '../api/ConnectionManager';
import { useLocation } from 'react-router-dom';

import ListaIndividui from '../component/listaIndividui'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import indThumb from '../images/tomblogo.png'

import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import ModalEditTomba from '../UI/modalEditTomba'
import ModalDeleteTomba from '../UI/modalDeleteTomba';


function SchedaTomba() {
    const navigate = useNavigate();

    const { state } = useLocation();

    const [individui, setIndividui] = useState()

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    useEffect(() => {
        const getIndividuiByTomba = async () => {
            let cm = new ConnectionManager();
            let res = await cm.getIndividuiByTomba(JSON.stringify({ tomba: state.tomba.id }));
            return res;
        }
        getIndividuiByTomba().then(res => {
            console.log(res.response)
            switch (res.response) {
                case 'success':
                    setIndividui(res.results)
                    break
                case 'empty':
                    setIndividui(null)
                    break
                case 'error':
                    break
                default:
                    break
            }
        })
    }, [state.tomba]);

    return (
        <div className='px-4 py-2 containerPrincipale' >
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col h-100 bg-white w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <img src={indThumb} style={{ height: '10vh' }} alt="individuo" />
                                    </div>

                                    {state.tomba ? (
                                        <p style={centerMiddle} className=''>Identificativo tomba: {state.tomba.nome} <br />Numero minimo di individui: {state.tomba.nMinIndividui} <br />Coordinate: {state.tomba.coordinate}</p>
                                    ) : (<div></div>)}

                                </div>
                                <div className='col-2 d-flex flex-column justify-content-center'>

                                    <div className='d-flex justify-content-around'>
                                        <ModalEditTomba tomba={state.tomba} />
                                        <ModalDeleteTomba tomba={state.tomba} />
                                    </div>
                                </div>
                            </div>

                            {individui ? (
                                <ListaIndividui colonna="col-3" individui={individui} navigator={navigate} />
                            ) : (
                                <div className=' h-75 d-flex flex-column justify-content-center text-center'>
                                    <div>
                                        <Dna
                                            visible={true}
                                            ariaLabel="dna-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="dna-wrapper"
                                        />
                                    </div>

                                    <div>
                                        Non sono stati trovati individui...
                                    </div>

                                </div>)}


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaTomba;