import axios from 'axios'
import { setActual, setNotActual } from '../reducers/userReducers'

export const get_actual_rate = (callback) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
            dispatch(setActual(Object.entries(response.data.Valute)))
            callback(response.data.Date)
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_last_ten_days_rate = (year, month, day) => {
    return async dispatch => {
        try {
            let m = month < 10? `0${month}`:month;
            const response = await axios.get(`https://www.cbr-xml-daily.ru/archive/${year}/${m}/${day}/daily_json.js`)
            dispatch(setNotActual({date: `${day}.${month}.${year}`, data: response.data.Valute}))
        } catch (e) {
            console.log(e)
        }
    }
}