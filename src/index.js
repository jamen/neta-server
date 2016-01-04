import net from 'net';
import uuid from 'uuid';
import { EventEmitter } from 'events';

/**
 * Server class
 */
class Server extends EventEmitter {
  /**
   * Constructor
   * @param {Server} server - previously initialized server.
   */
  constructor(server) {
    super();
    this.sockets = [];
    this._server = server || new net.Server();

    this._server.on('connection', socket => {
      socket.id = uuid.v1();
      this.sockets.push(socket);
      this.emit('connection', socket);

      socket.on('data', data => {
        this.emit('message', data.toString().trim(), socket);
      });
    });
  }

  /**
   * Broadcast a message.
   * @param {(String|Buffer)} message - something to broadcast.
   * @return {Self} Chainability.
   */
  broadcast(message) {
    this.sockets(s => s.write(message));
    return this;
  }

  /**
   * Listen
   */
  listen(...opts) {
    this._server.listen(...opts);
  }
}

export default Server;
