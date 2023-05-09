import React, { useState } from "react";
import { fetchTest } from "./api/fetchTest";
import InstallPWA from "./InstallPWA";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    const [test, settest] = useState('')

    const search = async (e) => {
        const data = await fetchTest();
        console.log(data.test)
        settest(data)
    }

    return (
        <div className="bg-info p-3" style={{ height: '100vh', width: '100vw' }}>
            <div className="container bg-white rounded text-center">
                <div className="row justify-content-center">
                    <div className="col-5 p-4">
                        <h3 className="">Test applicazione PWA</h3>
                        <p>Progressive Web App è un termine, coniato in origine da Google, che si riferisce ad applicazioni web che vengono sviluppate e caricate come normali pagine web, ma che si comportano in modo simile alle applicazioni native quando utilizzate su un dispositivo mobile.</p>


                        <InstallPWA />
                    </div>
                </div>


            </div>
            <div className="container bg-white rounded text-center mt-3 p-2">
                <p>Il pulsante sottostante effettuerà una chiamata ad una API</p>
                <button className="btn btn-primary" onClick={() => search()}>Ao</button>
                {test.test && (
                    <div className="bg-warning rounded p-2 mt-5">
                        <p className="p-0 m-0">{test.test}</p>
                    </div>
                )}
            </div>
        </div>

    )
}
export default App