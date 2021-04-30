import React,{Component} from 'react'
import ReactPlayer from 'react-player'
import CustomDropdown from '../../ui-components/dropdown'

const options = [
  { key: 1, text: '1.0x', value: 1.0 },
  { key: 2, text: '1.5x', value: 1.5 },
  { key: 3, text: '2.0x', value: 2.0 },
]

class Player extends Component{

  constructor(props){
    super(props)
    this.state={
      playing: false,
      duration:0,
      currentTime:0,
      playbackRate: 1.0
    }
    this.interValId= null
    this.player = React.createRef()
  }

  componentDidMount=()=>{

  }

  componentWillUnmount=()=>{
    clearInterval(this.interValId)
  }

  onPlay = ()=>{
    this.setState({playing: true})
  }
  onPause = ()=>{
    this.setState({playing: false})
  }

  handleDuration = (dur)=>{
    this.setState({duration: dur})
  }

  onRewind = ()=>{
    const {duration} = this.state
    const cT = this.player.current.getCurrentTime()
    const value = Math.min(Math.floor(duration/10), 10)
    this.player.current.seekTo(cT - value, 'seconds')
  }

  onForward = ()=>{
    const {duration} = this.state
    const cT = this.player.current.getCurrentTime()
    const value = Math.min(Math.floor(duration/10), 10)
    this.player.current.seekTo(cT + value, 'seconds')
  }

  handleEnded = ()=>{
    this.setState({playing: false})
    this.player.current.seekTo(0)
    this.props.cb(0)
  }

  jumpTo = (n)=>{
    this.player.current.seekTo(n)
  }

  handleReady=()=>{
    this.intervalId = setInterval(()=>{
      const cT = this.player.current.getCurrentTime() ? this.player.current.getCurrentTime().toFixed(3) : 0
      this.setState({currentTime: cT})
      if(this.state.playing){this.props.cb(cT)}
    },90)
  }

  handleProgress=(obj)=>{
    const {duration} = this.state
    const elapsed = duration * obj.played
    this.props.timer(elapsed, duration)
  }

  handlePlayback=(val)=>{
    this.setState({playbackRate: val})
  }

  render(){
    const {url} = this.props
    const {playing, playbackRate} = this.state
    return(
      <div className='audio-wrapper'>
        <ReactPlayer
            url={url}
            ref={this.player}
            width='0px'
            height='0px'
            playbackRate={playbackRate}
            playing={playing}
            controls={false}
            onDuration={this.handleDuration}
            onEnded={this.handleEnded}
            onReady={this.handleReady}
            onProgress={this.handleProgress}
          />
        <span className='rewind-icon mR14' onClick={this.onRewind}></span>
        <span className={playing ? 'pause-icon' : 'play-icon'} onClick={playing ? this.onPause : this.onPlay} alt=""></span>
        <span className='forward-icon mL14 mR14' onClick={this.onForward} ></span>
        <CustomDropdown options={options} cb={this.handlePlayback}/>
      </div>
    )
  }
}


export default Player