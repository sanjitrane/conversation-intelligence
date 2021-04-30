import React from 'react'

export const CustomButton = (props)=>{
  const {icon, title, noFill, cb, data=null} = props

  const onClick=()=>{
    if(cb){
      cb(data)
    }
  }

  return(
    <div 
    className={noFill ? 'btn no-fill' : 'btn'}
    onClick={onClick}
    >
      {icon && <span className={`${icon} mR7`}/>}
      {title}
    </div>
  )
}

