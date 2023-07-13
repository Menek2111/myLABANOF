import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-loader-spinner'
//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'
import { decode as base64_decode, encode as base64_encode, decode } from 'base-64';

import necropoli from '../images/icons/necropoli.PNG'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalUploadImage(props) {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const navigate = useNavigate();

    const [descrizione, setDescrizione] = useState()
    const [image, setImage] = useState()

    const [file, setFile] = useState()

    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDescrizione('')
        setReady(true)
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Chiamate API

    const createImage = async (e) => {
        let cm = new ConnectionManager();
        var params = { descrizione: descrizione, image: image, individuo: props.individuo }

        let res = await cm.createImage(JSON.stringify(params))
        console.log('createImage', res)
        if (res.response === 'success') {
            props.callback()
        }

    }
    let caricaImmagine = (event) => {
        event.preventDefault();

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file?.type)) {
            alert('Non è un immagine')
        } else {
            if (file.size < 2097152) {
                setReady(false)
                createImage().then(() => {
                    setTimeout(() => {
                        handleClose()
                    }, 500);
                })
            } else {
                alert('Immagine troppo pesante')
            }
        }


    }

    function getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    let handleFileInputChange = (e) => {


        console.log(e.target.files[0]);

        let file = e.target.files[0];
        setFile(file)



        console.log('image', image)
        let idCardBase64 = '';
        getBase64(file, (result) => {
            idCardBase64 = result;
            console.log('base 64', idCardBase64)
            setImage(idCardBase64)
        });

    };

    return <div className='py-2'>
        <Button variant="outline-primary" onClick={handleShow}>
            Carica nuova immagine
        </Button>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >
            <Form onSubmit={caricaImmagine}>
                <Modal.Header closeButton>
                    <Modal.Title>Carica immagine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleFileInputChange(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Descrizione immagine</Form.Label>
                        <Form.Control type="text" onChange={(e) => setDescrizione(e.target.value)} />
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
}
export default ModalUploadImage;