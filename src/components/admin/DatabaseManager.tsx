
import { useState } from 'react';
import { Database, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDatabaseConnection } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Yeni oluşturduğumuz alt bileşenleri import edelim
import ConnectionGuide from './database/ConnectionGuide';
import ConnectionTab from './database/ConnectionTab';
import SupportCards from './database/SupportCards';
import { useToast } from '@/hooks/use-toast';

const DatabaseManager = () => {
  const { toast } = useToast();
  const { 
    config, 
    saveConfig, 
    testConnection, 
    disconnect, 
    isLoading, 
    error 
  } = useDatabaseConnection();
  
  const [activeTab, setActiveTab] = useState('connection');

  const handleTestConnection = async () => {
    try {
      await testConnection();
      toast({
        title: "Bağlantı Başarılı",
        description: "Veritabanına başarıyla bağlandı.",
      });
    } catch (err) {
      toast({
        title: "Bağlantı Hatası",
        description: "Bağlantı sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Bağlantı Kesildi",
        description: "Veritabanı bağlantısı başarıyla kesildi.",
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Bağlantı kesilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center text-white">
            <Database className="mr-2 h-6 w-6 text-ignite" />
            Veri Yönetimi
          </h2>
          <p className="text-sm text-white/60 mt-1">
            API bağlantısını yapılandırın ve içerik yönetimine başlayın
          </p>
        </div>
      </div>
      
      <Card className="bg-dark-500 border-dark-400 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-dark-600 to-dark-500 border-b border-dark-400">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-xl text-white">
                <Database className="mr-2 h-5 w-5 text-ignite" />
                Veritabanı Bağlantısı
              </CardTitle>
              <CardDescription className="text-white/60">Veri yönetimi ve API entegrasyonu için bağlantı ayarları</CardDescription>
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b border-dark-400">
            <TabsList className="bg-dark-600 grid w-full grid-cols-2">
              <TabsTrigger value="connection" className="data-[state=active]:bg-dark-400 data-[state=active]:text-white">
                Bağlantı
              </TabsTrigger>
              <TabsTrigger value="guide" className="data-[state=active]:bg-dark-400 data-[state=active]:text-white">
                Bağlantı Rehberi
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="connection" className="m-0">
            <CardContent className="space-y-4 pt-6 text-white">
              <ConnectionTab 
                config={config} 
                saveConfig={saveConfig} 
                error={error} 
              />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="guide" className="m-0">
            <CardContent className="space-y-4 pt-6 text-white">
              <ConnectionGuide />
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="bg-dark-600 border-t border-dark-400 flex justify-end gap-2 py-3">
          {config.isConnected ? (
            <Button 
              variant="destructive" 
              onClick={handleDisconnect}
              disabled={isLoading}
              className="bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isLoading ? 'İşlem Yapılıyor...' : 'Bağlantıyı Kes'}
            </Button>
          ) : (
            <Button 
              className="bg-ignite hover:bg-ignite-700 border-ignite/50"
              onClick={handleTestConnection}
              disabled={isLoading || !config.apiKey}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Bağlanıyor...' : 'Bağlantıyı Test Et'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Eğer bağlantı yoksa destek kartlarını gösterelim */}
      {!config.isConnected && <SupportCards />}
    </motion.div>
  );
};

export default DatabaseManager;
