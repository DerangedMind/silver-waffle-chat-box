import React, {Component} from 'react'

function picCheck(msg) {
    // look out for message contents that contain a URL.
    // http://www.lanlinglaurel.com/data/out/23/4089584-cat-images.jpg
    // defined w/ regex
    
    // jpg
    let jpg = /(https?:\/\/)?([\da-z*.-]+)\.([a-z\.]{2,6})([\/\w*\s(|%20).-]*)\/?.jpg/gi
    if (msg.match(jpg)) {
      return msg.match(jpg)  
    }
    // gif
    let gif = /(https?:\/\/)?([\da-z*.-]+)\.([a-z\.]{2,6})([\/\w*\s(|%20).-]*)\/?.gif/gi
    if (msg.match(gif)) {
      return msg.match(gif)
    }
    // png
    let png = /(https?:\/\/)?([\da-z*.-]+)\.([a-z\.]{2,6})([\/\w*\s(|%20).-]*)\/?.png/gi
    if (msg.match(png)) {
      return msg.match(png)
    }

    return null
  }

class Message extends Component {

  render() {
    // call picCheck to see if img is present
    let picInContent = picCheck(this.props.content)
    
    if (this.props.type === 'incomingMessage' 
          && picInContent) {
      let color = {
        color: '#'+this.props.username.color
      }
      return (
        <div>
          <div className="message">
            <span className="message-username" style={color}>{this.props.username.name}</span>
            <span className="message-content">{this.props.content}</span>  
          </div>
          <div className="message">
            <img className="message-content" src={picInContent[0]} style={{width: 200, height: 200 }} />
          </div>
        </div>
      )
    }

    if(this.props.type === 'incomingMessage') {
      let color = {
        color: '#'+this.props.username.color
      }
      return (
        <div className="message">
          <span className="message-username" style={color}>{this.props.username.name}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    }
    else {
      return (
        <div className="message system">{this.props.content}</div>
      )
    }
  }
}
export default Message

Message.propTypes = {
  content: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  username: React.PropTypes.object

}