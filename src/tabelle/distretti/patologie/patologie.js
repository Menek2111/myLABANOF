import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../../api/ConnectionManager";
import ModalCreateTrauma from "../../../UI/modalCreateTrauma";
import ModalCreatePatologia from "../../../UI/modalCreatePatologia";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Patologie(props) {

    const [patologie, setPatologie] = useState([])
    const [listaPatologie, setListaPatologie] = useState()
    const [classiPatologie, setClassiPatologie] = useState()

    const aggiorna = () => {
        getPatologiaSpecifica().then(res => {
            console.log('getPatologiaSpecifica', res)
            if (res.response === 'success') {
                setPatologie(res.results)
            } else {
                setPatologie([])
            }
        })
    }

    const getPatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        let res;
        if (props.distretto != 2) {
            res = await cm.getPatologiaSpecifica(JSON.stringify({ osso: props.osso }));
        } else {
            res = await cm.getPatologiaSpecifica(JSON.stringify({ dente: props.osso }));
        }
        return res;
    }

    const getPatologieGenerali = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getPatologieGenerali();
        return res;
    }

    const getClassiPatologie = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getClassiPatologie();
        return res;
    }

    useEffect(() => {
        getPatologiaSpecifica().then(res => {
            console.log('getPatologiaSpecifica', res)
            if (res.response === 'success') {
                setPatologie(res.results)
            }
        })

        getPatologieGenerali().then(res => {
            console.log('getPatologiaByDistretto', res)
            if (res.response === 'success') {
                if (props.distretto == 2) {
                    let array = []
                    res.results.map((pat, i) => {
                        if (pat.odontoiatrico == 1) {
                            array.push(pat)
                        }
                    })
                    setListaPatologie(array)
                } else {
                    let array = []
                    res.results.map((pat, i) => {
                        if (pat.odontoiatrico == 0) {
                            array.push(pat)
                        }
                    })
                    setListaPatologie(array)
                }
            }
        })

        getClassiPatologie().then(res => {
            console.log('getClassiPatologie', res)
            if (res.response === 'success') {
                setClassiPatologie(res.results)
            }
        })
    }, []);


    let getPatologie = () => {
        if (patologie.length == 0) {
            return <div className="border rounded p-2 mb-4">Non sono presenti patologie...</div>
        } else {
            return (
                <div className="border rounded p-2 mb-4">
                    <Table bordered striped size="sm">
                        <thead>
                            <tr>
                                <th>Patologia</th>
                                <th>Classe patologia</th>
                                <th>Descrizione</th>
                                <th>Litica</th>
                                <th>Proliferativa</th>
                                {checkUser2()}
                            </tr>
                        </thead>
                        <tbody>
                            {patologie ? (classiPatologie ?
                                ((patologie.map(patologia =>
                                    <RigaPatologia key={patologia.id} patologia={patologia} classiPatologie={classiPatologie} patologie={listaPatologie} callback={aggiorna} />
                                )))
                                : (<tr></tr>))
                                : (<tr></tr>)}
                        </tbody>
                    </Table>
                </div >
            )
        }
    }
    let checkUser2 = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return
        } else {
            return <td></td>
        }
    }

    let checkUser = () => {


        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':
                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return (<div></div>)
                } else {

                    return <ModalCreatePatologia osso={props.osso} distretto={props.distretto} patologie={listaPatologie} classiPatologie={classiPatologie} callback={aggiorna} />
                }
            case '3':
                return <ModalCreatePatologia osso={props.osso} distretto={props.distretto} patologie={listaPatologie} classiPatologie={classiPatologie} callback={aggiorna} />

            default:
                return <></>
        }






    }

    //<ModalCreateTrauma traumi={traumi} distretto={1} osso={props.osso} />
    return (<div className="">
        <div className='border-bottom mb-2 d-flex justify-content-between'>
            <h5 className=''>Patologie</h5>
            {
                listaPatologie ? classiPatologie ?
                    (checkUser())
                    : (<div></div>)
                    : (<div></div>)
            }
        </div>

        {listaPatologie ? classiPatologie ?
            (getPatologie())
            : (<div></div>)
            : (<div></div>)
        }

        <div className="d-flex justify-content-end">
        </div>

    </div >)
}


