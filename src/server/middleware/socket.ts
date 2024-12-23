import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

export function attachSocketIO(io: Server) {
  return (req: any, res: Response, next: NextFunction) => {
    req.io = io;
    next();
  };
}