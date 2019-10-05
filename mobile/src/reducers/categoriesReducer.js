import { GET_CATEGORIES,ADD_CATEGORIE,REMOVE_CATEGORIE,UPDATE_CATEGORIE } from "../actions/categories.actions";
export default function(state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
        return  action.payload.data;
        case ADD_CATEGORIE:
        return [...state, action.payload];
        case REMOVE_CATEGORIE:
        return state.filter(equi=>equi._id!==action.payload)
        case UPDATE_CATEGORIE :
        return [...state.filter(equi=>equi._id!==action.payload._id), action.payload ];
        //state.filter(equi=>equi._id!==action.payload._id).concat([action.payload]);
      default:
        return state;
    }
}
