
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketingIcon from '@/components/ui/marketing-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample traffic data
const websiteTrafficData = [
  { name: 'Oca', users: 1203, pageViews: 4560, sessions: 1850 },
  { name: 'Şub', users: 1350, pageViews: 5200, sessions: 2100 },
  { name: 'Mar', users: 1456, pageViews: 5800, sessions: 2300 },
  { name: 'Nis', users: 1780, pageViews: 6700, sessions: 2650 },
  { name: 'May', users: 2100, pageViews: 7800, sessions: 3100 },
  { name: 'Haz', users: 2450, pageViews: 8900, sessions: 3600 },
  { name: 'Tem', users: 2850, pageViews: 10200, sessions: 4100 },
];

// Sample traffic source data
const trafficSourceData = [
  { name: 'Google Organik', value: 35, color: '#4285F4' },
  { name: 'Google Ads', value: 20, color: '#FBBC05' },
  { name: 'Meta Ads', value: 15, color: '#3b5998' },
  { name: 'Tiktok Ads', value: 10, color: '#000000' },
  { name: 'LinkedIn Ads', value: 8, color: '#0077B5' },
  { name: 'Doğrudan', value: 12, color: '#34A853' },
];

// Sample page visit data
const pageVisitsData = [
  { name: 'Ana Sayfa', views: 4350, percentage: 28 },
  { name: 'Hizmetler', views: 3250, percentage: 21 },
  { name: 'Hakkımızda', views: 2150, percentage: 14 },
  { name: 'Portföy', views: 2750, percentage: 18 },
  { name: 'Blog', views: 1850, percentage: 12 },
  { name: 'İletişim', views: 1050, percentage: 7 },
];

// Sample device data
const deviceData = [
  { name: 'Mobil', value: 68, color: '#FF6B00' },
  { name: 'Masaüstü', value: 26, color: '#3b5998' },
  { name: 'Tablet', value: 6, color: '#34A853' },
];

const MarketingDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Google Analytics Gösterge Paneli</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] bg-dark-500 border-dark-400">
            <SelectValue placeholder="Zaman aralığı" />
          </SelectTrigger>
          <SelectContent className="bg-dark-500 border-dark-400">
            <SelectItem value="week">Son 7 Gün</SelectItem>
            <SelectItem value="month">Son 30 Gün</SelectItem>
            <SelectItem value="quarter">Son 3 Ay</SelectItem>
            <SelectItem value="year">Son 1 Yıl</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto bg-dark-500 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="traffic" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Trafik Kaynakları
          </TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Sayfa Analizi
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Toplam Ziyaretçi</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-ignite">15,842</div>
                <p className="text-sm text-green-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  24% artış
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sayfa Görüntüleme</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-ignite">48,325</div>
                <p className="text-sm text-green-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  18% artış
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ortalama Oturum Süresi</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-ignite">3:42</div>
                <p className="text-sm text-green-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  12% artış
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hemen Çıkma Oranı</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-ignite">38%</div>
                <p className="text-sm text-red-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1 rotate-180">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  3% artış
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Site Trafiği</CardTitle>
              <CardDescription>Son 7 ayın kullanıcı, sayfa görüntüleme ve oturum verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={websiteTrafficData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", border: "none", borderRadius: "8px" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Line type="monotone" dataKey="users" name="Kullanıcılar" stroke="#FF6B00" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="pageViews" name="Sayfa Görüntüleme" stroke="#4285F4" strokeWidth={2} />
                    <Line type="monotone" dataKey="sessions" name="Oturumlar" stroke="#34A853" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader>
                <CardTitle>Cihaz Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#222", border: "none", borderRadius: "8px" }}
                        formatter={(value: any) => [`${value}%`, 'Oran']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader>
                <CardTitle>Coğrafi Dağılım</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Türkiye</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-dark-400 h-2 rounded-full">
                    <div className="bg-ignite h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Almanya</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-dark-400 h-2 rounded-full">
                    <div className="bg-ignite h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>ABD</span>
                    <span>8%</span>
                  </div>
                  <div className="w-full bg-dark-400 h-2 rounded-full">
                    <div className="bg-ignite h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>İngiltere</span>
                    <span>5%</span>
                  </div>
                  <div className="w-full bg-dark-400 h-2 rounded-full">
                    <div className="bg-ignite h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Diğer</span>
                    <span>7%</span>
                  </div>
                  <div className="w-full bg-dark-400 h-2 rounded-full">
                    <div className="bg-ignite h-2 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Traffic Sources Tab */}
        <TabsContent value="traffic" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-dark-500 border-dark-400 lg:col-span-2">
              <CardHeader>
                <CardTitle>Trafik Kaynakları Dağılımı</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", border: "none", borderRadius: "8px" }}
                      formatter={(value: any) => [`${value}%`, 'Oran']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {trafficSourceData.map((source, index) => (
                <Card key={index} className="bg-dark-500 border-dark-400">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-8 w-8" style={{ color: source.color }}>
                      <MarketingIcon name={source.name.toLowerCase().includes('google') ? 'google-analytics' : 
                                           source.name.toLowerCase().includes('meta') ? 'meta-ads' :
                                           source.name.toLowerCase().includes('linkedin') ? 'linkedin-ads' :
                                           source.name.toLowerCase().includes('tiktok') ? 'tiktok-ads' : 'default'} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{source.name}</p>
                      <div className="w-full bg-dark-400 h-2 rounded-full mt-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ width: `${source.value}%`, backgroundColor: source.color }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{source.value}%</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Yönlendiren Siteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>google.com</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>facebook.com</span>
                  <span>18%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>linkedin.com</span>
                  <span>12%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>instagram.com</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>twitter.com</span>
                  <span>8%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Diğer</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full">
                  <div className="bg-ignite h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Page Analysis Tab */}
        <TabsContent value="pages" className="space-y-6 pt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>En Çok Ziyaret Edilen Sayfalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pageVisitsData.map((page, index) => (
                  <div key={index} className="bg-dark-400 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold">{page.name}</p>
                      <span className="text-ignite">{page.views.toLocaleString()} Görüntüleme</span>
                    </div>
                    <div className="w-full bg-dark-500 h-2 rounded-full">
                      <div className="bg-gradient-to-r from-ignite to-ignite-500 h-2 rounded-full" style={{ width: `${page.percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Toplam görüntülemelerin {page.percentage}%'si</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader>
                <CardTitle>Kullanıcı Etkileşimi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Ortalama Sayfa Okunma Süresi</span>
                      <span className="font-medium">2:15</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-ignite h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Sayfa Başına Oturum</span>
                      <span className="font-medium">4.2</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-ignite h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Hemen Çıkma Oranı</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-ignite h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Form Gönderim Oranı</span>
                      <span className="font-medium">3.8%</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-ignite h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader>
                <CardTitle>Sayfa Yüklenme Performansı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Ortalama Sayfa Yüklenme Süresi</span>
                      <span className="font-medium">1.8s</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Ortalama Sunucu Yanıt Süresi</span>
                      <span className="font-medium">0.4s</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>İçerik Yüklenme Süresi</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>En Yavaş Sayfalar</span>
                      <span className="font-medium">Portföy</span>
                    </div>
                    <div className="w-full bg-dark-400 h-2 rounded-full">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingDashboard;
