import axios from "axios";

const URL = "https://applabanof.altervista.org/applabanof/authentication/register.php"

export const registerRequest = async (param) => {

    var profile = JSON.parse(param)

    const { data } = await axios.post(URL, {
        email: profile.email,
        userId: profile.id,
        name: profile.name,
        picture: profile.picture
    })
    return data
}