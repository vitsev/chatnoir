import { INIT_MESSAGES } from './ActionTypes'
import { RECEIVE_NEW_MESSAGE } from './ActionTypes'

export function initMessagesAction(messages) {
    return {type: INIT_MESSAGES, payload: messages}
}

export function receiveNewMessageAction(message) {
    return {type: RECEIVE_NEW_MESSAGE, payload: message}
}
