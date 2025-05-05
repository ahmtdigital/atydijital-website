
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConnectionTabProps {
  config: {
    apiUrl: string;
    apiKey: string;
    isConnected: boolean;
  };
  saveConfig: (newConfig: Partial<{
    apiUrl: string;
    apiKey: string;
    isConnected: boolean;
  }>) => void;
  error: string;
}

const ConnectionTab = ({ config, saveConfig, error }: ConnectionTabProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">API URL</label>
        <Input 
          value={config.apiUrl}
          onChange={(e) => saveConfig({ apiUrl: e.target.value })}
          placeholder="https://api.example.com/v1"
          className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
          disabled={config.isConnected}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">API Anahtarı</label>
        <Input 
          type="password"
          value={config.apiKey}
          onChange={(e) => saveConfig({ apiKey: e.target.value })}
          placeholder="API anahtarınızı girin"
          className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
          disabled={config.isConnected}
        />
      </div>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="glass-effect p-4 rounded-md">
        <p className="text-sm text-white/70">
          <span className="font-medium text-white">Not:</span> Veri yönetimi işlemleri için API bağlantısı gereklidir. 
          Tüm içerik düzenleme işlemleri veritabanına kaydedilir.
        </p>
      </div>
    </div>
  );
};

export default ConnectionTab;
