import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { SERVER } from './config/constants.js';
import { corsOptions } from './config/cors.js';
import { configureSocketIO } from './config/socket.js';
import { initializeDatabase } from './config/database.js';
import { requestLogger } from './middleware/logging.js';
import { errorHandler } from './middleware/error.js';
import { attachSocketIO } from './middleware/socket.js';
import routes from './config/routes.js';
import { logError, logInfo } from './utils/logger.js';

async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    const app = express();
    const httpServer = createServer(app);
    const io = configureSocketIO(httpServer);

    // Middleware
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(requestLogger);
    app.use(attachSocketIO(io));

    // Mount all routes under /api
    app.use('/api', routes);

    // Error handler must be last
    app.use(errorHandler);

    // Start server
    httpServer.listen(SERVER.PORT, SERVER.HOST, () => {
      logInfo(`Server running at http://${SERVER.HOST}:${SERVER.PORT}`);
      logInfo(`Frontend URL: ${SERVER.CLIENT_URL}`);
    });

  } catch (error) {
    logError(error as Error, 'Server startup failed');
    process.exit(1);
  }
}

startServer();