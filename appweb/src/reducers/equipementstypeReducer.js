import { GET_EQUIPEMENTS_TYPES,UPDATE_EQUIPEMENT_TYPE,REMOVE_EQUIPEMENT_TYPE,ADD_EQUIPEMENT_TYPE } from "../actions/types"

export default function(state = [], action) {
  switch (action.type) {
    case GET_EQUIPEMENTS_TYPES:
      return  action.payload;
    case ADD_EQUIPEMENT_TYPE:
      return [...state, action.payload];
    case REMOVE_EQUIPEMENT_TYPE:
      return state.filter(equi=>equi._id!==action.payload)
    case UPDATE_EQUIPEMENT_TYPE :
      return state.map( type => type._id === action.payload._id ? action.payload : type )
    default:
      return state;
  }
}
