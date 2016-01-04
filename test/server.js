/* eslint no-console: 0 */

import test from 'ava';
import Server from '../out';


test.cb('Server class', t => {
  const server = new Server();

  server.on('message', (message, socket) => {
    server.broadcast(socket.id + ': ' + message + '\n');
  });

  server.on('close', () => {
    t.end();
  });

  server.listen(1337);
});
