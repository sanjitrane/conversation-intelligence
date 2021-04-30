import constants from '../constants'

export function callTime(state={}, action){
  if(action.type=== constants.SET_CALL_CURRENT_TIME){
    return action.callTime
  }
  return state
}