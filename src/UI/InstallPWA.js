import React from "react";
import logo from '../images/logo.png'

import { usePWAInstall } from 'react-use-pwa-install'
const InstallPWA = () => {
    const install = usePWAInstall()
    return (
        <div>
            {install && <div className="row justify-content-center">
                <div className="d-flex flex-column text-center col-10 border rounded p-1 shadow bg-white">
                    <div className="d-flex">
                        <img src={logo} style={{ height: '10vh' }} alt="logo"></img>
                        <p className="m-2">Il tuo browser supporta le applicazioni PWA, installala per poter utilizzare l'applicazione anche in offline</p>
                    </div>
                    <button
                        className="link-button btn btn-primary"
                        id="setup_button"
                        aria-label="Install app"
                        title="Install app"
                        onClick={install}
                    >
                        Installa
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default InstallPWA;