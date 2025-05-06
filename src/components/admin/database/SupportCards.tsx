
import { Info, AlertCircle, Database, Server, Settings, Globe, Key, Lock, Cog, Shield, CheckCircle, AlertTriangle, Code, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const SupportCards = () => {
  const { toast } = useToast();
  const [databaseStatus, setDatabaseStatus] = useState({
    isConnected: false,
    connectionAttempts: 0,
    lastCheck: new Date().toISOString()
  });
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Simulated database check
  const checkDatabaseStatus = () => {
    setIsCheckingStatus(true);
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setDatabaseStatus(prev => ({
        isConnected: success,
        connectionAttempts: prev.connectionAttempts + 1,
        lastCheck: new Date().toISOString()
      }));
      
      toast({
        title: success ? "Bağlantı Başarılı" : "Bağlantı Hatası",
        description: success 
          ? "Veritabanına başarıyla bağlandı. Tüm servisler aktif." 
          : "Veritabanı bağlantısı kurulamadı. Lütfen yapılandırma ayarlarını kontrol edin.",
        variant: success ? "default" : "destructive",
      });
      
      setIsCheckingStatus(false);
    }, 1500);
  };

  return (
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
          <div className="mt-3 p-3 bg-dark-600 rounded-md">
            <p className="text-xs text-white/60">
              <span className="font-medium text-blue-400">İpucu:</span> Veritabanı 
              ayarlarınızı yapılandırdıktan sonra, içerik yönetimi sayfalarındaki 
              tüm değişiklikler otomatik olarak veritabanına kaydedilecektir.
            </p>
          </div>
          <div className="mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              onClick={checkDatabaseStatus}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></span>
                  Bağlantı Kontrol Ediliyor...
                </>
              ) : (
                <>
                  <Server className="mr-2 h-4 w-4" />
                  Bağlantıyı Kontrol Et
                </>
              )}
            </Button>
          </div>
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
          <div className="mt-3 p-3 bg-dark-600 rounded-md text-sm">
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Güçlü ve karmaşık API anahtarları kullanın</li>
              <li>Anahtarlarınızı düzenli olarak değiştirin</li>
              <li>Yetkisiz erişimleri hemen engelleyin</li>
            </ul>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span>Güvenlik Durumu</span>
              <span className="text-green-400">İyi</span>
            </div>
            <Progress value={85} className="h-1.5 bg-dark-400" indicatorClassName="bg-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-400" />
            MySQL Veritabanı Bağlantısı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/70">
            MySQL veritabanı bağlantısı kurulduğunda, site içeriğinizi dinamik olarak 
            yönetebilirsiniz. Hizmetler, projeler, blog yazıları ve diğer tüm içerikleriniz 
            veritabanından çekilir ve güncellemeleriniz anında yansıtılır.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="bg-dark-600 p-3 rounded-md">
              <p className="text-xs text-white/60 flex items-start">
                <Server className="h-4 w-4 mr-1 mt-0.5 text-purple-400" />
                <span>
                  Yerel geliştirme ortamınızda da aynı veritabanı şemasını kullanabilirsiniz. 
                  Bunun için veritabanı yapılandırmasını dışa aktarın.
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-dark-600 text-white/70">
                <Globe className="h-3 w-3 mr-1" /> Uzak Sunucu
              </Badge>
              <Badge className="bg-dark-600 text-white/70">
                <Lock className="h-3 w-3 mr-1" /> SSL Güvenliği
              </Badge>
              <Badge className="bg-dark-600 text-white/70">
                <Key className="h-3 w-3 mr-1" /> API Anahtarı
              </Badge>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <Code className="mr-2 h-4 w-4" /> Tablo Yapısını Al
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <Database className="mr-2 h-4 w-4" /> Tabloları Senkronize Et
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Settings className="h-5 w-5 mr-2 text-ignite" />
            İçerik Tabloları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/70">
            Veritabanınız şu içerik tablolarını içerir: Hizmetler, Projeler, Blog Yazıları, 
            Slaytlar, Takım Üyeleri ve Site Ayarları. Her tablo için CRUD işlemlerini admin 
            panelinden gerçekleştirebilirsiniz.
          </p>
          <div className="mt-3">
            <div className="bg-dark-600 p-3 rounded-md mb-2">
              <h4 className="text-sm font-medium text-white/80 mb-2 flex items-center">
                <Cog className="h-4 w-4 mr-1 text-ignite" /> Veri Yapısı
              </h4>
              <div className="text-xs text-white/60 space-y-1">
                <p className="flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-green-400" /> 
                  Veritabanı yapısı, içerik eklemeleri ve güncellemeleri için hazır durumdadır.
                </p>
                <p className="flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-green-400" /> 
                  İçerik tablolarında ilişkisel veritabanı yapısı kullanılmaktadır.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['services', 'projects', 'blog_posts', 'sliders', 'team', 'settings', 'pages', 'media', 'users', 'roles'].map(table => (
                <Badge 
                  key={table} 
                  className="px-2 py-1 bg-dark-600 text-white/70 rounded-md text-xs cursor-pointer hover:bg-dark-400 transition-colors"
                  onClick={() => toast({
                    title: `${table.charAt(0).toUpperCase() + table.slice(1)} Tablosu`,
                    description: "Bu tablo seçildi. Veri modelleri yükleniyor...",
                  })}
                >
                  {table}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <Button 
              size="sm" 
              className="w-full bg-ignite hover:bg-ignite-700 text-white"
              onClick={() => {
                toast({
                  title: "İçerik Şeması Yükleniyor",
                  description: "Veritabanı şeması başarıyla yüklendi.",
                });
              }}
            >
              <BookOpen className="mr-2 h-4 w-4" /> İçerik Şemasını Görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="h-5 w-5 mr-2 text-ignite" />
            Veritabanı İstatistikleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-dark-600 p-4 rounded-md">
              <p className="text-xs text-white/50 mb-1">Toplam Tablo</p>
              <p className="text-lg font-semibold">10</p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className="h-1 bg-ignite" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="bg-dark-600 p-4 rounded-md">
              <p className="text-xs text-white/50 mb-1">Toplam Kayıt</p>
              <p className="text-lg font-semibold">256</p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className="h-1 bg-blue-400" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="bg-dark-600 p-4 rounded-md">
              <p className="text-xs text-white/50 mb-1">Bağlantı Durumu</p>
              <p className="text-lg font-semibold flex items-center">
                <Badge className={databaseStatus.isConnected ? "bg-emerald-600/20 text-emerald-400 mr-2" : "bg-red-600/20 text-red-400 mr-2"}>
                  {databaseStatus.isConnected ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Aktif</>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 mr-1" /> Pasif</>
                  )}
                </Badge>
              </p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className={`h-1 ${databaseStatus.isConnected ? "bg-emerald-400" : "bg-red-400"}`} style={{ width: databaseStatus.isConnected ? '100%' : '30%' }}></div>
              </div>
            </div>
            
            <div className="bg-dark-600 p-4 rounded-md">
              <p className="text-xs text-white/50 mb-1">Son Güncelleme</p>
              <p className="text-lg font-semibold text-sm">{new Date().toLocaleDateString()}</p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className="h-1 bg-yellow-400" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-dark-600 rounded-md p-4 border border-dark-400">
            <h4 className="text-sm font-medium text-white/80 mb-2">Bağlantı Geçmişi</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Son kontrol</span>
                <span>{new Date(databaseStatus.lastCheck).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Bağlantı denemeleri</span>
                <span>{databaseStatus.connectionAttempts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">API versiyonu</span>
                <span>v2.5.1</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCards;
