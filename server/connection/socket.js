import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      // const token = socket.handshake.query && socket.handshake.query.token // 이렇게 query를 이용하게 되면 토큰이 노출 될 수 있음❌❌
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
