import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <nav class="navbar">
          <a href="/" class="navbar-brand">Chatty</a>
        </nav>
        <h1>Hello React :)</h1>
        <ChatBar></ChatBar>
      </div>
    );
  }
}
export default App;
