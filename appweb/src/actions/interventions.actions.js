import axios from "axios";
import {messaging,registration,subscribe} from '../firebase'
const ROOT_URL = "http://localhost:5000/interventions";


export const GET_INTERVENTIONS="GET_INTERVENTIONS";
export const GET_INTERVENTION="GET_INTERVENTION";
export const UPDATE_INTERVENTION="UPDATE_INTERVENTION";
export const REMOVE_INTERVENTION="REMOVE_INTERVENTION";
export const ADD_INTERVENTION="ADD_INTERVENTION";
export const RECEIVE_INTERVENTION ="RECEIVE_INTERVENTION";
export const COMPLETE_INTERVENTION="COMPLETE_INTERVENTION";
const pushNotification = async(intervention)=>{
  await messaging.requestPermission();
  subscribe('intervention');
  let  request={
    url: `https://fcm.googleapis.com/fcm/send`,
    method: 'post',
    headers: {
      "Content-Type":"application/json",
      "Authorization":`key=AAAAIlvtQ8U:APA91bF5GmmPv4XT-_nwCsqOSBaKPA8gzPRcTU2ooxwo19CbOrjEH89_yPnbxHc02TnAmIO3O7lB8NNG6WlX7ckTDnvADbMBJcmwNb7QSp2DmyZkYmFJ1bqc5BdfP0sJP4LWttXQyOpN`
    },
    data:{
      "notification": {
          "title": "Planifier intervention",
          "body": `Planifier nouvelle intervention ${intervention.title}`,
          "click_action": "http://localhost:3000/interventions",
          "icon": "http://localhost:3000/icon.png"
      },
      "to": "/topics/intervention"
  }
  }
  axios(request).then((r) => {
    console.log(r)
  }).catch((error) => {
    console.log(error)
  })
}
export function completeIntervention(id){
 
  return axios.put(`${ROOT_URL}/completeIntervention/`+id).then(res=>{
let request= axios.get(`${ROOT_URL}/`);

return {
  type :COMPLETE_INTERVENTION,
  payload:request
};

  });
  
}
export function addIntervention(intervention){

 const request=   axios.post(`${ROOT_URL}`,intervention).then(res=>res.data);
 pushNotification(intervention);
 console.log('inside Add Notification')
 return {    
  type:ADD_INTERVENTION,
  payload:request
}

 
}



export function getInterventions(){
    const request = axios.get(`${ROOT_URL}/`);
 
    return {
      type: GET_INTERVENTIONS,
      payload: request
    };
}

export function updateIntervention(intervention){
  axios.put(`${ROOT_URL}/`+intervention._id, intervention);
  return {
    type :UPDATE_INTERVENTION,
    payload:intervention
  };
}

export function deleteInterventionById(id){
  axios.delete(`${ROOT_URL}/`+id);
 return {
   type:REMOVE_INTERVENTION,
   payload:id
 }
 
}


