import { ISAUTHENTIFICATED } from "../actions/authentication";

export default function(state = false, action) {
    switch (action.type) {
        case ISAUTHENTIFICATED:
        return  action.payload;
      default:
        return state;
    }
}