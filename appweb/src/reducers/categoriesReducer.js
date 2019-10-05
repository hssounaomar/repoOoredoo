import { ADD_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY, REMOVE_CATEGORY} from '../actions/types'
export default (state = [], action) => {
    switch (action.type) {
      case GET_CATEGORIES:
        return  action.payload;
      case ADD_CATEGORY:
        return [...state, action.payload];
      case REMOVE_CATEGORY:
        return state.filter(category => category._id !== action.payload)
      case UPDATE_CATEGORY :
        return [...state.map(category => category._id === action.payload._id ? action.payload : category) ];
      default:
        return state;
    }
}
