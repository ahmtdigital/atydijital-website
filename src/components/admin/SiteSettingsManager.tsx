
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SiteSettings from '@/components/admin/SiteSettings';
import { Database, Globe, Palette } from 'lucide-react';

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Site Yönetimi</h2>
          <p className="text-sm text-white/60 mt-1">Web sitenizin tüm ayarlarını buradan yönetin</p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 shadow-lg overflow-hidden">
        <CardHeader className="bg-dark-600 border-b border-dark-400">
          <CardTitle className="flex items-center text-xl">
            <Palette className="mr-2 h-5 w-5 text-ignite" />
            Site Ayarları Yönetimi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="appearance" className="w-full">
            <div className="flex justify-between items-center p-6">
              <TabsList className="bg-dark-600">
                <TabsTrigger value="appearance">
                  <Palette className="mr-2 h-4 w-4" />
                  Görünüm ve İçerik
                </TabsTrigger>
                <TabsTrigger value="database">
                  <Database className="mr-2 h-4 w-4" />
                  Veritabanı
                </TabsTrigger>
                <TabsTrigger value="general">
                  <Globe className="mr-2 h-4 w-4" />
                  Genel Ayarlar
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="appearance" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SiteSettings />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="database" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SiteSettings />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="general" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SiteSettings />
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
