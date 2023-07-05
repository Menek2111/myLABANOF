import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

//Classe per gestire le API
import ConnectionManager from '../api/ConnectionManager';

//Componenti
import ListaIndividui from '../component/listaIndividui'
import SideNav from '../component/sideNav';
import ListaTombe from '../component/listaTombe';
import ListaNecropoli from '../component/listaNecropoli'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//Componenti grafici
import { Dna } from 'react-loader-spinner'
import Loading from '../UI/loading';
import { useLocation } from 'react-router-dom';
import ModalCreateIndividuo from '../UI/modalCreateIndividuo';

import labanof from '../images/logoMyLabanof.PNG'
import OfflineListaIndividui from '../component/offlineListaIndividui';

function SchedaOffline() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [userID, setUserID] = useState(JSON.parse(localStorage.getItem('userID')))

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    useEffect(() => {

    }, [])

    return (
        <div>
            <Nav
                activeKey="/"
                //onSelect={(selectedKey) => alert(selectedKey)}
                className='justify-content-between'
                style={{ height: '7vh', backgroundColor: '#F7F9FC' }}
            >
                <Nav.Item style={centerMiddle}>
                    <Nav.Link onClick={() => navigate('/home')}>
                        <img src={labanof} alt='Labanof logo' style={{ height: '5vh' }} />
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item style={centerMiddle}>
                    <h5 className='p-0 m-0 text-danger'>MODALITA OFFLINE</h5>
                </Nav.Item>

                <Nav.Item style={centerMiddle}>
                    {profile ? (<h5 className='px-2 m-0'>{profile.email}</h5>) : (<></>)}
                    {userID ? (<h5 className='px-2 m-0'>{userID}</h5>) : (<></>)}
                </Nav.Item>
            </Nav>
            <div className='px-4 py-2 containerPrincipale '>
                <div className='row d-flex'>

                    <div className='bg-white rounded boder' style={{ height: '89vh', overflowY: 'scroll' }}>

                        <div className='text-center'>
                            <div className='my-3'></div>
                            <p>Queste sono le operazioni disponibili in modalità offline</p>
                            <ModalCreateIndividuo offline={true} />
                        </div>


                        <div className='border-bottom my-4'></div>
                        <p className='text-center'>Individui creati in modalità offline</p>

                        <OfflineListaIndividui col='col-2' />

                        <div>

                        </div>
                    </div>




                </div>



            </div>
        </div >

    );
}
export default SchedaOffline;