import axios from "axios";
const ROOT_URL = "http://localhost:5000/sites/types";
export const GET_SITESTYPES="GET_SITESTYPES";
export const ADD_SITETYPE="ADD_SITETYPE";
export const UPDATE_SITETYPE="UPDATE_SITETYPE";
export const REMOVE_SITETYPE="REMOVE_SITETYPE";
export const RECEIVE_SITETYPE="RECEIVE_SITETYPE";
export function addSiteType(siteType){

 const request=   axios.post(`${ROOT_URL}/add`,siteType).then(res=>res.data);

 return {    
  type:ADD_SITETYPE,
  payload:request
}

}
export function getSitesTypes(){
    const request = axios.get(`${ROOT_URL}/`);
    return {
      type: GET_SITESTYPES,
      payload: request
    };
}
export function updateSiteType(siteType){
  axios.post(`${ROOT_URL}/update/`+siteType._id, siteType);
  return {
    type :UPDATE_SITETYPE,
    payload:siteType
  };
}
export function deleteSiteTypeById(id){
  axios.delete(`${ROOT_URL}/delete/`+id);
 return {
   type:REMOVE_SITETYPE,
   payload:id
 }
 
}
export function getSiteTypeById(id){
  const request = axios.get(`${ROOT_URL}/`+id).then(res=>res.data);

  return {
    type :RECEIVE_SITETYPE,
    payload:request
  }
}

