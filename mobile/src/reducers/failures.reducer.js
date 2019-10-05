import { GET_FAILURES,ADD_FAILURE,REMOVE_FAILURE,UPDATE_FAILURE } from "../actions/failures.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_FAILURES:
        return  action.payload.data;
        case ADD_FAILURE:
        return [...state, action.payload];
        case REMOVE_FAILURE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_FAILURE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
