const net = require('net');

const FORWARD_FROM = 5173;
const FORWARD_TO = 3000;

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: FORWARD_TO, host: '127.0.0.1' }, () => {
    socket.pipe(client);
    client.pipe(socket);
  });

  client.on('error', (err) => {
    socket.destroy();
  });

  socket.on('error', (err) => {
    client.destroy();
  });
});

server.on('error', (err) => {
  console.log(`Port ${FORWARD_FROM} forwarder note:`, err.message);
});

server.listen(FORWARD_FROM, '0.0.0.0', () => {
  console.log(`Port ${FORWARD_FROM} is forwarding to http://127.0.0.1:${FORWARD_TO}`);
});

