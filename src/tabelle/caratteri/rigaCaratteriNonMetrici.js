import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Import classi
import ConnectionManager from '../../api/ConnectionManager';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RigaCaratteriNonMetrici(props) {
    useEffect(() => {
        console.log('caratteri ricevuti', props.carattere)
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let booleanToValue = (val) => {
        if (val) {
            return 1
        } else {
            return 0
        }
    }

    function checkValue(value) {
        if (value == 0) {
            return false
        } else {
            return true
        }
    }

    const [lato, setLato] = useState(props.carattere.lato)
    const [valore, setValore] = useState(checkValue(props.carattere.valore))

    const editCarattereNonMetricoSpecifico = async () => {
        let cm = new ConnectionManager();
        var params = {
            individuo: sessionStorage.getItem('individuoSelezionato'),
            tipoCarattereMetrico: props.carattere.tipoCarattereMetrico,
            lato: lato,
            valore: booleanToValue(valore),
            id: props.carattere.id
        }
        await cm.editCarattereNonMetricoSpecifico(JSON.stringify(params)).then(res => {
            console.log('OOOO', res)
            if (res.response === 'success') {
                window.location.reload(false);
            }
        })
    }


    const deleteCarattereNonMetricoSpecifico = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id }
        await cm.deleteCarattereNonMetricoSpecifico(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                window.location.reload(false);
            }
        })
    }



    return (
        <tr key={props.carattere.id} onClick={handleShow}>
            <td>
                {props.carattere.nome}
            </td>
            <td>
                {props.carattere.lato}
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valore}
                    disabled
                />
            </td>
            <Modal
                show={show}
                onClick={e => e.stopPropagation()}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modifica {props.carattere.nome} </Modal.Title>
                </Modal.Header>
                <Form onSubmit={editCarattereNonMetricoSpecifico}>
                    <Modal.Body>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Carattere metrico</Form.Label>
                            <Form.Control defaultValue={props.carattere.nome} disabled></Form.Control>
                        </Form.Group>
                        <div className='d-flex justify-content-around'>
                            <Form.Group className="mb-2 w-25" >
                                <Form.Label>Lato</Form.Label>
                                <Form.Select defaultValue={lato} onChange={(e) => setLato(e.target.value)} required>
                                    <option></option>
                                    <option>Destro</option>
                                    <option>Sinistro</option>
                                    <option>Unico</option>
                                    <option>Incerto</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" >
                                <Form.Label>Valore</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={valore}
                                    onChange={() => {
                                        setValore((state) => !state)
                                    }}
                                />
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Button variant="outline-danger" onClick={() => deleteCarattereNonMetricoSpecifico()}>Elimina</Button>
                        <div>
                            <Button variant="secondary" onClick={handleClose}>
                                Chiudi senza salvare
                            </Button>
                            <Button className='mx-1' variant="primary" type="submit">Salva</Button>
                        </div>

                    </Modal.Footer>
                </Form>
            </Modal>
        </tr>
    );
}
export default RigaCaratteriNonMetrici;