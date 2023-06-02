import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConnectionManager from "../../api/ConnectionManager";
import ModalCreateCarattereMetrico from "../../UI/modalCreateCarattereMetrico";
import RigaCaratteriMetrici from "./rigaCaratteriMetrici";

function CaratteriMetrici(props) {

    const [caratteriMetrici, setCaratteriMetrici] = useState()
    const [caratteriMetriciIndividuo, setCaratteriMetriciIndividuo] = useState()

    const getCaratteriMetriciByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetriciByDistretto(JSON.stringify({ distretto: props.distretto }));
        //console.log('caratteri distretto', res)
        return res;
    }

    const getCaratteriMetriciByDistrettoAndIndividuo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetriciByDistrettoAndIndividuo(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: props.distretto }));
        return res;
    }

    /*
    const checkPresenti = () => {
        caratteriMetrici.map(carattere => {
            for (let i = 0; i < caratteriMetriciIndividuo.lenght; i++) {
                console.log('ao')
                if (caratteriMetriciIndividuo[i].tipoCarattereMetrico == carattere.id) {
                    console.log('ao', caratteriMetriciIndividuo[i])
                }
            }
        })
    }
    */

    useEffect(() => {
        getCaratteriMetriciByDistretto().then(res => {
            switch (res.response) {
                case 'success':
                    setCaratteriMetrici(res.results)
                    break
                case 'empty':
                    setCaratteriMetrici(null)
                    break
                case 'error':
                    break
                default:
                    break
            }
        })

        getCaratteriMetriciByDistrettoAndIndividuo().then(res => {
            switch (res.response) {
                case 'success':
                    console.log('caratteri individuo', res.results)
                    setCaratteriMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriMetriciIndividuo(null)
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
                    <th>Caratteri metrici</th>
                    <th>Lato</th>
                    <th>Valore</th>
                    <th>Unità di misura</th>
                </tr>

                {caratteriMetriciIndividuo ? (
                    caratteriMetriciIndividuo.map(car => (
                        <RigaCaratteriMetrici carattere={car} caratteri={caratteriMetrici} />
                    ))
                ) : (<tr></tr>)}
            </tbody>
        </Table>
        <div className="d-flex justify-content-end">
            {caratteriMetrici ? (<ModalCreateCarattereMetrico caratteri={caratteriMetrici} />) : (<div></div>)}
        </div>

    </div >)
}
export default CaratteriMetrici;