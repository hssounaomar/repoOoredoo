
import axios from "axios";

const ROOT_URL = "http://localhost:5000/users";
export const GET_SUPPLIERS ="GET_SUPPLIERS";
export const GET_USERS ="GET_USERS";
export const GET_AGENTS ="GET_AGENTS";
export const REMOVE_USER="REMOVE_USER";
export const UPDATE_USER="UPDATE_USER";
export const ADD_USER="ADD_USER";
export const RECEIVE_USER ="RECEIVE_USER";
export function getUsers(){
    const request = axios.get(`${ROOT_URL}/`);
    return {
      type: GET_USERS,
      payload: request
    };
}
export function addUser(user){

    const request=   axios.post(`${ROOT_URL}`,user).then(res=>res.data);
   
    return {    
     type:ADD_USER,
     payload:request
   }
   
   }
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
export function deleteUserById(id){
    axios.delete(`${ROOT_URL}/`+id);
   return {
     type:REMOVE_USER,
     payload:id
   }
}

export function updateuser(user){
    axios.put(`${ROOT_URL}/`+user._id, user);
    return {
      type :UPDATE_USER,
      payload:user
    };
  }