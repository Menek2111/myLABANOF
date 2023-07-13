
import axios from "axios";



function CheckToken(data) {
    if (data.response == 'invalid_token') {
        alert('sessione scaduta, è necessario effettuare nuovamente l\'accesso')
        window.location.href = "/";
    }
}
var baseUrl = 'https://applabanof.altervista.org/applabanof/'


export default class ConnectionManager {

    constructor() {
    }

    checkJWT = async function (params) {
        var URL = baseUrl + "data/checkJWT.php"
        const { data } = await axios.post(URL, {
            token: sessionStorage.getItem('access_token')
        })
        return data
    }

    register = async function (params) {
        var profile = JSON.parse(params)
        var URL = baseUrl + "authentication/register.php"
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
        var URL = baseUrl + "data/search/getIndividuoByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }

    getTombaByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/search/getTombaByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }

    getUtenteByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/search/getUtenteByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }

    getNecropoliByQuery = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/search/getNecropoliByQuery.php"
        const { data } = await axios.post(URL, {
            query: json.query
        })
        return data
    }



    //GET
    getTombe = async function (params) {
        var URL = baseUrl + "data/getTombe.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getNecropoli = async function (params) {
        var URL = baseUrl + "data/getNecropoli.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getNecropoliById = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getNecropoliById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getAllTombe = async function (params) {
        var URL = baseUrl + "data/getAllTombe.php"
        const { data } = await axios.post(URL, {})
        return data
    }
    getTombaById = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getTombaById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getTombeByNecropoli = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getTombeByNecropoli.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getAllNecropoli = async function (params) {
        var URL = baseUrl + "data/getAllNecropoli.php"
        const { data } = await axios.post(URL, {})
        return data
    }

    getIndividui = async function (params) {
        var token = sessionStorage.getItem('access_token')
        var URL = baseUrl + "data/getIndividui.php"
        const { data } = await axios.post(URL, {
            token: token
        })
        return data
    }
    getIndividuoById = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getIndividuoById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getIndividuiByTomba = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getIndividuiByTomba.php"
        const { data } = await axios.post(URL, {
            tomba: json.tomba
        })
        return data
    }
    getOssaIndividuoByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getOssaIndividuoByDistretto.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            distretto: json.distretto
        })
        return data
    }
    getDentiIndividuoByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getDentiIndividuoByDistretto.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            distretto: json.distretto
        })
        return data
    }
    getOssaByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getOssaByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }
    getOssaNMRByIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getOssaNMRByIndividuo.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo
        })
        return data
    }
    getCaratteristicheDeposizioneByIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getCaratteristicheDeposizioneByIndividuo.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo
        })
        return data
    }


    getIndividuiByUser = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getIndividuiByUser.php"
        const { data } = await axios.post(URL, {
            creatore: json.user
        })
        return data
    }

    getCaratteriMetriciByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getCaratteriMetriciByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }
    getCaratteriNonMetriciByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getCaratteriNonMetriciByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
        })
        return data
    }

    getCaratteriMetriciByDistrettoAndIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getCaratteriMetriciByDistrettoAndIndividuo.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getCaratteriNonMetriciByDistrettoAndIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getCaratteriNonMetriciByDistrettoAndIndividuo.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            dente: json.dente,
        })
        return data
    }

    getPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            dente: json.dente
        })
        return data
    }

    getTraumaGeneraleByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getTraumaGeneraleByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
        })
        return data
    }

    getTraumaGenerale = async function (params) {
        var URL = baseUrl + "data/getTraumaGenerale.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getPatologiaByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getPatologiaGeneraleByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
        })
        return data
    }

    getNumeroOssaByIndividuoAndDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getNumeroOssaByIndividuoAndDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }
    getNumeroDentiByIndividuoAndDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getNumeroDentiByIndividuoAndDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto,
            individuo: json.individuo
        })
        return data
    }

    getUserInfo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getUserInfo.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }

    getUsersRegisterRequests = async function (params) {
        var URL = baseUrl + "data/getUsersRegisterRequests.php"
        const { data } = await axios.post(URL, {

        })
        return data
    }

    getClassiPatologie = async function (params) {
        var URL = baseUrl + "data/getClassiPatologie.php"
        const { data } = await axios.post(URL, {

        })
        return data
    }

    getTipoOssa = async function (params) {
        var URL = baseUrl + "data/getTipoOssa.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getPatologieGenerali = async function (params) {
        var URL = baseUrl + "data/getPatologieGenerali.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getCaratteriMetrici = async function (params) {
        var URL = baseUrl + "data/getCaratteriMetrici.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getCaratteriNonMetrici = async function (params) {
        var URL = baseUrl + "data/getCaratteriNonMetrici.php"
        const { data } = await axios.post(URL, {
        })
        return data
    }

    getImageById = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getImageById.php"
        const { data } = await axios.post(URL, {
            id: json.id
        })
        return data
    }
    getImages = async function (params) {
        var URL = baseUrl + "data/getImages.php"
        const { data } = await axios.post(URL, {

        })
        return data
    }
    getImagesByIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getImagesByIndividuo.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo
        })
        return data
    }

    getAllInfoIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/getAllInfoIndividuo.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })


        return data
    }


    //CREATE 
    createIndividuo = async function (params) {
        var ind = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createIndividuo.php"
        const { data } = await axios.post(URL, {
            nome: ind.nome,
            tomba: ind.tomba,
            creatore: ind.creatore,

            token: sessionStorage.getItem('access_token')
        })


        CheckToken(data)
        return data
    }
    createTomba = async function (params) {
        var tomba = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createTomba.php"
        const { data } = await axios.post(URL, {
            nome: tomba.nome,
            nMinIndividui: tomba.nMinIndividui,
            coordinate: tomba.coordinate,
            necropoli: tomba.necropoli,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createNecropoli = async function (params) {
        var tomba = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createNecropoli.php"
        const { data } = await axios.post(URL, {
            nome: tomba.nome,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createOsso = async function (params) {
        var osso = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createOsso.php"
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
            individuo: osso.individuo,
            NMR: osso.NMR,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createDente = async function (params) {
        var osso = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createDente.php"
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
            campionamento: osso.campionamento,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            unitaMisura: json.unitaMisura,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereNonMetrico: json.tipoCarattereNonMetrico,
            lato: json.lato,
            valore: json.valore,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            dente: json.dente,
            tipoTrauma: json.tipoTrauma,
            datazione: json.datazione,
            descrizione: json.descrizione,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            dente: json.dente,
            tipoPatologia: json.tipoPatologia,
            litica: json.litica,
            proliferativa: json.proliferativa,
            descrizione: json.descrizione,
            classePatologia: json.classePatologia,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createPatologiaGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createPatologiaGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            patologia: json.patologia,
            odontoiatrico: json.odontoiatrico,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createCarattereMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createCarattereMetricoGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            distretto: json.distretto,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createCarattereNonMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createCarattereNonMetricoGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            distretto: json.distretto,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createImage = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createImage.php"
        const { data } = await axios.post(URL, {
            descrizione: json.descrizione,
            image: json.image,
            individuo: json.individuo,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    createTraumaGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/creazione/createTraumaGenerale.php"
        const { data } = await axios.post(URL, {
            trauma: json.trauma,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }


    //DELETE

    deleteIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteIndividuo.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteTomba = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteTomba.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteNecropoli = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteNecropoli.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteOsso = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteOsso.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteDente = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteDente.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deletePatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deletePatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deleteCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    deletePatologiaGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deletePatologiaGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteCarattereMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteCarattereMetricoGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteCarattereNonMetricoGeneraleEPerDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteCarattereNonMetricoGeneraleEPerDistretto.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteAccount = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteAccount.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteIndividuoSenzaCreatore = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteIndividuiSenzaCreatore.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteTraumaGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteTraumaGenerale.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    deleteImmagine = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/delete/deleteImmagine.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }


    //EDIT
    editTomba = async function (params) {
        var tomba = JSON.parse(params)
        var URL = baseUrl + "data/edit/editTomba.php"
        const { data } = await axios.post(URL, {
            id: tomba.id,
            nome: tomba.nome,
            nMinIndividui: tomba.nMinIndividui,
            coordinate: tomba.coordinate,
            necropoli: tomba.necropoli,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    editNecropoli = async function (params) {
        var tomba = JSON.parse(params)
        var URL = baseUrl + "data/edit/editNecropoli.php"
        const { data } = await axios.post(URL, {
            id: tomba.id,
            nome: tomba.nome,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    editIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editIndividuo.php"
        const { data } = await axios.post(URL, {
            id: json.id,
            nome: json.nome,
            luogoRinvenimento: json.luogoRinvenimento,
            dataRinvenimento: json.dataRinvenimento,
            classeDiEta: json.classeDiEta,
            origineBiologica: json.origineBiologica,
            origineGeografica: json.origineGeografica,
            sessoBiologico: json.sessoBiologico,
            stato: json.stato,
            tomba: json.tomba,
            visibilita: json.visibilita,
            pesoIndividuo: json.pesoIndividuo,
            pesoCremazione: json.pesoCremazione,
            volumeCremazione: json.volumeCremazione,
            etaMin: json.etaMin,
            etaMax: json.etaMax,
            staturaMin: json.staturaMin,
            staturaMax: json.staturaMax,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editCaratteristicheDeposizione = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editCaratteristicheDeposizione.php"
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
            altro: json.altro,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editOsso = async function (params) {
        var osso = JSON.parse(params)
        var URL = baseUrl + "data/edit/editOsso.php"
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
            id: osso.id,
            token: sessionStorage.getItem('access_token')
            //individuo: osso.individuo
        })
        CheckToken(data)
        return data
    }

    editDente = async function (params) {
        var osso = JSON.parse(params)
        var URL = baseUrl + "data/edit/editDente.php"
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
            id: osso.id,
            token: sessionStorage.getItem('access_token')
            //individuo: osso.individuo
        })
        CheckToken(data)
        return data
    }

    editCarattereMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editCarattereMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editCarattereNonMetricoSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editCarattereNonMetricoSpecifico.php"
        const { data } = await axios.post(URL, {
            individuo: json.individuo,
            tipoCarattereMetrico: json.tipoCarattereMetrico,
            lato: json.lato,
            valore: json.valore,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editTraumaSpecifico = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editTraumaSpecifico.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoTrauma: json.tipoTrauma,
            descrizione: json.descrizione,
            datazione: json.datazione,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editPatologiaSpecifica = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editPatologiaSpecifica.php"
        const { data } = await axios.post(URL, {
            osso: json.osso,
            tipoPatologia: json.tipoPatologia,
            descrizione: json.descrizione,
            litica: json.litica,
            proliferativa: json.proliferativa,
            classePatologia: json.classePatologia,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editPatologiaGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editPatologiaGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editCarattereMetricoGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editCarattereMetricoGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }
    editCarattereNonMetricoGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editCarattereNonMetricoGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editRuoloAccountById = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editRuoloAccountById.php"
        const { data } = await axios.post(URL, {
            ruolo: json.ruolo,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editTraumaGenerale = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editTraumaGenerale.php"
        const { data } = await axios.post(URL, {
            nome: json.nome,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

    editDescriptionImage = async function (params) {
        var json = JSON.parse(params)
        var URL = baseUrl + "data/edit/editDescriptionImage.php"
        const { data } = await axios.post(URL, {
            descrizione: json.descrizione,
            id: json.id,
            token: sessionStorage.getItem('access_token')
        })
        CheckToken(data)
        return data
    }

}
