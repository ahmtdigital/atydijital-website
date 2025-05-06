
import { Info, AlertCircle, Database, Server, Settings, Globe, Key, Lock, Cog, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SupportCards = () => {
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
                <Badge key={table} className="px-2 py-1 bg-dark-600 text-white/70 rounded-md text-xs">
                  {table}
                </Badge>
              ))}
            </div>
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
                <Badge className="bg-emerald-600/20 text-emerald-400 mr-2">
                  <CheckCircle className="h-3 w-3 mr-1" /> Aktif
                </Badge>
              </p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className="h-1 bg-emerald-400" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="bg-dark-600 p-4 rounded-md">
              <p className="text-xs text-white/50 mb-1">Son Güncelleme</p>
              <p className="text-lg font-semibold text-sm">05.05.2025</p>
              <div className="h-1 w-full bg-dark-400 mt-2">
                <div className="h-1 bg-yellow-400" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCards;
