import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Plus, Trash, Edit, Image } from 'lucide-react';

// Define types for various page content
interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface StorySection {
  id: string;
  title: string;
  content: string;
  image: string; // Changed from optional to required
  alignment: 'left' | 'right';
}

interface PageContent {
  id: string;
  pageTitle: string;
  pageDescription: string;
  metaTitle: string;
  metaDescription: string;
  sections: {
    values: {
      sectionTitle: string;
      sectionSubtitle: string;
      items: ValueItem[];
    };
    story: {
      sectionTitle: string;
      sectionSubtitle: string;
      sections: StorySection[];
    };
  };
}

const PageContentManager = () => {
  const { toast } = useToast();
  const { items: pageItems, update } = useDataService('pages', [
    {
      id: 'about',
      pageTitle: 'Hakkımızda',
      pageDescription: 'Ignite Pazarlama hakkında bilgi edinin',
      metaTitle: 'Hakkımızda | Ignite Pazarlama',
      metaDescription: 'Ignite Pazarlama ekibi, değerleri ve hikayesi hakkında daha fazla bilgi edinin.',
      sections: {
        values: {
          sectionTitle: 'Değerlerimiz',
          sectionSubtitle: 'Bizi özel yapan prensiplerimiz',
          items: [
            {
              id: '1',
              icon: 'Star',
              title: 'Mükemmellik',
              description: 'Her projede en yüksek kalite standartlarını korumak için çabalıyoruz.'
            },
            {
              id: '2',
              icon: 'Users',
              title: 'İş Birliği',
              description: 'Müşterilerimizle ve ekip içinde güçlü iş birlikleri kurarak başarıya ulaşıyoruz.'
            },
            {
              id: '3',
              icon: 'Lightbulb',
              title: 'Yenilikçilik',
              description: 'Dijital pazarlama alanındaki en son trendleri ve teknolojileri takip ederek yenilikçi çözümler sunuyoruz.'
            },
            {
              id: '4',
              icon: 'Target',
              title: 'Sonuç Odaklılık',
              description: 'Müşterilerimizin hedeflerine ulaşmalarına yardımcı olan ölçülebilir sonuçlar üretiyoruz.'
            }
          ]
        },
        story: {
          sectionTitle: 'Hikayemiz',
          sectionSubtitle: 'Nereden başladık ve nereye gidiyoruz',
          sections: [
            {
              id: '1',
              title: 'Başlangıç',
              content: 'Ignite Pazarlama, 2015 yılında dijital pazarlama alanında fark yaratma vizyonuyla kuruldu. İlk günden itibaren müşteri memnuniyetini ve sonuç odaklı çalışmayı esas aldık.',
              image: '/images/about/start.jpg',
              alignment: 'right'
            },
            {
              id: '2',
              title: 'Büyüme',
              content: 'İlk yıllarımızda küçük işletmelere odaklanırken, zamanla portföyümüzü genişlettik ve kurumsal müşterilerle çalışmaya başladık. Ekibimiz büyüdü ve uzmanlık alanlarımızı genişlettik.',
              image: '/images/about/growth.jpg',
              alignment: 'left'
            },
            {
              id: '3',
              title: 'Bugün',
              content: 'Bugün, 30 kişilik uzman ekibimizle Türkiye\'nin önde gelen dijital pazarlama ajanslarından biri olarak hizmet veriyoruz. 150\'den fazla başarılı proje ve mutlu müşteriler bizim en büyük referansımız.',
              image: '/images/about/today.jpg',
              alignment: 'right'
            }
          ]
        }
      }
    }
  ]);

  const currentPage = pageItems[0] as PageContent;
  const [formData, setFormData] = useState<PageContent>(currentPage);
  const [activeTab, setActiveTab] = useState('values');
  const [editingValueIndex, setEditingValueIndex] = useState<number | null>(null);
  const [editingStoryIndex, setEditingStoryIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New value or story item templates
  const newValueTemplate: ValueItem = {
    id: Date.now().toString(),
    icon: 'Star',
    title: 'Yeni Değer',
    description: 'Bu değer hakkında açıklama yazınız.'
  };
  
  const newStoryTemplate: StorySection = {
    id: Date.now().toString(),
    title: 'Yeni Bölüm',
    content: 'Bu bölüm hakkında içerik yazınız.',
    image: '/images/about/placeholder.jpg', // Now required
    alignment: 'right'
  };

  // Handle general input changes
  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'page') {
      setFormData({
        ...formData,
        [field]: value
      });
    } else if (section === 'values') {
      setFormData({
        ...formData,
        sections: {
          ...formData.sections,
          values: {
            ...formData.sections.values,
            [field]: value
          }
        }
      });
    } else if (section === 'story') {
      setFormData({
        ...formData,
        sections: {
          ...formData.sections,
          story: {
            ...formData.sections.story,
            [field]: value
          }
        }
      });
    }
  };

  // Handle value item changes
  const handleValueItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...formData.sections.values.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        values: {
          ...formData.sections.values,
          items: updatedItems
        }
      }
    });
  };

  // Handle story section changes
  const handleStorySectionChange = (index: number, field: string, value: string) => {
    const updatedSections = [...formData.sections.story.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        story: {
          ...formData.sections.story,
          sections: updatedSections
        }
      }
    });
  };

  // Add new value item
  const addValueItem = () => {
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        values: {
          ...formData.sections.values,
          items: [...formData.sections.values.items, {...newValueTemplate, id: Date.now().toString()}]
        }
      }
    });
    setEditingValueIndex(formData.sections.values.items.length);
    toast({
      title: "Yeni Değer Eklendi",
      description: "Yeni bir değer öğesi eklendi. Lütfen içeriği düzenleyin.",
    });
  };

  // Remove value item
  const removeValueItem = (index: number) => {
    const updatedItems = [...formData.sections.values.items];
    updatedItems.splice(index, 1);
    
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        values: {
          ...formData.sections.values,
          items: updatedItems
        }
      }
    });
    
    setEditingValueIndex(null);
    toast({
      title: "Değer Kaldırıldı",
      description: "Değer öğesi başarıyla kaldırıldı.",
    });
  };

  // Add new story section
  const addStorySection = () => {
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        story: {
          ...formData.sections.story,
          sections: [...formData.sections.story.sections, {...newStoryTemplate, id: Date.now().toString()}]
        }
      }
    });
    setEditingStoryIndex(formData.sections.story.sections.length);
    toast({
      title: "Yeni Hikaye Bölümü Eklendi",
      description: "Yeni bir hikaye bölümü eklendi. Lütfen içeriği düzenleyin.",
    });
  };

  // Remove story section
  const removeStorySection = (index: number) => {
    const updatedSections = [...formData.sections.story.sections];
    updatedSections.splice(index, 1);
    
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        story: {
          ...formData.sections.story,
          sections: updatedSections
        }
      }
    });
    
    setEditingStoryIndex(null);
    toast({
      title: "Hikaye Bölümü Kaldırıldı",
      description: "Hikaye bölümü başarıyla kaldırıldı.",
    });
  };

  // Toggle story section alignment
  const toggleAlignment = (index: number) => {
    const updatedSections = [...formData.sections.story.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      alignment: updatedSections[index].alignment === 'left' ? 'right' : 'left'
    };
    
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        story: {
          ...formData.sections.story,
          sections: updatedSections
        }
      }
    });
  };

  // Save changes
  const saveChanges = async () => {
    setIsLoading(true);
    try {
      // Fix: Ensure all story sections have image property before saving
      const updatedFormData = {
        ...formData,
        sections: {
          ...formData.sections,
          story: {
            ...formData.sections.story,
            sections: formData.sections.story.sections.map(section => ({
              ...section,
              image: section.image || '/images/about/placeholder.jpg'  // Provide default image if missing
            }))
          }
        }
      };
      
      await update(updatedFormData.id, updatedFormData);
      toast({
        title: "Değişiklikler Kaydedildi",
        description: "Sayfa içeriği başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerik kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const iconOptions = [
    "Star", "Users", "Lightbulb", "Target", "Heart", "Shield", "Globe", "Clock", 
    "Check", "BarChart", "Award", "Smile", "ThumbsUp", "MessageCircle"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="text-xl">Sayfa İçerik Yönetimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sayfa Başlığı</label>
                <Input 
                  value={formData.pageTitle} 
                  onChange={(e) => handleInputChange('page', 'pageTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sayfa Açıklaması</label>
                <Input 
                  value={formData.pageDescription} 
                  onChange={(e) => handleInputChange('page', 'pageDescription', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Başlığı</label>
                <Input 
                  value={formData.metaTitle} 
                  onChange={(e) => handleInputChange('page', 'metaTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Açıklaması</label>
                <Textarea 
                  value={formData.metaDescription} 
                  onChange={(e) => handleInputChange('page', 'metaDescription', e.target.value)}
                  className="bg-dark-400 border-dark-300 h-[42px]"
                />
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-dark-600">
              <TabsTrigger value="values" className="flex-1">Değerlerimiz</TabsTrigger>
              <TabsTrigger value="story" className="flex-1">Hikayemiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="values" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bölüm Başlığı</label>
                    <Input 
                      value={formData.sections.values.sectionTitle} 
                      onChange={(e) => handleInputChange('values', 'sectionTitle', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bölüm Alt Başlığı</label>
                    <Input 
                      value={formData.sections.values.sectionSubtitle} 
                      onChange={(e) => handleInputChange('values', 'sectionSubtitle', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                </div>
                
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Değer Öğeleri</h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={addValueItem}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni Değer Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[300px] p-3">
                    <div className="space-y-4">
                      {formData.sections.values.items.map((item, index) => (
                        <Card key={item.id} className="bg-dark-600 border-dark-400">
                          <CardHeader className="p-3 pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm flex items-center">
                                {item.title}
                              </CardTitle>
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                  onClick={() => setEditingValueIndex(editingValueIndex === index ? null : index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  onClick={() => removeValueItem(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          {editingValueIndex === index && (
                            <CardContent className="p-3 pt-2 space-y-3">
                              <div className="space-y-2">
                                <label className="text-xs font-medium">İkon</label>
                                <select
                                  value={item.icon}
                                  onChange={(e) => handleValueItemChange(index, 'icon', e.target.value)}
                                  className="w-full bg-dark-400 border-dark-300 rounded-md p-2 text-sm"
                                >
                                  {iconOptions.map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Başlık</label>
                                <Input 
                                  value={item.title} 
                                  onChange={(e) => handleValueItemChange(index, 'title', e.target.value)}
                                  className="bg-dark-400 border-dark-300"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Açıklama</label>
                                <Textarea 
                                  value={item.description} 
                                  onChange={(e) => handleValueItemChange(index, 'description', e.target.value)}
                                  className="bg-dark-400 border-dark-300"
                                  rows={3}
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="story" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bölüm Başlığı</label>
                    <Input 
                      value={formData.sections.story.sectionTitle} 
                      onChange={(e) => handleInputChange('story', 'sectionTitle', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bölüm Alt Başlığı</label>
                    <Input 
                      value={formData.sections.story.sectionSubtitle} 
                      onChange={(e) => handleInputChange('story', 'sectionSubtitle', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                </div>
                
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Hikaye Bölümleri</h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={addStorySection}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni Bölüm Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[400px] p-3">
                    <div className="space-y-4">
                      {formData.sections.story.sections.map((section, index) => (
                        <Card key={section.id} className="bg-dark-600 border-dark-400">
                          <CardHeader className="p-3 pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm flex items-center">
                                {section.title}
                              </CardTitle>
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                  onClick={() => setEditingStoryIndex(editingStoryIndex === index ? null : index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  onClick={() => removeStorySection(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          {editingStoryIndex === index && (
                            <CardContent className="p-3 pt-2 space-y-3">
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Başlık</label>
                                <Input 
                                  value={section.title} 
                                  onChange={(e) => handleStorySectionChange(index, 'title', e.target.value)}
                                  className="bg-dark-400 border-dark-300"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">İçerik</label>
                                <Textarea 
                                  value={section.content} 
                                  onChange={(e) => handleStorySectionChange(index, 'content', e.target.value)}
                                  className="bg-dark-400 border-dark-300"
                                  rows={4}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Görsel URL</label>
                                <Input 
                                  value={section.image || ''} 
                                  onChange={(e) => handleStorySectionChange(index, 'image', e.target.value)}
                                  className="bg-dark-400 border-dark-300"
                                  placeholder="/images/about/section.jpg"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 text-white/70"
                                  onClick={() => toggleAlignment(index)}
                                >
                                  <Image className="h-4 w-4 mr-1" />
                                  Görsel: {section.alignment === 'left' ? 'Solda' : 'Sağda'}
                                </Button>
                                <div className="text-xs text-white/50">
                                  {section.alignment === 'left' 
                                    ? 'Görsel solda, yazı sağda' 
                                    : 'Görsel sağda, yazı solda'}
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button 
              className="bg-ignite hover:bg-ignite-700" 
              disabled={isLoading}
              onClick={saveChanges}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Değişiklikleri Kaydet
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageContentManager;
