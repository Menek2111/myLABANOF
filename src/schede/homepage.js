import React, { useState, useEffect } from 'react';

import ConnectionManager from '../api/ConnectionManager';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ListaIndividui from '../component/listaIndividui'
import SideNav from '../component/sideNav';

import { Dna } from 'react-loader-spinner'

import { useNavigate } from 'react-router-dom'

function Homepage() {
    const navigate = useNavigate();

    const [individui, setIndividui] = useState()

    const getIndividui = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getIndividui();
        return res.response;
    }

    useEffect(() => {
        getIndividui().then(res => {

            if (res.error != null) {
                alert('errore')

                navigate('/')
            } else {
                if (res != '0 risultati') {
                    setIndividui(res)
                }
            }

        })
    }, [navigate]);

    // backgroundColor: '#F7F9FC'
    return (
        <div className='p-4' style={{ height: '93vh', backgroundColor: '#F7F9FC' }}>

            <div className='rounded h-100'>
                <div className='container-fluid h-100'>

                    <div className='row d-flex h-100'>
                        <div className='col-2'>
                            <SideNav />
                        </div>
                        <div className='col-10 bg-white border rounded h-100'>

                            {individui ?
                                (
                                    <ListaIndividui individui={individui} navigator={navigate} />
                                ) : (
                                    <div className=' h-100 d-flex flex-column justify-content-center text-center'>
                                        <div>
                                            <Dna
                                                visible={true}
                                                ariaLabel="dna-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="dna-wrapper"
                                            />
                                        </div>

                                        <div>
                                            Non sono stati trovati individui...
                                        </div>

                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Homepage;