import constants from '../constants'

export function setCallTime(time){
  return {
    type: constants.SET_CALL_CURRENT_TIME,
    callTime: time
  }
}