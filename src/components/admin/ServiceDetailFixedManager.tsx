
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';

interface ServiceProcess {
  id: number;
  title: string;
  description: string;
  order: number;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface ServiceDetail {
  id: number;
  serviceId: number;
  description: string;
  process: ServiceProcess[];
  faqs: FAQ[];
}

const ServiceDetailFixedManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"process" | "faq">("process");
  const [currentProcess, setCurrentProcess] = useState<ServiceProcess | null>(null);
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null);
  const { toast } = useToast();
  
  const {
    items: serviceDetails,
    add: addServiceDetail,
    update: updateServiceDetail,
    isLoading
  } = useDataService<ServiceDetail>('serviceDetails', [
    {
      id: 1,
      serviceId: 1,
      description: "Web tasarım hizmetimiz, markanızı en iyi şekilde yansıtan, modern ve kullanıcı dostu web siteleri oluşturmayı amaçlar. Her müşteri için özel tasarım ve geliştirme süreçleri uyguluyoruz.",
      process: [
        { id: 1, title: "Keşif ve Planlama", description: "Müşterinin ihtiyaçlarını anlamak ve proje kapsamını belirlemek için detaylı bir keşif süreci gerçekleştiriyoruz.", order: 1 },
        { id: 2, title: "Tasarım", description: "Markanın kimliğini yansıtan, modern ve kullanıcı dostu arayüz tasarımları oluşturuyoruz.", order: 2 },
        { id: 3, title: "Geliştirme", description: "Tasarımları işlevsel bir web sitesine dönüştürmek için kodlama ve programlama yapıyoruz.", order: 3 }
      ],
      faqs: [
        { id: 1, question: "Web tasarım süreci ne kadar sürer?", answer: "Projenin kapsamına bağlı olarak genellikle 4-8 hafta arasında tamamlanır.", order: 1 },
        { id: 2, question: "Responsive tasarım nedir?", answer: "Farklı cihazlarda (bilgisayar, tablet, telefon) uyumlu çalışacak şekilde tasarlanmış web siteleridir.", order: 2 }
      ]
    }
  ]);

  const handleOpenDialog = (type: "process" | "faq", item?: ServiceProcess | FAQ) => {
    setDialogType(type);
    if (type === "process") {
      setCurrentProcess(item as ServiceProcess || { id: Date.now(), title: "", description: "", order: serviceDetails[0].process.length + 1 });
    } else {
      setCurrentFaq(item as FAQ || { id: Date.now(), question: "", answer: "", order: serviceDetails[0].faqs.length + 1 });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProcess(null);
    setCurrentFaq(null);
  };

  const handleSaveProcess = () => {
    if (!currentProcess) return;
    
    try {
      const updatedDetail = { ...serviceDetails[0] };
      const existingIndex = updatedDetail.process.findIndex(p => p.id === currentProcess.id);
      
      if (existingIndex >= 0) {
        updatedDetail.process[existingIndex] = currentProcess;
      } else {
        updatedDetail.process.push(currentProcess);
      }
      
      updateServiceDetail(updatedDetail.id, updatedDetail);
      toast({
        title: "Başarılı",
        description: "Çalışma süreci güncellendi.",
      });
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleSaveFaq = () => {
    if (!currentFaq) return;
    
    try {
      const updatedDetail = { ...serviceDetails[0] };
      const existingIndex = updatedDetail.faqs.findIndex(f => f.id === currentFaq.id);
      
      if (existingIndex >= 0) {
        updatedDetail.faqs[existingIndex] = currentFaq;
      } else {
        updatedDetail.faqs.push(currentFaq);
      }
      
      updateServiceDetail(updatedDetail.id, updatedDetail);
      toast({
        title: "Başarılı",
        description: "SSS güncellendi.",
      });
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProcess = (id: number) => {
    if (confirm('Bu süreci silmek istediğinize emin misiniz?')) {
      const updatedDetail = { ...serviceDetails[0] };
      updatedDetail.process = updatedDetail.process.filter(p => p.id !== id);
      updateServiceDetail(updatedDetail.id, updatedDetail);
      toast({
        title: "Başarılı",
        description: "Süreç silindi.",
      });
    }
  };

  const handleDeleteFaq = (id: number) => {
    if (confirm('Bu SSS\'yi silmek istediğinize emin misiniz?')) {
      const updatedDetail = { ...serviceDetails[0] };
      updatedDetail.faqs = updatedDetail.faqs.filter(f => f.id !== id);
      updateServiceDetail(updatedDetail.id, updatedDetail);
      toast({
        title: "Başarılı",
        description: "SSS silindi.",
      });
    }
  };

  const handleUpdateDescription = (description: string) => {
    const updatedDetail = { ...serviceDetails[0], description };
    updateServiceDetail(updatedDetail.id, updatedDetail);
    toast({
      title: "Başarılı",
      description: "Hizmet açıklaması güncellendi.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FileText className="mr-2 h-6 w-6 text-ignite" />
            Hizmet Detay Düzenleme
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Her hizmet için detaylı bilgiler ve süreçleri yönetin
          </p>
        </div>
      </div>

      {serviceDetails.length > 0 && (
        <div className="space-y-6">
          <Card className="bg-dark-500 border-dark-400 overflow-hidden">
            <CardHeader className="bg-dark-600 border-b border-dark-400">
              <CardTitle className="text-xl text-white">Hizmet Açıklaması</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea 
                  value={serviceDetails[0].description}
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  className="bg-dark-400 border-dark-300 min-h-[150px] text-white"
                  placeholder="Hizmet hakkında detaylı açıklama"
                />
                <Button 
                  onClick={() => handleUpdateDescription(serviceDetails[0].description)}
                  className="bg-ignite hover:bg-ignite-700"
                >
                  <Save className="h-4 w-4 mr-2" /> Açıklamayı Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-500 border-dark-400 overflow-hidden">
            <CardHeader className="bg-dark-600 border-b border-dark-400">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-white">Çalışma Süreci</CardTitle>
                <Button 
                  onClick={() => handleOpenDialog("process")} 
                  className="bg-ignite hover:bg-ignite-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Yeni Süreç Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {serviceDetails[0].process.map((process, index) => (
                  <Card key={process.id} className="bg-dark-600 border-dark-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-white">{index + 1}. {process.title}</h3>
                          <p className="text-sm mt-1 text-white/70">{process.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenDialog("process", process)}
                            className="hover:bg-dark-400"
                          >
                            <Edit className="h-4 w-4 text-blue-400" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProcess(process.id)}
                            className="hover:bg-dark-400"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {serviceDetails[0].process.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-dark-400 rounded-md">
                    <p className="text-white/60">Henüz çalışma süreci eklenmemiş</p>
                    <Button 
                      onClick={() => handleOpenDialog("process")} 
                      className="mt-2 bg-dark-400 hover:bg-dark-300"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Süreç Ekle
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-500 border-dark-400 overflow-hidden">
            <CardHeader className="bg-dark-600 border-b border-dark-400">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-white">Sık Sorulan Sorular</CardTitle>
                <Button 
                  onClick={() => handleOpenDialog("faq")} 
                  className="bg-ignite hover:bg-ignite-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Yeni SSS Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {serviceDetails[0].faqs.map((faq, index) => (
                  <Card key={faq.id} className="bg-dark-600 border-dark-400">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-white">S: {faq.question}</h3>
                          <p className="text-sm mt-2 text-white/70">C: {faq.answer}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenDialog("faq", faq)}
                            className="hover:bg-dark-400"
                          >
                            <Edit className="h-4 w-4 text-blue-400" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="hover:bg-dark-400"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {serviceDetails[0].faqs.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-dark-400 rounded-md">
                    <p className="text-white/60">Henüz sık sorulan soru eklenmemiş</p>
                    <Button 
                      onClick={() => handleOpenDialog("faq")} 
                      className="mt-2 bg-dark-400 hover:bg-dark-300"
                    >
                      <Plus className="h-4 w-4 mr-2" /> SSS Ekle
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Process Dialog */}
      <Dialog open={openDialog && dialogType === "process"} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>{currentProcess?.id ? "Süreci Düzenle" : "Yeni Süreç Ekle"}</DialogTitle>
            <DialogDescription className="text-white/60">
              Hizmet sürecini tanımlayan adımı ekleyin veya düzenleyin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Süreç Başlığı</label>
              <Input 
                value={currentProcess?.title || ""}
                onChange={(e) => setCurrentProcess({ ...currentProcess!, title: e.target.value })}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="Süreç başlığı"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Süreç Açıklaması</label>
              <Textarea 
                value={currentProcess?.description || ""}
                onChange={(e) => setCurrentProcess({ ...currentProcess!, description: e.target.value })}
                className="bg-dark-400 border-dark-300 text-white min-h-[100px]"
                placeholder="Süreç açıklaması"
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-400 text-white">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSaveProcess} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FAQ Dialog */}
      <Dialog open={openDialog && dialogType === "faq"} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>{currentFaq?.id ? "SSS Düzenle" : "Yeni SSS Ekle"}</DialogTitle>
            <DialogDescription className="text-white/60">
              Hizmetle ilgili sık sorulan soruyu ekleyin veya düzenleyin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Soru</label>
              <Input 
                value={currentFaq?.question || ""}
                onChange={(e) => setCurrentFaq({ ...currentFaq!, question: e.target.value })}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="Soru metni"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Cevap</label>
              <Textarea 
                value={currentFaq?.answer || ""}
                onChange={(e) => setCurrentFaq({ ...currentFaq!, answer: e.target.value })}
                className="bg-dark-400 border-dark-300 text-white min-h-[100px]"
                placeholder="Cevap metni"
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-400 text-white">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSaveFaq} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceDetailFixedManager;
