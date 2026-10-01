import React, { useState } from 'react';
import { CreateItemDto, ItemPriority } from '../types/item';

interface ItemFormProps {
  onAddItem: (dto: CreateItemDto) => Promise<void>;
  loading: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ItemPriority>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      setError(null);
      await onAddItem({
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (err) {
      setError((err as Error).message || 'Failed to create item');
    }
  };

  return (
    <div className="card">
      <h2>Add New Item / Task</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            ⚠️ {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="e.g. Implement Auth Service"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Details about this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ItemPriority)}
            disabled={loading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : '➕ Create Task'}
        </button>
      </form>
    </div>
  );
};
