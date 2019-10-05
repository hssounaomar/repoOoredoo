import { GET_SUPPLIERS } from "../actions/users";

export default function(state = [], action) {
    switch (action.type) {
        case GET_SUPPLIERS:
            return  action.payload.data;
        default:
            return state;
    }
}
