import { GET_INTERVENTIONS,ADD_INTERVENTION,REMOVE_INTERVENTION,UPDATE_INTERVENTION,UPDATE_STATE_INTERVENTION } from "../actions/interventions.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_INTERVENTIONS:
        return  action.payload.data;
        case ADD_INTERVENTION:
        return [...state, action.payload];
        case REMOVE_INTERVENTION:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_INTERVENTION :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        case UPDATE_STATE_INTERVENTION:
          return  action.payload.data;
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
