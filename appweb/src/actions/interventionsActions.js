import {GET_INTERVENTIONS, UPDATE_INTERVENTION, REMOVE_INTERVENTION, ADD_INTERVENTION } from './types'
import { tokenConfig } from './authActions';
import axios from "axios";
//import { socket } from '../App';

import { async } from '@firebase/util';
const ROOT_URL = "http://localhost:5000/interventions";


export const addIntervention = (intervention, agents) => (dispatch, getState) => {
  axios.post(ROOT_URL, intervention, tokenConfig(getState))
  .then( res => {    
    dispatch({
      type: ADD_INTERVENTION,
      payload: res.data
    })

   
  })
}

export const getInterventions = () => (dispatch, getState) => {
  axios.get(ROOT_URL)
  .then( res => {
    dispatch({
      type: GET_INTERVENTIONS,
      payload: res.data
    })
  })
}

export const updateIntervention = (intervention)  => (dispatch, getState) => {
  axios.put(`${ROOT_URL}/${intervention._id}`, intervention, tokenConfig(getState))
  .then( res => {
    dispatch({
      type: UPDATE_INTERVENTION,
      payload: res.data
    })
  })
}

export const deleteInterventionById = (id)  => (dispatch, getState) =>{
  axios.delete(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then( res => {
    dispatch({
      type: REMOVE_INTERVENTION,
      payload: res.data
    })
  })
}


