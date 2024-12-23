import cors from 'cors';
import { SERVER } from './constants.js';

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || SERVER.CORS_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};