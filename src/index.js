import net from 'net';
import uuid from 'uuid';

/**
 * Server class
 */
class Server extends net.Server {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.sockets = [];

    this.on('connection', socket => {
      socket.id = uuid.v1();
      this.sockets.push(socket);

      socket.on('data', message => {
        this.emit('message', message.toString().trim(), socket);
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
}

export default Server;
