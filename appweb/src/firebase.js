import firebase from 'firebase/app';
import '@firebase/messaging'
import axios from 'axios';
const config = {
    messagingSenderId: '147571164101'
};

firebase.initializeApp(config);
// firebase.messaging().getToken()
//   .then(fcmToken => {
//     if (fcmToken) {
//       // user has a device token
//       console.log(fcmToken)
//     } else {
//       // user doesn't have a device token yet
//     } 
//   });

let messaging;
let registration;
// we need to check if messaging is supported by the browser
if(firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      console.log('page is fully loaded');
         registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
       
        messaging.useServiceWorker(registration);
      
    });
}
export function subscribe (topic){
    console.log('hello Subscribe')
    firebase.messaging().getToken().then(token=>{
    if(token){
      let  request={
            url: `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
            method: 'post',
            headers: {
              "Content-Type":"application/json",
              "Authorization":`key=AAAAIlvtQ8U:APA91bF5GmmPv4XT-_nwCsqOSBaKPA8gzPRcTU2ooxwo19CbOrjEH89_yPnbxHc02TnAmIO3O7lB8NNG6WlX7ckTDnvADbMBJcmwNb7QSp2DmyZkYmFJ1bqc5BdfP0sJP4LWttXQyOpN`
            }
          }
        //console.log()
        //axios.post(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,{ headers: { Authorization: `key=AAAAIlvtQ8U:APA91bF5GmmPv4XT-_nwCsqOSBaKPA8gzPRcTU2ooxwo19CbOrjEH89_yPnbxHc02TnAmIO3O7lB8NNG6WlX7ckTDnvADbMBJcmwNb7QSp2DmyZkYmFJ1bqc5BdfP0sJP4LWttXQyOpN` } })
        axios(request).then((r) => {
            console.log(r)
          }).catch((error) => {
            console.log(error)
          })
    }
    
    })
    
}
export {
    messaging,
    registration
};