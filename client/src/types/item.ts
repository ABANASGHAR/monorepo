export type ItemPriority = 'low' | 'medium' | 'high';

export interface Item {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: ItemPriority;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemDto {
  title: string;
  description?: string;
  priority?: ItemPriority;
  completed?: boolean;
}

export interface UpdateItemDto {
  title?: string;
  description?: string;
  priority?: ItemPriority;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  error?: {
    message: string;
    details?: unknown;
  };
}

export interface HealthCheckData {
  status: string;
  timestamp: string;
  uptime: number;
  database: string;
}
