
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
}
