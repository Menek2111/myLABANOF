import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import labanof from '../images/logoMyLabanof.PNG'

import search from '../images/search.png'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutButton from './logOutButton';

function NavBar() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, []);


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
                            <Nav.Link href="/">
                                <img src={labanof} alt='Labanof logo' style={{ height: '5vh' }} />
                            </Nav.Link>
                        </Nav.Item>
                        <div className='py-2'>
                            <div className="bar text-center mx-3 p-0" style={centerMiddle}>
                                <img className='p-0 mx-3' src={search} alt="search" style={{ height: '2vh' }}></img>
                                <input className="searchbar bg-transparent" type="text"></input>
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
                                            <img style={{ height: '10vh' }} className="rounded" src={profile.picture} alt="user" referrerpolicy="no-referrer" />
                                            <h6>{profile.name}</h6>
                                        </div>
                                        <div className='border border-bottom'></div>
                                    </div>

                                    <Dropdown.Item href='#/utente' >
                                        Profilo

                                    </Dropdown.Item >
                                    <Dropdown.Item>Permessi</Dropdown.Item>
                                    <Dropdown.Item>Tema</Dropdown.Item>



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