
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Download, Settings, PaintBucket, FileText, Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import SiteColorsManager from './SiteColorsManager';
import ContentSectionsManager from './ContentSectionsManager';
import SectionContentManager from './SectionContentManager';
import SmtpSettings from './SmtpSettings';
import SocialMediaSettings from './SocialMediaSettings';
import SeoSettingsPanel from './SeoSettingsPanel';
import LiveChatSettings from './LiveChatSettings';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleBackupSettings = () => {
    // Generate settings data as JSON
    const settings = {
      general: { /* Site general settings */ },
      colors: { /* Site color settings */ },
      content: { /* Site content settings */ },
      email: { /* Email settings */ },
      // Add timestamp
      timestamp: new Date().toISOString()
    };

    // Convert to JSON and create download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `site-settings-backup-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "Yedekleme Başarılı",
      description: "Site ayarları başarıyla indirildi.",
    });
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
              handleBackupSettings();
            }}
          >
            <Download className="h-4 w-4" />
            Ayarları Yedekle
          </a>
        </motion.div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-dark-600 mb-4 w-full overflow-x-auto flex-wrap">
          <TabsTrigger value="general" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            Genel Ayarlar
          </TabsTrigger>
          <TabsTrigger value="colors" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <PaintBucket className="h-4 w-4" />
            Renkler
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            Bölüm İçerikleri
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            E-posta Ayarları
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Share2 className="h-4 w-4" />
            Sosyal Medya
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            SEO Ayarları
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            Canlı Destek
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
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
        
        <TabsContent value="social" className="mt-6">
          <SocialMediaSettings />
        </TabsContent>
        
        <TabsContent value="seo" className="mt-6">
          <SeoSettingsPanel />
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <LiveChatSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SiteSettingsManager;
