import axios from "axios";
const ROOT_URL = "http://localhost:5000/categories";
export const GET_CATEGORIES="GET_CATEGORIES";
export const GET_CATEGORIE="GET_CATEGORIE";
export const UPDATE_CATEGORIE="UPDATE_CATEGORIE";
export const REMOVE_CATEGORIE="REMOVE_CATEGORIE";
export const ADD_CATEGORIE="ADD_CATEGORIE";
export const RECEIVE_CATEGORIE="RECEIVE_CATEGORIE";

export function addCategorie(categorie){

 const request=   axios.post(`${ROOT_URL}/`,categorie).then(res=>res.data);

 return {    
  type:ADD_CATEGORIE,
  payload:request
}

}
export function getCategories(){
    const request = axios.get(`${ROOT_URL}/`);
    return {
      type: GET_CATEGORIES,
      payload: request
    };
}
export function updateCategorie(categorie){
  axios.put(`${ROOT_URL}/`+categorie._id, categorie);
  return {
    type :UPDATE_CATEGORIE,
    payload:categorie
  };
}
export function deleteCategorieById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_CATEGORIE,
   payload:id
 }
 
}
export function getCategorieById(id){
  const request = axios.get(`${ROOT_URL}/`+id).then(res=>res.data);

  return {
    type :RECEIVE_CATEGORIE,
    payload:request
  }
}