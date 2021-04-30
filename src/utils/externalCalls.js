import axios from 'axios'

const axiosInstance = axios.create()

export const apiCall=(obj)=>{
  axiosInstance({
    ...obj.apiObj
  })
  .then(resp=>{
      obj.s_cb(resp.data) 
  })
  .catch(error=>{
    obj.e_cb(error.message)  
  })
  }