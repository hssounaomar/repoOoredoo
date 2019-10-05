import axios from "axios";
const ROOT_URL = "http://localhost:5000/interventions";


export const GET_INTERVENTIONS="GET_INTERVENTIONS";
export const GET_INTERVENTION="GET_INTERVENTION";
export const UPDATE_INTERVENTION="UPDATE_INTERVENTION";
export const REMOVE_INTERVENTION="REMOVE_INTERVENTION";
export const ADD_INTERVENTION="ADD_INTERVENTION";
export const RECEIVE_INTERVENTION ="RECEIVE_INTERVENTION";
export const UPDATE_STATE_INTERVENTION="UPDATE_STATE_INTERVENTION";
export function updateStateOfIntervention(id,state){
  axios.put(`${ROOT_URL}/changeState/`+id, state);
  const request = axios.get(`${ROOT_URL}/`);
  return {
    type :UPDATE_STATE_INTERVENTION,
    payload:request
  };
}
export function addIntervention(failure){

 const request=   axios.post(`${ROOT_URL}`,failure).then(res=>res.data);

 return {    
  type:ADD_INTERVENTION,
  payload:request
}

 
}


export function getInterventions(){
    const request = axios.get(`${ROOT_URL}/`);
 
    return {
      type: GET_INTERVENTIONS,
      payload: request
    };
}

export function updateIntervention(intervention){
  axios.put(`${ROOT_URL}/`+intervention._id, intervention);
  return {
    type :UPDATE_INTERVENTION,
    payload:intervention
  };
}

export function deleteInterventionById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_INTERVENTION,
   payload:id
 }
 
}


