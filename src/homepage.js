import React, { useState, useEffect } from 'react';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './UI/Navbar';
import Individuo from './schede/individuo';

function Homepage() {

    return (
        <div className='bg-info' style={{ width: '100vw', height: '100vh' }}>

            <NavBar />

            <Individuo />
        </div >
    );
}
export default Homepage;