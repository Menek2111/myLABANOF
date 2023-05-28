import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";

import RigaCranio from './rigaCranio'
import RigaCranioVuota from "./rigaCranioVuota";


function Cranio(props) {
    const [ossa, setOssa] = useState([])
    const [tipoOssa, setTipoOssa] = useState([])

    const [ossaPresenti, setOssaPresenti] = useState([])

    const [loading, setLoading] = useState(false)

    const getOssaIndividuoByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: 'Cranio' }));
        return res;
    }
    const getOssaByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaByDistretto(JSON.stringify({ distretto: 'Cranio' }));
        return res;
    }

    useEffect(() => {

        getOssaByDistretto().then(res => {
            console.log('NomeTipoOssa', res.results)
            setTipoOssa(res.results.sort(compareTipoOssa))


            getOssaIndividuoByDistretto().then(res2 => {
                console.log('OssaIndividuo', res2.results)
                setOssa(res2.results.sort(compare))

                let output = []
                res2.results.map(osso => output.push(osso.tipoOsso))
                console.log('ossaPresenti', output)
                setOssaPresenti(output)

                setLoading(true)
            })
        })

    }, []);


    function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }
    function compareTipoOssa(a, b) {
        if (a.tipoOsso < b.tipoOsso) {
            return -1;
        }
        if (a.tipoOsso > b.tipoOsso) {
            return 1;
        }
        return 0;
    }
    function isPresent(int) {
        for (let i = 0; i < ossaPresenti.length; i++) {
            if (ossaPresenti[i] === int) {
                return true
            }
        }
        return false
    }

    function ao(tipoOsso) {
        if (!isPresent(tipoOsso.id)) {
            return <RigaCranioVuota tipoOsso={tipoOsso} key={tipoOsso.id} />
        }
    }


    return (<div>
        {loading ? (<Table bordered striped hover size="sm">
            <tbody>
                <tr>
                    <th>Osso</th>
                    <th>Materiale rivenuto</th>
                    <th>Integro</th>
                    <th>Livello di integrità</th>
                    <th>Livello di qualità</th>
                    <th>Restaurato</th>
                    <th>Catalogazione e descrizione</th>
                    <th>Indagine radiologica</th>
                    <th>Campionamento</th>
                    <th>Altre analisi</th>
                </tr>

                {ossa.map(osso => <RigaCranio key={osso.id} osso={osso} />)}
                {tipoOssa.map(tipoOsso =>
                    ao(tipoOsso)
                )}
            </tbody>
        </Table>) : (
            <div>NO</div>
        )}
    </div>)


    /*
    return (<div>
       

    </div>)
*/
}
export default Cranio;