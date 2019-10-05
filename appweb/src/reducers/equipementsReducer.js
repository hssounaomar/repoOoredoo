import { GET_EQUIPEMENTS,ADD_EQUIPEMENT,REMOVE_EQUIPEMENT,UPDATE_EQUIPEMENT } from "../actions/equipementsActions";

export default function(state = [], action) {
    switch (action.type) {
        case GET_EQUIPEMENTS:
        return  action.payload;
        case ADD_EQUIPEMENT:
        return [...state, action.payload];
        case REMOVE_EQUIPEMENT:
        return state.filter( equipement => equipement._id !== action.payload )
        case UPDATE_EQUIPEMENT :
        return [
          ...state.filter(equi=>equi._id!==action.payload._id), 
          action.payload 
        ];
      default:
        return state;
    }
}
