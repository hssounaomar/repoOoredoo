import { ADD_NOTIFICATION, GET_NOTIFICATIONS, UPDATE_NOTIFICATION} from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return  action.payload;
        case ADD_NOTIFICATION:
            return [
                ...state, 
                action.payload
            ];
        case UPDATE_NOTIFICATION :
            return [
                ...state.filter( notif => notif._id !== action.payload._id ), 
                action.payload 
            ];
        default:
            return state;
    }
}
