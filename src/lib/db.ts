
import { useState, useEffect } from 'react';

// Database connection types
export interface DatabaseConfig {
  apiUrl: string;
  apiKey: string;
  isConnected: boolean;
}

// Demo mock database service
export const useDatabaseConnection = () => {
  const [config, setConfig] = useState<DatabaseConfig>({
    apiUrl: localStorage.getItem('dbApiUrl') || 'https://api.ignitemarketing.com/v1',
    apiKey: localStorage.getItem('dbApiKey') || '',
    isConnected: localStorage.getItem('dbConnected') === 'true'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveConfig = (newConfig: Partial<DatabaseConfig>) => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      try {
        const updatedConfig = { ...config, ...newConfig };
        
        // Save to localStorage for demo purposes
        localStorage.setItem('dbApiUrl', updatedConfig.apiUrl);
        localStorage.setItem('dbApiKey', updatedConfig.apiKey);
        localStorage.setItem('dbConnected', String(updatedConfig.isConnected));
        
        setConfig(updatedConfig);
        setIsLoading(false);
      } catch (err) {
        setError('Veritabanı bağlantısı yapılandırılırken bir hata oluştu.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const testConnection = () => {
    setIsLoading(true);
    setError('');

    // Simulate API connection test
    setTimeout(() => {
      if (config.apiKey.length < 8) {
        setError('Geçersiz API anahtarı. Lütfen doğru anahtarı girdiğinizden emin olun.');
        setIsLoading(false);
        return;
      }

      saveConfig({ isConnected: true });
      setIsLoading(false);
    }, 1500);
  };

  const disconnect = () => {
    setIsLoading(true);
    
    // Simulate disconnection
    setTimeout(() => {
      saveConfig({ isConnected: false });
      setIsLoading(false);
    }, 800);
  };

  return {
    config,
    saveConfig,
    testConnection,
    disconnect,
    isLoading,
    error
  };
};

// Mock data service
export const useDataService = <T>(collectionName: string, initialData: T[] = []) => {
  const [items, setItems] = useState<T[]>(() => {
    const savedItems = localStorage.getItem(`ignite_${collectionName}`);
    return savedItems ? JSON.parse(savedItems) : initialData;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(`ignite_${collectionName}`, JSON.stringify(items));
  }, [items, collectionName]);

  const getAll = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return items;
  };

  const getById = (id: number | string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return items.find((item: any) => item.id === id);
  };

  const add = (item: Omit<T, 'id'>) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      try {
        const newId = items.length > 0 
          ? Math.max(...items.map((i: any) => i.id)) + 1 
          : 1;
          
        const newItem = { ...item, id: newId } as T;
        setItems([...items, newItem]);
        setIsLoading(false);
      } catch (err) {
        setError('Veri eklenirken bir hata oluştu.');
        setIsLoading(false);
      }
    }, 800);
  };

  const update = (id: number | string, updates: Partial<T>) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      try {
        const updatedItems = items.map((item: any) => 
          item.id === id ? { ...item, ...updates } : item
        );
        setItems(updatedItems);
        setIsLoading(false);
      } catch (err) {
        setError('Veri güncellenirken bir hata oluştu.');
        setIsLoading(false);
      }
    }, 800);
  };

  const remove = (id: number | string) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      try {
        const filteredItems = items.filter((item: any) => item.id !== id);
        setItems(filteredItems);
        setIsLoading(false);
      } catch (err) {
        setError('Veri silinirken bir hata oluştu.');
        setIsLoading(false);
      }
    }, 600);
  };

  return {
    items,
    getAll,
    getById,
    add,
    update,
    remove,
    isLoading,
    error
  };
};
