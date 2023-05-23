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

    const [loading, setLoading] = useState(false)

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

                setLoading(true)
            }
        })
        getTombe().then(res => {
            setTombe(res)
        })

    }, [navigate]);

    return (
        <div>
            {loading ? (
                <div className='px-4 py-2' style={{ height: '93vh', backgroundColor: '#F1E3E3' }}>
                    <div className='row d-flex'>
                        <div className='col-2'>
                            <SideNav />
                        </div>
                        <div className='col-10 bg-white border rounded' style={{ height: '89vh', overflowY: 'scroll' }}>

                            <h5 className='pt-3 border-bottom'>Tombe</h5>
                            <ListaTombe tombe={tombe} navigator={navigate} />


                            <h5 className='pt-3 border-bottom'>Individui</h5>
                            <ListaIndividui individui={individui} navigator={navigate} />

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
                </div>)}
        </div>

    );
}
export default Homepage;