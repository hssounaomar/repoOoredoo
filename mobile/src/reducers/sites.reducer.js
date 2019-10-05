import { GET_SITES,ADD_SITE,REMOVE_SITE,UPDATE_SITE } from "../actions/sites.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_SITES:
        return  action.payload.data;
        case ADD_SITE:
        return [...state, action.payload];
        case REMOVE_SITE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_SITE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
