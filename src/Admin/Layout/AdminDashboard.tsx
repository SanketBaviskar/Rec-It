import { useState } from "react";
import Logo from "./Header/Logo";
import UniversalSearch from "./Header/UniversalSearch";
import RenderWindow from "./RenderWindow";
import UserFeatures from "./Header/UserFeatures";
import Sidebar from "./SideBar/SideBar";
import AdminDashboardFooter from "./Footer";
import { RegisteredComponents } from "../components/componentRegistry";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState<RegisteredComponents>("Default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarClick = (componentName: RegisteredComponents) => {
    setActiveComponent(componentName);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex items-center px-4 h-[7vh] bg-white shadow-sm border-b">
        <div className="w-[15%] flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Logo />
        </div>
        <div className="w-[70%] flex justify-center">
          <UniversalSearch />
        </div>
        <div className="w-[15%] flex justify-end">
          <UserFeatures />
        </div>
      </div>

      {/* Main Content Section */}
      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          onItemClick={handleSidebarClick} 
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <RenderWindow activeComponent={activeComponent} />
        </div>
      </main>

      {/* Footer Section */}
      <AdminDashboardFooter />
    </div>
  );
}