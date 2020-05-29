
import * as ActionTypes from './ActionTypes'

export default function messageReducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case ActionTypes.RECEIVE_MESSAGE:
            return {
                ...state,
                [topic]: [...state[topic], { from, msg }]
            };
        default:
            return state;
    }
};