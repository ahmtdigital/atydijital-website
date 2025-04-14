
import { useState } from 'react';
import { Database, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useDatabaseConnection } from '@/lib/db';

const DatabaseManager = () => {
  const { 
    config, 
    saveConfig, 
    testConnection, 
    disconnect, 
    isLoading, 
    error 
  } = useDatabaseConnection();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-dark-500 border-dark-400 shadow-lg overflow-hidden">
        <CardHeader className="bg-dark-600 border-b border-dark-400">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-xl">
                <Database className="mr-2 h-5 w-5 text-ignite" />
                Veritabanı Bağlantısı
              </CardTitle>
              <CardDescription>Veri yönetimi ve API entegrasyonu için bağlantı ayarları</CardDescription>
            </div>
            <div className="flex items-center">
              {config.isConnected ? (
                <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-400/30">
                  <CheckCircle className="h-3 w-3 mr-1" /> Bağlı
                </Badge>
              ) : (
                <Badge variant="outline" className="border-ignite/30 text-ignite/80">
                  <AlertCircle className="h-3 w-3 mr-1" /> Bağlı Değil
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
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
        </CardContent>
        <CardFooter className="bg-dark-600 border-t border-dark-400 flex justify-end gap-2 py-3">
          {config.isConnected ? (
            <Button 
              variant="destructive" 
              onClick={disconnect}
              disabled={isLoading}
              className="bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isLoading ? 'İşlem Yapılıyor...' : 'Bağlantıyı Kes'}
            </Button>
          ) : (
            <Button 
              className="bg-ignite/90 hover:bg-ignite border-ignite/50"
              onClick={testConnection}
              disabled={isLoading || !config.apiKey}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Bağlanıyor...' : 'Bağlantıyı Test Et'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DatabaseManager;
