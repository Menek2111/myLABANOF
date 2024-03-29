
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ConnectionManager from '../api/ConnectionManager';

import { googleLogout } from '@react-oauth/google';

function OfflineCheck(props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);


    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const creaIndividuo = async (ind) => {
        let cm = new ConnectionManager();
        let params = {
            nome: ind.nome,
            creatore: localStorage.getItem('offlineId')
        }
        await cm.createIndividuo(JSON.stringify(params)).then(
            res => {
                console.log('CreateIndividuo', res)
                if (res.response === 'success') {
                    alert('Individuo creato')
                    editIndividuo(ind, res.results)
                    editCaratteristicheDeposizione(ind, res.results)
                }
            }
        );

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
                alert('Individuo modificato')
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
                alert('modificatre caratteristiche deposizione')
            }
        })
    }
    let uploadLocalData = async () => {

        if (localStorage.getItem('OfflineIndividui') != null) {
            let individui = JSON.parse(localStorage.getItem('OfflineIndividui'))
            individui.map(
                ind => {
                    creaIndividuo(ind)
                }
            )
            localStorage.removeItem('OfflineIndividui')
        }
    }

    const location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('profile')
        localStorage.removeItem('userID')
        sessionStorage.removeItem('access_token')
        navigate('/')
    };

    useEffect(() => {

        if (localStorage.getItem('userID') == null) {
            navigate('/')
        }

        function onlineHandler() {
            setIsOnline(true);
            if (localStorage.getItem('offlineId') != null) {
                alert('La connessione alla rete è stata ristabilita, verrà attivata la modalità online')
                localStorage.setItem('isOnline', true)
                //uploadLocalData()

                navigate('/home')

            } else {
                alert('La connessione alla rete è stata ristabilita')
            }
            logOut()
        }

        function offlineHandler() {
            setIsOnline(false);

            if (localStorage.getItem('offlineId') != null) {
                alert('Non è possibile collegarsi alla rete, verrà attivata la modalità offline')
                localStorage.setItem('isOnline', false)
                navigate('/offline')
            } else {
                alert('Non è possibile collegarsi alla rete, si consiglia di attendere')
                navigate('/')
            }
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, [location, navigate])

    //<div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } />

    if (isOnline) {
        return <div className='bg-success w-100' style={{ height: '1px' }}>
        </div>
    } else {
        return <div className='bg-danger w-100 text-white text-center' >
            In attesa di connessione...
        </div>
    }
}
export default OfflineCheck