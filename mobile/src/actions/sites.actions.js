import axios from "axios";
const ROOT_URL = "http://localhost:5000/sites";
export const GET_SITES="GET_SITES";
export const GET_SITE="GET_SITE";
export const UPDATE_SITE="UPDATE_SITE";
export const REMOVE_SITE="REMOVE_SITE";
export const ADD_SITE="ADD_SITE";
export const RECEIVE_SITE ="RECEIVE_SITE";
export function addSite(site){

 const request=   axios.post(`${ROOT_URL}`,site).then(res=>res.data);

 return {    
  type:ADD_SITE,
  payload:request
}

}
export function getSites(){
    const request = axios.get(`${ROOT_URL}/`);
    return {
      type: GET_SITES,
      payload: request
    };
}
export function updateSite(site){
  axios.put(`${ROOT_URL}/`+site._id, site);
  return {
    type :UPDATE_SITE,
    payload:site
  };
}
export function deleteSiteById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_SITE,
   payload:id
 }
 
}
export function getSiteById(id){
  const request = axios.get(`${ROOT_URL}/`+id).then(res=>res.data);

  return {
    type :RECEIVE_SITE,
    payload:request
  }
}

