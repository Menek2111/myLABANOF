import axios from "axios";

const URL = "https://applabanof.altervista.org/applabanof/data/getIndividui.php"

export const fetchIndividui = async () => {
    const { data } = await axios.post(URL, {})
    return data
}

export default fetchIndividui