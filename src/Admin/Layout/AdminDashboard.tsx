import { useState } from "react";
import Logo from "./Logo";
import UniversalSearch from "./UniversalSearch";
import RenderWindow from "./RenderWindow";
import UserFeatures from "./UserFeatures";
import Sidebar from "./SideBar/SideBar";
import AdminDashboardFooter from "./Footer";

export default function AdminDashboard() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("Default");

  // Function to handle sidebar item clicks
  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex items-center px-4 h-[7vh] bg-white shadow-sm border-b">
        <div className="w-[15%]">
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
      <main>
        <div className="flex flex-grow h-[90vh]">
          <div className="w-[15%]">
            <Sidebar onItemClick={handleSidebarClick} />
          </div>
          <div className="flex-grow bg-gray-50">
            <RenderWindow activeComponent={activeComponent} />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <AdminDashboardFooter />
    </div>
  );
}
