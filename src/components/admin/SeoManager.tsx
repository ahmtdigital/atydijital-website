
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  Globe, 
  FileText, 
  Code, 
  Sitemap, 
  ArrowUpRight, 
  Save,
  BookOpen,
  CheckSquare,
  Share2,
  ExternalLink,
  Database,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PageSeo {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  indexable: boolean;
  lastUpdated: string;
}

const SeoManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pages");
  const [loading, setLoading] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageSeo | null>(null);
  const [sitemapGenerated, setSitemapGenerated] = useState(true);
  const [robotsTxtContent, setRobotsTxtContent] = useState(
`User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
`);

  // Demo pages data
  const [pages, setPages] = useState<PageSeo[]>([
    {
      id: "1",
      path: "/",
      title: "Ignite Pazarlama | Dijital Pazarlama Ajansı",
      description: "Markanızı dijital dünyada parlatacak stratejiler ve çözümler. Sosyal medya, SEO, içerik pazarlama ve daha fazlası.",
      keywords: "dijital pazarlama, SEO, sosyal medya, içerik pazarlama, web tasarım",
      ogTitle: "Ignite Pazarlama | Dijital Pazarlama Ajansı",
      ogDescription: "Markanızı dijital dünyada parlatacak stratejiler ve çözümler.",
      ogImage: "/images/og-image.jpg",
      canonical: "https://ignitepazarlama.com/",
      indexable: true,
      lastUpdated: "2025-04-10"
    },
    {
      id: "2",
      path: "/hizmetler",
      title: "Hizmetlerimiz | Ignite Pazarlama",
      description: "Markanızı büyütmek için verdiğimiz dijital pazarlama, SEO, sosyal medya ve içerik üretim hizmetleri.",
      keywords: "dijital pazarlama hizmetleri, SEO hizmetleri, sosyal medya yönetimi",
      ogTitle: "Dijital Pazarlama Hizmetleri | Ignite Pazarlama",
      ogDescription: "Markanızı büyütmek için verdiğimiz dijital pazarlama hizmetleri.",
      ogImage: "/images/services-og.jpg",
      canonical: "https://ignitepazarlama.com/hizmetler",
      indexable: true,
      lastUpdated: "2025-04-08"
    },
    {
      id: "3",
      path: "/hakkimizda",
      title: "Hakkımızda | Ignite Pazarlama",
      description: "Ignite Pazarlama olarak kim olduğumuz, vizyonumuz ve markanızı büyütme tutkumuz.",
      keywords: "dijital pazarlama ajansı, ignite pazarlama hakkında, pazarlama ekibi",
      ogTitle: "Hakkımızda | Ignite Pazarlama",
      ogDescription: "Ignite Pazarlama olarak kim olduğumuz, vizyonumuz ve markanızı büyütme tutkumuz.",
      ogImage: "/images/about-og.jpg",
      canonical: "https://ignitepazarlama.com/hakkimizda",
      indexable: true,
      lastUpdated: "2025-04-05"
    }
  ]);

  // Google settings
  const [googleSettings, setGoogleSettings] = useState({
    gaTrackingId: "G-ABC123XYZ",
    gtagEnabled: true,
    searchConsoleVerification: "<meta name=\"google-site-verification\" content=\"ABC123XYZ\" />",
    enhancedEcommerce: false,
    anonymizeIp: true,
    consentMode: true
  });

  const handleEditPage = (page: PageSeo) => {
    setCurrentPage(page);
    setShowEditSheet(true);
  };

  const handleSavePage = () => {
    if (!currentPage) return;
    
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setPages(pages.map(page => 
        page.id === currentPage.id ? currentPage : page
      ));
      
      setShowEditSheet(false);
      setLoading(false);
      
      toast({
        title: "SEO Bilgileri Güncellendi",
        description: `${currentPage.path} sayfası için SEO bilgileri başarıyla güncellendi.`,
      });
    }, 800);
  };

  const handleGenerateSitemap = () => {
    setLoading(true);
    
    // In a real app, this would generate an actual sitemap.xml file
    setTimeout(() => {
      setLoading(false);
      setSitemapGenerated(true);
      
      toast({
        title: "Sitemap.xml Oluşturuldu",
        description: "Sitemap.xml dosyası başarıyla oluşturuldu ve sunucuya yüklendi.",
      });
    }, 1200);
  };

  const handleSaveRobotsTxt = () => {
    setLoading(true);
    
    // In a real app, this would update the robots.txt file
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Robots.txt Güncellendi",
        description: "Robots.txt dosyası başarıyla güncellendi.",
      });
    }, 800);
  };

  const handleSaveGoogleSettings = () => {
    setLoading(true);
    
    // In a real app, this would update the Google settings
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Google Ayarları Güncellendi",
        description: "Google ayarları başarıyla güncellendi.",
      });
    }, 800);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Search className="mr-2 h-6 w-6 text-ignite" />
              SEO Yönetimi
            </h2>
            <p className="text-muted-foreground">
              Sitenizin arama motoru optimizasyonu ayarlarını yönetin
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="pages" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Sayfa SEO
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              Teknik SEO
            </TabsTrigger>
            <TabsTrigger value="google" className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Google Entegrasyonu
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              SEO Analizi
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sayfa SEO Ayarları</CardTitle>
                <CardDescription>
                  Her sayfa için başlık, açıklama ve anahtar kelimeler gibi SEO bilgilerini düzenleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sayfa Yolu</TableHead>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Indexlenebilir</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.path}</TableCell>
                          <TableCell>{page.title}</TableCell>
                          <TableCell>
                            {page.indexable ? 
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <CheckSquare className="mr-1 h-3 w-3" /> Evet
                              </span> : 
                              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                <X className="mr-1 h-3 w-3" /> Hayır
                              </span>
                            }
                          </TableCell>
                          <TableCell>{page.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPage(page)}
                            >
                              Düzenle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical SEO Tab */}
          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Sitemap className="mr-2 h-5 w-5 text-ignite" />
                  Sitemap Yönetimi
                </CardTitle>
                <CardDescription>
                  Web sitenizin sitemap.xml dosyasını oluşturun ve yönetin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Sitemap.xml Durumu</h4>
                      <p className="text-sm text-muted-foreground">
                        {sitemapGenerated ? 
                          "Sitemap.xml dosyası mevcut ve güncel." : 
                          "Sitemap.xml dosyası henüz oluşturulmadı veya güncel değil."}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {sitemapGenerated && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-4 w-4" />
                          Görüntüle
                        </Button>
                      )}
                      <Button 
                        onClick={handleGenerateSitemap}
                        disabled={loading}
                        size="sm"
                      >
                        {loading ? "İşleniyor..." : "Sitemap Oluştur"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Arama Motorlarına Gönder</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1"
                      disabled={!sitemapGenerated}
                    >
                      <Share2 className="h-4 w-4" />
                      Gönder
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Oluşturduğunuz sitemap.xml dosyasını Google, Bing ve Yandex gibi arama motorlarına gönderin.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-ignite" />
                  Robots.txt Yönetimi
                </CardTitle>
                <CardDescription>
                  Arama motoru botlarının sitenizi nasıl tarayacağını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  value={robotsTxtContent}
                  onChange={(e) => setRobotsTxtContent(e.target.value)}
                  className="font-mono text-sm h-52"
                />
                
                <div className="bg-dark-600 p-3 rounded-md text-sm">
                  <p><strong>Not:</strong> Robots.txt düzenlerken dikkatli olun. Yanlış yapılandırma, sitenizin indekslenmesini etkileyebilir.</p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveRobotsTxt}
                    disabled={loading}
                    className="gap-1"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Google Integration Tab */}
          <TabsContent value="google" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Google Search Console</CardTitle>
                <CardDescription>
                  Web sitenizi Google'a doğrulayın ve indeksleme durumunu izleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification">Site Doğrulama Meta Etiketi</Label>
                  <Input 
                    id="verification"
                    value={googleSettings.searchConsoleVerification}
                    onChange={(e) => setGoogleSettings({...googleSettings, searchConsoleVerification: e.target.value})}
                    placeholder='<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />'
                  />
                  <p className="text-sm text-muted-foreground">
                    Google Search Console'dan aldığınız doğrulama meta etiketini buraya yapıştırın.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-md border">
                  <h4 className="font-medium mb-2">Hızlı Bağlantılar</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <ArrowUpRight className="h-4 w-4" />
                      Google Search Console'u Aç
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <ArrowUpRight className="h-4 w-4" />
                      Google Analytics'i Aç
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Google Analytics</CardTitle>
                <CardDescription>
                  Web siteniz için Google Analytics izleme ayarlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gaId">Google Analytics Izleme Kimliği</Label>
                  <Input 
                    id="gaId"
                    value={googleSettings.gaTrackingId}
                    onChange={(e) => setGoogleSettings({...googleSettings, gaTrackingId: e.target.value})}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="gtag">Google Tag Manager</Label>
                      <p className="text-sm text-muted-foreground">
                        Google Tag Manager entegrasyonunu etkinleştirin
                      </p>
                    </div>
                    <Switch 
                      id="gtag"
                      checked={googleSettings.gtagEnabled}
                      onCheckedChange={(checked) => setGoogleSettings({...googleSettings, gtagEnabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ecommerce">Gelişmiş E-Ticaret</Label>
                      <p className="text-sm text-muted-foreground">
                        Gelişmiş e-ticaret izlemeyi etkinleştirin
                      </p>
                    </div>
                    <Switch 
                      id="ecommerce"
                      checked={googleSettings.enhancedEcommerce}
                      onCheckedChange={(checked) => setGoogleSettings({...googleSettings, enhancedEcommerce: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="anonymize">IP Anonimleştirme</Label>
                      <p className="text-sm text-muted-foreground">
                        GDPR uyumluluğu için kullanıcı IP adreslerini anonimleştirin
                      </p>
                    </div>
                    <Switch 
                      id="anonymize"
                      checked={googleSettings.anonymizeIp}
                      onCheckedChange={(checked) => setGoogleSettings({...googleSettings, anonymizeIp: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="consent">Onay Modu</Label>
                      <p className="text-sm text-muted-foreground">
                        Çerez onayı almadan önce veri toplamayı durdurun
                      </p>
                    </div>
                    <Switch 
                      id="consent"
                      checked={googleSettings.consentMode}
                      onCheckedChange={(checked) => setGoogleSettings({...googleSettings, consentMode: checked})}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveGoogleSettings} disabled={loading}>
                    {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Analysis Tab */}
          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">SEO Durum Raporu</CardTitle>
                <CardDescription>
                  Web sitenizin SEO performansını kontrol edin ve iyileştirme önerileri alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4 border">
                      <div className="text-3xl font-bold text-green-500 mb-2">92%</div>
                      <div className="text-sm font-medium">Sayfa Başlıkları</div>
                      <p className="text-sm text-muted-foreground">12/13 sayfa uygun başlık uzunluğuna sahip</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 border">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">78%</div>
                      <div className="text-sm font-medium">Meta Açıklamaları</div>
                      <p className="text-sm text-muted-foreground">10/13 sayfa optimize edilmiş açıklamaya sahip</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 border">
                      <div className="text-3xl font-bold text-red-500 mb-2">65%</div>
                      <div className="text-sm font-medium">İçerik Uzunluğu</div>
                      <p className="text-sm text-muted-foreground">8/13 sayfa yeterli içerik uzunluğuna sahip</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">SEO İyileştirme Önerileri</h4>
                    <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md border border-yellow-200 flex items-start gap-2">
                      <div className="p-1 bg-yellow-100 rounded-full mt-0.5">
                        <AlertDescription className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">"/iletisim" sayfası için meta açıklama eklenmeli</p>
                        <p className="text-xs mt-1">Meta açıklamalar, arama sonuçlarında görüntülenir ve tıklama oranlarını artırabilir.</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md border border-yellow-200 flex items-start gap-2">
                      <div className="p-1 bg-yellow-100 rounded-full mt-0.5">
                        <AlertDescription className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">"/blog/dijital-pazarlama-trendleri" sayfasında içerik çok kısa</p>
                        <p className="text-xs mt-1">Arama motorları için en az 300 kelimelik içerik oluşturmalısınız.</p>
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-800 p-3 rounded-md border border-green-200 flex items-start gap-2">
                      <div className="p-1 bg-green-100 rounded-full mt-0.5">
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tüm sayfalar canonical URL'lere sahip</p>
                        <p className="text-xs mt-1">Canonical URL'ler, içerik tekrarı sorunlarını önlemeye yardımcı olur.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Edit Page Sheet */}
      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="w-full md:max-w-md lg:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>SEO Ayarlarını Düzenle</SheetTitle>
            <SheetDescription>
              {currentPage?.path} sayfası için SEO ayarlarını yapılandırın
            </SheetDescription>
          </SheetHeader>
          
          {currentPage && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Sayfa Başlığı</Label>
                <Input 
                  id="title"
                  value={currentPage.title}
                  onChange={(e) => setCurrentPage({...currentPage, title: e.target.value})}
                  placeholder="Sayfa başlığı girin"
                />
                <p className="text-sm text-muted-foreground flex justify-between">
                  <span>Önerilen: 50-60 karakter</span>
                  <span className={`${currentPage.title.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                    {currentPage.title.length}/60
                  </span>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Meta Açıklama</Label>
                <Textarea 
                  id="description"
                  value={currentPage.description}
                  onChange={(e) => setCurrentPage({...currentPage, description: e.target.value})}
                  placeholder="Sayfa açıklaması girin"
                />
                <p className="text-sm text-muted-foreground flex justify-between">
                  <span>Önerilen: 150-160 karakter</span>
                  <span className={`${currentPage.description.length > 160 ? 'text-red-500' : 'text-green-500'}`}>
                    {currentPage.description.length}/160
                  </span>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Anahtar Kelimeler</Label>
                <Input 
                  id="keywords"
                  value={currentPage.keywords}
                  onChange={(e) => setCurrentPage({...currentPage, keywords: e.target.value})}
                  placeholder="virgülle ayrılmış anahtar kelimeler"
                />
                <p className="text-sm text-muted-foreground">
                  Virgülle ayrılmış anahtar kelimeler girin
                </p>
              </div>
              
              <div className="pt-2 pb-1">
                <h4 className="text-sm font-medium mb-2">Sosyal Medya Meta Etiketleri</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG Başlık</Label>
                  <Input 
                    id="ogTitle"
                    value={currentPage.ogTitle}
                    onChange={(e) => setCurrentPage({...currentPage, ogTitle: e.target.value})}
                    placeholder="Sosyal medya başlığı"
                  />
                </div>
                
                <div className="space-y-2 mt-3">
                  <Label htmlFor="ogDescription">OG Açıklama</Label>
                  <Textarea 
                    id="ogDescription"
                    value={currentPage.ogDescription}
                    onChange={(e) => setCurrentPage({...currentPage, ogDescription: e.target.value})}
                    placeholder="Sosyal medya açıklaması"
                  />
                </div>
                
                <div className="space-y-2 mt-3">
                  <Label htmlFor="ogImage">OG Resim</Label>
                  <Input 
                    id="ogImage"
                    value={currentPage.ogImage}
                    onChange={(e) => setCurrentPage({...currentPage, ogImage: e.target.value})}
                    placeholder="/images/og-image.jpg"
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="canonical">Standart URL (Canonical)</Label>
                <Input 
                  id="canonical"
                  value={currentPage.canonical}
                  onChange={(e) => setCurrentPage({...currentPage, canonical: e.target.value})}
                  placeholder="https://example.com/page"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-3">
                <Switch 
                  id="indexable"
                  checked={currentPage.indexable}
                  onCheckedChange={(checked) => setCurrentPage({...currentPage, indexable: checked})}
                />
                <Label htmlFor="indexable">
                  Arama motorlarında indexlensin
                </Label>
              </div>
            </div>
          )}
          
          <SheetFooter className="pt-4">
            <SheetClose asChild>
              <Button variant="outline">İptal</Button>
            </SheetClose>
            <Button onClick={handleSavePage} disabled={loading}>
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SeoManager;
