import { GET_EQUIPEMENTSTYPES,UPDATE_EQUIPEMENTTYPE,REMOVE_EQUIPEMENTTYPE,ADD_EQUIPEMENTTYPE } from "../actions/equipementTypes.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_EQUIPEMENTSTYPES:
        return  action.payload.data;
        case ADD_EQUIPEMENTTYPE:
        return [...state, action.payload];
        case REMOVE_EQUIPEMENTTYPE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_EQUIPEMENTTYPE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
