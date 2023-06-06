import React from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

//importo gli stili
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//SCHEDE
import Homepage from "./schede/homepage";
import SchedaTomba from "./schede/schedaTomba";
import SchedaIndividuo from "./schede/schedaIndividuo";

import SchedaCranio from './schede/distretti/schedaCranio'

//SCHEDA LOGIN
import Login from './Login'
import { GoogleOAuthProvider } from '@react-oauth/google';

//UI
import NavBar from "./UI/Navbar";
import SchedaUtente from "./schede/schedaUtente";

const container = document.getElementById('root');
const root = createRoot(container);

if (sessionStorage.getItem('tema') == null) {
    sessionStorage.setItem('tema', 'tema1')
}
const theme = sessionStorage.getItem('tema')

root.render(
    <GoogleOAuthProvider clientId="893808787073-9euu770ju7ncbmbbgbdedn9tdj5t3296.apps.googleusercontent.com">
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className={theme}>
                            <Login />
                        </div>
                    } />
                <Route
                    path="/home"
                    element={
                        <div className={theme} >
                            <NavBar />
                            <Homepage />
                        </div>
                    }
                />
                <Route
                    path="/individuo"
                    element={
                        <div className={theme} >
                            <NavBar />
                            <SchedaIndividuo />
                        </div>
                    }
                />
                <Route
                    path="/individuo/cranio"
                    element={
                        <div className={theme} >
                            <NavBar />
                            <SchedaCranio />
                        </div>
                    }
                />
                <Route
                    path="/tomba"
                    element={
                        <div className={theme} >
                            <NavBar />
                            <SchedaTomba />
                        </div>
                    }
                />
                <Route
                    path="/utente"
                    element={
                        <div className={theme} >
                            <NavBar />
                            <SchedaUtente />
                        </div>
                    }
                />
            </Routes>
        </HashRouter>
    </GoogleOAuthProvider>

);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
