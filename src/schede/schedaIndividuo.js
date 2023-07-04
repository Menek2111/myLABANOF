import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import ConnectionManager from '../api/ConnectionManager';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ind from '../images/individuo.jpg'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'

import { Dna } from 'react-loader-spinner'
import ModalDeleteIndividuo from '../UI/modalDeleteIndividuo'
import ProfiloBiologicoIndividuo from '../tabelle/profiloBiologicoIndividuo';
import GeneralitàIndividuo from '../tabelle/generalitàIndividuo';

import DropdownDistretti from '../UI/dropDownDistretti';
import CaratteristicheDellaDeposizione from '../tabelle/caratteristicheDellaDeposizione';

function SchedaIndividuo(props) {
    const navigate = useNavigate();

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const [editable, setEditable] = useState(false)

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


    const location = useLocation();
    useEffect(() => {
        aggiorna()
    }, [location]);

    function changeEditable() {
        if (editable) setEditable(false)
        else setEditable(true)
    }

    let checkUser = () => {

        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':
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
            case '3':
                return (<div className='d-flex justify-content-around'>
                    <Button variant="primary" onClick={() => changeEditable()}>
                        Modifica
                    </Button>
                    <ModalDeleteIndividuo individuo={individuo.individuo} utente={individuo.utente} callback={aggiorna} />

                </div>)
            default:
                return <></>
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
    const [modCaratteristicheDeposizione, setModCaratteristicheDeposizione] = useState()

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
    const addModificheCaratteristicheDeposizione = (luogoRitrovamento, tipoSepoltura, tipoTerreno, fauna, clima, effettiPersonali, ossaAnimali, informazioniAnteMortem, altro) => {
        var mod = {
            individuo: sessionStorage.getItem('individuoSelezionato'),
            luogoRitrovamento: luogoRitrovamento,
            tipoSepoltura: tipoSepoltura,
            tipoTerreno: tipoTerreno,
            fauna: fauna,
            clima: clima,
            effettiPersonali: effettiPersonali,
            ossaAnimali: ossaAnimali,
            informazioniAnteMortem: informazioniAnteMortem,
            altro: altro
        }
        setModCaratteristicheDeposizione(mod)
    }

    const [visibilita, setVisibilita] = useState()

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
            stato: modGeneralità.stato,
            visibilita: visibilita
        }

        await cm.editIndividuo(JSON.stringify(modifiche)).then(res => {
            console.log('editIndividuo', res)
            if (res.response === 'success') {
                aggiorna()
                setEditable(false)
            }
        })
        await salva2()
    }
    const salva2 = async () => {
        let cm = new ConnectionManager();

        let modifiche = {
            individuo: sessionStorage.getItem('individuoSelezionato'),
            luogoRitrovamento: modCaratteristicheDeposizione.luogoRitrovamento,
            tipoSepoltura: modCaratteristicheDeposizione.tipoSepoltura,
            tipoTerreno: modCaratteristicheDeposizione.tipoTerreno,
            fauna: modCaratteristicheDeposizione.fauna,
            clima: modCaratteristicheDeposizione.clima,
            effettiPersonali: modCaratteristicheDeposizione.effettiPersonali,
            ossaAnimali: modCaratteristicheDeposizione.ossaAnimali,
            informazioniAnteMortem: modCaratteristicheDeposizione.informazioniAnteMortem,
            altro: modCaratteristicheDeposizione.altro
        }

        await cm.editCaratteristicheDeposizione(JSON.stringify(modifiche)).then(res => {
            console.log('editCaratteristicheDeposizione', res)
            if (res.response === 'success') {
                aggiorna()
                setEditable(false)
            }
        })
    }


    let aggiorna = () => {
        getIndividuoById().then(res => {
            console.log('GetIndividuoById', res)
            switch (res.response) {
                case 'success':
                    setIndividuo(res)
                    setVisibilita(res.individuo.visibilita)
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

                                    {editable ? (<div className='mb-3' >
                                        <div className='border rounded p-2' >
                                            <p>Stato visibilità:</p>
                                            <Form.Select required aria-label="Default select example" defaultValue={visibilita} onChange={(e) => setVisibilita(e.target.value)}>
                                                <option value='0'>Bozza</option>
                                                <option value='1'>Pubblico</option>
                                            </Form.Select>
                                        </div>
                                    </div>) : (<></>)}

                                    <GeneralitàIndividuo col="col-6" editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheGeneralità} callback={aggiorna} />
                                    <ProfiloBiologicoIndividuo col="col-6" editable={editable} individuo={individuo.individuo} tomba={individuo.tomba} onIndividuoChange={addModificheProfiloBiologio} callback={aggiorna} />
                                    {caratteristicheDeposizione ? (<CaratteristicheDellaDeposizione col="col-6 mt-5" editable={editable} individuo={caratteristicheDeposizione} onIndividuoChange={addModificheCaratteristicheDeposizione} callback={aggiorna} />
                                    ) : (
                                        <></>
                                    )}
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