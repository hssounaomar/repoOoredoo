import { ADD_EQUIPEMENT, GET_EQUIPEMENTS, UPDATE_EQUIPEMENT, REMOVE_EQUIPEMENT} from './types'
import axios from "axios";
const ROOT_URL = "http://localhost:5000/equipements";


export const addEquipement = (equipement) => dispatch => {
  console.log(equipement);
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

  console.log(data)
  
  axios.post(ROOT_URL, data)
  .then( response => {
      console.log(response.data);
      dispatch({
          type: ADD_EQUIPEMENT,
          payload: response.data
      })
  })
}

export const updateEquipement = (equipement) => dispatch => {
  console.log(equipement);
  const data = new FormData();
  
  Object.keys(equipement).forEach( key => {
    if(key === 'files') {
    equipement[key].forEach( (val, i) => data.append( `${key}`, val) )
    } else if(key === 'parents' || key === 'attachements') {
      equipement[key].forEach( (val, i) => data.append( `${key}[${i}]`, val) )
    } else {
      data.append(key, equipement[key])
    }
  })

  console.log(data)
  
  axios.put(`${ROOT_URL}/${equipement._id}`, data)
  .then( response => {
      console.log(response.data);
      dispatch({
          type: UPDATE_EQUIPEMENT,
          payload: response.data
      })
  })
}


export function getEquipements(){
    const request = axios.get(`${ROOT_URL}/`);
 
    return {
      type: GET_EQUIPEMENTS,
      payload: request
    };
}

export function deleteEquipementById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_EQUIPEMENT,
   payload:id
 }
 
}


