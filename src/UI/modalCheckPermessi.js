import React, { useEffect, useState } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectionManager from "../api/ConnectionManager";


function ModalCheckPermessi(props) {

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUserInfo = async (e) => {
        let cm = new ConnectionManager();
        var params = { id: localStorage.getItem('userID') }
        let res = await cm.getUserInfo(JSON.stringify(params))
        return res
    }
    const [userInfo, setUserInfo] = useState()

    let getPermissionName = () => {
        switch (userInfo.ruolo) {
            case '1':
                return <span className='text-primary'>Solo lettura</span>
            case '2':
                return <span className='text-primary'>Lettura e scrittura</span>
            case '3':
                return <span className='text-primary'>Amministratore</span>
            default:
                return <span>ao</span>
        }
    }

    let getPermissionDescription = () => {
        switch (userInfo.ruolo) {
            case '1':
                return <div>
                    <p>Con questo ruolo le sarà permesso:</p>
                    <ul>
                        <li>Leggere le varie schede senza poterle modificare</li>
                        <li>Esportare il contenuto delle schede in PDF</li>
                    </ul>
                </div>
            case '2':
                return <div>
                    <p>Con questo ruolo le sarà permesso:</p>
                    <ul>
                        <li>Creare, modificare ed eliminare tombe</li>
                        <li>Creare, modificare ed eliminare necropoli</li>
                        <li>Creare, modificare ed eliminare individui (SOLO SE DI TUA APPARTENENZA)</li>
                        <li>Esportare il contenuto delle schede in PDF</li>
                    </ul>
                </div>
            case '3':
                return <div>
                    <p>Con questo ruolo le sarà permesso:</p>
                    <ul>
                        <li>Creare, modificare ed eliminare tombe</li>
                        <li>Creare, modificare ed eliminare necropoli</li>
                        <li>Creare, modificare ed eliminare individui (Sarà possibile anche modificare ed eliminare individui appartenenti ad altri account, <span className='text-danger'>azione sconsigliata</span>)</li>
                        <li>Esportare il contenuto delle schede in PDF</li>
                    </ul>
                </div>
            default:
                return <span>ao</span>
        }
    }

    useEffect(() => {
        getUserInfo().then(res => {
            if (res.response === 'success') {
                setUserInfo(res.results[0])
            }
        })
    }, [])

    return (
        <div>
            <Dropdown.Item style={{ marginRight: '2vw' }} className='w-100 ' variant="primary" onClick={handleShow}>
                Permessi
            </Dropdown.Item  >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Il suo ruolo è:  {userInfo ? (getPermissionName()) : (<></>)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userInfo ? (getPermissionDescription()) : (<></>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default ModalCheckPermessi;