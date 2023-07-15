
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './images/myLabanof.PNG'
import unilogo from './images/unimi.png'
import google from './images/google-logo.png'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from './api/ConnectionManager';
import Form from 'react-bootstrap/Form';

import bg from './images/background/bg2.png'


function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const [mem, setMem] = useState(true)

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    //PROVA OFFLINE
    const [isOnline, setIsOnline] = useState(navigator.onLine);


    //Prova clear chache
    // Function to clear complete cache data
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        alert('Gli aggiornamenti più recenti sono stati installati')
        window.location.reload(false)
    };

    const creaIndividuo = async (ind) => {
        let cm = new ConnectionManager();
        let params = {
            nome: ind.nome,
            creatore: localStorage.getItem('offlineId')
        }
        let res = await cm.createIndividuo(JSON.stringify(params)).then(
            res => {
                console.log('CreateIndividuo', res)
                if (res.response === 'success') {
                    alert('Individuo creato durante la sessione offline caricato correttamente')
                    editIndividuo(ind, res.results)
                    editCaratteristicheDeposizione(ind, res.results)
                }
            }
        );
        return res
    }
    const editIndividuo = async (ind, id) => {
        let cm = new ConnectionManager();
        let modifiche = {
            id: id,
            nome: ind.nome,
            luogoRinvenimento: ind.luogoRinvenimento,
            dataRinvenimento: ind.dataRinvenimento,
            classeDiEta: ind.classeDiEta,
            origineBiologica: ind.origineBiologica,
            origineGeografica: ind.origineGeografica,
            sessoBiologico: ind.sessoBiologico,
            stato: ind.stato,
            tomba: ind.tomba,
            visibilita: ind.visibilita,
            pesoIndividuo: ind.pesoIndividuo,
            pesoCremazione: ind.pesoCremazione,
            volumeCremazione: ind.volumeCremazione
        }

        await cm.editIndividuo(JSON.stringify(modifiche)).then(res => {
            console.log('editIndividuo', res)
            if (res.response === 'success') {
                //alert('Individuo modificato')
            }
        })
    }
    const editCaratteristicheDeposizione = async (ind, id) => {
        let cm = new ConnectionManager();

        let modifiche = {
            individuo: id,
            luogoRitrovamento: ind.caratteristicheDellaDeposizione.luogoRitrovamento,
            tipoSepoltura: ind.caratteristicheDellaDeposizione.tipoSepoltura,
            tipoTerreno: ind.caratteristicheDellaDeposizione.tipoTerreno,
            fauna: ind.caratteristicheDellaDeposizione.fauna,
            clima: ind.caratteristicheDellaDeposizione.clima,
            effettiPersonali: ind.caratteristicheDellaDeposizione.effettiPersonali,
            ossaAnimali: ind.caratteristicheDellaDeposizione.ossaAnimali,
            informazioniAnteMortem: ind.caratteristicheDellaDeposizione.informazioniAnteMortem,
            altro: ind.caratteristicheDellaDeposizione.altro
        }

        await cm.editCaratteristicheDeposizione(JSON.stringify(modifiche)).then(res => {
            console.log('editCaratteristicheDeposizione', res)
            if (res.response === 'success') {
                //alert('modificatre caratteristiche deposizione')
            }
        })
    }

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
            localStorage.setItem('isOnline', true)
        }

        function offlineHandler() {
            setIsOnline(false);
            localStorage.setItem('isOnline', false)
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);


        //Controllo se il token è ancora valido, se lo è impedisco la visualizzazione della pagina
        /*
        checkJWT().then(
            res => {
                if (res.response === 'success') {
                    navigate('/home')
                }
            }
        )*/

        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    localStorage.setItem('profile', JSON.stringify(res.data))
                    sessionStorage.setItem('access_token', user.access_token)


                    register(res.data).then(ress => {
                        if (ress.response === 'success') {

                            if (mem) {
                                localStorage.setItem('offlineProfile', JSON.stringify(res.data))
                                localStorage.setItem('offlineId', ress.userId.id)
                            } else {
                                localStorage.removeItem('offlineProfile')
                                localStorage.removeItem('offlineId')
                            }

                            localStorage.setItem('userID', ress.userId.id)
                            if (ress.action == 'login') {
                                if (ress.userId.ruolo != 0) {
                                    localStorage.setItem('ruolo', ress.userId.ruolo)
                                    navigate('/home')

                                    if (localStorage.getItem('OfflineIndividui') != null) {
                                        let individui = JSON.parse(localStorage.getItem('OfflineIndividui'))
                                        individui.map(
                                            ind => {
                                                creaIndividuo(ind)
                                            }
                                        )
                                        localStorage.removeItem('OfflineIndividui')
                                    }

                                } else {
                                    alert('La richiesta di accesso è già stata effettuata, dovrai attendere la conferma da parte di un amministratore myLABANOF')
                                }
                            } else {
                                alert('è stata effettuata la richiesta di accesso per: ' + res.data.email)
                            }
                        }
                    })

                })
                .catch((err) => console.log(err));
        }

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    },
        [user, navigate]
    );

    // log out function to log the user out of google and set the profile array to null
    /*
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        sessionStorage.removeItem('access_token')
    };
    */

    const register = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.register(JSON.stringify(e));
        return res;
    }

    const checkJWT = async (e) => {
        let cm = new ConnectionManager();
        const res = await cm.checkJWT();
        console.log(res)
        return res;
    }

    let checkMemorizzato = () => {
        if (localStorage.getItem('offlineId') != null) {
            let utente = JSON.parse(localStorage.getItem('offlineProfile'))
            return (<>
                <p>
                    Non è stata rilevata nessuna connessione di rete:
                    è possibile ultilizzare l'applicazione in modalità offline
                </p>
                <button onClick={() => navigate('/offline')}>Accedi come: {utente.email}</button>
            </>)
        } else {
            return (<p>Non è stato trovato alcun account salvato, quindi non sarà possibile utilizzare l'applicazione MyLABANOF fino a quando la connessione non verrà ristabilita</p>)
        }
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} >
            <div className='container p-3 h-100'>
                <div className=' h-100 row align-items-center justify-content-center'>

                    <div className=' bg-white col-lg-6 col-sm-12 col-md-6 shadow rounded text-center d-flex'>
                        <div className=''>

                            {isOnline ? (<img className='my-3' src={logo} style={{ height: '25vh' }} alt="logo"></img>
                            ) : (<></>)}


                            <div>
                                <h4>Accedi a MyLabanof</h4>
                                {isOnline ? (
                                    <button className='btn btn-link text-dark' style={{ position: 'absolute', top: '0', right: '0' }} onClick={() => clearCacheData()} >
                                        Verifica aggiornamenti</button>
                                ) : (
                                    <></>
                                )}
                            </div>


                            <div className='border border-bottom my-4'></div>
                            <p>Per poter utilizzare quest'applicazione è necessario effettuare l'accesso tramite Google</p>

                            <div className='pb-3 text-center justify-content-center d-flex'>
                                <div className='d-flex flex-column'>

                                    {isOnline ? (<> <button className='btn border btn-primary' onClick={() => login()}>
                                        <img className='bg-white p-1 rounded rounded-circle' src={google} style={{ height: '5vh' }} alt="google logo" /> Accedi con Google
                                    </button>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            label="Memorizza dispositivo per la modalità offline"
                                            onChange={() => setMem((state) => !state)}
                                            defaultChecked={mem}
                                        />

                                    </>) : (
                                        <>
                                            {checkMemorizzato()}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ div>
    );
}

export default Login;