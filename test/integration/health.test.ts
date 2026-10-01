import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../../server/src/app.js';

describe('GET /api/health', () => {
  const app = createApp();

  it('should return 200 OK with health status metadata', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('status', 'ok');
    expect(response.body.data).toHaveProperty('timestamp');
    expect(response.body.data).toHaveProperty('uptime');
    expect(response.body.data).toHaveProperty('database');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown-path');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Endpoint not found');
  });
});
