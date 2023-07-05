import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

//Classe per gestire le API
import ConnectionManager from '../api/ConnectionManager';

//Componenti
import ListaIndividui from '../component/listaIndividui'
import SideNav from '../component/sideNav';
import ListaTombe from '../component/listaTombe';
import ListaNecropoli from '../component/listaNecropoli'

//Componenti grafici
import { Dna } from 'react-loader-spinner'
import Loading from '../UI/loading';
import { useLocation } from 'react-router-dom';

function SchedaOffline() {
    const navigate = useNavigate();



    return (
        <div>
            <div className='px-4 py-2 containerPrincipale '>
                <div className='row d-flex'>

                    <div style={{ height: '89vh', overflowY: 'scroll' }}>

                        <div>SEI OFFLINE</div>
                    </div>

                </div>



            </div>
        </div >

    );
}
export default SchedaOffline;