
import { Info, AlertCircle, Database, Server, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <div className="mt-3 bg-dark-600 p-3 rounded-md">
            <p className="text-xs text-white/60 flex items-start">
              <Server className="h-4 w-4 mr-1 mt-0.5 text-purple-400" />
              <span>
                Yerel geliştirme ortamınızda da aynı veritabanı şemasını kullanabilirsiniz. 
                Bunun için veritabanı yapılandırmasını dışa aktarın.
              </span>
            </p>
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
          <div className="mt-3 flex flex-wrap gap-2">
            {['services', 'projects', 'blog_posts', 'sliders', 'team', 'settings'].map(table => (
              <span key={table} className="px-2 py-1 bg-dark-600 text-white/70 rounded-md text-xs">
                {table}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCards;
