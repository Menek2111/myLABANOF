
import axios from "axios";

export default class ConnectionManager {

    checkJWT = async function (params) {
        var token = sessionStorage.getItem('access_token')
        var URL = "https://applabanof.altervista.org/applabanof/data/checkJWT.php"
        const { data } = await axios.post(URL, {
            token: token
        })
        return data
    }

    register = async function (params) {
        var profile = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/authentication/register.php"
        const { data } = await axios.post(URL, {
            email: profile.email,
            userId: profile.id,
            name: profile.name,
            picture: profile.picture
        })
        return data
    }


    //SEARCH 
    getIndividuoByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/search/getIndividuoByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }

    getTombaByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/search/getTombaByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }

    getUtenteByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/search/getUtenteByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }



    //GET
    getTombe = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getTombe.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getAllTombe = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getAllTombe.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getTombaById = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getTombaById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }

    getIndividui = async function (params) {
        var token = sessionStorage.getItem('access_token')
        var URL = "https://applabanof.altervista.org/applabanof/data/getIndividui.php"
        const { data } = await axios.post(URL, {
            token: token
        })
        return data
    }
    getIndividuoById = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getIndividuoById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getIndividuiByTomba = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getIndividuiByTomba.php"
        const { data } = await axios.post(URL, {
            tomba: json.tomba
        })
        return data
    }
    getOssaIndividuoByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getOssaIndividuoByDistretto.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            distretto: json.distretto
        })
        return data
    }
    getOssaByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getOssaByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }

    getIndividuiByUser = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getIndividuiByUser.php"
        const { data } = await axios.post(URL, {
            creatore: json.user
        })
        return data
    }

    getCaratteriMetriciByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriMetriciByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }
    getCaratteriNonMetriciByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriNonMetriciByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }

    getCaratteriMetriciByDistrettoAndIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriMetriciByDistrettoAndIndividuo.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getCaratteriNonMetriciByDistrettoAndIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriNonMetriciByDistrettoAndIndividuo.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
        })
        return data
    }

    getPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
        })
        return data
    }

    getTraumaGeneraleByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getTraumaGeneraleByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
        })
        return data
    }

    getPatologiaByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getPatologiaGeneraleByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
        })
        return data
    }

    getNumeroOssaByIndividuoAndDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getNumeroOssaByIndividuoAndDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getUserInfo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getUserInfo.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }

    //CREATE 

    createIndividuo = async function (params) {
        var ind = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createIndividuo.php"
        const { data } = await axios.post(URL, {
            nome: ind.nome,
            tomba: ind.tomba,
            creatore: ind.creatore,
        })
        return data
    }
    createTomba = async function (params) {
        var tomba = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createTomba.php"
        const { data } = await axios.post(URL, {
            nome: tomba.nome,
            nMinIndividui: tomba.nMinIndividui,
            coordinate: tomba.coordinate,
        })
        return data
    }
    createOsso = async function (params) {
        var osso = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createOsso.php"
        const { data } = await axios.post(URL, {
            tipoOsso: osso.tipoOsso,
            lato: osso.lato,
            integro: osso.integro,
            lvlIntegrita: osso.lvlIntegrita,
            lvlQualita: osso.lvlQualita,
            restaurato: osso.restaurato,
            catalogazioneDescrizione: osso.catalogazioneDescrizione,
            indagineRadiologica: osso.indagineRadiologica,
            campionamento: osso.campionamento,
            altreAnalisi: osso.altreAnalisi,
            individuo: osso.individuo
        })
        return data
    }
    createCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            unitaMisura: json.unitaMisura,
        })
        return data
    }
    createCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereNonMetrico: json.tipoCarattereNonMetrico,
            lato: json.lato,
            valore: json.valore
        })
        return data
    }
    createTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoTrauma: json.tipoTrauma,
            datazione: json.datazione,
            descrizione: json.descrizione
        })
        return data
    }
    createPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoPatologia: json.tipoPatologia,
            litica: json.litica,
            proliferativa: json.proliferativa,
            descrizione: json.descrizione
        })
        return data
    }

    //DELETE

    deleteIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteIndividuo.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deleteTomba = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteTomba.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deleteOsso = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteOsso.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deleteTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deletePatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deletePatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deleteCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    deleteCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }


    //EDIT
    editTomba = async function (params) {
        var tomba = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editTomba.php"
        const { data } = await axios.post(URL, {
            id: tomba.id,
            nome: tomba.nome,
            nMinIndividui: tomba.nMinIndividui,
            coordinate: tomba.coordinate,
        })
        return data
    }

    editIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editIndividuo.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            nome: json.nome,
            luogoRinvenimento: json.luogoRinvenimento,
            dataRinvenimento: json.dataRinvenimento,
            classeDiEta: json.classeDiEta,
            origineBiologica: json.origineBiologica,
            origineGeografica: json.origineGeografica,
            sessoBiologico: json.sessoBiologico
        })
        return data
    }

    editOsso = async function (params) {
        var osso = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editOsso.php"
        const { data } = await axios.post(URL, {
            //tipoOsso: osso.tipoOsso,
            lato: osso.lato,
            integro: osso.integro,
            lvlIntegrita: osso.lvlIntegrita,
            lvlQualita: osso.lvlQualita,
            restaurato: osso.restaurato,
            catalogazioneDescrizione: osso.catalogazioneDescrizione,
            indagineRadiologica: osso.indagineRadiologica,
            campionamento: osso.campionamento,
            altreAnalisi: osso.altreAnalisi,
            id: osso.id
            //individuo: osso.individuo
        })
        return data
    }

    editCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            unitaMisura: json.unitaMisura,
            id: json.id
        })
        return data
    }

    editCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            id: json.id
        })
        return data
    }

    editTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoTrauma: json.tipoTrauma,
            descrizione: json.descrizione,
            datazione: json.datazione,
            id: json.id
        })
        return data
    }

    editPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoPatologia: json.tipoPatologia,
            descrizione: json.descrizione,
            litica: json.litica,
            proliferativa: json.proliferativa,
            id: json.id
        })
        return data
    }


}
