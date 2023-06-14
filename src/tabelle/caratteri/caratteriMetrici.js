import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConnectionManager from "../../api/ConnectionManager";
import ModalCreateCarattereMetrico from "../../UI/modalCreateCarattereMetrico";
import RigaCaratteriMetrici from "./rigaCaratteriMetrici";
import Loading from "../../UI/loading";

function CaratteriMetrici(props) {

    const [caratteriMetrici, setCaratteriMetrici] = useState()
    const [caratteriMetriciIndividuo, setCaratteriMetriciIndividuo] = useState()

    const getCaratteriMetriciByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetriciByDistretto(JSON.stringify({ distretto: props.distretto }));
        return res;
    }

    const getCaratteriMetriciByDistrettoAndIndividuo = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetriciByDistrettoAndIndividuo(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: props.distretto }));
        return res;
    }

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
                    setCaratteriMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriMetriciIndividuo(null)
                    break
                case 'error':
                    setCaratteriMetriciIndividuo(null)
                    break
                default:
                    break
            }
        })
    }, []);

    let checkCarattereMetricoIndividuo = () => {
        if (caratteriMetriciIndividuo == null) {
            return <div>Non sono presenti caratteri metrici...</div>
        } else {
            return (<Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th>Caratteri metrici</th>
                        <th>Lato</th>
                        <th>Valore</th>
                        <th>Unità di misura</th>
                    </tr>
                </thead>
                <tbody>
                    {caratteriMetriciIndividuo ? (
                        caratteriMetriciIndividuo.map(car => (
                            <RigaCaratteriMetrici carattere={car} caratteri={caratteriMetrici} callback={aggiorna} />
                        ))
                    ) : (<tr></tr>)}
                </tbody>
            </Table>)
        }
    }

    let checkUser = () => {
        if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
            return (<div></div>)
        } else {
            return <ModalCreateCarattereMetrico caratteri={caratteriMetrici} callback={aggiorna} />
        }
    }

    let aggiorna = () => {
        getCaratteriMetriciByDistrettoAndIndividuo().then(res => {
            switch (res.response) {
                case 'success':
                    setCaratteriMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriMetriciIndividuo(null)
                    break
                case 'error':
                    setCaratteriMetriciIndividuo(null)
                    break
                default:
                    break
            }
        })
    }

    return (<div className="col-6">
        <h5 className='border-bottom mb-2'>Caratteri metrici</h5>

        <div className="border rounded p-2">

            {caratteriMetrici ? (checkCarattereMetricoIndividuo()) : (<Loading />)}

            <div className="d-flex justify-content-end">
                {caratteriMetrici ? (checkUser()) : (<div></div>)}
            </div>

        </div>

    </div >)
}
export default CaratteriMetrici;