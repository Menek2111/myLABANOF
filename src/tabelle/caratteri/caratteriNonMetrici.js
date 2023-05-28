import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ConnectionManager from "../../api/ConnectionManager";

function CaratteriNonMetrici(props) {

    const [caratteriNonMetrici, setCaratteriNonMetrici] = useState()

    const getCaratteriNonMetriciByDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getCaratteriNonMetriciByDistretto(JSON.stringify({ distretto: 1 }));
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
    }, []);

    return (<div className="col-6">
        <Table bordered striped hover size="sm">
            <tbody>

                <tr>
                    <th className="w-50">Caratteri non metrici</th>
                    <th>Sinistro</th>
                    <th>Destro</th>
                    <th>Unico</th>
                    <th>Incerto</th>
                </tr>

                {caratteriNonMetrici ? (
                    caratteriNonMetrici.map(car => (
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
export default CaratteriNonMetrici;