import React from 'react'

const Timedisplay =({elapsed, duration})=>{
  return (<div className='time-display'><span className='elapsed'>{elapsed}</span>{` / `}<span className='duration'>{duration}</span></div>)
}

export default Timedisplay