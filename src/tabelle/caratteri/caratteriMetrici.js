import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConnectionManager from "../../api/ConnectionManager";
import ModalCreateCarattereMetrico from "../../UI/modalCreateCarattereMetrico";
import RigaCaratteriMetrici from "./rigaCaratteriMetrici";
import Loading from "../../UI/loading";
import { useLocation } from 'react-router-dom';


function CaratteriMetrici(props) {

    const [caratteriMetrici, setCaratteriMetrici] = useState([])
    const [caratteriMetriciIndividuo, setCaratteriMetriciIndividuo] = useState([])

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
    const location = useLocation();

    useEffect(() => {
        getCaratteriMetriciByDistretto().then(res => {
            console.log('getCaratteriMetriciByDistretto', res)
            switch (res.response) {
                case 'success':
                    setCaratteriMetrici(res.results)
                    break
                case 'empty':
                    setCaratteriMetrici([])
                    break
                case 'error':
                    setCaratteriMetrici([])
                    break
                default:
                    setCaratteriMetrici([])
                    break
            }
        })

        getCaratteriMetriciByDistrettoAndIndividuo().then(res => {
            switch (res.response) {
                case 'success':
                    setCaratteriMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriMetriciIndividuo([])
                    break
                case 'error':
                    setCaratteriMetriciIndividuo([])
                    break
                default:
                    setCaratteriMetriciIndividuo([])
                    break
            }
        })
    }, [location]);

    let checkCarattereMetricoIndividuo = () => {
        if (caratteriMetriciIndividuo.length == 0) {
            return <div className="pb-4">Non sono presenti caratteri metrici...</div>
        } else {
            return (<Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th>Caratteri metrici</th>
                        <th>Lato</th>
                        <th>Valore (mm)</th>
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
        switch (localStorage.getItem('ruolo')) {
            case '0':
                return <></>
            case '1':
                return <></>
            case '2':


                if (localStorage.getItem('userID') != sessionStorage.getItem('individuoSelezionatoCreatore')) {
                    return (<div></div>)
                } else {
                    return <ModalCreateCarattereMetrico caratteri={caratteriMetrici} callback={aggiorna} />
                }

            case '3':
                return <ModalCreateCarattereMetrico caratteri={caratteriMetrici} callback={aggiorna} />

            default:
                return <></>
        }




    }

    let aggiorna = () => {
        getCaratteriMetriciByDistrettoAndIndividuo().then(res => {
            switch (res.response) {
                case 'success':
                    setCaratteriMetriciIndividuo(res.results)
                    break
                case 'empty':
                    setCaratteriMetriciIndividuo([])
                    break
                case 'error':
                    setCaratteriMetriciIndividuo([])
                    break
                default:
                    setCaratteriMetriciIndividuo([])
                    break
            }
        })
    }


    if (props.distretto == 2) {
        return <div></div>
    } else {
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
}
export default CaratteriMetrici;