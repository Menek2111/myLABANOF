import React, { useEffect, useState } from "react";

import indThumb from '../images/icons/skull.png'

function OfflineListaIndividui(props) {

    const [individui, setIndividui] = useState()

    useEffect(() => {

        let array = JSON.parse(localStorage.getItem('OfflineIndividui'))
        setIndividui(array)

    }, [])

    return <div className="row">
        {individui ? (
            individui.map(ind => <div className={props.col}>
                <div className="indCard p-2 rounded border d-flex">
                    <img src={indThumb} style={{ height: '5vh' }} />
                    <p className="w-100 text-center">{ind.nome}</p>
                </div>
            </div>)
        ) : (<></>)
        }
    </div >
}
export default OfflineListaIndividui