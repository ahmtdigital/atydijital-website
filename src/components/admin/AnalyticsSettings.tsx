
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Save, Code, BarChart, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('google');
  const [loading, setLoading] = useState(false);
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const [customHeadCode, setCustomHeadCode] = useState('');
  const [customBodyCode, setCustomBodyCode] = useState('');
  
  const handleSave = () => {
    setLoading(true);
    
    // Simulating saving to backend
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Analitik kodları başarıyla kaydedildi.",
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-ignite" /> 
            Analitik Ayarları
          </CardTitle>
          <CardDescription>
            Web sitenize analiz ve takip kodları ekleyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 md:grid-cols-4 bg-dark-600 mb-6">
              <TabsTrigger value="google" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Google Analytics
              </TabsTrigger>
              <TabsTrigger value="facebook" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Facebook Pixel
              </TabsTrigger>
              <TabsTrigger value="head" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Head Kodları
              </TabsTrigger>
              <TabsTrigger value="body" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Body Kodları
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="google" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Analytics Ölçüm ID (G-XXXXXXXX)</label>
                <Input 
                  value={googleAnalyticsId} 
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXXXX" 
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <Alert className="bg-dark-400 border-dark-300">
                <AlertTriangle className="h-4 w-4 text-ignite" />
                <AlertDescription>
                  Google Analytics 4 ölçüm ID'nizi girin. Eski Universal Analytics (UA) kodları desteklenmemektedir.
                </AlertDescription>
              </Alert>
              
              {googleAnalyticsId && (
                <div className="mt-4 p-4 bg-dark-600 rounded-md">
                  <p className="text-sm font-medium mb-2">Önizleme:</p>
                  <code className="text-xs text-gray-400 block">
                    {`<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${googleAnalyticsId}');
</script>`}
                  </code>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="facebook" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Facebook Pixel ID</label>
                <Input 
                  value={facebookPixelId} 
                  onChange={(e) => setFacebookPixelId(e.target.value)}
                  placeholder="XXXXXXXXXXXXXXXXXX" 
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              {facebookPixelId && (
                <div className="mt-4 p-4 bg-dark-600 rounded-md">
                  <p className="text-sm font-medium mb-2">Önizleme:</p>
                  <code className="text-xs text-gray-400 block">
                    {`<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${facebookPixelId}');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none" 
       src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"/>
</noscript>`}
                  </code>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="head" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Custom Head Kodları
                  </div>
                </label>
                <Textarea 
                  value={customHeadCode} 
                  onChange={(e) => setCustomHeadCode(e.target.value)}
                  placeholder="<!-- Head bölümüne eklenecek özel kodlar -->" 
                  className="bg-dark-400 border-dark-300 h-40 font-mono text-sm"
                />
              </div>
              <Alert className="bg-dark-400 border-dark-300">
                <AlertDescription>
                  Bu kodlar HTML belgesinin <code>&lt;head&gt;</code> bölümüne eklenecektir. Meta etiketleri, stil dosyaları ve diğer analiz kodları için uygundur.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="body" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Custom Body Kodları
                  </div>
                </label>
                <Textarea 
                  value={customBodyCode} 
                  onChange={(e) => setCustomBodyCode(e.target.value)}
                  placeholder="<!-- Body bölümünün sonuna eklenecek özel kodlar -->" 
                  className="bg-dark-400 border-dark-300 h-40 font-mono text-sm"
                />
              </div>
              <Alert className="bg-dark-400 border-dark-300">
                <AlertDescription>
                  Bu kodlar HTML belgesinin <code>&lt;body&gt;</code> etiketinin sonuna eklenecektir. JavaScript kodları, chat widgetları ve diğer eklentiler için uygundur.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            className="bg-ignite hover:bg-ignite-700" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Kaydediliyor...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Kaydet
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnalyticsSettings;
