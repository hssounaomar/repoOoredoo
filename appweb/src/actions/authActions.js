import { 
    USER_LOADING, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGOUT_SUCCESS, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    TOKEN_DATA
} from '../actions/types';

import { returnErrors } from "./errorActions";
import axios from "axios";

export const login = credentials => dispatch => {
    axios.post('http://localhost:5000/auth', credentials)
    .then( res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch( error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
        dispatch({ type: LOGIN_FAIL });
    });
}

export const verifyToken = token => dispatch => {
    axios.get('http://localhost:5000/users/invite/check', {
        headers: {
            'Content-type': 'application/json',
            'X-Auth-Token': token
        }
    })
    .then( res => {
        dispatch({
            type: TOKEN_DATA,
            payload: res.data
        });
    })
    .catch( error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'TOKEN_INVALID'));
        dispatch({
            type: TOKEN_DATA,
            payload: null
        })
    })
}

export const register = (credentials, token) => dispatch => {
    axios.post('http://localhost:5000/users/register', credentials, {
        headers: {
            'Content-type': 'application/json',
            'X-Auth-Token': token
        }
    })
    .then( res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch( error => {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({ type: REGISTER_FAIL });
    });
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:5000/users/user', tokenConfig(getState))
    .then( res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch( error => {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({ type: AUTH_ERROR });
    });
}

export const tokenConfig = getState => {
    // get token from localStorage
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['X-Auth-Token'] = token;
    }

    return config;
}