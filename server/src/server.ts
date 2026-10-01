import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(`🚀 [Server] Running in ${config.nodeEnv} mode at http://localhost:${config.port}`);
    console.log(`📡 [API Health] http://localhost:${config.port}/api/health`);
    console.log(`📦 [Items API] http://localhost:${config.port}/api/v1/items`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n[Server] Received termination signal. Closing HTTP server...');
    server.close(() => {
      console.log('[Server] HTTP server closed gracefully.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
