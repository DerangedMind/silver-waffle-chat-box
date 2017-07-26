import React, {Component} from 'react'

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input onKeyDown={this.props.changeUsername} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input onKeyDown={this.props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}
export default ChatBar