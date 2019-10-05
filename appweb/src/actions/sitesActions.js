import {GET_SITES, UPDATE_SITE, REMOVE_SITE, ADD_SITE, RECEIVE_SITE} from './types'
//import { tokenConfig } from './authActions';
import AuthService from '../components/AuthService'
import axios from "axios";
const ROOT_URL = "http://localhost:5000/sites";
const Auth=new AuthService();
export const addSite = (site) => (dispatch) => {
 axios.post(`${ROOT_URL}`, site)
  .then( res => {
    dispatch({
      type: ADD_SITE,
      payload: res.data 
    })
  })
}

export const getSites = () => (dispatch, getState) => {
  //console.log(Auth.tokenConfig())
  const AuthStr = 'Bearer '.concat(Auth.getToken()); 
  axios.get(ROOT_URL,{ headers: { Authorization: AuthStr } })
  .then( res => {
    dispatch({
      type: GET_SITES,
      payload: res.data
    })
  })
}

export const updateSite = (site) => (dispatch, getState) => {
  axios.put(`${ROOT_URL}/${site._id}`, site, Auth.tokenConfig())
  .then( res => {
    dispatch({
      type: UPDATE_SITE,
      payload: res.data
    })
  })
}

export const deleteSiteById = id => (dispatch) => {
  axios.delete(`${ROOT_URL}/id`)
  .then( res => {
    dispatch({
      type:REMOVE_SITE,
      payload: id
    })
  })
}

export const getSiteById = id => (dispatch, getState) => {
  axios.get(`${ROOT_URL}/id`, Auth.tokenConfig())
  .then( res => {
    dispatch({
      type :RECEIVE_SITE,
      payload: res.data
    })
  })
}

