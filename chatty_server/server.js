const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server, clientTracking: true });

// wss.broadcast = function(data) {
//   wss.clients.forEach(function(client) {
//     client.send(data);
//   });
// };

const usernameColors = ['ff0000','00ff00', '0000ff', '00ffff']

function colorPicker() {
  let color = usernameColors.shift()
  usernameColors.push(color)

  return color
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send(JSON.stringify({
    type: 'userColor',
    name: 'Bob',
    color: colorPicker()
  }))

wss.clients.forEach(function each(client) {
  client.send(  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'incomingConnections',
        count: wss.clients.size
      }))
    }
  })) 
})

  // send message to each connected client
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        data = JSON.parse(data)
        
        if (data.type === 'postMessage') {
          data.type = 'incomingMessage'
        } 
        else if (data.type === 'postNotification') {
          data.type = 'incomingNotification'
        }
        else if (data.type === 'getConnections') {
          data.type = 'incomingConnections'
          data.count = wss.clients.size
        }
        
        client.send(JSON.stringify(data))
      }
    })
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'incomingConnections',
          count: wss.clients.size
        }))
      }
    })
    console.log('Client disconnected')
  })
})