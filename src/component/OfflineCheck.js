
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ConnectionManager from '../api/ConnectionManager';


function OfflineCheck(props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const [offlineMode, setOfflineMode] = useState(false)

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
            creatore: localStorage.getItem('userID')
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


    let goOnline = () => {
        localStorage.setItem('isOnline', true)
        uploadLocalData()
        setOfflineMode(false)
    }
    let goOffline = () => {
        localStorage.setItem('isOnline', false)
        navigate('/offline')
        setOfflineMode(true)
    }

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);

            if (window.confirm('La connessione alla rete è stata ristabilita, vuoi tornare in modalità online?')) {
                goOnline()
            }
        }

        function offlineHandler() {
            setIsOnline(false);
            if (window.confirm('Non è possibile collegarsi alla rete, abilitare la modalità offline?')) {
                goOffline()
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

    if (offlineMode) {
        return <div className='bg-success w-100' style={{ height: '1px' }}>

            {offlineMode ? (<a href='#/home' className='text-white p-0 m-0' onClick={() => goOnline()}>Torna in modalità online</a>) : (<></>)}

        </div>
    } else {
        return <div className='bg-danger w-100 row justify-content-betweeen' >
            <div className='col text-start' >
                <p className='m-0 p-0 text-white'>OFFLINE</p>
            </div>
            <div className='col text-center'>
                <p className='text-white p-0 m-0'>In attesa della rete ...</p>
            </div>
            <div className='col text-end'>
                {offlineMode ? (<></>) : (<a href='#/offline' className='text-white p-0 m-0' onClick={() => goOffline()}>Attiva modalità offline</a>)}
            </div>
        </div >
    }
}
export default OfflineCheck