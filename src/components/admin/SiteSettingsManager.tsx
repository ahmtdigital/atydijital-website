
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Globe, Palette, Server, Boxes } from 'lucide-react';
import { useDataService } from '@/lib/db';
import { Alert, AlertDescription } from "@/components/ui/alert";

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { items: settings } = useDataService('siteSettings', []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Yönetimi</h2>
          <p className="text-sm text-white/60 mt-1">Web sitenizin temel ayarlarını buradan yönetin</p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 shadow-lg overflow-hidden">
        <CardHeader className="bg-dark-600 border-b border-dark-400">
          <CardTitle className="flex items-center text-xl text-white">
            <Palette className="mr-2 h-5 w-5 text-ignite" />
            Site Ayarları Yönetimi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex items-center p-6 overflow-x-auto">
              <TabsList className="bg-dark-600">
                <TabsTrigger value="general" className="text-white">
                  <Globe className="mr-2 h-4 w-4" />
                  Genel Ayarlar
                </TabsTrigger>
                <TabsTrigger value="backups" className="text-white">
                  <Server className="mr-2 h-4 w-4" />
                  Yedekleme
                </TabsTrigger>
                <TabsTrigger value="structure" className="text-white">
                  <Boxes className="mr-2 h-4 w-4" />
                  İçerik Yapısı
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="general" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <GeneralSettings />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="backups" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <Alert className="bg-dark-600 border-ignite/30">
                    <AlertDescription className="text-white">
                      Veritabanı yedekleme özelliği yakında eklenecektir. Bu özellik sayesinde sitenizin 
                      içeriklerini ve ayarlarını düzenli olarak yedekleyebileceksiniz.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-dark-600 border-dark-400 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center text-white">
                          <Server className="h-4 w-4 mr-2 text-ignite" /> Manuel Yedekleme
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white/70">
                          Sitenizin tüm içeriklerini ve ayarlarını manuel olarak yedekleyebilirsiniz. 
                          Yedek dosyası indirilebilir bir JSON formatında oluşturulacaktır.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center text-white">
                          <Server className="h-4 w-4 mr-2 text-ignite" /> Otomatik Yedekleme
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white/70">
                          Sitenizin içeriklerini ve ayarlarını belirli aralıklarla otomatik olarak 
                          yedekleyebilirsiniz. Yedekler güvenli bir şekilde saklanacaktır.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="structure" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <p className="text-sm text-white/70 mb-4">
                    İçerik yapınızı özelleştirin ve web sitenizin organizasyonunu düzenleyin. 
                    Özel içerik tipleri ekleyebilir ve mevcut yapıyı değiştirebilirsiniz.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-ignite/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-ignite" />
                          </div>
                          Hizmetler
                        </h3>
                        <p className="text-sm text-white/70">
                          Hizmet içerik tipi: başlık, açıklama, ikon, bağlantı
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-blue-400" />
                          </div>
                          Projeler
                        </h3>
                        <p className="text-sm text-white/70">
                          Proje içerik tipi: başlık, açıklama, resim, kategori, etiketler
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-purple-500/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-purple-400" />
                          </div>
                          Blog Yazıları
                        </h3>
                        <p className="text-sm text-white/70">
                          Blog içerik tipi: başlık, içerik, yazar, tarih, kategori
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
