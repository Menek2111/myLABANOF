
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

    //GET

    getTombe = async function (params) {
        var URL = "https://applabanof.altervista.org/applabanof/data/getTombe.php"
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
    getOssaByDistretto = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/getOssaByDistretto.php"
        const { data } = await axios.post(URL, {
            distretto: json.distretto
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


    //DELETE

    deleteIndividuo = async function (params) {
        var json = JSON.parse(params)
        var URL = "https://applabanof.altervista.org/applabanof/data/delete/deleteIndividuo.php"
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

}
