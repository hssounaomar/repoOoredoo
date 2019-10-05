import { tokenConfig } from './authActions';
import { ADD_CATEGORY, GET_CATEGORIES,GET_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY} from './types'
import axios from "axios";
const ROOT_URL = "http://localhost:5000/categories";

export const addCategory = category => (dispatch, getState) => {
  axios.post(`${ROOT_URL}`, category, tokenConfig(getState))
  .then( res => {
    console.log(res.data);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    })
  })
  .catch(error => {
    console.log(error)
  })
}

export const getCategories = () => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/`, tokenConfig(getState))
  .then(res => {
    dispatch({
      type:GET_CATEGORIES,
      payload:res.data
    })
  });
}

export const updateCategory = category => (dispatch, getState) =>{
  axios.put(`${ROOT_URL}/${category._id}`, category, tokenConfig(getState))
  .then( res => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data
    })
  })
}

export const deleteCategory = (id) => (dispatch, getState) => {
  axios.delete(`${ROOT_URL}/${id}`, tokenConfig(getState))
 .then( () => {
   dispatch({
     type:REMOVE_CATEGORY,
     payload:id
   })
 })
}
 
export const getCategory = id => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/${id}`, tokenConfig(getState))
  .then( res => {
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    })
  });
}