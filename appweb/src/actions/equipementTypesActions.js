import { tokenConfig } from "./authActions";
import { GET_EQUIPEMENTS_TYPES, UPDATE_EQUIPEMENT_TYPE, REMOVE_EQUIPEMENT_TYPE, ADD_EQUIPEMENT_TYPE } from "./types"
import axios from "axios";
const ROOT_URL = "http://localhost:5000/equipements/types";

export const getEquipementsTypes = () => (dispatch, getState) => {
  axios.get(ROOT_URL, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: GET_EQUIPEMENTS_TYPES,
      payload: res.data
    })
  });
}

export const addEquipementType = equipementType => (dispatch, getState) => {
  axios.post(`${ROOT_URL}`, equipementType, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: ADD_EQUIPEMENT_TYPE,
      payload: res.data
    })
  });
}


export const updateEquipementType = equipementType => (dispatch, getState) => {
  axios.put(`${ROOT_URL}/${equipementType._id}`, equipementType, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: UPDATE_EQUIPEMENT_TYPE,
      payload: res.data
    })
  });
}

export const deleteEquipementType = id => (dispatch, getState) => {
  axios.delete(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: REMOVE_EQUIPEMENT_TYPE,
      payload: res.data
    })
  });
}