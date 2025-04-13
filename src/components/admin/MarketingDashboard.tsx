
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MarketingIcon from '@/components/ui/marketing-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

// Sample chart data
const performanceData = [
  { name: 'Oca', google: 40, meta: 24, linkedin: 10, tiktok: 15 },
  { name: 'Şub', google: 30, meta: 28, linkedin: 15, tiktok: 21 },
  { name: 'Mar', google: 20, meta: 34, linkedin: 18, tiktok: 26 },
  { name: 'Nis', google: 27, meta: 39, linkedin: 25, tiktok: 34 },
  { name: 'May', google: 45, meta: 48, linkedin: 32, tiktok: 38 },
  { name: 'Haz', google: 55, meta: 50, linkedin: 36, tiktok: 42 },
  { name: 'Tem', google: 65, meta: 45, linkedin: 40, tiktok: 48 },
];

const trafficSourceData = [
  { name: 'Google Organik', value: 35, color: '#4285F4' },
  { name: 'Google Ads', value: 20, color: '#FBBC05' },
  { name: 'Meta Ads', value: 15, color: '#3b5998' },
  { name: 'Tiktok Ads', value: 10, color: '#000000' },
  { name: 'LinkedIn Ads', value: 8, color: '#0077B5' },
  { name: 'Doğrudan', value: 12, color: '#34A853' },
];

