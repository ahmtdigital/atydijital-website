
import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Search, File, Trash2, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: number;
  name: string;
  type: 'image' | 'document' | 'other';
  url: string;
  size: string;
  date: string;
}

const MediaManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      name: 'hero-image.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070',
      size: '2.4 MB',
      date: '14 Nisan 2025'
    },
    {
      id: 2,
      name: 'team-portrait.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074',
      size: '1.8 MB',
      date: '10 Nisan 2025'
    },
    {
      id: 3,
      name: 'project-proposal.pdf',
      type: 'document',
      url: 'https://example.com/documents/project-proposal.pdf',
      size: '3.5 MB',
      date: '5 Nisan 2025'
    },
    {
      id: 4,
      name: 'website-mockup.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069',
      size: '4.2 MB',
      date: '1 Nisan 2025'
    },
    {
      id: 5,
      name: 'analytics-report.pdf',
      type: 'document',
      url: 'https://example.com/documents/analytics-report.pdf',
      size: '1.2 MB',
      date: '29 Mart 2025'
    },
    {
      id: 6,
      name: 'client-contract.pdf',
      type: 'document',
      url: 'https://example.com/documents/client-contract.pdf',
      size: '0.8 MB',
      date: '25 Mart 2025'
    }
  ]);

  // Filter media items based on active tab and search term
  const filteredMedia = mediaItems.filter(item => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'images' && item.type === 'image') || 
                      (activeTab === 'documents' && item.type === 'document');
    
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, this would upload the file to a server
    // For demo purposes, we'll simulate adding the file to our list
    
    const newItems: MediaItem[] = Array.from(files).map((file, index) => {
      const isImage = file.type.startsWith('image/');
      
      return {
        id: mediaItems.length + index + 1,
        name: file.name,
        type: isImage ? 'image' : file.type.includes('pdf') ? 'document' : 'other',
        url: isImage ? URL.createObjectURL(file) : '',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date().toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };
    });
    
    setMediaItems([...newItems, ...mediaItems]);
    
    toast({
      title: "Dosya yüklendi",
      description: `${files.length} dosya başarıyla yüklendi.`,
    });
  };
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(active);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a synthetic event to reuse our upload handler
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as ChangeEvent<HTMLInputElement>;
      
      handleFileUpload(syntheticEvent);
    }
  };
  
  const handleItemClick = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const handleDeleteItems = () => {
    if (selectedItems.length === 0) return;
    
    setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    
    toast({
      title: "Dosyalar silindi",
      description: `${selectedItems.length} dosya başarıyla silindi.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Medya Kütüphanesi</h2>
        
        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteItems}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {selectedItems.length} Öğeyi Sil
            </Button>
          )}
          
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button className="bg-ignite hover:bg-ignite-700">
              <Upload className="h-4 w-4 mr-2" />
              Yükle
            </Button>
          </label>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-dark-600">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="images">Görseller</TabsTrigger>
              <TabsTrigger value="documents">Dökümanlar</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 bg-dark-600 border-dark-400"
              placeholder="Dosya ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 ${dragActive ? 'border-ignite bg-ignite/10' : 'border-dark-400'} transition-colors`}
          onDragOver={(e) => handleDrag(e, true)}
          onDragLeave={(e) => handleDrag(e, false)}
          onDrop={handleDrop}
        >
          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                <div 
                  key={item.id}
                  className={`relative bg-dark-500 rounded-md overflow-hidden border ${selectedItems.includes(item.id) ? 'border-ignite' : 'border-dark-400'} h-[200px] cursor-pointer transition-all`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.type === 'image' ? (
                    <div className="h-full">
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <File className="h-16 w-16 text-gray-400 mb-2" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  )}
                  
                  {(hoveredItem === item.id || selectedItems.includes(item.id)) && (
                    <div className="absolute inset-0 bg-dark-800/80 flex flex-col p-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">{item.size} • {item.date}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
                          e.stopPropagation();
                          // Copy URL logic would go here
                          toast({
                            title: "URL kopyalandı",
                            description: "Medya URL'si panoya kopyalandı.",
                          });
                        }}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
                          e.stopPropagation();
                          // Download logic would go here
                        }}>
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-400" onClick={(e) => {
                          e.stopPropagation();
                          setMediaItems(mediaItems.filter(media => media.id !== item.id));
                          toast({
                            title: "Dosya silindi",
                            description: `${item.name} başarıyla silindi.`,
                          });
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {selectedItems.includes(item.id) && (
                    <div className="absolute top-2 right-2 bg-ignite rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-dark-600 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Henüz medya yok</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Görselleri ve dökümanları buraya sürükleyip bırakabilir veya yükle butonuna tıklayarak dosya seçebilirsiniz.
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button className="bg-ignite hover:bg-ignite-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Dosya Seç
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MediaManager;
