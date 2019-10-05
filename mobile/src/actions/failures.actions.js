import axios from "axios";
const ROOT_URL = "http://localhost:5000/failures";
export const GET_FAILURES="GET_FAILURES";
export const GET_FAILURE="GET_FAILURE";
export const UPDATE_FAILURE="UPDATE_FAILURE";
export const REMOVE_FAILURE="REMOVE_FAILURE";
export const ADD_FAILURE="ADD_FAILURE";
export const RECEIVE_FAILURE ="RECEIVE_FAILURE";
export function addFailure(failure){

 const request=   axios.post(`${ROOT_URL}`,failure).then(res=>res.data);

 return {    
  type:ADD_FAILURE,
  payload:request
}

}
export function getFailures(){
    const request = axios.get(`${ROOT_URL}/`);
    return {
      type: GET_FAILURES,
      payload: request
    };
}
export function updateFailure(failure){
  axios.put(`${ROOT_URL}/`+failure._id, failure);
  return {
    type :UPDATE_FAILURE,
    payload:failure
  };
}
export function deleteFailureById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_FAILURE,
   payload:id
 }
 
}
export function getFailureById(id){
  const request = axios.get(`${ROOT_URL}/`+id).then(res=>res.data);

  return {
    type :RECEIVE_FAILURE,
    payload:request
  }
}

