import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import labanof from '../images/logoMyLabanof.PNG'
import ConnectionManager from '../api/ConnectionManager';

import { useLocation } from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutButton from './logOutButton';

import ModalChangeTheme from './modalChangeTheme'

function NavBar() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    const [result, setResult] = useState();

    const [tipoRicerca, setTipoRicerca] = useState('Individuo');

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const location = useLocation();

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profile')));
        getResultsByQuery('')
    }, [tipoRicerca, location]);

    const getResultsByQuery = async (query) => {
        let cm = new ConnectionManager();
        var params = { query: query }

        switch (tipoRicerca) {
            case 'Individuo':
                await cm.getIndividuoByQuery(JSON.stringify(params)).then(res => {
                    setResult(res.results)
                })
                break
            case 'Tomba':
                await cm.getTombaByQuery(JSON.stringify(params)).then(res => {
                    setResult(res.results)
                })
                break
            case 'Utente':
                await cm.getUtenteByQuery(JSON.stringify(params)).then(res => {
                    setResult(res.results)
                })
                break
        }
    }

    let getDropdownItem = () => {
        let array = []
        switch (tipoRicerca) {
            case 'Individuo':
                array.push('Tomba')
                array.push('Utente')
                break
            case 'Tomba':
                array.push('Individuo')
                array.push('Utente')
                break
            case 'Utente':
                array.push('Individuo')
                array.push('Tomba')
                break
        }
        return array
    }

    let getResultsItem = (res) => {
        switch (tipoRicerca) {
            case 'Individuo':
                return (<Dropdown.Item key={res.id} onClick={
                    () => {
                        sessionStorage.setItem('individuoSelezionato', res.id)
                        sessionStorage.setItem('individuoSelezionatoCreatore', res.creatoreID)
                        navigate('/individuo')
                    }
                }>
                    {res.nome}
                </Dropdown.Item>)
            case 'Tomba':
                return (<Dropdown.Item key={res.id} onClick={() => {
                    sessionStorage.setItem('tombaSelezionata', res.id)
                    navigate('/tomba')
                }
                }
                >
                    {res.nome}
                </Dropdown.Item >)
            case 'Utente':
                return (<Dropdown.Item key={res.id} onClick={() => {
                    sessionStorage.setItem('profiloSelezionato', res.id)
                    navigate('/utente')
                }
                }
                >
                    {res.name} - <span style={{ fontSize: '0.8em' }}>{res.email}</span>
                </Dropdown.Item >)
        }
    }

    let aggiornaResults = (opt) => {
        setTipoRicerca(opt)
    }

    return (
        <div>
            <Nav
                activeKey="/"
                //onSelect={(selectedKey) => alert(selectedKey)}
                className=''
                style={{ height: '7vh', backgroundColor: '#F7F9FC' }}
            >
                <div className='d-flex justify-content-between w-100'>
                    <div className='d-flex'>
                        <Nav.Item style={centerMiddle}>
                            <Nav.Link onClick={() => navigate('/home')}>
                                <img src={labanof} alt='Labanof logo' style={{ height: '5vh' }} />
                            </Nav.Link>
                        </Nav.Item>
                        <div className='py-2'>
                            <div className='bar border'>
                                <div className="text-center" style={centerMiddle}>

                                    <div className='px-2' style={{ borderRight: 'solid', borderWidth: '1px', borderColor: '#DEE2E6' }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" className='searchbar text-dark p-0 w-100'>
                                                <span className='text-dark p-1'>{tipoRicerca}</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className='rounded border mt-0 w-100'>
                                                {getDropdownItem().map(opt => <Dropdown.Item key={opt} onClick={() => {
                                                    aggiornaResults(opt)
                                                }
                                                }>{opt}</Dropdown.Item>)}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <Dropdown className='border-left w-100'>
                                        <Dropdown.Toggle variant="success" className='bg-transparent searchbar removeArrow p-0 w-100'>
                                            <input placeholder='Cerca...' className="px-2 w-100 searchbar2 bg-transparent rounded" onChange={(e) => getResultsByQuery(e.target.value)}  ></input>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='rounded border mt-0 w-100'>
                                            {
                                                result ? (result.map(res => getResultsItem(res))) : (<Dropdown.Item disabled>Nessun risultato...</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        {profile ? (
                            <Dropdown as={NavItem} style={centerMiddle}>
                                <Dropdown.Toggle as={NavLink} >
                                    <img style={{ height: '4vh' }} className="rounded rounded-circle" src={profile.picture} alt="user" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='rounded-0 border' style={{ marginRight: '2vw', width: '20vw' }}>
                                    <div className='w-100 text-center'>
                                        <div>
                                            <img style={{ height: '10vh' }} className="rounded" src={profile.picture} alt="user" referrerPolicy="no-referrer" />
                                            <h6>{profile.name}</h6>
                                        </div>
                                        <div className='border border-bottom'></div>
                                    </div>

                                    <Dropdown.Item onClick={() => {
                                        sessionStorage.setItem('profiloSelezionato', localStorage.getItem('userID'))
                                        navigate('/utente')
                                    }}>
                                        Profilo
                                    </Dropdown.Item >
                                    <Dropdown.Item disabled>Permessi</Dropdown.Item>

                                    <ModalChangeTheme />


                                    <div className='mt-3 w-100 text-center'>
                                        <LogOutButton />
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Item style={centerMiddle} >
                                <button className='btn btn-primary' style={{ marginRight: 5 }} onClick={() => navigate('/login')}>Accedi</button>
                            </Nav.Item>
                        )}
                    </div>
                </div>
            </Nav >
        </div >
    );
}
export default NavBar;