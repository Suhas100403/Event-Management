import { Server as SocketServer } from 'socket.io';
import { corsOptions } from './cors.js';

export const PORT = 3000;

export function configureSocketIO(httpServer: any) {
  return new SocketServer(httpServer, { cors: corsOptions });
}