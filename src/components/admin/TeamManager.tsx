
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  AtSign, 
  Briefcase,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  image: string;
}

const TeamManager = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Deniz Yılmaz",
      position: "CEO & Kurucu",
      email: "deniz@ignitemarketing.com",
      phone: "+90 555 123 4567",
      bio: "Uzun yıllar boyunca dijital pazarlama alanında çalıştıktan sonra Ignite Marketing'i kurdum. Müşterilerimize en iyi dijital çözümleri sunmak için çalışıyoruz.",
      social: {
        linkedin: "https://linkedin.com/in/denizyilmaz",
        twitter: "https://twitter.com/denizyilmaz",
        instagram: "https://instagram.com/denizyilmaz"
      },
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1471"
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      position: "Pazarlama Direktörü",
      email: "ayse@ignitemarketing.com",
      phone: "+90 555 987 6543",
      bio: "Dijital pazarlama stratejileri ve müşteri deneyimi konusunda 10 yıllık tecrübeye sahibim. Marka bilinirliğini artırmak ve müşteri sadakatini güçlendirmek için stratejiler geliştiriyorum.",
      social: {
        linkedin: "https://linkedin.com/in/aysekaya",
        twitter: "https://twitter.com/aysekaya",
      },
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374"
    },
    {
      id: 3,
      name: "Mehmet Özkan",
      position: "Kıdemli Tasarımcı",
      email: "mehmet@ignitemarketing.com",
      phone: "+90 555 345 6789",
      bio: "Yaratıcı ve kullanıcı dostu web tasarımları ile markaların dijital dünyada öne çıkmasına yardımcı oluyorum. UI/UX tasarımı ve marka kimliği oluşturma konularında uzmanım.",
      social: {
        linkedin: "https://linkedin.com/in/mehmetozkan",
        instagram: "https://instagram.com/mehmetozkan"
      },
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374"
    }
  ]);
  
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    position: '',
    email: '',
    phone: '',
    bio: '',
    social: {},
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631'
  });
  
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleAddMember = () => {
    if (!newMember.name || !newMember.position) {
      toast({
        title: "Hata",
        description: "Lütfen en az isim ve pozisyon alanlarını doldurun",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
      const memberToAdd = {
        ...newMember,
        id: newId
      };
      
      setTeamMembers([...teamMembers, memberToAdd]);
      setNewMember({
        name: '',
        position: '',
        email: '',
        phone: '',
        bio: '',
        social: {},
        image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631'
      });
      
      setLoading(false);
      toast({
        title: "Ekip Üyesi Eklendi",
        description: "Yeni ekip üyesi başarıyla eklendi.",
      });
    }, 1000);
  };
  
  const openEditDialog = (member: TeamMember) => {
    setEditingMember({...member});
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateMember = () => {
    if (!editingMember || !editingMember.name || !editingMember.position) {
      toast({
        title: "Hata",
        description: "Lütfen en az isim ve pozisyon alanlarını doldurun",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedMembers = teamMembers.map(m => 
        m.id === editingMember.id ? editingMember : m
      );
      
      setTeamMembers(updatedMembers);
      setIsEditDialogOpen(false);
      setEditingMember(null);
      
      setLoading(false);
      toast({
        title: "Ekip Üyesi Güncellendi",
        description: "Ekip üyesi bilgileri başarıyla güncellendi.",
      });
    }, 1000);
  };
  
  const openDeleteDialog = (memberId: number) => {
    setMemberToDelete(memberId);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteMember = () => {
    if (memberToDelete === null) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredMembers = teamMembers.filter(m => m.id !== memberToDelete);
      setTeamMembers(filteredMembers);
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
      
      setLoading(false);
      toast({
        title: "Ekip Üyesi Silindi",
        description: "Ekip üyesi başarıyla silindi.",
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ekip Yönetimi</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-ignite hover:bg-ignite-700">
              <Plus className="h-4 w-4 mr-2" /> Yeni Ekip Üyesi
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-500 border-dark-400 text-white">
            <DialogHeader>
              <DialogTitle>Yeni Ekip Üyesi Ekle</DialogTitle>
              <DialogDescription className="text-gray-400">
                Ekip üyesi bilgilerini doldurun ve ekle butonuna tıklayın.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">İsim Soyisim</label>
                  <Input 
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="İsim Soyisim"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pozisyon</label>
                  <Input 
                    value={newMember.position}
                    onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                    placeholder="Örn: CEO, Pazarlama Direktörü"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input 
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="E-posta adresi"
                    className="bg-dark-400 border-dark-300"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input 
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    placeholder="Telefon numarası"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biyografi</label>
                <Textarea 
                  value={newMember.bio}
                  onChange={(e) => setNewMember({...newMember, bio: e.target.value})}
                  placeholder="Kısa biyografi"
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profil Resmi URL</label>
                <Input 
                  value={newMember.image}
                  onChange={(e) => setNewMember({...newMember, image: e.target.value})}
                  placeholder="Görsel URL'si"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input 
                    value={newMember.social.linkedin || ''}
                    onChange={(e) => setNewMember({
                      ...newMember, 
                      social: {...newMember.social, linkedin: e.target.value}
                    })}
                    placeholder="LinkedIn profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input 
                    value={newMember.social.twitter || ''}
                    onChange={(e) => setNewMember({
                      ...newMember, 
                      social: {...newMember.social, twitter: e.target.value}
                    })}
                    placeholder="Twitter profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <Input 
                    value={newMember.social.instagram || ''}
                    onChange={(e) => setNewMember({
                      ...newMember, 
                      social: {...newMember.social, instagram: e.target.value}
                    })}
                    placeholder="Instagram profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-dark-300">
                İptal
              </Button>
              <Button 
                className="bg-ignite hover:bg-ignite-700"
                onClick={handleAddMember}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Ekleniyor...
                  </div>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Ekle
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-dark-500 border-dark-400 h-full flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-start">
                  <div>
                    {member.name}
                    <p className="text-sm font-normal text-gray-400 mt-1">{member.position}</p>
                  </div>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => openEditDialog(member)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-400"
                      onClick={() => openDeleteDialog(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                {member.bio && (
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4">{member.bio}</p>
                )}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 border-t border-dark-400 mt-auto">
                <div className="flex gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>Ekip Üyesini Düzenle</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ekip üyesi bilgilerini güncelleyin.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">İsim Soyisim</label>
                  <Input 
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                    placeholder="İsim Soyisim"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pozisyon</label>
                  <Input 
                    value={editingMember.position}
                    onChange={(e) => setEditingMember({...editingMember, position: e.target.value})}
                    placeholder="Örn: CEO, Pazarlama Direktörü"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input 
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                    placeholder="E-posta adresi"
                    className="bg-dark-400 border-dark-300"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input 
                    value={editingMember.phone}
                    onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                    placeholder="Telefon numarası"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biyografi</label>
                <Textarea 
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({...editingMember, bio: e.target.value})}
                  placeholder="Kısa biyografi"
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profil Resmi URL</label>
                <Input 
                  value={editingMember.image}
                  onChange={(e) => setEditingMember({...editingMember, image: e.target.value})}
                  placeholder="Görsel URL'si"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input 
                    value={editingMember.social.linkedin || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember, 
                      social: {...editingMember.social, linkedin: e.target.value}
                    })}
                    placeholder="LinkedIn profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input 
                    value={editingMember.social.twitter || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember, 
                      social: {...editingMember.social, twitter: e.target.value}
                    })}
                    placeholder="Twitter profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <Input 
                    value={editingMember.social.instagram || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember, 
                      social: {...editingMember.social, instagram: e.target.value}
                    })}
                    placeholder="Instagram profil linki"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="border-dark-300" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              className="bg-ignite hover:bg-ignite-700"
              onClick={handleUpdateMember}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Güncelleniyor...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Güncelle
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>Ekip Üyesini Sil</DialogTitle>
            <DialogDescription className="text-gray-400">
              Bu ekip üyesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-dark-300" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteMember}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Siliniyor...
                </div>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" /> Sil
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default TeamManager;
