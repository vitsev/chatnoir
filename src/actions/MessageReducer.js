
import * as ActionTypes from './ActionTypes'

export default function messageReducer(state, action) {
    switch (action.type) {
        case ActionTypes.INIT_MESSAGES:
            // Payload contains messages received from server during initialization => initialize the state
            return action.payload;
        case ActionTypes.RECEIVE_NEW_MESSAGE:
            // Payload contains a new message received from server => add it to the existing state
            const { topicID, userID, datetime, text } = action.payload;
            return {
                ...state,
                [topicID]: [...state[topicID], 
                    { message_datetime: datetime, message_text: text, message_chat_id: topicID, message_user_id: userID }]
            };
        default:
            return state;
    }
};