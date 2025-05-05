
import { Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ConnectionGuide = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center">
        <Info className="h-5 w-5 mr-2 text-ignite" /> 
        Veritabanı Bağlantı Rehberi
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            1. API URL'si Nedir ve Nasıl Elde Edilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API URL, web sitenizin veri kaynaklarına erişim sağlayan adrestir. Bu adresi şu şekilde elde edebilirsiniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kendi API'nizi oluşturduysanız, sunucunuzun alan adı ve API yolunu kullanın (örn: https://api.siteniz.com/v1)</li>
              <li>Üçüncü taraf bir API servisi kullanıyorsanız, servis sağlayıcınızın size verdiği URL'yi kullanın</li>
              <li>API URL'si genellikle "https://" ile başlar ve "/v1", "/api" gibi bir yol içerir</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            2. API Anahtarı Nereden Alınır?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API anahtarı, API'ye güvenli erişim sağlayan benzersiz bir koddur. Bu anahtarı şu şekilde alabilirsiniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>API servis sağlayıcınızın kontrol panelinden (dashboard) bir anahtar oluşturun</li>
              <li>Kendi API'nizi kullanıyorsanız, sunucu yöneticinizden bir API anahtarı talep edin</li>
              <li>API anahtarını güvenli bir yerde saklayın ve başkalarıyla paylaşmayın</li>
              <li>Eğer anahtarınız açığa çıkarsa, hemen yeni bir anahtar oluşturun</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            3. Bağlantı Nasıl Test Edilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">API bağlantınızı test etmek için:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>API URL ve API Anahtarınızı yukarıdaki alanlara girin</li>
              <li>"Bağlantıyı Test Et" butonuna tıklayın</li>
              <li>Sistem otomatik olarak API'ye bir test isteği gönderecek ve yanıtı kontrol edecektir</li>
              <li>Bağlantı başarılıysa, yeşil bir "Bağlı" rozeti göreceksiniz</li>
              <li>Hata durumunda, sorunun ne olduğunu bildiren bir hata mesajı görüntülenecektir</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            4. Bağlantı Sorunları ve Çözümleri
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">Sık karşılaşılan bağlantı sorunları ve çözümleri:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">API URL Hatası:</strong> URL'nin doğru formatta olduğundan emin olun (https:// ile başlamalı) ve sonundaki eğik çizgiye (/) dikkat edin.
              </li>
              <li>
                <strong className="text-white">Yetkilendirme Hatası:</strong> API anahtarınızın doğru ve güncel olduğundan emin olun.
              </li>
              <li>
                <strong className="text-white">Zaman Aşımı:</strong> Sunucu yanıt vermiyorsa, internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.
              </li>
              <li>
                <strong className="text-white">CORS Hatası:</strong> API'nizin bu alan adından gelen isteklere izin verdiğinden emin olun.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border-dark-400">
          <AccordionTrigger className="text-white hover:text-ignite">
            5. Bağlantı Sonrası Neler Yapılabilir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            <p className="mb-2">Başarılı bağlantı sonrası yapabilecekleriniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hizmetler, projeler, blog yazıları ve diğer içerikleri düzenleyebilirsiniz</li>
              <li>Tüm içerik değişiklikleri otomatik olarak veritabanına kaydedilecektir</li>
              <li>Yeni içerikler ekleyebilir, var olan içerikleri güncelleyebilir veya silebilirsiniz</li>
              <li>İşlemleriniz bittiğinde "Bağlantıyı Kes" butonuna tıklayarak güvenli bir şekilde oturumu sonlandırabilirsiniz</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ConnectionGuide;
