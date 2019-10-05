import _ from "lodash";
import { GET_TYPES,ADD_TYPE,REMOVE_TYPE,UPDATE_TYPE } from "../actions/types.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_TYPES:
        return  action.payload.data;
        case ADD_TYPE:
        return [...state, action.payload];
        case REMOVE_TYPE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_TYPE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}