import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    timerState: false,
    timeMins: 25,
    timeSecs: 0,
  }

  componentDidMount() {
    setInterval(this.everyOneSec, 1000)
  }

  everyOneSec = () => {
    const {timerState, timeMins, timeSecs} = this.state

    if (timerState) {
      if (timeSecs === 0) {
        this.setState(prev => ({
          timeMins: prev.timeMins - 1,
          timeSecs: 59,
        }))
      } else {
        this.setState(prev => ({
          timeSecs: prev.timeSecs - 1,
        }))
      }
    }
    if (timeMins === 0 && timeSecs === 1) {
      this.setState({timerState: false})
    }
  }

  changeTimerState = () => {
    this.setState(prev => ({
      timerState: !prev.timerState,
    }))
  }

  decreaseTime = () => {
    const {timerState, timeMins} = this.state

    if (timeMins > 0) {
      this.setState(prev => ({
        timeMins: !timerState ? prev.timeMins - 1 : prev.timeMins,
      }))
    }
  }

  increaseTime = () => {
    const {timerState} = this.state

    this.setState(prev => ({
      timeMins: !timerState ? prev.timeMins + 1 : prev.timeMins,
    }))
  }

  increaAndDecreaseButtons = () => {
    const {timeMins} = this.state
    return (
      <>
        <button
          type="button"
          className="play-buttons increase-button"
          onClick={this.decreaseTime}
        >
          -
        </button>
        <p className="increase-timer">{timeMins}</p>
        <button
          type="button"
          className="play-buttons increase-button"
          onClick={this.increaseTime}
        >
          +
        </button>
      </>
    )
  }

  resetTimer = () => {
    this.setState({timeMins: 25, timeSecs: 0, timerState: false})
  }

  render() {
    const {timerState, timeMins, timeSecs} = this.state
    const iconUrl = !timerState
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const iconAlt = !timerState ? 'play icon' : 'pause icon'
    const btnText = !timerState ? 'Start' : 'Pause'
    const displayText = !timerState ? 'Paused' : 'Running'
    const displaySec = timeSecs > 9 ? timeSecs : `0${timeSecs}`
    const displayMins = timeMins > 9 ? timeMins : `0${timeMins}`
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="stop-watch-main-container">
          <div className="time-container">
            <div className="display-time-container">
              <h1 className="timer-heading">
                {displayMins}:{displaySec}
              </h1>
              <p className="timer-text">{displayText}</p>
            </div>
          </div>
          <div className="buttons-main-container">
            <div className="buttons-top-container">
              <button
                type="button"
                className="play-buttons"
                onClick={this.changeTimerState}
              >
                <img src={iconUrl} alt={iconAlt} className="icon" /> {btnText}
              </button>
              <button
                type="button"
                className="play-buttons"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                Reset
              </button>
            </div>
            <p className="para-text">Set timer Limit</p>
            <div className="button-bottom-container">
              {this.increaAndDecreaseButtons()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
