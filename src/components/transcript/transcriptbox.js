import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Word from './word'
import {setCallTime} from '../../actions'
import helper from '../../utils/helper'

const TranscriptBox = (props)=>{
const {arrOfWords, callTime, cb} = props
const [selected, setSelected] = useState(false)

const cT = helper.convertToMS(callTime,3)
const sT = helper.convertToMS(arrOfWords[0].startTime, 3)
const eT = helper.convertToMS(arrOfWords[arrOfWords.length - 1].endTime, 3)

useEffect(()=>{
  if(cT>=sT && cT<eT){
    setSelected(true)
  }else{
    setSelected(false)
  }
},[cT, eT, sT])

const wordObj = (obj)=> ({
  data:obj,
  cT,
  cb: updateCallTime
})

const createText = ()=>{
  const arr = []
  arrOfWords.forEach((obj, index)=>{
    arr.push(<Word key={`${obj.startTime}-${obj.endTime}`} {...wordObj(obj)}/>)
    if(index < arrOfWords.length){
      arr.push(<span key={`span${index}`}> </span>)
    }
  })
  return arr
}

const updateCallTime = (cT)=>{
    props.dispatch(setCallTime(cT))
    cb(cT) 
    // playerRef.current.jumpTo(cT)   
}
  
return(
  <div className={selected ? 'box-bg transcript-box':'transcript-box'}>
    <div className='time'>{helper.formatSecs(helper.convertToSec(arrOfWords[0].startTime))}</div>
    <div className='sentence'>{createText()}</div>
  </div>
)
}

const mapStateToProps = state =>{
  const {callTime} = state
  return {callTime}
}

export default connect(mapStateToProps)(TranscriptBox)