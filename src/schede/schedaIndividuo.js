import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import ConnectionManager from '../api/ConnectionManager';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ind from '../images/individuo.jpg'
import { useNavigate } from 'react-router-dom'


import { Dna } from 'react-loader-spinner'
import ModalDeleteIndividuo from '../UI/modalDeleteIndividuo'
import ProfiloBiologicoIndividuo from '../tabelle/profiloBiologicoIndividuo';
import GeneralitàIndividuo from '../tabelle/generalitàIndividuo';

import DropdownDistretti from '../UI/dropDownDistretti';

function SchedaIndividuo(props) {
    const navigate = useNavigate();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [individuo, setIndividuo] = useState()
    const [editable, setEditable] = useState(false)

    const getIndividuoById = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividuoById(JSON.stringify({ id: sessionStorage.getItem('individuoSelezionato') }));
        return res
    }

    const location = useLocation();
    useEffect(() => {
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
    }, [location]);

    function changeEditable() {
        if (editable) setEditable(false)
        else setEditable(true)
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != individuo.utente.id) {
            return (<div></div>)
        } else {
            return (<div className='d-flex justify-content-around'>
                <Button variant="primary" onClick={() => changeEditable()}>
                    Modifica
                </Button>
                <ModalDeleteIndividuo individuo={individuo.individuo} utente={individuo.utente} callback={aggiorna} />

            </div>)
        }
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
            return checkUser()
        }
    }

    const [modGeneralità, setModGeneralità] = useState()
    const [modProfiloBiologico, setModProfiloBiologico] = useState()

    const addModificheGeneralità = (nome, luogo, data, stato) => {
        var mod = {
            nome: nome,
            luogoRinvenimento: luogo,
            dataRinvenimento: data,
            stato: stato
        }
        setModGeneralità(mod)
    }
    const addModificheProfiloBiologio = (sesso, classeEta, origineBiologica, origineGeografica) => {
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


        let modifiche = {
            id: sessionStorage.getItem('individuoSelezionato'),
            nome: modGeneralità.nome,
            luogoRinvenimento: modGeneralità.luogoRinvenimento,
            dataRinvenimento: modGeneralità.dataRinvenimento,
            classeDiEta: modProfiloBiologico.classeDiEta,
            origineBiologica: modProfiloBiologico.origineBiologica,
            origineGeografica: modProfiloBiologico.origineGeografica,
            sessoBiologico: modProfiloBiologico.sessoBiologico,
            stato: modGeneralità.stato
        }

        await cm.editIndividuo(JSON.stringify(modifiche)).then(res => {
            console.log(res)
            if (res.response === 'success') {
                aggiorna()
                setEditable(false)
            }
        })
    }


    let aggiorna = () => {
        getIndividuoById().then(res => {
            setIndividuo(res)
        })
    }

    return (
        <div>
            <div className='px-4 py-2 containerPrincipale'>
                <div className='rounded h-100'>
                    <div className='container-fluid h-100'>
                        <div className='row h-100'>
                            <div className='col bg-white h-100 w-100 rounded border' style={{ overflowY: 'scroll' }}>
                                <div className='row border-bottom rounded-top justify-content-between'>
                                    <div className='col-10 py-2 d-flex'>
                                        <div style={centerMiddle}>
                                            {individuo ? (<DropdownDistretti scheda='Individuo' id={individuo.individuo.id} />) : (<div></div>)}

                                        </div>
                                        <div className='d-flex w-100 justify-content-center'>
                                            <img className='mx-2' src={ind} style={{ height: '10vh' }} />
                                            {individuo ? (<p style={centerMiddle} className=''>{individuo.tomba.nome + ' ' + individuo.individuo.nome} <br /> Creato da: {individuo.utente.email} <br /> Data: {individuo.individuo.dataCreazione} </p>
                                            ) : (<div></div>)}
                                        </div>

                                    </div>

                                    <div className='col-2 d-flex flex-column justify-content-center'>
                                        {individuo ? (editButton()) : (<div></div>)}
                                    </div>
                                </div>

                                {individuo ? (<div className='row py-3'>
                                    <GeneralitàIndividuo editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheGeneralità} callback={aggiorna} />
                                    <ProfiloBiologicoIndividuo editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheProfiloBiologio} callback={aggiorna} />
                                </div>) : (<div></div>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    );
}
export default SchedaIndividuo;