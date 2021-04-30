import React, { useEffect, useState } from 'react'
import helper from '../../utils/helper'

const Word = ({data, cT, cb})=>{
  const [selected, setSelected] = useState(false)
  const sT = helper.convertToMS(data.startTime, 3)
  const eT = helper.convertToMS(data.endTime, 3)

  const onClicked = ()=>{
    cb(sT/1000)
  }
  
  useEffect(()=>{
    if(cT >= sT && cT<eT){
      setSelected(true)
    }else{
      setSelected(false)
    }
  },[cT])
  return <span className={selected ? 'word word-bg': 'word'} onClick={onClicked}>{data.word}</span>
}

export default Word 