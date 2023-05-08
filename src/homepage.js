import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import labanof from './images/labanof-logo.png'
import { useNavigate } from 'react-router-dom'


import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Homepage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, []);

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    return (
        <div className='bg-info' style={{ width: '100vw', height: '100vh' }}>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(selectedKey)}
                className='bg-white'
                style={{ height: '7vh' }}
            >
                <div className='d-flex justify-content-between w-100'>
                    <div className='d-flex'>
                        <Nav.Item style={centerMiddle}>
                            <Nav.Link href="/home">
                                <img src={labanof} alt='Labanof logo' style={{ height: '5vh' }} />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={centerMiddle} >
                            <Nav.Link eventKey="link-1">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={centerMiddle}>
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                        </Nav.Item>

                    </div>
                    <div>
                        {profile ? (
                            <Dropdown as={NavItem} style={centerMiddle}>
                                <Dropdown.Toggle as={NavLink} >
                                    <img style={{ height: '4vh' }} className="rounded" src={profile.picture} alt="user" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ marginRight: 5, width: '20vw' }}>
                                    <div className='w-100 text-center'>
                                        <div>
                                            <img style={{ height: '10vh' }} className="rounded" src={profile.picture} alt="user" />
                                            <h6>{profile.name}</h6>
                                        </div>

                                        <div className='border border-bottom'></div>
                                    </div>
                                    <div>
                                        <h6>Impostazioni</h6>
                                    </div>
                                    <Dropdown.Item>Profilo</Dropdown.Item>
                                    <Dropdown.Item>Permessi</Dropdown.Item>
                                    <Dropdown.Item>Tema</Dropdown.Item>


                                    <div className='mt-3 w-100 text-center'>
                                        <button className='btn btn-danger' onClick={() => {
                                            googleLogout();
                                            localStorage.removeItem('profile')
                                            setProfile(null)
                                            navigate('/login')
                                        }}>Log out</button>
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
export default Homepage;