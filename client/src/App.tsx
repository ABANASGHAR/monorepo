import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ItemForm } from './components/ItemForm';
import { ItemList } from './components/ItemList';
import { itemService } from './services/itemService';
import { Item, CreateItemDto, HealthCheckData } from './types/item';

export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [health, setHealth] = useState<HealthCheckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const fetchHealthAndItems = useCallback(async () => {
    try {
      setLoading(true);
      const [healthRes, itemsRes] = await Promise.allSettled([
        itemService.checkHealth(),
        itemService.getItems(),
      ]);

      if (healthRes.status === 'fulfilled') {
        setHealth(healthRes.value.data);
      }
      if (itemsRes.status === 'fulfilled') {
        setItems(itemsRes.value.data || []);
      }
    } catch (err) {
      console.error('Failed fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthAndItems();
  }, [fetchHealthAndItems]);

  const handleAddItem = async (dto: CreateItemDto) => {
    setSubmitting(true);
    try {
      const res = await itemService.createItem(dto);
      if (res.data) {
        setItems((prev) => [res.data, ...prev]);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, completed } : item))
    );
    try {
      await itemService.updateItem(id, { completed });
    } catch (err) {
      console.error('Failed to update item status:', err);
      // Revert on error
      fetchHealthAndItems();
    }
  };

  const handleDeleteItem = async (id: string) => {
    // Optimistic delete
    setItems((prev) => prev.filter((item) => item._id !== id));
    try {
      await itemService.deleteItem(id);
    } catch (err) {
      console.error('Failed to delete item:', err);
      fetchHealthAndItems();
    }
  };

  return (
    <div className="container">
      <Header health={health} loading={loading} />

      <main className="grid-layout">
        <aside>
          <ItemForm onAddItem={handleAddItem} loading={submitting} />
        </aside>

        <section>
          <ItemList
            items={items}
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            onToggleComplete={handleToggleComplete}
            onDeleteItem={handleDeleteItem}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
