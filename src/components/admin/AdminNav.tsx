
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
  MessageSquare,
  Bell,
  Database,
  Layers,
  SlidersHorizontal,
  Palette,
  Search,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNav = ({ activeTab, setActiveTab }: AdminNavProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-700 border-b border-dark-400 sticky top-24 z-30"
    >
      <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="py-1">
          <TabsList className="grid grid-cols-5 md:grid-cols-13 h-auto bg-dark-600 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <LineChart className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Pazarlama</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <ListTodo className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Hizmetler</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Briefcase className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Projeler</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <PenTool className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="slider" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Hero Slider</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <ImageIcon className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Medya</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Users className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Ekip</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Code className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Search className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Database className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Veritabanı</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
              <Palette className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Görünüm</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-ignite data-[state=active]:text-white py-3">
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
