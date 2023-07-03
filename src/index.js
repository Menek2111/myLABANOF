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
import SchedaNecropoli from './schede/schedaNecropoli'
import SchedaCranio from './schede/schedaDistretto'

//SCHEDA LOGIN
import Login from './Login'
import { GoogleOAuthProvider } from '@react-oauth/google';

//UI
import NavBar from "./UI/Navbar";
import SchedaUtente from "./schede/schedaUtente";
import SchedaAmministratore from "./schede/schedaAmministratore";

const container = document.getElementById('root');
const root = createRoot(container);

if (sessionStorage.getItem('tema') == null) {
    sessionStorage.setItem('tema', 'temaMyLabanof')
}
const theme = sessionStorage.getItem('tema')


if (sessionStorage.getItem('font') == null) {
    sessionStorage.setItem('font', 'Roboto')
}
const font = sessionStorage.getItem('font')

root.render(
    <GoogleOAuthProvider clientId="893808787073-9euu770ju7ncbmbbgbdedn9tdj5t3296.apps.googleusercontent.com">
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <Login />
                            </div>
                        </div>
                    } />
                <Route
                    path="/home"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <Homepage />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo"
                    element={
                        <div className={theme}>
                            <div className={font}>
                                <NavBar />
                                <SchedaIndividuo />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/cranio"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Cranio' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/denti"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Denti' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/colonna"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Colonna' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/torace"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Torace' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/artiSuperiori"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Arti superiori' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/individuo/artiInferiori"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaCranio distretto='Arti inferiori' />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/tomba"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaTomba />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/necropoli"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaNecropoli />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/utente"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaUtente />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <div className={theme} >
                            <div className={font}>
                                <NavBar />
                                <SchedaAmministratore />
                            </div>
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
