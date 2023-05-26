import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";

function CaratteriMetrici(props) {

    const [caratteriMetrici, setCaratteriMetrici] = useState()

    const getCaratteriMetriciByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriMetriciByDistretto(JSON.stringify({ distretto: 1 }));
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
    }, []);

    return (<div className="col-6">
        <Table bordered striped hover size="sm">
            <tbody>

                <tr>
                    <th className="w-25">Caratteri metrici</th>
                    <th>Valore</th>
                    <th>Lato</th>
                    <th>Unità di misura</th>
                </tr>

                {caratteriMetrici ? (
                    caratteriMetrici.map(car => (
                        <tr key={car.id}>
                            <td>
                                {car.nome}
                            </td>
                            <td>
                                ---
                            </td>
                            <td>
                                ---
                            </td>
                            <td>
                                ---
                            </td>
                        </tr>
                    ))
                ) : (<tr></tr>)}


            </tbody>
        </Table>
    </div >)
}
export default CaratteriMetrici;