import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async (): Promise<typeof mongoose | null> => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${(error as Error).message}`);
    // In dev / initial run without mongo active, allow app to boot with degraded DB status
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
    return null;
  }
};

export const getDBStatus = (): 'connected' | 'disconnected' | 'connecting' | 'disconnecting' => {
  const state = mongoose.connection.readyState;
  switch (state) {
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'disconnected';
  }
};
