import React, { useState, useEffect } from 'react';

//Import componenti
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Import classi
import ConnectionManager from '../../api/ConnectionManager';


import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RigaCaratteriMetrici(props) {
    useEffect(() => {
        console.log('caratteri ricevuti', props.carattere)
    }, []);

    //Gestione modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Chiamate API
    const [lato, setLato] = useState(props.carattere.lato)
    const [valore, setValore] = useState(props.carattere.valore)

    const editCarattereMetricoSpecifico = async (event) => {
        event.preventDefault();
        let cm = new ConnectionManager();
        var params = { individuo: sessionStorage.getItem('individuoSelezionato'), tipoCarattereMetrico: props.carattere.tipoCarattereMetrico, lato: lato, valore: valore, id: props.carattere.id }
        await cm.editCarattereMetricoSpecifico(JSON.stringify(params)).then(res => {
            console.log('EditCarattereMetricoSpecifico', res)
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        })
    }

    const deleteCarattereMetricoSpecifico = async () => {
        let cm = new ConnectionManager();
        var params = { id: props.carattere.id }
        await cm.deleteCarattereMetricoSpecifico(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        })
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {
            return handleShow()
        }
    }

    return (
        <tr style={{ cursor: 'pointer' }} key={props.carattere.id} onClick={() => checkUser()}>
            <td>
                {props.carattere.nome}
            </td>
            <td>
                {props.carattere.lato}
            </td>
            <td>
                {props.carattere.valore}
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
                <Form onSubmit={editCarattereMetricoSpecifico}>
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
                                <Form.Label>Valore (mm)</Form.Label>
                                <Form.Control defaultValue={valore} onChange={(e) => setValore(e.target.value)} type="number" step="0.01" />
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Button variant="outline-danger" onClick={() => deleteCarattereMetricoSpecifico()}>Elimina</Button>
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
export default RigaCaratteriMetrici;