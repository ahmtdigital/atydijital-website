
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  LineChart, 
  ListTodo, 
  Briefcase, 
  PenTool,
  Settings,
  Code,
  ImageIcon,
  Users,
  Search,
  Database,
  SlidersHorizontal,
  Palette,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNav = ({ activeTab, setActiveTab }: AdminNavProps) => {
  const navigate = useNavigate();

  // Handler to ensure tab changes are processed correctly
  const handleTabChange = (value: string) => {
    // Update the parent state with the new tab value
    setActiveTab(value);
    
    // Update URL to reflect tab change without navigating away from the page
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', value);
      window.history.pushState({}, '', url.toString());
    } catch (error) {
      console.error("Error updating URL parameters:", error);
      // Fallback: just navigate to /admin with the tab parameter
      navigate(`/admin?tab=${value}`, { replace: true });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-700 border-b border-dark-400 sticky top-24 z-30"
    >
      <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="py-1">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-14 h-auto bg-dark-600 p-1 gap-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Gösterge Paneli</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <LineChart className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Pazarlama</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <ListTodo className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Hizmetler</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Briefcase className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Projeler</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <PenTool className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="pages" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <FileText className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Sayfalar</span>
            </TabsTrigger>
            <TabsTrigger value="slider" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Slider</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <ImageIcon className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Medya</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Users className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Ekip</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Code className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Search className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Database className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Veritabanı</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Palette className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Görünüm</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3 flex items-center justify-center text-center transition-all hover:bg-dark-500">
              <Settings className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Ayarlar</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AdminNav;
