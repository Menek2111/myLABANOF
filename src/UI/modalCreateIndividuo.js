import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ProgressBar } from 'react-loader-spinner'

import ind from '../images/icons/skull.png'

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCreateIndividuo(props) {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };
    const navigate = useNavigate();

    const [tomba, setTomba] = useState();
    const [nome, setNome] = useState('');
    const [tombe, setTombe] = useState([]);

    const [ready, setReady] = useState(false);

    const [isOffline, setIsOffline] = useState(false)

    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllTombe();
        return res;
    }

    useEffect(() => {

        if (props.offline == null) {
            setReady(true)
            getTombe().then(res => {
                console.log('GetTombe', res)
                if (res.response === 'success') {
                    setTombe(res.results)
                } else {
                    setTombe([])
                }
            })
        } else {
            setReady(true)
            setIsOffline(true)
        }
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setTomba('')
        setNome('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const createIndividuo = async (e) => {

        if (!isOffline) {
            let cm = new ConnectionManager();
            var params
            if (props.tomba != null) {
                params = { tomba: props.tomba.id, nome: nome, creatore: localStorage.getItem('userID') }
            } else {
                params = { tomba: tomba, nome: nome, creatore: localStorage.getItem('userID') }
            }
            await cm.createIndividuo(JSON.stringify(params)).then(
                res => {
                    console.log('CreateIndividuo', res)

                    if (res.response === 'success') {
                        sessionStorage.setItem('individuoSelezionato', res.results)
                        sessionStorage.setItem('individuoSelezionatoCreatore', localStorage.getItem('userID'))
                    }
                }
            );
        } else {
            if (localStorage.getItem('OfflineIndividui') == null) {
                let individui = []
                let individuo = {
                    nome: nome,
                    creatore: localStorage.getItem('userID'),
                    localId: 0
                }
                individui.push(individuo)
                localStorage.setItem('OfflineIndividui', JSON.stringify(individui))
            } else {
                let individui = JSON.parse(localStorage.getItem('OfflineIndividui'))
                let index = individui.length
                let individuo = {
                    nome: nome,
                    creatore: localStorage.getItem('userID'),
                    localId: index
                }
                individui.push(individuo)
                localStorage.setItem('OfflineIndividui', JSON.stringify(individui))
            }
            props.offlineCallback()
        }
    }

    //Chiamate API
    const creaIndividuo = async (event) => {
        event.preventDefault();

        setReady(false)
        createIndividuo().then(() => {
            if (!isOffline) {
                setTimeout(() => {
                    navigate('/individuo')
                }, 500);
            } else {
                setTimeout(() => {
                    handleClose()
                    setReady(true)
                }, 500);
            }
        })
    }

    let checkProps = () => {

        if (!isOffline) {
            if (props.tomba != null) {
                return (<Form.Select required aria-label="Default select example" disabled>
                    <option value={props.tomba.id}>{props.tomba.nome}</option>
                </Form.Select>)
            } else {
                return (<Form.Select required aria-label="Default select example" onChange={(e) => setTomba(e.target.value)}>
                    <option></option>
                    {tombe ? (tombe.map(tomba => <option key={tomba.id} value={tomba.id}>{tomba.nome}</option>))
                        : (<option></option>)}
                </Form.Select>)
            }
        } else {
            return <></>
        }


    }
    if (localStorage.getItem('ruolo') != 0 && localStorage.getItem('ruolo') != 1) {
        return (
            <div className='py-2'>
                <Button style={centerMiddle} className='w-100 d-flex justify-content-start' variant="outline-primary" onClick={handleShow}>
                    {props.offline ? (<></>) : (<img className='me-1 p-0 rounded' src={ind} style={{ height: '7vh' }} />
                    )}

                    <p className='m-0 ps-2'> Crea individuo</p>
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Creazione nuovo individuo</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={creaIndividuo}>
                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tomba di appartenenza:</Form.Label>

                                {checkProps()}

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Identificativo individuo</Form.Label>
                                <Form.Control required type="text" onChange={(e) => setNome(e.target.value)} />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            {ready ? (
                                <div>
                                    <Button className='mx-2' variant="secondary" onClick={handleClose}>
                                        Chiudi senza salvare
                                    </Button>

                                    <Button variant="primary" type='submit'>Salva</Button>
                                </div>
                            ) : (<ProgressBar
                                width='100%'
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor='#EDF2FC'
                                barColor='#0B5ED7'
                            />)}
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div >
        );
    } else {
        return <></>
    }
}
export default ModalCreateIndividuo;