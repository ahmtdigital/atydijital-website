
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, XCircle, Database, Lock, Save, RefreshCw } from 'lucide-react';
import { useMySQLService } from '@/lib/mysql-service';
import { useToast } from '@/hooks/use-toast';

interface ConnectionTabProps {
  config: {
    apiUrl: string;
    apiKey: string;
    isConnected: boolean;
  };
  saveConfig: (newConfig: Partial<{
    apiUrl: string;
    apiKey: string;
    isConnected: boolean;
  }>) => void;
  error: string;
}

const ConnectionTab = ({ config, saveConfig, error }: ConnectionTabProps) => {
  const { testConnection } = useMySQLService();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dbSettings, setDbSettings] = useState({
    host: 'localhost',
    port: '3306',
    database: 'ignite_db',
    user: 'root',
    password: '',
    useSSL: true,
    autoReconnect: true
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleDbSettingsChange = (field: string, value: string | boolean) => {
    setDbSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestDatabaseConnection = async () => {
    setIsLoading(true);
    try {
      // Test the MySQL connection
      const result = await testConnection();
      if (result) {
        saveConfig({ isConnected: true });
        toast({
          title: "Bağlantı Başarılı",
          description: "Veritabanı bağlantısı başarıyla kuruldu.",
        });
      }
    } catch (error) {
      toast({
        title: "Bağlantı Hatası",
        description: "Veritabanı bağlantısı sırasında bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Veritabanı bağlantı ayarları başarıyla kaydedildi.",
      });
      setIsLoading(false);
      
      // API anahtarını kaydet
      saveConfig({
        apiKey: config.apiKey,
        apiUrl: config.apiUrl
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Database className="h-5 w-5 mr-2 text-ignite" />
            Veritabanı Bağlantı Ayarları
          </h3>
          <p className="text-sm text-white/60 mt-1">
            MySQL veritabanı bağlantı bilgilerinizi yapılandırın
          </p>
        </div>
        <Badge className={config.isConnected ? "bg-emerald-600/20 text-emerald-400" : "bg-yellow-600/20 text-yellow-400"}>
          {config.isConnected ? (
            <><CheckCircle className="h-3 w-3 mr-1" /> Bağlı</>
          ) : (
            <><XCircle className="h-3 w-3 mr-1" /> Bağlı Değil</>
          )}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">MySQL Sunucu Adresi</label>
          <Input 
            value={dbSettings.host}
            onChange={(e) => handleDbSettingsChange('host', e.target.value)}
            placeholder="örn. localhost veya mysql.example.com"
            className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
            disabled={config.isConnected}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Port</label>
          <Input 
            value={dbSettings.port}
            onChange={(e) => handleDbSettingsChange('port', e.target.value)}
            placeholder="3306"
            className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
            disabled={config.isConnected}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Veritabanı Adı</label>
          <Input 
            value={dbSettings.database}
            onChange={(e) => handleDbSettingsChange('database', e.target.value)}
            placeholder="örn. ignite_db"
            className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
            disabled={config.isConnected}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Kullanıcı Adı</label>
          <Input 
            value={dbSettings.user}
            onChange={(e) => handleDbSettingsChange('user', e.target.value)}
            placeholder="root"
            className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
            disabled={config.isConnected}
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/80">Şifre</label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              value={dbSettings.password}
              onChange={(e) => handleDbSettingsChange('password', e.target.value)}
              placeholder="Veritabanı şifrenizi girin"
              className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30 pr-10"
              disabled={config.isConnected}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/40 hover:text-white/70 transition-colors"
            >
              <Lock className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2 flex items-center gap-2">
          <div className="flex-grow space-y-1">
            <label className="text-sm font-medium text-white/80">SSL Kullan</label>
            <p className="text-xs text-white/50">Güvenli bağlantı için SSL kullanımı</p>
          </div>
          <Switch
            checked={dbSettings.useSSL}
            onCheckedChange={(checked) => handleDbSettingsChange('useSSL', checked)}
            disabled={config.isConnected}
            className="data-[state=checked]:bg-ignite"
          />
        </div>
        
        <div className="space-y-2 flex items-center gap-2">
          <div className="flex-grow space-y-1">
            <label className="text-sm font-medium text-white/80">Otomatik Yeniden Bağlan</label>
            <p className="text-xs text-white/50">Bağlantı koptuğunda otomatik olarak yeniden bağlan</p>
          </div>
          <Switch
            checked={dbSettings.autoReconnect}
            onCheckedChange={(checked) => handleDbSettingsChange('autoReconnect', checked)}
            disabled={config.isConnected}
            className="data-[state=checked]:bg-ignite"
          />
        </div>
      </div>
      
      <div className="border-t border-dark-400 my-6 pt-6">
        <h3 className="text-lg font-semibold text-white flex items-center mb-4">
          <Database className="h-5 w-5 mr-2 text-ignite" />
          API Yapılandırması
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">API URL</label>
            <Input 
              value={config.apiUrl}
              onChange={(e) => saveConfig({ apiUrl: e.target.value })}
              placeholder="https://api.example.com/v1"
              className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
              disabled={config.isConnected}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">API Anahtarı</label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                value={config.apiKey}
                onChange={(e) => saveConfig({ apiKey: e.target.value })}
                placeholder="API anahtarınızı girin"
                className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
                disabled={config.isConnected}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white/40 hover:text-white/70 transition-colors"
              >
                <Lock className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="glass-effect p-4 rounded-md border border-ignite/20">
        <p className="text-sm text-white/70">
          <span className="font-medium text-white">Önemli:</span> Veri yönetimi işlemleri için API ve MySQL veritabanı bağlantısı gereklidir. 
          Tüm içerik düzenleme işlemleri veritabanına kaydedilir. Veritabanı parametrelerini girip bağlantı testini gerçekleştiriniz.
        </p>
      </div>
      
      <div className="flex justify-end gap-3">
        {config.isConnected ? (
          <Button 
            onClick={() => saveConfig({ isConnected: false })}
            variant="destructive"
            disabled={isLoading}
            className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Bağlantıyı Sıfırla
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleSaveSettings}
              variant="outline"
              disabled={isLoading}
              className="border-dark-300 hover:bg-dark-400"
            >
              <Save className="mr-2 h-4 w-4" />
              Ayarları Kaydet
            </Button>
            
            <Button 
              onClick={handleTestDatabaseConnection}
              className="bg-ignite hover:bg-ignite-700"
              disabled={isLoading || !dbSettings.host || !dbSettings.database || !dbSettings.user}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Bağlanıyor...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Veritabanı Bağlantısını Test Et
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionTab;
