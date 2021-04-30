const helper = {
  convertToSec:(str)=>{
    return parseInt(str)
  },
  
  formatSecs:(sec)=>{
    return sec < 10 ? `00:${helper.pad(sec)}` : `00:${sec}`
  },
  // converts a sec string to millisec
  convertToMS:(str, dec)=>{
    return parseFloat(str).toFixed(dec) * 1000
  },
  
  convertToTimeFormat:(str)=>{
    const arr = str.split('.')
    const val1 = parseInt(arr[0])
    return  val1 < 10 ? `0${arr[0]}:${arr[1]}` : `${arr[0]}:${arr[1]}`
  },

  format :(seconds)=>{
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = helper.pad(date.getUTCMinutes())
    const ss = helper.pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${helper.pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  },
  
  pad: (string)=> {
    return ('0' + string).slice(-2)
  }
}

export default helper