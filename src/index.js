import React from "react";
import { createRoot } from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Homepage from "./homepage";
import Login from './Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import PaginaUtente from "./schede/paginaUtente";



const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <GoogleOAuthProvider clientId="893808787073-9euu770ju7ncbmbbgbdedn9tdj5t3296.apps.googleusercontent.com">
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Homepage />}
                />
                {/* The next line is very important for the Navigate component to work */}
                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>
        </HashRouter>
    </GoogleOAuthProvider>
);