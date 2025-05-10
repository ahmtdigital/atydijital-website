
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Download, Settings } from 'lucide-react';
import SiteColorsManager from './SiteColorsManager';
import ContentSectionsManager from './ContentSectionsManager';
import SectionContentManager from './SectionContentManager';
import SmtpSettings from './SmtpSettings';

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');

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
            <Settings className="mr-2 h-6 w-6 text-ignite" />
            Site Ayarları
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Sitenizin görünümünü ve içeriğini buradan özelleştirebilirsiniz
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-dark-600 border border-dark-400 text-white hover:bg-dark-500 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // In a real app, this would download a JSON backup of site settings
              alert('Site ayarları indiriliyor...');
            }}
          >
            <Download className="h-4 w-4" />
            Ayarları Yedekle
          </a>
        </motion.div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-dark-600 mb-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            Genel Ayarlar
          </TabsTrigger>
          <TabsTrigger value="colors" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            Renkler
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            Bölüm İçerikleri
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            E-posta Ayarları
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white">Genel Site Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="mt-6">
          <SiteColorsManager />
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <ContentSectionsManager />
          <div className="mt-6">
            <SectionContentManager />
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="mt-6">
          <SmtpSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SiteSettingsManager;
