const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("✅ WebSocket server running at ws://localhost:8080");

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast to everyone
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log("⚠️ A user disconnected");
  });
});