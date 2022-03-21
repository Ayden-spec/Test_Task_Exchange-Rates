import axios from 'axios'

export const get_actual_rate = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}