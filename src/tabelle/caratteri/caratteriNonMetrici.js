import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ConnectionManager from "../../api/ConnectionManager";
import RigaCaratteriNonMetrici from "./rigaCaratteriNonMetrici";
import ModalCreateCarattereNonMetrico from "../../UI/modalCreateCarattereNonMetrico";

function CaratteriNonMetrici(props) {

    const [caratteriNonMetrici, setCaratteriNonMetrici] = useState()
    const [caratteriNonMetriciIndividuo, setCaratteriNonMetriciIndividuo] = useState()

    const getCaratteriNonMetriciByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriNonMetriciByDistretto(JSON.stringify({ distretto: props.distretto }));
        return res;
    }
    const getCaratteriNonMetriciByDistrettoAndIndividuo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriNonMetriciByDistrettoAndIndividuo(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: props.distretto }));
        return res;
    }

    useEffect(() => {
        getCaratteriNonMetriciByDistretto().then(res => {

            switch (res.response) {
                case 'success':
                    setCaratteriNonMetrici(res.results)
                    break
                case 'empty':
                    setCaratteriNonMetrici(null)
                    break
                case 'error':
                    break
                default:
                    break
            }

        })
        getCaratteriNonMetriciByDistrettoAndIndividuo().then(res => {
            console.log('res', res)
            switch (res.response) {
                case 'success':
                    setCaratteriNonMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriNonMetriciIndividuo(null)
                    break
                case 'error':
                    break
                default:
                    break
            }

        })
    }, []);

    return (<div className="col-6">
        <Table bordered striped hover size="sm">
            <tbody>

                <tr>
                    <th className="w-50">Caratteri non metrici</th>
                    <th>Lato</th>
                    <th>Valore</th>
                </tr>


                {caratteriNonMetriciIndividuo ? (
                    caratteriNonMetriciIndividuo.map(car => (
                        <RigaCaratteriNonMetrici carattere={car} caratteri={caratteriNonMetrici} />
                    ))
                ) : (<tr></tr>)}


            </tbody>
        </Table>
        <div className="d-flex justify-content-end">
            {caratteriNonMetrici ? (<ModalCreateCarattereNonMetrico caratteri={caratteriNonMetrici} />) : (<div></div>)}

        </div>
    </div >)
}
export default CaratteriNonMetrici;