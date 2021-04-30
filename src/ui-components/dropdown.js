import React, {useState} from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const CustomDropdown = ({options, cb}) => {
  const [speed, selectSpeed] = useState(1)
  const handleChange=(e,{value})=>{
    selectSpeed(value)
    cb(value)
  }
  return(
  <Menu compact>
    <Dropdown 
    value={speed}
    options={options}
    onChange={handleChange} 
    simple 
    item />
  </Menu>
)}

export default CustomDropdown