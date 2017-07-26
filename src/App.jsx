import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import Message from './Message.jsx'
import MessageList from './MessageList.jsx'
import uuidv1 from 'uuid/v1'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      currentUser: { 
        name: "Anonymous",
        color: 'ffaa00'
      }, 
      messages: [],
      connectedUsers: null,
    }
  }

 initialize() {
    this.socket.send(JSON.stringify({
      type: 'initialize',
      name: this.state.currentUser.name
    }))
  }

  addMessage (e) {
    if (e.keyCode === 13) {
      const newMessage = this.makeMessageObject(e.target.value)
      e.target.value = ""

      this.updateMessages(this.handleClientPost(newMessage))
      this.socket.send(JSON.stringify(newMessage))
    }
  }

  changeUsername (e) {
    if (e.keyCode === 13) {
      const currentName = this.state.currentUser.name
      const updateUser = this.makeUserObject(e.target.value, this.state.currentUser.color)
      
      const notification = {
        type: 'postNotification',
        id: uuidv1(),
        user: updateUser,
        content: `${currentName} has changed their name to ${updateUser.name}`
      }

      this.updateCurrentUser(updateUser)
      this.updateMessages(this.handleClientPost(notification))
      this.socket.send(JSON.stringify(notification))
    }
  }

  handleClientPost(post) {
    post.type = post.type === 'postMessage' ? 'incomingMessage' : post.type
    post.type = post.type === 'postNotification' ? 'incomingNotification' : post.type

    return post
  }

  makeMessageObject (content) {
    return {
      type: 'postMessage',
      id: uuidv1(),
      username: {
        name: this.state.currentUser.name,
        color: this.state.currentUser.color
      },
      content: content
    }
  }

  makeUserObject (name, color) {
    return { 
        name: name,
        color: color
      }
  }

  updateCurrentUser(data) {
    let currentUser = {
      name: data.name,
      color: data.color
    }
    this.setState({currentUser: currentUser})
  }

  updateConnectionCount(data) {
    this.setState({connectedUsers: data.count})
  }

  updateMessages(data) {
    const messages = this.state.messages.concat(data)
    this.setState ({messages: messages })
  }
  componentDidMount() {
    console.log("componentDidMount <App />")

    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = (e) => {
      console.log('Connection established')
      this.initialize()
    }

    this.socket.onmessage = (e) => {
      // a message was received
      if (typeof e.data !== 'string') {
        return
      }

      const newMessage = JSON.parse(e.data)
      if (newMessage.type === 'incomingMessage' || newMessage.type === 'incomingNotification') {
        this.updateMessages(newMessage)
      }
      else if (newMessage.type === 'incomingConnections') {
        this.updateConnectionCount(newMessage)
      }
      else if (newMessage.type === 'userColor') {
        this.updateCurrentUser(newMessage)        
      }
      else {
        throw new Error("Unknown data type " + newMessage.type)
      }
    }

    this.socket.onerror = (e) => {
      console.log('errorrrrr')
    }

    this.socket.onclose = (e) => {
      console.log('closing')
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="connections">({this.state.connectedUsers}) users online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage.bind(this)} changeUsername={this.changeUsername.bind(this)} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
