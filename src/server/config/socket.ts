import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { corsOptions } from './cors.js';
import { logInfo } from '../utils/logger.js';

export function configureSocketIO(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  io.on('connection', (socket) => {
    logInfo(`Client connected: ${socket.id}`, 'Socket.IO');

    socket.on('disconnect', () => {
      logInfo(`Client disconnected: ${socket.id}`, 'Socket.IO');
    });
  });

  return io;
}