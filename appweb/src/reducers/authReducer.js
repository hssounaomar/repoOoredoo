import { 
USER_LOADING, 
USER_LOADED, 
AUTH_ERROR, 
LOGIN_SUCCESS, 
LOGIN_FAIL, 
REGISTER_SUCCESS, 
REGISTER_FAIL, 
LOGOUT_SUCCESS,
TOKEN_DATA
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    tokenData: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case TOKEN_DATA:
            return {
                ...state,
                tokenData: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state
    }
}