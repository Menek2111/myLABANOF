import axios from "axios";

const URL = "https://applabanof.altervista.org/test.php"

export const fetchTest = async () => {
    const { data } = await axios.get(URL)
    return data
}