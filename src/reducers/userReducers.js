const SET_ACTUAL = 'SET_ACTUAL'


const defaultstate = {
    actual: {},
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case SET_ACTUAL:
            return {
                ...state,
                actual: action.payload,
            }
        default: return state;
    }
}


export const setActual = rate => ({ type: SET_ACTUAL, payload: rate })
