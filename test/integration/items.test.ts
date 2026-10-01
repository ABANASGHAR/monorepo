import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../../server/src/app.js';
import { Item } from '../../server/src/models/item.model.js';

describe('Items API Endpoints (/api/v1/items)', () => {
  const app = createApp();

  it('GET /api/v1/items should return list of items', async () => {
    // Mock Item.find
    const mockItems = [
      {
        _id: '651f89c02b1f8b3c94a501a1',
        title: 'Sample Task',
        description: 'Testing task slice',
        completed: false,
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
    ];

    vi.spyOn(Item, 'find').mockReturnValue({
      sort: vi.fn().mockResolvedValue(mockItems),
    } as any);

    const response = await request(app).get('/api/v1/items');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Sample Task');
  });

  it('POST /api/v1/items should reject missing title with 400', async () => {
    const response = await request(app)
      .post('/api/v1/items')
      .send({ description: 'No title provided' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Title is required');
  });

  it('POST /api/v1/items should create an item when valid', async () => {
    const newItem = {
      _id: '651f89c02b1f8b3c94a501a2',
      title: 'New Slice Task',
      description: 'Slice description',
      priority: 'high',
      completed: false,
    };

    vi.spyOn(Item, 'create').mockResolvedValue(newItem as any);

    const response = await request(app)
      .post('/api/v1/items')
      .send({
        title: 'New Slice Task',
        description: 'Slice description',
        priority: 'high',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('New Slice Task');
  });
});
