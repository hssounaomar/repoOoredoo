import { ADD_NOTIFICATION, GET_NOTIFICATIONS, UPDATE_NOTIFICATION } from './types'
import axios from "axios";
const ROOT_URL = "http://localhost:5000/notifications";

export const addNotification = notification => dispatch =>{
    dispatch({
        type: ADD_NOTIFICATION,
        payload: notification
    })
}

export const updateNotification = notification => dispatch => {
    axios.put(`${ROOT_URL}/${notification._id}`, notification)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_NOTIFICATION,
                payload: res.data
            })
        })
}

export const getNotifications = () => dispatch => {
    axios.get(ROOT_URL)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data
            })
        })
}




