
import * as ActionTypes from './ActionTypes'

export default function messageReducer(state, action) {
    const { topicID, userID, datetime, text } = action.payload;
    switch (action.type) {
        case ActionTypes.RECEIVE_MESSAGE:
            return {
                ...state,
                [topicID]: [...state[topicID], 
                    { message_datetime: datetime, message_text: text, message_chat_id: topicID, message_user_id: userID }]
            };
        default:
            return state;
    }
};