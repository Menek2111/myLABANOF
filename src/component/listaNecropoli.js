import React, { useEffect, useState } from "react";

import tomb from '../images/icons/tomb.png'
import necropoli from '../images/icons/necropoli.PNG'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';


function ListaNecropoli(props) {
    const navigate = useNavigate();

    const [max, setMax] = useState(6)


    useEffect(() => {

    }, [])

    let checkIndex = (tomba, i) => {
        if (i < max) {
            return <div key={tomba.id} className={props.colonna} >
                <div className='d-flex rounded m-1 indCard border' style={{ backgroundColor: '', cursor: 'pointer' }} onClick={() => {
                    sessionStorage.setItem('necropoliSelezionata', tomba.id)
                    navigate('/necropoli')
                }
                }>
                    <div className="w-25" >
                        <img className="w-100 p-2" src={necropoli} alt="tomba" />
                    </div>
                    <div className="w-75">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='w-75 p-0 m-0'>
                            {tomba.nome}
                        </span><br />
                        <span style={{ fontSize: '0.8em' }}>
                            N° tombe: {tomba.nTombe}
                        </span>
                    </div>
                </div>
            </div>
        } else {
            return <></>
        }
    }

    let checkListaTombe = () => {
        if (props.tombe.length == 0) {
            return <div>Non sono state trovate tombe...</div>
        } else {
            return (props.tombe.map((tomba, index) =>
                checkIndex(tomba, index)
            ))
        }
    }

    let moreButton = () => {
        if (max > props.tombe.length) {
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
export default ListaNecropoli