import React, { useEffect, useState } from "react";

import ConnectionManager from "../api/ConnectionManager";
import Modal from 'react-bootstrap/Modal';
import ModalUploadImage from '../UI/modalUploadImage'
import Loading from '../UI/loading'
import Button from 'react-bootstrap/Button'

function ListaImmagini(props) {

    const getImagesByIndividuo = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getImagesByIndividuo(JSON.stringify({ individuo: props.individuo }))
        return res
    }
    const [image, setImage] = useState()

    useEffect(() => {
        aggiorna()
    }, [])

    let aggiorna = () => {
        getImagesByIndividuo().then(res => {
            console.log('getImageById', res)
            if (res.response == 'success') {
                setImage(res.results)
            } else {
                setImage([])
            }
        })
    }

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    let checkListaImmagini = () => {
        if (image.length == 0) {
            return <div className="p-3">Non ci sono immagini</div>
        } else {
            return <div className="row p-2 justify-content-start">
                {image ? (image.map(img =>
                    <MyModal image={img.image} id={img.id} description={img.descrizione} callback={aggiorna} />
                )) : (<Loading />)}
            </div>
        }
    }


    return (<div className={props.col}>
        <div className="border rounded p-2">
            <div style={centerMiddle} className="border-bottom mb-2 d-flex justify-content-between">
                <h5 className='m-0' >Galleria individuo</h5>
                <ModalUploadImage individuo={props.individuo} callback={aggiorna} />
            </div>

            {image ? checkListaImmagini() : (<Loading />)}


        </div>
    </div>)



}
{/*<img className="rounded" src={img.image}/>*/ }

function MyModal(props) {

    const deleteImmagine = async (e) => {

        if (window.confirm('Sei sicuro di voler eliminare questa immagine?')) {

            let cm = new ConnectionManager();
            var params = { id: props.id }
            let res = await cm.deleteImmagine(JSON.stringify(params))
            console.log('deleteImmagine', res)
            if (res.response === 'success') {
                props.callback()
                handleClose()
            }
        }

    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="col-2 p-1">
            <img src={props.image} className="rounded" onClick={handleShow} style={{ height: '20vh', width: 'auto', cursor: 'pointer' }} />
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName='myModal'
                size="xl"
                centered
            >
                <Modal.Body className='myModalBody text-center'>
                    <Modal.Header closeButton>
                        <p>{props.description}</p>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={props.image} className="w-50" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
                        <Button variant="outline-danger" onClick={() => deleteImmagine()}>Elimina immagine</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>


    );
}

export default ListaImmagini