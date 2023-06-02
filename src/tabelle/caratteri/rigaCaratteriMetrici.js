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
    const [unitaMisura, setUnitaMisura] = useState(props.carattere.unitaMisura)

    const editCarattereMetricoSpecifico = async () => {
        let cm = new ConnectionManager();
        var params = { individuo: sessionStorage.getItem('individuoSelezionato'), tipoCarattereMetrico: props.carattere.tipoCarattereMetrico, lato: lato, valore: valore, unitaMisura: unitaMisura, id: props.carattere.id }
        await cm.editCarattereMetricoSpecifico(JSON.stringify(params)).then(res => {
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
                {props.carattere.valore}
            </td>
            <td>
                {props.carattere.unitaMisura}
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
                        <div className='d-flex justify-content-between'>
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
                                <Form.Control defaultValue={valore} onChange={(e) => setValore(e.target.value)} type="number" step="0.01" />
                            </Form.Group>
                            <Form.Group className="mb-2" >
                                <Form.Label>Unita di misura</Form.Label>
                                <Form.Control defaultValue={unitaMisura} onChange={(e) => setUnitaMisura(e.target.value)} type="text" />
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Chiudi senza salvare
                        </Button>
                        <Button variant="primary" type="submit">Salva</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </tr>
    );
}
export default RigaCaratteriMetrici;