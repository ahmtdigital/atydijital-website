
import { useState } from 'react';
import { Database, Save, RotateCcw, CheckCircle, AlertCircle, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useDatabaseConnection } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ConnectionGuide = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <Info className="h-5 w-5 mr-2 text-ignite" /> 
        Veritabanı Bağlantı Rehberi
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            1. API URL'si Nedir ve Nasıl Elde Edilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API URL, web sitenizin veri kaynaklarına erişim sağlayan adrestir. Bu adresi şu şekilde elde edebilirsiniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kendi API'nizi oluşturduysanız, sunucunuzun alan adı ve API yolunu kullanın (örn: https://api.siteniz.com/v1)</li>
              <li>Üçüncü taraf bir API servisi kullanıyorsanız, servis sağlayıcınızın size verdiği URL'yi kullanın</li>
              <li>API URL'si genellikle "https://" ile başlar ve "/v1", "/api" gibi bir yol içerir</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            2. API Anahtarı Nereden Alınır?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API anahtarı, API'ye güvenli erişim sağlayan benzersiz bir koddur. Bu anahtarı şu şekilde alabilirsiniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>API servis sağlayıcınızın kontrol panelinden (dashboard) bir anahtar oluşturun</li>
              <li>Kendi API'nizi kullanıyorsanız, sunucu yöneticinizden bir API anahtarı talep edin</li>
              <li>API anahtarını güvenli bir yerde saklayın ve başkalarıyla paylaşmayın</li>
              <li>Eğer anahtarınız açığa çıkarsa, hemen yeni bir anahtar oluşturun</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            3. Bağlantı Nasıl Test Edilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API bağlantınızı test etmek için:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>API URL ve API Anahtarınızı yukarıdaki alanlara girin</li>
              <li>"Bağlantıyı Test Et" butonuna tıklayın</li>
              <li>Sistem otomatik olarak API'ye bir test isteği gönderecek ve yanıtı kontrol edecektir</li>
              <li>Bağlantı başarılıysa, yeşil bir "Bağlı" rozeti göreceksiniz</li>
              <li>Hata durumunda, sorunun ne olduğunu bildiren bir hata mesajı görüntülenecektir</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            4. Bağlantı Sorunları ve Çözümleri
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">Sık karşılaşılan bağlantı sorunları ve çözümleri:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">API URL Hatası:</strong> URL'nin doğru formatta olduğundan emin olun (https:// ile başlamalı) ve sonundaki eğik çizgiye (/) dikkat edin.
              </li>
              <li>
                <strong className="text-white">Yetkilendirme Hatası:</strong> API anahtarınızın doğru ve güncel olduğundan emin olun.
              </li>
              <li>
                <strong className="text-white">Zaman Aşımı:</strong> Sunucu yanıt vermiyorsa, internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.
              </li>
              <li>
                <strong className="text-white">CORS Hatası:</strong> API'nizin bu alan adından gelen isteklere izin verdiğinden emin olun.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            5. Bağlantı Sonrası Neler Yapılabilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">Başarılı bağlantı sonrası yapabilecekleriniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hizmetler, projeler, blog yazıları ve diğer içerikleri düzenleyebilirsiniz</li>
              <li>Tüm içerik değişiklikleri otomatik olarak veritabanına kaydedilecektir</li>
              <li>Yeni içerikler ekleyebilir, var olan içerikleri güncelleyebilir veya silebilirsiniz</li>
              <li>İşlemleriniz bittiğinde "Bağlantıyı Kes" butonuna tıklayarak güvenli bir şekilde oturumu sonlandırabilirsiniz</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const DatabaseManager = () => {
  const { 
    config, 
    saveConfig, 
    testConnection, 
    disconnect, 
    isLoading, 
    error 
  } = useDatabaseConnection();
  
  const [activeTab, setActiveTab] = useState('connection');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
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
          </TabsContent>
          
          <TabsContent value="guide" className="m-0">
            <CardContent className="space-y-4 pt-6">
              <ConnectionGuide />
            </CardContent>
          </TabsContent>
        </Tabs>
        
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
              className="bg-ignite hover:bg-ignite-700 border-ignite/50"
              onClick={testConnection}
              disabled={isLoading || !config.apiKey}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Bağlanıyor...' : 'Bağlantıyı Test Et'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Additional support cards for database connection */}
      {!config.isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-400" />
                API Bağlantısı Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                API bağlantısı, web sitenizin içeriklerini dinamik olarak yönetmenizi sağlar. 
                Bağlantı kurulduktan sonra, yaptığınız tüm değişiklikler gerçek zamanlı olarak 
                veritabanına kaydedilir ve web sitenizde görüntülenir.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                Güvenlik Hatırlatması
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                API anahtarınızı güvenli tutmak önemlidir. Bu anahtar, veritabanınıza erişim 
                sağlar. Güvenlik amacıyla, işlemleriniz bittiğinde bağlantıyı kesmeyi unutmayın 
                ve API anahtarınızı kimseyle paylaşmayın.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default DatabaseManager;
