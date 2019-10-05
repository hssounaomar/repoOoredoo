import { GET_SITESTYPES,UPDATE_SITETYPE,REMOVE_SITETYPE,ADD_SITETYPE } from "../actions/siteTypesActions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_SITESTYPES:
        return  action.payload;
        case ADD_SITETYPE:
        return [...state, action.payload];
        case REMOVE_SITETYPE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_SITETYPE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
