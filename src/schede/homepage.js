import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

//Classe per gestire le API
import ConnectionManager from '../api/ConnectionManager';

//Componenti
import ListaIndividui from '../component/listaIndividui'
import SideNav from '../component/sideNav';
import ListaTombe from '../component/listaTombe';
//Componenti grafici
import { Dna } from 'react-loader-spinner'
import Loading from '../UI/loading';
import { useLocation } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    //Individui -> Elenco individui presenti nel DB
    //Tombe -> Elenco tombe presenti nel DB
    const [individui, setIndividui] = useState()
    const [tombe, setTombe] = useState()

    const getIndividui = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividui();
        return res;
    }

    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getTombe();
        return res;
    }

    const location = useLocation();

    useEffect(() => {
        getIndividui().then(res => {
            console.log('getIndividui', res)
            switch (res.response) {
                case 'success':
                    setIndividui(res.results)
                    break
                case 'error':
                    setIndividui([])
                    break
                default:
                    break
            }
        })
        getTombe().then(res => {
            if (res.response === 'success') {
                setTombe(res.results)
            } else {
                setTombe([])
            }
        })
    }, [location]);

    return (
        <div>
            <div className='px-4 py-2 containerPrincipale '>
                <div className='row d-flex'>
                    <div className='col-2 d-none d-sm-block d-md-none d-lg-block 	d-sm-none d-md-block' >
                        <SideNav />
                    </div>
                    <div className='col-sm-12 col-lg-10 bg-white border rounded' style={{ height: '89vh', overflowY: 'scroll' }}>

                        <h5 className='pt-3 border-bottom'>Tombe <span style={{ fontSize: '0.7em' }} className='text-secondary'>(Solo quelle contenenti almeno un individuo)</span></h5>

                        {tombe ? (<ListaTombe colonna="col-lg-4 col-sm-5" tombe={tombe} />) : (<div></div>)}

                        <h5 className='pt-3 border-bottom'>Individui</h5>
                        {individui ? (<ListaIndividui colonna="col-lg-4 col-sm-5" individui={individui} />) : (<Loading />)}

                    </div>
                </div>
            </div>
        </div >

    );
}
export default Homepage;