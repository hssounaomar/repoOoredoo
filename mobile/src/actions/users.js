
import axios from "axios";

const ROOT_URL = "http://localhost:5000/users";
export const GET_SUPPLIERS ="GET_SUPPLIERS";
export const GET_AGENTS ="GET_AGENTS";

export const getSuppliers = () => dispatch => {
    axios.get(`${ROOT_URL}/roles/supplier`)
    .then( response => {
        dispatch({
            type: GET_SUPPLIERS,
            payload: response.data
        })
    })
}
export const getAgents = () => dispatch => {
    axios.get(`${ROOT_URL}/roles/agent`)
    .then( response => {
        dispatch({
            type: GET_AGENTS,
            payload: response.data
        })
    })
}