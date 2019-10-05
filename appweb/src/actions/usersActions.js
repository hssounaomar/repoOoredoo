import axios from "axios";
import { GET_SUPPLIERS, GET_AGENTS/* , INVITE_FAIL, INVITE_SUCCESS */ } from './types';
import { tokenConfig } from "./authActions";
/* import { returnErrors } from "./errorActions"; */

const ROOT_URL = "http://localhost:5000/users";

export const getSuppliers = () => (dispatch, getState) => {
    axios.get(`${ROOT_URL}/roles/supplier`, tokenConfig(getState))
    .then( response => {
        dispatch({
            type: GET_SUPPLIERS,
            payload: response.data
        })
    })
}

export const getAgents = () => (dispatch, getState) => {
    axios.get(`${ROOT_URL}/roles/agent`, tokenConfig(getState))
    .then( response => {
        dispatch({
            type: GET_AGENTS,
            payload: response.data
        })
    })
}

export const invite = data => (dispatch, getState) => {
    return axios.post(`${ROOT_URL}/invite/send`, data, tokenConfig(getState))
    /* .then( response => {
        dispatch({ type: INVITE_SUCCESS })
        return res
    })
    .catch( error => {
         
    }) */
}