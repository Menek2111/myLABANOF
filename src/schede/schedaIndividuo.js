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
import GeneralitàIndividuo from '../tabelle/generalitàIndividuo';

function SchedaIndividuo() {
    const { state } = useLocation();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [loading, setLoading] = useState(false)
    const [individuo, setIndividuo] = useState()
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        const getIndividuoById = async () => {
            let cm = new ConnectionManager();
            let res = await cm.getIndividuoById(JSON.stringify({ id: state.individuo }));
            return res;
        }
        getIndividuoById().then(res => {
            setIndividuo(res)
            setLoading(true)
            console.log(res)
        })
    }, [state.individuo]);


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
                <Button className='w-100 mx-2' variant="primary" onClick={() => salva()}>
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

    const [modGeneralità, setModGeneralità] = useState()
    const [modProfiloBiologico, setModProfiloBiologico] = useState()

    const addModificheGeneralità = (nome, luogo, data) => {
        //console.log(nome, luogo, data)
        var mod = {
            nome: nome,
            luogoRinvenimento: luogo,
            dataRinvenimento: data
        }
        setModGeneralità(mod)
    }
    const addModificheProfiloBiologio = (sesso, classeEta, origineBiologica, origineGeografica) => {
        //console.log(nome, luogo, data)
        var mod = {
            sessoBiologico: sesso,
            classeDiEta: classeEta,
            origineBiologica: origineBiologica,
            origineGeografica: origineGeografica
        }
        setModProfiloBiologico(mod)
    }

    const salva = async () => {
        let cm = new ConnectionManager();
        setLoading(false)

        let modifiche = {
            id: state.individuo,
            nome: modGeneralità.nome,
            luogoRinvenimento: modGeneralità.luogoRinvenimento,
            dataRinvenimento: modGeneralità.dataRinvenimento,
            classeDiEta: modProfiloBiologico.classeDiEta,
            origineBiologica: modProfiloBiologico.origineBiologica,
            origineGeografica: modProfiloBiologico.origineGeografica,
            sessoBiologico: modProfiloBiologico.sessoBiologico
        }

        await cm.editIndividuo(JSON.stringify(modifiche)).then(res => {
            console.log(res)
            if (res.response === 'success') {
                window.location.reload(false);
                setEditable(false)
                setLoading(true)
            }
        })
    }

    // backgroundColor: '#F7F9FC'
    return (

        <div>
            {loading ? (<div className='px-4 py-2' style={{ height: '93vh', backgroundColor: '#F7F9FC' }}>
                <div className='rounded h-100'>
                    <div className='container-fluid h-100'>
                        <div className='row h-100'>
                            <div className='col bg-white h-100 w-100 rounded border'>
                                <div className='row border-bottom rounded-top justify-content-between'>
                                    <div className='col-10 py-2 d-flex'>
                                        <div style={centerMiddle}>
                                            <img src={indThumb} style={{ height: '10vh' }} alt="individuo" />
                                        </div>

                                        <p style={centerMiddle} className=''>{individuo.tomba.nome + ' ' + individuo.individuo.nome} <br /> Creato da: {individuo.utente.email} <br /> Il: {individuo.individuo.dataCreazione} </p>
                                    </div>

                                    <div className='col-2 d-flex flex-column justify-content-center'>
                                        {editButton()}
                                    </div>
                                </div>
                                <div className='row py-3'>
                                    <GeneralitàIndividuo editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheGeneralità} />
                                    <ProfiloBiologicoIndividuo editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheProfiloBiologio} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            ) : (<div style={{ height: '93vh', backgroundColor: '#F7F9FC' }} className='d-flex flex-column justify-content-center text-center '>
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



    );
}
export default SchedaIndividuo;