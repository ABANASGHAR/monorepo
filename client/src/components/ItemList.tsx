import React from 'react';
import { Item } from '../types/item';

interface ItemListProps {
  items: Item[];
  loading: boolean;
  filter: 'all' | 'pending' | 'completed';
  setFilter: (f: 'all' | 'pending' | 'completed') => void;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  loading,
  filter,
  setFilter,
  onToggleComplete,
  onDeleteItem,
}) => {
  const filteredItems = items.filter((item) => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <div className="card">
      <div className="filter-bar">
        <h2>Items & Tasks ({filteredItems.length})</h2>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({items.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({items.filter((i) => !i.completed).length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Done ({items.filter((i) => i.completed).length})
          </button>
        </div>
      </div>

      {loading && items.length === 0 ? (
        <div className="empty-state">
          <p>⏳ Loading items from server...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>No {filter !== 'all' ? filter : ''} tasks found.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Use the form to create your first vertical slice item!
          </p>
        </div>
      ) : (
        <div className="item-list">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`item-card ${item.completed ? 'completed' : ''}`}
            >
              <div className="item-left">
                <input
                  type="checkbox"
                  className="item-checkbox"
                  checked={item.completed}
                  onChange={() => onToggleComplete(item._id, !item.completed)}
                  title="Mark as completed"
                />
                <div>
                  <div className="item-title">{item.title}</div>
                  {item.description && (
                    <div className="item-desc">{item.description}</div>
                  )}
                  <div className="item-meta">
                    <span className={`priority-badge priority-${item.priority}`}>
                      {item.priority}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="btn-delete"
                onClick={() => onDeleteItem(item._id)}
                title="Delete item"
                aria-label="Delete item"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
