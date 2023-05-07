import React, { useEffect, useState } from "react";
import logo from './images/logo.png'

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };
    if (!supportsPWA) {
        return null;
    }
    return (
        <div className="row justify-content-center">
            <div className="d-flex flex-column text-center col-4 border rounded p-1 shadow">
                <img src={logo} className="w-100"></img>
                <button
                    className="link-button btn btn-primary"
                    id="setup_button"
                    aria-label="Install app"
                    title="Install app"
                    onClick={onClick}
                >
                    Installa
                </button>
            </div>
        </div>


    );
};

export default InstallPWA;