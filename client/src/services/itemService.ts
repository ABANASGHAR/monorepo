import { request } from './api';
import { Item, CreateItemDto, UpdateItemDto, HealthCheckData } from '../types/item';

export const itemService = {
  // Check backend & DB status
  checkHealth: async () => {
    return request<HealthCheckData>('/health');
  },

  // Get all items with optional filters
  getItems: async (filters?: { completed?: boolean; priority?: string }) => {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) {
      params.append('completed', String(filters.completed));
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<Item[]>(`/v1/items${query}`);
  },

  // Get item by ID
  getItemById: async (id: string) => {
    return request<Item>(`/v1/items/${id}`);
  },

  // Create a new item
  createItem: async (dto: CreateItemDto) => {
    return request<Item>('/v1/items', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  // Update an existing item
  updateItem: async (id: string, dto: UpdateItemDto) => {
    return request<Item>(`/v1/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  },

  // Delete an item
  deleteItem: async (id: string) => {
    return request<{ id: string }>(`/v1/items/${id}`, {
      method: 'DELETE',
    });
  },
};
