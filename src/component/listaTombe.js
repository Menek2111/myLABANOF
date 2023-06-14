import React, { useEffect, useState } from "react";

import tomb from '../images/icons/tomb.png'
import { useNavigate } from 'react-router-dom'

import ConnectionManager from "../api/ConnectionManager";
import Loading from "../UI/loading";

function ListaTombe(props) {
    const navigate = useNavigate();


    useEffect(() => {

    }, [])

    let checkListaTombe = () => {
        if (props.tombe.length == 0) {
            return <div>Non sono state trovate tombe...</div>
        } else {
            return (props.tombe.map(tomba =>
                <div key={tomba.id} className={props.colonna} >
                    <div className='d-flex rounded m-1 indCard border' style={{ backgroundColor: '', cursor: 'pointer' }} onClick={() => {
                        sessionStorage.setItem('tombaSelezionata', tomba.id)
                        navigate('/tomba')
                    }
                    }>
                        <div className="w-25" >
                            <img className="w-100 p-2" src={tomb} alt="tomba" />
                        </div>
                        <div className="w-75">
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='w-75 p-0 m-0'>
                                {tomba.nome}
                            </span><br />
                            <span style={{ fontSize: '0.8em' }}>
                                N° Individui: {tomba.nIndividui}
                            </span>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    return (
        <div className="row" style={{ overflowX: 'auto' }} >
            <div className="row w-100 d-flex flex-row" style={{ overflowY: 'auto' }} >
                {checkListaTombe()}
            </div>
        </div >
    );

}
export default ListaTombe