
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ConnectionManager from '../api/ConnectionManager';


function OfflineCheck(props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const creaIndividuo = async (nome) => {
        let cm = new ConnectionManager();
        let params = {
            nome: nome,
            creatore: localStorage.getItem('userID')
        }
        await cm.createIndividuo(JSON.stringify(params)).then(
            res => {
                console.log('CreateIndividuo', res)
                if (res.response === 'success') {
                }
            }
        );
    }

    let uploadLocalData = async () => {

        if (localStorage.getItem('OfflineIndividui') != null) {
            let individui = JSON.parse(localStorage.getItem('OfflineIndividui'))
            individui.map(
                ind => {
                    creaIndividuo(ind.nome)
                }
            )
            localStorage.removeItem('OfflineIndividui')
        }
    }

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
            if (window.confirm('La connessione alla rete è stata ristabilita, vuoi tornare in modalità online?')) {
                uploadLocalData()
                //navigate('/')
            } else {
                alert('uffa')
            }
        }

        function offlineHandler() {
            setIsOnline(false);
            if (window.confirm('Non è possibile collegarsi alla rete, abilitare la modalità offline?')) {
                navigate('/offline')
            } else {
                alert('f')
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

        return <div className='bg-success w-100' style={{ height: '1px' }}></div>
    } else {
        return <div className='bg-danger w-100' style={{ height: '1px' }}></div>

    }
}
export default OfflineCheck