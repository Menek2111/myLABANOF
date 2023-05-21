import React from "react";
import Table from 'react-bootstrap/Table';

function GeneralitàIndividuo(props) {
    return (
        <div>
            <h6 className=''>Generalità</h6>
            <Table bordered striped hover size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Individuo N°</th>
                        <td>{individuo.individuo.nome}</td>
                    </tr>
                    <tr>
                        <th>Luogo rinvenimento</th>
                        <td>{individuo.individuo.luogoRinvenimento}</td>
                    </tr>
                    <tr>
                        <th>Data rinvenimento</th>
                        <td>{individuo.individuo.dataRinvenimento}</td>
                    </tr>
                    <tr>
                        <th>Tomba</th>
                        <td>{individuo.tomba ? (individuo.tomba.nome) : (individuo.individuo.tomba)}</td>
                    </tr>
                    <tr>
                        <th>N° minimo di individui</th>
                        <td>{individuo.tomba.nMinIndividui}</td>
                    </tr>

                </tbody>
            </Table>
        </div>

    );
};

export default GeneralitàIndividuo;