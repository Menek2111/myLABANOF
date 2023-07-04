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

function Homepage() {
    const navigate = useNavigate();

    //Individui -> Elenco individui presenti nel DB
    //Tombe -> Elenco tombe presenti nel DB
    const [individui, setIndividui] = useState()
    const [tombe, setTombe] = useState()
    const [necropoli, setNecropoli] = useState()

    const getIndividui = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividui();
        return res;
    }

    const getNecropoli = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getNecropoli();
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
        getNecropoli().then(res => {
            console.log('getNecropoli', res)
            if (res.response === 'success') {
                setNecropoli(res.results)
            } else {
                setNecropoli([])
            }
        })
    }, [location]);

    let checkUser = () => {
        if (localStorage.getItem('ruolo') != 0 && localStorage.getItem('ruolo') != 1) {
            return (<div className='col-2 d-none d-sm-block d-md-none d-lg-block 	d-sm-none d-md-block' >
                <SideNav />
            </div>)
        } else {
            return <></>
        }
    }

    let checkUserClass = () => {
        if (localStorage.getItem('ruolo') != 0 && localStorage.getItem('ruolo') != 1) {
            return 'col-sm-12 col-lg-10 bg-white border rounded pb-5'
        } else {
            return 'col-sm-12 col-lg-12 bg-white border rounded pb-5'
        }
    }

    return (
        <div>
            <div className='px-4 py-2 containerPrincipale '>
                <div className='row d-flex'>
                    {checkUser()}

                    <div className={checkUserClass()} style={{ height: '89vh', overflowY: 'scroll' }}>


                        <h5 className='pt-3 border-bottom'>Necropoli <span style={{ fontSize: '0.7em' }} className='text-secondary'>(Solo quelle contenenti almeno una tomba)</span></h5>

                        {necropoli ? (<ListaNecropoli colonna="col-lg-4 col-sm-5" tombe={necropoli} />) : (<div></div>)}



                        <h5 className='pt-3 border-bottom'>Tombe <span style={{ fontSize: '0.7em' }} className='text-secondary'>(Solo quelle contenenti almeno un individuo)</span></h5>

                        {tombe ? (<ListaTombe colonna="col-lg-4 col-sm-5" tombe={tombe} />) : (<div></div>)}

                        <h5 className='pt-3 border-bottom'>Individui</h5>
                        {individui ? (<ListaIndividui pubblici={true} colonna="col-lg-4 col-sm-5" individui={individui} />) : (<Loading />)}

                    </div>

                </div>



            </div>
        </div >

    );
}
export default Homepage;