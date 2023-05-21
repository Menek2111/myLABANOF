import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import ConnectionManager from '../api/ConnectionManager';
import { useLocation } from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import indThumb from '../images/individuo.jpg'

import { Dna } from 'react-loader-spinner'
import ModalDeleteIndividuo from '../UI/modalDeleteIndividuo'
import ProfiloBiologicoIndividuo from '../tabelle/profiloBiologicoIndividuo';


function SchedaIndividuo() {

    const { state } = useLocation();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [individuo, setIndividuo] = useState()
    const [editable, setEditable] = useState(false)

    function changeEditable() {
        if (editable) setEditable(false)
        else setEditable(true)
    }

    function editButton() {
        if (editable) {
            return (<div className='d-flex justify-content-around'>
                <Button variant="secondary" onClick={() => changeEditable()}>
                    Annulla
                </Button>
                <Button className='w-100 mx-2' variant="primary" >
                    Salva
                </Button>
            </div>)
        } else {
            return (<div className='d-flex justify-content-around'>
                <Button variant="primary" onClick={() => changeEditable()}>
                    Modifica
                </Button>
                <ModalDeleteIndividuo individuo={individuo.individuo} utente={individuo.utente} />
            </div>)
        }
    }

    useEffect(() => {
        const getIndividuoById = async () => {
            let cm = new ConnectionManager();
            let res = await cm.getIndividuoById(JSON.stringify({ id: state.individuo }));
            return res;
        }
        getIndividuoById().then(res => {
            setIndividuo(res)
            console.log(res)
        })
    }, [state.individuo]);

    // backgroundColor: '#F7F9FC'
    return (
        <div className='px-4 py-2' style={{ height: '93vh', backgroundColor: '#F7F9FC' }}>
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col bg-white h-100 w-100 rounded border'>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <img src={indThumb} style={{ height: '10vh' }} alt="individuo" />
                                    </div>

                                    {individuo ? (
                                        <p style={centerMiddle} className=''>{individuo.tomba.nome + ' ' + individuo.individuo.nome} <br /> Creato da: {individuo.utente.email} <br /> Il: {individuo.individuo.dataCreazione} </p>
                                    ) : (<div></div>)}
                                </div>

                                {individuo ? (<div className='col-2 d-flex flex-column justify-content-center'>
                                    {editButton()}
                                </div>) : (<div></div>)}

                            </div>


                            {individuo ? (
                                <div className='row py-3'>
                                    <ProfiloBiologicoIndividuo editable={editable} individuo={individuo.individuo} />
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