const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4050 }, () =>
  console.log('WebSocket chat on ws://localhost:4000')
);

wss.on('connection', ws => {
  ws.on('message', msg => {
    // просто ретранслируем всем
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});
