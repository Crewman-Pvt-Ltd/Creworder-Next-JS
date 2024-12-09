const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3001 });
server.on('connection', socket => {
  console.log('Client connected');
  socket.on('message', message => {
    console.log(`Received message: ${message}`);
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on('close', () => {
    console.log('Client disconnected');
  });
  socket.on('error', err => {
    console.error('WebSocket error:', err);
  });
});

console.log('WebSocket server running on ws://localhost:3001');