
import axios from "axios";

export default class ConnectionManager {

    constructor() {

    }

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

    getNecropoliByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/search/getNecropoliByQuery.php"
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
    getNecropoli = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getNecropoli.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getNecropoliById = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getNecropoliById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
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
    getTombeByNecropoli = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getTombeByNecropoli.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getAllNecropoli = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getAllNecropoli.php"
        const { data } = await axios.post(URL, {})
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
    getDentiIndividuoByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getDentiIndividuoByDistretto.php"
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
    getCaratteristicheDeposizioneByIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteristicheDeposizioneByIndividuo.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo
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
    getNumeroDentiByIndividuoAndDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getNumeroDentiByIndividuoAndDistretto.php"
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

    getClassiPatologie = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getClassiPatologie.php"
        const { data } = await axios.post(URL, {

        })
        return data
    }

    getTipoOssa = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getTipoOssa.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getPatologieGenerali = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getPatologieGenerali.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getCaratteriMetrici = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriMetrici.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getCaratteriNonMetrici = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getCaratteriNonMetrici.php"
        const { data } = await axios.post(URL, {
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
            necropoli: tomba.necropoli
        })
        return data
    }
    createNecropoli = async function (params) {
        var tomba = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createNecropoli.php"
        const { data } = await axios.post(URL, {
            nome: tomba.nome
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
    createDente = async function (params) {
        var osso = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createDente.php"
        const { data } = await axios.post(URL, {
            individuo: osso.individuo,
            tipoDente: osso.tipoDente,
            integro: osso.integro,
            lvlIntegrita: osso.lvlIntegrita,
            lvlQualita: osso.lvlQualita,
            indagineRadiologica: osso.indagineRadiologica,
            modificazioniOdontoiatrici: osso.modificazioniOdontoiatrici,
            restauriOdontoiatrici: osso.restauriOdontoiatrici,
            commento: osso.commento,
            datazioneCaduta: osso.datazioneCaduta,
            campionamento: osso.campionamento
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
            descrizione: json.descrizione,
            classePatologia: json.classePatologia
        })
        return data
    }
    createPatologiaGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createPatologiaGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            patologia: json.patologia,
            distretto: json.distretto
        })
        return data
    }
    createCarattereMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/creazione/createCarattereMetricoGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            distretto: json.distretto
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
    deleteNecropoli = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteNecropoli.php"
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
    deleteDente = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteDente.php"
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
    deletePatologiaGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deletePatologiaGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }

    deleteCarattereMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteCarattereMetricoGeneraleEPerDistretto.php"
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
            necropoli: tomba.necropoli
        })
        return data
    }
    editNecropoli = async function (params) {
        var tomba = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editNecropoli.php"
        const { data } = await axios.post(URL, {
            id: tomba.id,
            nome: tomba.nome
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
            sessoBiologico: json.sessoBiologico,
            stato: json.stato
        })
        return data
    }

    editCaratteristicheDeposizione = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editCaratteristicheDeposizione.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            luogoRitrovamento: json.luogoRitrovamento,
            tipoSepoltura: json.tipoSepoltura,
            tipoTerreno: json.tipoTerreno,
            fauna: json.fauna,
            clima: json.clima,
            effettiPersonali: json.effettiPersonali,
            ossaAnimali: json.ossaAnimali,
            informazioniAnteMortem: json.informazioniAnteMortem,
            altro: json.altro
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

    editDente = async function (params) {
        var osso = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editDente.php"
        const { data } = await axios.post(URL, {
            //tipoOsso: osso.tipoOsso,
            integro: osso.integro,
            lvlIntegrita: osso.lvlIntegrita,
            lvlQualita: osso.lvlQualita,
            modificazioniOdontoiatrici: osso.modificazioniOdontoiatrici,
            restauriOdontoiatrici: osso.restauriOdontoiatrici,
            commento: osso.commento,
            indagineRadiologica: osso.indagineRadiologica,
            campionamento: osso.campionamento,
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
            classePatologia: json.classePatologia,
            id: json.id
        })
        return data
    }

    editPatologiaGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editPatologiaGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id
        })
        return data
    }

    editCarattereMetricoGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/edit/editCarattereMetricoGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id
        })
        return data
    }


}
