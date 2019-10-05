import { tokenConfig } from './authActions'
import {GET_FAILURES, UPDATE_FAILURE, REMOVE_FAILURE, ADD_FAILURE, RECEIVE_FAILURE } from './types'
import axios from "axios";
const ROOT_URL = "http://localhost:5000/failures";

export const addFailure = failure => (dispatch, getState) => {
  axios.post(`${ROOT_URL}`,failure, tokenConfig(getState))
  .then (res => {
    dispatch({    
      type:ADD_FAILURE,
      payload: res.data
    })
  })
}

export const getFailures = () => (dispatch, getState) => {
  axios.get(ROOT_URL, tokenConfig(getState))
  .then (res => {
    dispatch({    
      type: GET_FAILURES,
      payload: res.data
    })
  })
}

export const updateFailure = failure => (dispatch, getState) => {
  axios.put(`${ROOT_URL}/${failure._id}`, failure, tokenConfig(getState))
  .then (res => {
    dispatch({    
      type: UPDATE_FAILURE,
      payload: res.data
    })
  })
}

export const deleteFailureById = id => (dispatch, getState) => {
  axios.delete(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then (res => {
    dispatch({    
      type: REMOVE_FAILURE,
      payload: res.data
    })
  })
}

export const getFailureById = id => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then (res => {
    dispatch({    
      type: RECEIVE_FAILURE,
      payload: res.data
    })
  })
}

