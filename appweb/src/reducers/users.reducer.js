import { ADD_USER,REMOVE_USER,UPDATE_USER,GET_USERS } from "../actions/users";
export default function(state = [], action) {
    switch (action.type) {
      case GET_USERS:
       return  action.payload.data;
        case ADD_USER:
        return [...state, action.payload];
        case REMOVE_USER:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_USER :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
