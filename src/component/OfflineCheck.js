
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


function OfflineCheck(props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
            if (window.confirm('La connessione alla rete è stata ristabilita, vuoi tornare in modalità online?')) {
                alert('yee')
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