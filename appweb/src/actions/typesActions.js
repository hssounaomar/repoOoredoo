import axios from "axios";
const ROOT_URL = "http://localhost:5000/types";
export const GET_TYPES="GET_TYPES";
export const GET_TYPE="GET_TYPE";
export const UPDATE_TYPE="UPDATE_TYPE";
export const REMOVE_TYPE="REMOVE_TYPE";
export const ADD_TYPE="ADD_TYPE";
export const RECEIVE_TYPE="ADD_TYPE";
export function addType(type){

    const request=   axios.post(`${ROOT_URL}/add`,type).then(res=>res.data);
   
    return {    
     type:ADD_TYPE,
     payload:request
   }
   
   }
   export function getTypes(){
       const request = axios.get(`${ROOT_URL}/`);
       return {
         type: GET_TYPES,
         payload: request
       };
   }
   export function updateType(type){
     axios.post(`${ROOT_URL}/update/`+type._id, type);
     return {
       type :UPDATE_TYPE,
       payload:type
     };
   }
   export function deleteTypeById(id){
     axios.delete(`${ROOT_URL}/delete/`+id);
    return {
      type:REMOVE_TYPE,
      payload:id
    }
    
   }
   export function getTypeById(id){
     const request = axios.get(`${ROOT_URL}/`+id).then(res=>res.data);
   
     return {
       type :RECEIVE_TYPE,
       payload:request
     }
   }