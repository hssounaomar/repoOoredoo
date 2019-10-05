import { tokenConfig } from './authActions'

import axios from "axios";
const ROOT_URL = "http://localhost:5000/equipements";
export const GET_EQUIPEMENTS="GET_EQUIPEMENTS";
export const GET_EQUIPEMENT="GET_EQUIPEMENT";
export const UPDATE_EQUIPEMENT="UPDATE_EQUIPEMENT";
export const REMOVE_EQUIPEMENT="REMOVE_EQUIPEMENT";
export const ADD_EQUIPEMENT="ADD_EQUIPEMENT";

export const addEquipement = (equipement) => (dispatch, getState) => {
  const data = new FormData();
  
  Object.keys(equipement).forEach( key => {
    if(key === 'files') {
      equipement[key].forEach( (val, i) => data.append( `${key}`, val) )
    } else if(key === 'parents') {
      equipement[key].forEach( (val, i) => data.append( `${key}[${i}]`, val) )
    } else {
      data.append(key, equipement[key])
    }
  })

  axios.post(ROOT_URL, data, tokenConfig(getState))
  .then( response => {
      console.log(response.data);
      dispatch({
          type: ADD_EQUIPEMENT,
          payload: response.data
      })
  })
}

export const updateEquipement = (equipement) => (dispatch, getState) => {
  const data = new FormData();
  
  Object.keys(equipement).forEach( key => {
    if(key === 'files') {
      equipement[key].forEach( (val, i) => data.append( `${key}`, val) )
    } else if(key === 'parents' || key === 'toDelete') {
      equipement[key].forEach( (val, i) => data.append( `${key}[${i}]`, val) )
    } else if(key === 'attachements') {
      const attach = JSON.stringify(equipement[key]);
      data.append(key, attach)
    } else {
      data.append(key, equipement[key])
    }
  })
  
  axios.put(`${ROOT_URL}/${equipement._id}`, data, tokenConfig(getState))
  .then( response => {
      dispatch({
          type: UPDATE_EQUIPEMENT,
          payload: response.data
      })
  })
}

export const getEquipements = () => (dispatch, getState) => {
    axios.get(ROOT_URL)
    .then( res => {
      console.log(res.data)
      dispatch({
        type: GET_EQUIPEMENTS,
        payload: res.data
      })
    })
 
}

export const deleteEquipement = (id) => (dispatch, getState) => {
  axios.delete(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then( () => {
    dispatch({
        type: REMOVE_EQUIPEMENT,
        payload:id
    })
  })
}