function RigaPatologia(props) {

    const [editable, setEditable] = useState(false);

    let valueToBoolean = (val) => {
        if (val == 1) {
            return true
        } else {
            return false
        }
    }
    let booleanToValue = (val) => {
        if (val) {
            return true
        } else {
            return false
        }
    }

    const [tipoPatologia, setTipoPatologia] = useState(props.patologia.tipoPatologia)
    const [descrizione, setDescrizione] = useState(props.patologia.descrizione)
    const [litica, setLitica] = useState(valueToBoolean(props.patologia.litica))
    const [proliferativa, setProliferativa] = useState(valueToBoolean(props.patologia.proliferativa))
    const [classePatologia, setClassePatologia] = useState(props.patologia.classePatologia)

    const editPatologiaSpecifica = async () => {

        let cm = new ConnectionManager();
        var params = {
            osso: props.patologia.osso,
            tipoPatologia: tipoPatologia,
            descrizione: descrizione,
            litica: booleanToValue(litica),
            proliferativa: booleanToValue(proliferativa),
            classePatologia: classePatologia,
            id: props.patologia.id
        }
        await cm.editPatologiaSpecifica(JSON.stringify(params)).then(res => {
            console.log('EditPatologiaSpecifica', res)
            if (res.response === 'success') {
                props.callback()
                setEditable(false)
            }
        })
    }

    const deletePatologiaSpecifica = async () => {
        let cm = new ConnectionManager();
        var params = {
            id: props.patologia.id
        }
        await cm.deletePatologiaSpecifica(JSON.stringify(params)).then(res => {
            if (res.response === 'success') {
                props.callback()
            }
        })
    }

    useEffect(() => {

    }, []);


    let checkUser = () => {

        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':
                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return
                } else {

                    return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                        <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                        <Button className='p-1 mx-1' variant='danger' onClick={() => deletePatologiaSpecifica()}>Elimina</Button>
                    </td>)
                }
            case '3':
                return (<td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                    <Button className='p-1' onClick={() => setEditable((state) => !state)}>Modifica</Button>
                    <Button className='p-1 mx-1' variant='danger' onClick={() => deletePatologiaSpecifica()}>Elimina</Button>
                </td>)
            default:
                return <></>
        }
    }


    return editable ? (
        <tr>
            <td>
                <Form.Select defaultValue={tipoPatologia} onChange={(e) => setTipoPatologia(e.target.value)} disabled>
                    <option></option>
                    {props.patologie.map(pato => <option key={pato.id} value={pato.id}>{pato.nome}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Select defaultValue={classePatologia} onChange={(e) => setClassePatologia(e.target.value)} >
                    <option></option>
                    {props.classiPatologie.map(classe => <option key={classe.id} value={classe.id}>{classe.nome}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Control required type="text" defaultValue={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={litica}
                    onChange={() => setLitica((state) => !state)}
                />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={proliferativa}
                    onChange={() => setProliferativa((state) => !state)}
                />
            </td>
            <td className='text-center' style={{ whiteSpace: 'nowrap', width: '1%' }}>
                <Button variant="secondary" className='p-1' onClick={() => setEditable((state) => !state)}>Annulla</Button>
                <Button variant="primary" className='p-1 mx-1' onClick={() => editPatologiaSpecifica()}>Salva</Button>

            </td>
        </tr >

    ) : (
        <tr>
            <td>{props.patologia.nome}</td >
            <td>{props.patologia.classePatologiaNome}</td>
            <td>{props.patologia.descrizione}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.patologia.litica)}
                    disabled
                />
            </td>
            <td>
                <Form.Check
                    type="checkbox"
                    defaultChecked={valueToBoolean(props.patologia.proliferativa)}
                    disabled
                />
            </td>

            {checkUser()}

        </tr >
    )
}

export default Patologie;