const MarketingDashboard = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  const [budgetAllocation, setBudgetAllocation] = useState([30, 20, 15, 15, 10, 10]); // Google, Meta, TikTok, LinkedIn, Email, Diğer

  const handleBudgetChange = (index: number, value: number[]) => {
    const newBudget = [...budgetAllocation];
    newBudget[index] = value[0];
    setBudgetAllocation(newBudget);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto bg-dark-500 p-1">
          <TabsTrigger value="performance" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Performans Analizi
          </TabsTrigger>
          <TabsTrigger value="traffic" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Trafik Kaynakları
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Kampanya Performansı
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
            Bütçe Yönetimi
          </TabsTrigger>
        </TabsList>
        
        {/* Performance Analysis Tab */}
        <TabsContent value="performance" className="space-y-6 pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Platform Performans Karşılaştırması</h3>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${reportPeriod === 'week' ? 'bg-ignite text-white' : 'bg-dark-400 text-gray-300'}`}
                onClick={() => setReportPeriod('week')}
              >
                Haftalık
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${reportPeriod === 'month' ? 'bg-ignite text-white' : 'bg-dark-400 text-gray-300'}`}
                onClick={() => setReportPeriod('month')}
              >
                Aylık
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${reportPeriod === 'year' ? 'bg-ignite text-white' : 'bg-dark-400 text-gray-300'}`}
                onClick={() => setReportPeriod('year')}
              >
                Yıllık
              </button>
            </div>
          </div>
          
          <div className="h-80 w-full bg-dark-500 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="google" name="Google Ads" fill="#4285F4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta Ads" fill="#3b5998" radius={[4, 4, 0, 0]} />
                <Bar dataKey="linkedin" name="LinkedIn Ads" fill="#0077B5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tiktok" name="TikTok Ads" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">Google Ads</CardTitle>
                </div>
                <div className="h-8 w-8 text-blue-500">
                  <MarketingIcon name="google-ads" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64.853 ₺</div>
                <p className="text-xs text-gray-400">Harcama</p>
                <div className="mt-2 text-sm text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  +18.3% ROAS
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">Meta Ads</CardTitle>
                </div>
                <div className="h-8 w-8 text-blue-900">
                  <MarketingIcon name="meta-ads" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.320 ₺</div>
                <p className="text-xs text-gray-400">Harcama</p>
                <div className="mt-2 text-sm text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  +12.7% ROAS
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">TikTok Ads</CardTitle>
                </div>
                <div className="h-8 w-8">
                  <MarketingIcon name="tiktok-ads" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.178 ₺</div>
                <p className="text-xs text-gray-400">Harcama</p>
                <div className="mt-2 text-sm text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  +24.5% ROAS
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">LinkedIn Ads</CardTitle>
                </div>
                <div className="h-8 w-8 text-blue-600">
                  <MarketingIcon name="linkedin-ads" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.542 ₺</div>
                <p className="text-xs text-gray-400">Harcama</p>
                <div className="mt-2 text-sm text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  +9.6% ROAS
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
        </TabsContent>
        
        {/* Budget Management Tab */}
        <TabsContent value="budget" className="space-y-6 pt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Pazarlama Bütçesi Dağılımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 text-blue-500">
                      <MarketingIcon name="google-ads" />
                    </div>
                    <p>Google Ads</p>
                  </div>
                  <span className="font-bold">{budgetAllocation[0]}%</span>
                </div>
                <Slider
                  value={[budgetAllocation[0]]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleBudgetChange(0, value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 text-blue-900">
                      <MarketingIcon name="meta-ads" />
                    </div>
                    <p>Meta Ads</p>
                  </div>
                  <span className="font-bold">{budgetAllocation[1]}%</span>
                </div>
                <Slider
                  value={[budgetAllocation[1]]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleBudgetChange(1, value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6">
                      <MarketingIcon name="tiktok-ads" />
                    </div>
                    <p>TikTok Ads</p>
                  </div>
                  <span className="font-bold">{budgetAllocation[2]}%</span>
                </div>
                <Slider
                  value={[budgetAllocation[2]]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleBudgetChange(2, value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 text-blue-600">
                      <MarketingIcon name="linkedin-ads" />
                    </div>
                    <p>LinkedIn Ads</p>
                  </div>
                  <span className="font-bold">{budgetAllocation[3]}%</span>
                </div>
                <Slider
                  value={[budgetAllocation[3]]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleBudgetChange(3, value)}
                  className="py-4"
                />
              </div>
              
              <Card className="bg-dark-400 border-dark-300">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Toplam Bütçe: 160.893 ₺</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex-1 min-w-[150px] bg-dark-500 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Google Ads</p>
                      <p className="text-lg font-bold">{(160893 * budgetAllocation[0] / 100).toLocaleString('tr-TR')} ₺</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-dark-500 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Meta Ads</p>
                      <p className="text-lg font-bold">{(160893 * budgetAllocation[1] / 100).toLocaleString('tr-TR')} ₺</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-dark-500 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">TikTok Ads</p>
                      <p className="text-lg font-bold">{(160893 * budgetAllocation[2] / 100).toLocaleString('tr-TR')} ₺</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-dark-500 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">LinkedIn Ads</p>
                      <p className="text-lg font-bold">{(160893 * budgetAllocation[3] / 100).toLocaleString('tr-TR')} ₺</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Campaign Performance Tab */}
        <TabsContent value="campaigns" className="space-y-6 pt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Aktif Kampanyalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-dark-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 text-blue-500">
                        <MarketingIcon name="google-ads" />
                      </div>
                      <p className="font-bold">Yaz Sonu İndirimleri</p>
                    </div>
                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Aktif</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Gösterim</p>
                      <p className="font-semibold">123,456</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tıklama</p>
                      <p className="font-semibold">5,432</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">CTR</p>
                      <p className="font-semibold">4.4%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Dönüşüm</p>
                      <p className="font-semibold">427</p>
                    </div>
                  </div>
                  <div className="w-full bg-dark-500 h-2 rounded-full mt-4">
                    <div className="bg-gradient-to-r from-green-500 to-ignite h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Kalan Bütçe: 12,500 ₺ (75%)</p>
                </div>
                
                <div className="bg-dark-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 text-blue-900">
                        <MarketingIcon name="meta-ads" />
                      </div>
                      <p className="font-bold">Yeni Ürün Lansmanı</p>
                    </div>
                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Aktif</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Gösterim</p>
                      <p className="font-semibold">234,567</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tıklama</p>
                      <p className="font-semibold">8,765</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">CTR</p>
                      <p className="font-semibold">3.7%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Dönüşüm</p>
                      <p className="font-semibold">612</p>
                    </div>
                  </div>
                  <div className="w-full bg-dark-500 h-2 rounded-full mt-4">
                    <div className="bg-gradient-to-r from-green-500 to-ignite h-2 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Kalan Bütçe: 15,000 ₺ (50%)</p>
                </div>
                
                <div className="bg-dark-400 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6">
                        <MarketingIcon name="tiktok-ads" />
                      </div>
                      <p className="font-bold">Z Kuşağı Kampanyası</p>
                    </div>
                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Aktif</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Gösterim</p>
                      <p className="font-semibold">345,678</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tıklama</p>
                      <p className="font-semibold">15,432</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">CTR</p>
                      <p className="font-semibold">4.5%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Dönüşüm</p>
                      <p className="font-semibold">843</p>
                    </div>
                  </div>
                  <div className="w-full bg-dark-500 h-2 rounded-full mt-4">
                    <div className="bg-gradient-to-r from-green-500 to-ignite h-2 rounded-full w-1/4"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Kalan Bütçe: 5,000 ₺ (25%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingDashboard;
