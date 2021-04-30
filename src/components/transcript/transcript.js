import React from 'react'
import TranscriptBox from './transcriptbox'

const Transcript = ({json, cb})=>{
    const renderText=(index, arrOfWords)=>{
      return <TranscriptBox key={index} arrOfWords={arrOfWords} cb={cb} />
    } 

    if(!Object.keys(json).length){
      return null
    }

    return(<div className='mT20'>
      
      {json.word_timings && json.word_timings.map((item, index)=>{
        return renderText(index, item)
      })}
    </div>)
  
}

export default Transcript