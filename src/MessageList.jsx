import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {

  constructor(props) {
    super(props)
    
    let sysMessages = [
      {
        'message': 'Anonymous1 changed their name to nomnom.'
      }
    ]
    this.state = {
      sysMessages: sysMessages
    }
  }

  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => {
          return ( 
            <Message username={message.username} content={message.content} /> 
          )
        })}
        {this.state.sysMessages.map(sysMess => {
          return <div className ="message system">{sysMess.message}</div>
        })}
      </main>
    )

  }

}
export default MessageList