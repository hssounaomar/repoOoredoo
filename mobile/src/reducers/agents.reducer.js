import { GET_AGENTS } from "../actions/users";

export default function(state = [], action) {
    switch (action.type) {
        case GET_AGENTS:
            return  action.payload.data;
        default:
            return state;
    }
}