import { RECEIVE_MESSAGE } from './ActionTypes'

export function receiveMessageAction(message) {
    return {type: RECEIVE_MESSAGE, payload: message}
}