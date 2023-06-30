import React, { useEffect, useState } from "react";
import indLogo from '../images/icons/skull.png'
import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import ConnectionManager from "../api/ConnectionManager";
import Loading from '../UI/loading'

function ListaIndividui(props) {
    const navigate = useNavigate();

    const [max, setMax] = useState(6)

    //Chiamate Connection Manager

    useEffect(() => {

    }, [props.individui])

    let parseTimeStamp = (timeStamp) => {

        if (timeStamp == null) return 'Nessuna modifica'

        var now = new Date(timeStamp * 1000);
        const formattedDate = new Date(now).toLocaleString(
            "it-IT",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
        return 'Modificato: ' + formattedDate
    }

    let checkIndex = (ind, i) => {
        if (i < max) {
            return <div key={ind.id} className={props.colonna} >
                <div className="d-flex rounded m-1 indCard border" style={{ backgroundColor: '', cursor: 'pointer' }} onClick={() => {
                    sessionStorage.setItem('individuoSelezionato', ind.id)
                    sessionStorage.setItem('individuoSelezionatoCreatore', ind.creatore)
                    navigate('/individuo')
                }}>
                    <div className="w-25">
                        <img src={indLogo} className="w-100 p-2" />
                    </div>
                    <div className="p-1 w-75">
                        <span >
                            {ind.nome}
                        </span>
                        <br />
                        <span style={{ fontSize: '0.8em' }}>
                            {ind.email}
                        </span>
                        <br />
                        <span style={{ fontSize: '0.7em' }}>
                            {parseTimeStamp(ind.ultimaModifica)}
                        </span>
                    </div>
                </div>
            </div>
        } else {
            return <></>
        }
    }

    let checkListaIndividui = () => {
        if (props.individui.length == 0) {
            return <div>Non sono stati trovati individui...</div>
        } else {
            return props.individui.map((ind, index) =>
                checkIndex(ind, index)
            )
        }
    }

    let moreButton = () => {
        if (max > props.individui.length) {
            return <></>
        } else {
            return <Button variant="link" onClick={() => setMax((state) => state + 6)}>Mostra altri individui</Button>
        }
    }

    return (<div>
        <div className="row w-100 d-flex flex-row" style={{ overflowY: 'auto' }} >
            {checkListaIndividui()}
        </div>
        <div className=" text-end">
            {moreButton()}
        </div>
    </div>)
}

export default ListaIndividui