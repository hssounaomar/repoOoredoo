import { GET_AGENTS } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case GET_AGENTS:
            return  action.payload;
        default:
            return state;
    }
}