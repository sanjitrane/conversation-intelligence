import React, { Component } from 'react'
import {connect} from 'react-redux'
import {apiCall} from '../utils/externalCalls'
import Player from '../components/audio-player/audioplayer' 
import Transcript from '../components/transcript/transcript'
import {setCallTime} from '../actions'
import Timedisplay from '../components/time-display/timedisplay'
import helper from '../utils/helper'
import {CustomButton} from '../ui-components/button'


class CallTranscript extends Component{

  constructor(props){
    super(props)
    this.state={
      transcriptData: [],
      errors:'',
      elapsed:'00:00',
      duration:'00:00'

    }
    this.player = React.createRef()
  }

  componentDidMount=()=>{
    apiCall({
      apiObj:{
        url:this.props.json,
        method:'GET',
        data:{}
      },
      s_cb: this.onSuccess,
      e_cb: this.onError
    })
  }

  onSuccess=(data)=>{
    this.setState({transcriptData: data, errors:''})
  }

  onError=(message)=>{
    this.setState({errors:message})
  }


  updateCallTime = (cT)=>{
    this.props.dispatch(setCallTime(cT))
    
  }

  showTimer=(elapsed, duration)=>{
    this.setState({elapsed: helper.format(elapsed), duration: helper.format(duration)})
  }

  seekToWord=(n)=>{
    this.player.current.jumpTo(n)
  }
  
  shareButtonObj=()=>({
      icon:'share-icon',
      title: 'Share'
    })
  

  render(){
    const {audio} = this.props
    const {transcriptData, errors, elapsed, duration} = this.state
    return(
      <div>
        <div className='header'>
          <Player ref={this.player} url={audio} cb={this.updateCallTime} timer={this.showTimer}/>
          <CustomButton {...this.shareButtonObj()}/>
        </div>
        <Timedisplay elapsed={elapsed} duration={duration}/>
        <Transcript json={transcriptData} cb={this.seekToWord}/>
        {errors}
      </div>
    )
  }
}

const mapStateToProps = state =>{
  const {callTime} = state
  return {callTime}
}

export default connect(mapStateToProps)(CallTranscript)