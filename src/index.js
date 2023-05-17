import React from "react";
import { createRoot } from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Homepage from "./schede/homepage";
import Login from './Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import SchedaIndividuo from "./schede/schedaIndividuo";
import NavBar from "./UI/Navbar";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <GoogleOAuthProvider clientId="893808787073-9euu770ju7ncbmbbgbdedn9tdj5t3296.apps.googleusercontent.com">
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Login />
                    } />
                <Route
                    path="/home"
                    element={
                        <div>
                            <NavBar />
                            <Homepage />
                        </div>
                    }
                />
                <Route
                    path="/individuo"
                    element={
                        <div>
                            <NavBar />
                            <SchedaIndividuo />
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
