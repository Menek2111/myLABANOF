import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ConnectionManager from "../../api/ConnectionManager";
import RigaCaratteriNonMetrici from "./rigaCaratteriNonMetrici";
import ModalCreateCarattereNonMetrico from "../../UI/modalCreateCarattereNonMetrico";
import Loading from "../../UI/loading";
import { useLocation } from 'react-router-dom';


function CaratteriNonMetrici(props) {

    const [caratteriNonMetrici, setCaratteriNonMetrici] = useState([])
    const [caratteriNonMetriciIndividuo, setCaratteriNonMetriciIndividuo] = useState([])

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

    const location = useLocation();

    useEffect(() => {
        getCaratteriNonMetriciByDistretto().then(res => {
            switch (res.response) {
                case 'success':
                    setCaratteriNonMetrici(res.results)
                    break
                case 'empty':
                    setCaratteriNonMetrici([])
                    break
                case 'error':
                    setCaratteriNonMetrici([])
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
                    setCaratteriNonMetriciIndividuo([])
                    break
                case 'error':
                    setCaratteriNonMetriciIndividuo([])
                    break
                default:
                    setCaratteriNonMetriciIndividuo([])
                    break
            }

        })
    }, [location]);

    let checkCarattereNonMetricoIndividuo = () => {
        if (caratteriNonMetriciIndividuo.length == 0) {
            return <div className="pb-4">Non sono presenti caratteri non metrici...</div>
        }
        else {
            return (<Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th className="w-50">Caratteri non metrici</th>
                        <th>Lato</th>
                    </tr>
                </thead>
                <tbody>
                    {caratteriNonMetriciIndividuo ? (
                        caratteriNonMetriciIndividuo.map(car => (
                            <RigaCaratteriNonMetrici carattere={car} caratteri={caratteriNonMetrici} callback={aggiorna} />
                        ))
                    ) : (<tr></tr>)}
                </tbody>
            </Table>)
        }
    }

    const aggiorna = () => {
        getCaratteriNonMetriciByDistrettoAndIndividuo().then(res => {
            console.log('res', res)
            switch (res.response) {
                case 'success':
                    setCaratteriNonMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriNonMetriciIndividuo([])
                    break
                case 'error':
                    setCaratteriNonMetriciIndividuo([])
                    break
                default:
                    setCaratteriNonMetriciIndividuo([])
                    break
            }
        })
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {
            return <ModalCreateCarattereNonMetrico caratteri={caratteriNonMetrici} callback={aggiorna} />
        }
    }

    if (props.distretto == 2) {
        return <div></div>
    } else {
        return (<div className="col-6">
            <h5 className='border-bottom mb-2'>Caratteri non metrici</h5>

            <div className="border rounded p-2">

                {caratteriNonMetrici ? (checkCarattereNonMetricoIndividuo()) : (<Loading />)}

                <div className="d-flex justify-content-end">
                    {caratteriNonMetrici ? (checkUser()) : (<div></div>)}
                </div>
            </div>
        </div >)
    }


}
export default CaratteriNonMetrici;