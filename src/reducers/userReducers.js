const SET_ACTUAL = 'SET_ACTUAL'
const SET_PREVIOS = 'SET_PREVIOS'


const defaultstate = {
    actual: [],
    previous: [],
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case SET_ACTUAL:
            return {
                ...state,
                actual: action.payload,
            }
        case SET_PREVIOS:
            return {
                ...state,
                previous: [...state.previous, action.payload],
            }
        default: return state;
    }
}


export const setActual = rate => ({ type: SET_ACTUAL, payload: rate })

export const setNotActual = rate => ({ type: SET_PREVIOS, payload: rate })
