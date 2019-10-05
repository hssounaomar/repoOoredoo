import { GET_SUPPLIERS } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case GET_SUPPLIERS:
            return  action.payload;
        default:
            return state;
    }
}
