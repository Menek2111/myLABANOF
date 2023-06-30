import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Import classi
import ConnectionManager from '../api/ConnectionManager';
import { useNavigate } from 'react-router-dom'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalEditTomba(props) {
    const navigate = useNavigate();

    const [nome, setNome] = useState(props.tomba.nome);
    const [num, setNum] = useState(props.tomba.nMinIndividui);
    const [coord, setCoord] = useState(props.tomba.coordinate);
    const [necropoli, setNecropoli] = useState(props.tomba.necropoli);

    const getNecropoli = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getAllNecropoli();
        return res;
    }
    const [listaNecropoli, setListaNecropoli] = useState([])

    useEffect(() => {
        console.log('ricevuto', props)

        getNecropoli().then(res => {
            console.log('getNecropoli', res)
            if (res.response === 'success') {
                setListaNecropoli(res.results)
            } else {
                setListaNecropoli([])
            }
        })
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const modificaTomba = async (event) => {
        event.preventDefault();

        let cm = new ConnectionManager();
        var params = { id: props.tomba.id, nome: nome, nMinIndividui: num, coordinate: coord, necropoli: necropoli }
        await cm.editTomba(JSON.stringify(params)).then(res => {
            console.log('EditTomba', res)
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        })
    }

    let checkProps = () => {
        if (props.necropoli != null) {
            return (<Form.Select required aria-label="Default select example" disabled>
                <option value={props.necropoli.id}>{props.necropoli.nome}</option>
            </Form.Select>)
        } else {
            return (<Form.Select defaultValue={necropoli} onChange={(e) => setNecropoli(e.target.value)}>
                <option></option>
                {listaNecropoli ? (listaNecropoli.map(necro => <option key={necro.id} value={necro.id}>{necro.nome}</option>))
                    : (<option></option>)}
            </Form.Select>)
        }
    }

    return (
        <div>
            <Button className='mx-2' variant="primary" onClick={handleShow}>
                MODIFICA
            </Button >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Form onSubmit={modificaTomba}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica tomba</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Necropoli di appartenenza: <span className='text-secondary' style={{ fontSize: '0.8em' }}>(Non obbligatorio)</span></Form.Label>
                            {checkProps()}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome tomba</Form.Label>
                            <Form.Control type="text" defaultValue={nome} onChange={(e) => setNome(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Numero minimo di individui</Form.Label>
                            <Form.Control min='0' type="number" defaultValue={num} onChange={(e) => setNum(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Coordinate tomba</Form.Label>
                            <Form.Control type="text" defaultValue={coord} onChange={(e) => setCoord(e.target.value)} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Chiudi senza salvare
                        </Button>
                        <Button variant="primary" type="submit">Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div >
    );
}
export default ModalEditTomba;