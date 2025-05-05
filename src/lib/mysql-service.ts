
import { useDataService } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

// MySQL bağlantı bilgileri için tip tanımı
export interface MySQLConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

// İçerik türleri için tip tanımları
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  isActive: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
  isActive: boolean;
}

export interface SliderItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  isActive: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  isActive: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  logoUrl: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  // Database settings
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

// MySQL bağlantısını yönetecek servis
export const useMySQLService = () => {
  const { toast } = useToast();
  const { items: siteSettings } = useDataService('siteSettings', []);
  
  // Site ayarlarından MySQL bağlantı bilgilerini al
  const getConnectionConfig = (): MySQLConnection => {
    if (siteSettings && siteSettings.length > 0) {
      const settings = siteSettings[0];
      return {
        host: settings.dbHost || 'localhost',
        port: settings.dbPort || 3306,
        database: settings.dbName || 'ignite_db',
        user: settings.dbUser || 'root',
        password: settings.dbPassword || '',
      };
    }
    
    // Varsayılan bağlantı bilgileri
    return {
      host: 'localhost',
      port: 3306,
      database: 'ignite_db',
      user: 'root',
      password: '',
    };
  };
  
  // Bağlantıyı test et
  const testConnection = async (): Promise<boolean> => {
    try {
      const config = getConnectionConfig();
      
      // Bu kısım gerçek bir uygulamada backend API çağrısı olacaktır
      // Şu anda simüle ediyoruz
      
      // Simüle edilen gecikme ve rastgele başarı/başarısızlık
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        toast({
          title: "Bağlantı Başarılı",
          description: `${config.host}:${config.port} üzerindeki ${config.database} veritabanına başarıyla bağlandı.`,
        });
        return true;
      } else {
        toast({
          title: "Bağlantı Hatası",
          description: "Veritabanına bağlanırken bir hata oluştu. Lütfen bağlantı bilgilerini kontrol edin.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Bağlantı Hatası",
        description: "Beklenmeyen bir hata oluştu: " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
      return false;
    }
  };
  
  // İçerik türlerine göre sorgu fonksiyonları
  const getServices = async (): Promise<ServiceItem[]> => {
    try {
      // Simüle edilen gecikme
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        { id: '1', title: 'Dijital Pazarlama', description: 'Stratejik kampanyalarla çoklu dijital kanallar üzerinden ölçülebilir sonuçlar elde edin.', icon: 'BarChart', link: '/services/dijital-pazarlama', isActive: true },
        { id: '2', title: 'SEO Optimizasyonu', description: 'Veri odaklı SEO stratejileriyle görünürlüğünüzü artırın, sıralamaları yükseltin ve trafiği artırın.', icon: 'Globe', link: '/services/seo', isActive: true },
        { id: '3', title: 'Sosyal Medya Yönetimi', description: 'Topluluklar oluşturan ve marka varlığınızı güçlendiren etkileşimli sosyal medya stratejileri.', icon: 'TrendingUp', link: '/services/sosyal-medya', isActive: true },
        { id: '4', title: 'İçerik Üretimi', description: 'Marka hikayenizi anlatan ve hedef kitlenizle bağlantı kuran etkileyici içerikler.', icon: 'PenTool', link: '/services/icerik-uretimi', isActive: true },
        { id: '5', title: 'Mobil Pazarlama', description: 'Hedefli mobil pazarlama ve uygulama tanıtım stratejileriyle müşterilere her yerde ulaşın.', icon: 'Smartphone', link: '/services/mobil-pazarlama', isActive: true },
        { id: '6', title: 'Web Geliştirme', description: 'Ziyaretçileri müşterilere dönüştürmek için özel, duyarlı web siteleri ve uygulamalar.', icon: 'Code', link: '/services/web-gelistirme', isActive: true },
      ];
    } catch (error) {
      console.error('Hizmetleri getirirken hata oluştu:', error);
      toast({
        title: "Sorgu Hatası",
        description: "Hizmet bilgileri alınırken bir hata oluştu.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const getProjects = async (): Promise<ProjectItem[]> => {
    try {
      // Simüle edilen gecikme
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        { 
          id: '1', 
          title: 'E-Ticaret Dönüşümü', 
          description: 'Bir kozmetik markasının çevrimiçi satışlarını artırmak için tam kapsamlı dijital pazarlama stratejisi.', 
          image: '/images/projects/ecommerce.jpg', 
          category: 'E-Ticaret', 
          tags: ['SEO', 'Sosyal Medya', 'Google Ads'], 
          link: '/projects/e-ticaret-donusumu', 
          isActive: true 
        },
        { 
          id: '2', 
          title: 'B2B Pazarlama Otomasyonu', 
          description: 'Bir yazılım şirketinin lead oluşturma ve dönüşüm süreçlerini otomatikleştirmek için pazarlama otomasyonu projesi.', 
          image: '/images/projects/b2b.jpg', 
          category: 'B2B', 
          tags: ['Email Marketing', 'CRM', 'İçerik Pazarlama'], 
          link: '/projects/b2b-pazarlama-otomasyonu', 
          isActive: true 
        },
        // Diğer projeler...
      ];
    } catch (error) {
      console.error('Projeleri getirirken hata oluştu:', error);
      toast({
        title: "Sorgu Hatası",
        description: "Proje bilgileri alınırken bir hata oluştu.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const getSliders = async (): Promise<SliderItem[]> => {
    try {
      // Simüle edilen gecikme
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        { 
          id: '1', 
          title: 'Dijital Dünyada Markanızı Parlatın', 
          description: 'SEO, sosyal medya ve içerik stratejileri ile işletmenizi bir sonraki seviyeye taşıyın.', 
          buttonText: 'Hizmetleri Keşfedin', 
          buttonLink: '/services', 
          image: '/images/slider/digital-marketing.jpg', 
          isActive: true 
        },
        { 
          id: '2', 
          title: 'Dönüşüm Odaklı Web Çözümleri', 
          description: 'Kullanıcıları müşterilere dönüştüren, modern ve duyarlı web siteleri tasarlıyoruz.', 
          buttonText: 'Projelerimizi Görün', 
          buttonLink: '/portfolio', 
          image: '/images/slider/web-design.jpg', 
          isActive: true 
        },
        // Diğer slider öğeleri...
      ];
    } catch (error) {
      console.error('Slider öğelerini getirirken hata oluştu:', error);
      toast({
        title: "Sorgu Hatası",
        description: "Slider bilgileri alınırken bir hata oluştu.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const getBlogPosts = async (): Promise<BlogItem[]> => {
    try {
      // Simüle edilen gecikme
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        { 
          id: '1', 
          title: '2023 Dijital Pazarlama Trendleri', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', 
          excerpt: '2023 yılında dijital pazarlamada öne çıkacak trendler ve stratejiler.', 
          author: 'Ahmet Yılmaz', 
          date: '2023-03-15', 
          image: '/images/blog/digital-trends.jpg', 
          category: 'Dijital Pazarlama', 
          tags: ['SEO', 'Sosyal Medya', 'İçerik Pazarlama'], 
          isActive: true 
        },
        { 
          id: '2', 
          title: 'SEO İçin İçerik Optimizasyonu', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', 
          excerpt: 'Arama motorlarında üst sıralarda yer almak için içerik optimizasyonu ipuçları.', 
          author: 'Ayşe Kaya', 
          date: '2023-02-28', 
          image: '/images/blog/seo-content.jpg', 
          category: 'SEO', 
          tags: ['İçerik Stratejisi', 'Anahtar Kelimeler', 'Teknik SEO'], 
          isActive: true 
        },
        // Diğer blog yazıları...
      ];
    } catch (error) {
      console.error('Blog yazılarını getirirken hata oluştu:', error);
      toast({
        title: "Sorgu Hatası",
        description: "Blog yazıları alınırken bir hata oluştu.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  // Veritabanı sorgularını çalıştıracak genel fonksiyon
  const query = async (sql: string, params: any[] = []): Promise<any> => {
    try {
      // Bu kısım gerçek bir uygulamada backend API çağrısı olacaktır
      // Şu anda simüle ediyoruz
      
      // Simüle edilen gecikme
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sorgu türüne göre farklı simüle edilmiş yanıtlar
      if (sql.toLowerCase().includes('select')) {
        if (sql.toLowerCase().includes('services')) {
          return {
            success: true,
            data: await getServices()
          };
        } else if (sql.toLowerCase().includes('projects')) {
          return {
            success: true,
            data: await getProjects()
          };
        } else if (sql.toLowerCase().includes('sliders')) {
          return {
            success: true,
            data: await getSliders()
          };
        } else if (sql.toLowerCase().includes('blog')) {
          return {
            success: true,
            data: await getBlogPosts()
          };
        }
        
        // Genel SELECT sorgusu için varsayılan veri
        return {
          success: true,
          data: [
            { id: 1, name: 'Test Verisi 1', description: 'Açıklama 1' },
            { id: 2, name: 'Test Verisi 2', description: 'Açıklama 2' },
            { id: 3, name: 'Test Verisi 3', description: 'Açıklama 3' },
          ]
        };
      } else if (sql.toLowerCase().includes('insert')) {
        // INSERT sorgusu için sonuç döndür
        return {
          success: true,
          insertId: Math.floor(Math.random() * 1000),
          affectedRows: 1
        };
      } else if (sql.toLowerCase().includes('update')) {
        // UPDATE sorgusu için sonuç döndür
        return {
          success: true,
          affectedRows: Math.floor(Math.random() * 5) + 1
        };
      } else if (sql.toLowerCase().includes('delete')) {
        // DELETE sorgusu için sonuç döndür
        return {
          success: true,
          affectedRows: Math.floor(Math.random() * 3) + 1
        };
      }
      
      // Diğer sorgular için genel sonuç
      return { success: true, result: 'Sorgu çalıştırıldı' };
    } catch (error) {
      console.error('MySQL sorgu hatası:', error);
      toast({
        title: "Sorgu Hatası",
        description: "Veritabanı sorgusu çalıştırılırken bir hata oluştu.",
        variant: "destructive",
      });
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  };
  
  // İçerik yönetimi için CRUD fonksiyonları
  const createItem = async (table: string, data: any): Promise<any> => {
    return await query(`INSERT INTO ${table} SET ?`, [data]);
  };
  
  const updateItem = async (table: string, id: string | number, data: any): Promise<any> => {
    return await query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id]);
  };
  
  const deleteItem = async (table: string, id: string | number): Promise<any> => {
    return await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  };
  
  const getItemById = async (table: string, id: string | number): Promise<any> => {
    const result = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return result.success && result.data.length > 0 ? result.data[0] : null;
  };
  
  const getAllItems = async (table: string): Promise<any[]> => {
    const result = await query(`SELECT * FROM ${table}`, []);
    return result.success ? result.data : [];
  };
  
  return {
    getConnectionConfig,
    testConnection,
    query,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    getAllItems,
    getServices,
    getProjects,
    getSliders,
    getBlogPosts
  };
};
