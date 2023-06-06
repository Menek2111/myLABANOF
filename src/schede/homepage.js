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

function Homepage() {
    const navigate = useNavigate();

    //Individui -> Elenco individui presenti nel DB
    //Tombe -> Elenco tombe presenti nel DB
    const [individui, setIndividui] = useState()
    const [tombe, setTombe] = useState()

    //Loading --> quando la variabile è true mostro la scheda
    const [loading, setLoading] = useState(false)

    //Chiamate Connection Manager
    const getIndividui = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividui();
        return res.response;
    }
    const getTombe = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getTombe();
        return res.response;
    }

    useEffect(() => {
        //Ottengo sia gli individui che le tombe
        getIndividui().then(res => {
            if (res.error != null) {
                alert('errore')
                navigate('/')
            } else {
                if (res !== '0 risultati') {
                    setIndividui(res)
                }


                getTombe().then(res => {
                    setTombe(res)
                    setLoading(true)
                })
            }
        })


    }, []);

    return (
        <div>
            {loading ? (
                <div className='px-4 py-2 containerPrincipale'>
                    <div className='row d-flex'>
                        <div className='col-2'>
                            <SideNav />
                        </div>
                        <div className='col-10 bg-white border rounded' style={{ height: '89vh', overflowY: 'scroll' }}>

                            <h5 className='pt-3 border-bottom'>Tombe</h5>
                            <ListaTombe colonna="col-2" tombe={tombe} navigator={navigate} />

                            <h5 className='pt-3 border-bottom'>Individui</h5>
                            <ListaIndividui colonna="col-4" individui={individui} navigator={navigate} />

                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ height: '93vh', backgroundColor: '#F7F9FC' }} className='d-flex flex-column justify-content-center text-center '>
                    <div>
                        <Dna
                            visible={true}
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                    <div>
                        Caricamento in corso...
                    </div>
                </div>)
            }
        </div >

    );
}
export default Homepage;