import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from "./Login";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <GoogleOAuthProvider clientId="893808787073-9euu770ju7ncbmbbgbdedn9tdj5t3296.apps.googleusercontent.com">
        <React.StrictMode>
            <Login />
        </React.StrictMode>
    </GoogleOAuthProvider>
);