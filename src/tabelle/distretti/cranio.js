import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";


function Cranio(props) {
    const [tipoOssa, setTipoOssa] = useState([])
    const [ossa, setOssa] = useState([])

    const getOssaByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaByDistretto(JSON.stringify({ distretto: 'Cranio' }));
        return res;
    }
    const getOssaIndividuoByDistretto = async (e) => {
        let cm = new ConnectionManager();
        let res = await cm.getOssaIndividuoByDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: 'Cranio' }));
        return res;
    }

    useEffect(() => {
        getOssaByDistretto().then(res => {
            setTipoOssa(res.results)
        })
        getOssaIndividuoByDistretto().then(res => {
            console.log(res.results)
            setOssa(res.results)
        })
    }, []);

    return (<div>
        <Table bordered striped hover size="sm">
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

                {tipoOssa.map(tipoOsso => <tr key={tipoOsso.id}>
                    <td>{tipoOsso.nome}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.lato
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.integro
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.lvlIntegrita
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.lvlQualita
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.restaurato
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.catalogazioneDescrizione
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.indagineRadiologica
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.campionamento
                        } else {
                            return ''
                        }
                    })}</td>
                    <td>{ossa.map(osso => {
                        if (osso.tipoOsso === tipoOsso.id) {
                            return osso.altreAnalisi
                        } else {
                            return ''
                        }
                    })}</td>
                </tr>)}
            </tbody>
        </Table>
    </div>)

}
export default Cranio;