
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Server, Shield, FileText, Settings } from 'lucide-react';
import ConnectionTab from './database/ConnectionTab';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import SupportCards from './database/SupportCards';
import ConnectionGuide from './database/ConnectionGuide';

const DatabaseManager = () => {
  const [activeTab, setActiveTab] = useState('connection');
  const [dbError, setDbError] = useState('');
  const [config, setConfig] = useState({
    apiUrl: 'https://api.atydijital.com',
    apiKey: 'sk_live_atydijital_2024_v1',
    isConnected: false
  });
  
  const saveConfig = (newConfig: Partial<typeof config>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6 text-ignite" />
            Veritabanı Yönetimi
          </h2>
          <p className="text-sm text-white/60 mt-1">
            MySQL veritabanı bağlantısını yapılandırın ve veri tablolarını yönetin
          </p>
        </div>
      </div>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="text-white">Veritabanı Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-4 bg-dark-600 rounded-md border border-dark-400">
            <div className={`h-3 w-3 rounded-full ${config.isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="font-medium">{config.isConnected ? 'Bağlantı Aktif' : 'Bağlantı Beklemede'}</span>
            
            {config.isConnected && (
              <Badge className="ml-auto bg-green-700/20 text-green-400">
                Son Güncelleme: Bugün, 15:30
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-dark-600 w-full overflow-auto">
          <TabsTrigger value="connection" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            <Database className="mr-2 h-4 w-4" />
            Bağlantı Ayarları
          </TabsTrigger>
          <TabsTrigger value="tables" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            <Server className="mr-2 h-4 w-4" />
            Tablolar
          </TabsTrigger>
          <TabsTrigger value="backups" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            <Shield className="mr-2 h-4 w-4" />
            Yedekleme
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Log Kayıtları
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
            <Settings className="mr-2 h-4 w-4" />
            Ayarlar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection">
          <ConnectionTab
            config={config}
            saveConfig={saveConfig}
            error={dbError}
          />
        </TabsContent>
        
        <TabsContent value="tables">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white">Veritabanı Tabloları</CardTitle>
            </CardHeader>
            <CardContent>
              {config.isConnected ? (
                <div className="space-y-4">
                  <div className="bg-dark-600 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-dark-400">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Tablo Adı</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Kayıt Sayısı</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Boyut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Son Güncelleme</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="bg-dark-600 divide-y divide-dark-400">
                        {['users', 'posts', 'services', 'projects'].map((table, i) => (
                          <tr key={table} className="hover:bg-dark-500">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{table}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{(i + 1) * 32}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{(i + 1) * 0.5} MB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">2 saat önce</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-white/80 hover:text-white">
                                Görüntüle
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-dark-300 hover:bg-dark-400">
                      Tablo Oluştur
                    </Button>
                    <Button variant="outline" className="border-dark-300 hover:bg-dark-400">
                      SQL Çalıştır
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
                  <AlertDescription>
                    Tabloları görüntülemek için önce veritabanı bağlantısını kurun.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backups">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white">Veritabanı Yedekleme</CardTitle>
            </CardHeader>
            <CardContent>
              {config.isConnected ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-dark-600 rounded-md border border-dark-400">
                    <div>
                      <h3 className="font-medium mb-1">Otomatik Yedekleme</h3>
                      <p className="text-sm text-white/60">Günlük yedekleme aktif</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-700/20 text-green-400">
                        Günlük - 03:00
                      </Badge>
                      <Button size="sm" variant="outline" className="border-dark-300 hover:bg-dark-400">
                        Yapılandır
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-600 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-dark-400">
                      <thead className="bg-dark-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Yedek Adı</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Tarih</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Boyut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="bg-dark-600 divide-y divide-dark-400">
                        {['backup_20240515', 'backup_20240514', 'backup_20240513'].map((backup, i) => (
                          <tr key={backup} className="hover:bg-dark-500">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{backup}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{`15.05.2024 - ${(3-i) * 3}:00`}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{12.5 - i} MB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/80 hover:text-white">
                                  İndir
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/80 hover:text-white">
                                  Geri Yükle
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-ignite hover:bg-ignite-700">
                      Manuel Yedekleme Oluştur
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
                  <AlertDescription>
                    Yedekleme işlemleri için önce veritabanı bağlantısını kurun.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white">Veritabanı Log Kayıtları</CardTitle>
            </CardHeader>
            <CardContent>
              {config.isConnected ? (
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-dark-300 hover:bg-dark-400">
                        Tümü
                      </Button>
                      <Button variant="outline" size="sm" className="border-dark-300 hover:bg-dark-400 bg-dark-300">
                        Hata
                      </Button>
                      <Button variant="outline" size="sm" className="border-dark-300 hover:bg-dark-400">
                        Uyarı
                      </Button>
                      <Button variant="outline" size="sm" className="border-dark-300 hover:bg-dark-400">
                        Bilgi
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="border-dark-300 hover:bg-dark-400">
                      Logları Temizle
                    </Button>
                  </div>
                  
                  <div className="rounded-md border border-dark-400 p-4 bg-dark-800 font-mono text-sm overflow-auto max-h-96 text-white/80">
                    <div className="space-y-2">
                      <div className="text-red-400">[ERROR] 15.05.2024 14:32:18 - Connection to database failed: timeout after 30s</div>
                      <div className="text-yellow-400">[WARN] 15.05.2024 14:32:20 - Retrying connection (attempt 1/3)</div>
                      <div className="text-yellow-400">[WARN] 15.05.2024 14:32:25 - Retrying connection (attempt 2/3)</div>
                      <div className="text-green-400">[INFO] 15.05.2024 14:32:30 - Connection established successfully</div>
                      <div className="text-green-400">[INFO] 15.05.2024 14:35:15 - Query executed: SELECT * FROM users LIMIT 10</div>
                      <div className="text-green-400">[INFO] 15.05.2024 14:36:42 - Query executed: UPDATE posts SET status = 'published' WHERE id = 15</div>
                      <div className="text-yellow-400">[WARN] 15.05.2024 14:40:12 - Query execution time exceeded 2s: SELECT * FROM posts LEFT JOIN users ON posts.user_id = users.id</div>
                      <div className="text-green-400">[INFO] 15.05.2024 14:42:20 - Backup process started</div>
                      <div className="text-green-400">[INFO] 15.05.2024 14:45:32 - Backup process completed successfully: backup_20240515.sql</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-dark-300 hover:bg-dark-400">
                      Dışa Aktar
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
                  <AlertDescription>
                    Log kayıtlarını görüntülemek için önce veritabanı bağlantısını kurun.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white">Veritabanı Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
              {config.isConnected ? (
                <div className="space-y-6 px-2 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-dark-600 border-dark-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Bağlantı Havuzu</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm">Min. Bağlantı</label>
                              <input type="number" className="w-full bg-dark-500 border border-dark-400 rounded-md px-3 py-2 text-white" defaultValue="5" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm">Max. Bağlantı</label>
                              <input type="number" className="w-full bg-dark-500 border border-dark-400 rounded-md px-3 py-2 text-white" defaultValue="20" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm">Zaman Aşımı (saniye)</label>
                            <input type="number" className="w-full bg-dark-500 border border-dark-400 rounded-md px-3 py-2 text-white" defaultValue="30" />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="auto-reconnect" className="rounded bg-dark-800 border-dark-400 text-ignite focus:ring-ignite/30" defaultChecked />
                            <label htmlFor="auto-reconnect" className="text-sm">Otomatik Yeniden Bağlan</label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Güvenlik</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="use-ssl" className="rounded bg-dark-800 border-dark-400 text-ignite focus:ring-ignite/30" defaultChecked />
                            <label htmlFor="use-ssl" className="text-sm">SSL Kullan</label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="encrypt-backup" className="rounded bg-dark-800 border-dark-400 text-ignite focus:ring-ignite/30" defaultChecked />
                            <label htmlFor="encrypt-backup" className="text-sm">Yedeklemeleri Şifrele</label>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm">IP Kısıtlaması</label>
                            <input type="text" className="w-full bg-dark-500 border border-dark-400 rounded-md px-3 py-2 text-white" placeholder="192.168.1.1, 10.0.0.1" />
                            <p className="text-xs text-white/60">Virgülle ayırarak birden fazla IP ekleyebilirsiniz</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" className="border-dark-300 hover:bg-dark-400">
                      İptal
                    </Button>
                    <Button className="bg-ignite hover:bg-ignite-700">
                      Ayarları Kaydet
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert className="bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
                  <AlertDescription>
                    Veritabanı ayarlarını yapılandırmak için önce bağlantı kurun.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <ConnectionGuide />
      </div>
      
      <div className="mt-8">
        <SupportCards />
      </div>
    </div>
  );
};

export default DatabaseManager;
