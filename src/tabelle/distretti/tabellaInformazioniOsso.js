import React, { useState, useEffect } from "react";


function TabellaInformazioniOsso(props) {

    const editOsso = async () => {
        let cm = new ConnectionManager();
        var params = {
            tipoOsso: props.osso.tipoOsso,
            lato: lato,
            integro: integro,
            lvlIntegrita: lvlIntegrita,
            lvlQualita: lvlQualita,
            restaurato: restaurato,
            catalogazioneDescrizione: catalogazioneDescrizione,
            indagineRadiologica: indagineRadiologica,
            campionamento: campionamento,
            altreAnalisi: altreAnalisi,
            individuo: props.osso.individuo,
            id: props.osso.id
        }

        console.log('parametri', params)

        await cm.editOsso(JSON.stringify(params)).then(res => {
            console.log(res)
            if (res.response === 'success') {
                window.location.reload(false);
            }
        })

    }

    useEffect(() => {

    }, []);

    return (
        <Form className='col-3' onSubmit={editOsso}>
            <div className='border-bottom mb-2 d-flex justify-content-between'>
                <h5 className=''>Informazioni</h5>
                <Button className='p-1'>Modifica</Button>
            </div>

            <Table bordered striped hover size="sm">
                <tbody>
                    <tr>
                        <th className='w-25'>Osso</th>
                        <td>
                            {props.osso.nome}
                        </td>
                    </tr>
                    <tr>
                        <th>Materiale rivenuto</th>
                        <td>
                            {props.osso.lato}
                        </td>
                    </tr>
                    <tr>
                        <th>Integro</th>
                        <td>
                            {props.osso.integro}
                        </td>
                    </tr>
                    <tr>
                        <th>Livello di integrità</th>
                        <td>
                            {props.osso.lvlIntegrita}
                        </td>
                    </tr>
                    <tr>
                        <th>Livello di qualità</th>
                        <td>
                            {props.osso.lvlQualita}
                        </td>
                    </tr>

                    <tr>
                        <th>Restaurato</th>

                        <td>
                            {props.osso.restaurato}
                        </td>
                    </tr>

                    <tr>
                        <th>Catalogazione e descrizione</th>
                        <td>
                            {props.osso.catalogazioneDescrizione}
                        </td>
                    </tr>

                    <tr>
                        <th>Indagine radiologica</th>

                        <td>
                            {props.osso.indagineRadiologica}
                        </td>
                    </tr>

                    <tr>
                        <th>Campionamento</th>

                        <td>
                            {props.osso.campionamento}
                        </td>
                    </tr>
                    <tr>
                        <th>Altre analisi</th>
                        <td>
                            {props.osso.altreAnalisi}
                        </td>
                    </tr>
                </tbody>
            </Table>

        </Form>)
}
export default TabellaInformazioniOsso;