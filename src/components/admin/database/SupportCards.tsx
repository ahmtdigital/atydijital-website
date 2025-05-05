
import { Info, AlertCircle } from 'lucide-react';
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCards;
