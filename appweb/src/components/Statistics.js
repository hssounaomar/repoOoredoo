import React,{Component} from 'react'
import {messaging,registration,subscribe} from '../firebase'

class Statistics extends Component{
    pushNotification=async ()=>{
        await messaging.requestPermission();
        messaging.onMessage((payload) => {
            const title = payload.notification.title;
            const options = {
                topic:"test",
                body: payload.notification.body,
                icon: payload.notification.icon,
                actions: [
                    {
                        action: "http://localhost:3000",
                        title: 'Hello Omar'
                    }
                ]
            };
            registration.showNotification(title, options);           
        })
    }
    subscribeToTopic =()=>{
subscribe("intervention")
    }
        render(){
            this.pushNotification();
            return( 
                <div >
<button  onClick={this.subscribeToTopic}>Subscribe</button>
   </div> )
        }
}
export default Statistics;