import React, { useEffect, useState } from "react";

import tomb from '../images/icons/tomb.png'
import { useNavigate } from 'react-router-dom'

import ConnectionManager from "../api/ConnectionManager";
import Loading from "../UI/loading";
import Button from 'react-bootstrap/Button';

function ListaTombe(props) {
    const navigate = useNavigate();

    const [max, setMax] = useState(6)

    useEffect(() => {

    }, [])

    let checkIndex = (tomba, i) => {
        if (i < max) {
            return <div key={tomba.id} className={props.colonna} >
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
        } else {
            return <></>
        }
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    let checkListaTombe = () => {
        if (props.tombe.length == 0) {
            return <div className="my-4">Non sono state trovate tombe...</div>
        } else {
            let arr = props.tombe.sort((a, b) => b.nIndividui - a.nIndividui)
            return (arr.map((tomba, index) =>
                checkIndex(tomba, index)
            ))
        }
    }

    let moreButton = () => {
        if (max >= props.tombe.length) {
            return <></>
        } else {
            return <Button variant="link" onClick={() => setMax((state) => state + 6)}>Mostra altre tombe</Button>
        }
    }

    return (
        <div className="row" style={{ overflowX: 'auto' }} >
            <div className="row w-100 d-flex flex-row" style={{ overflowY: 'auto' }} >
                {checkListaTombe()}
            </div>
            <div className=" text-end">
                {moreButton()}
            </div>
        </div >
    );

}
export default ListaTombe