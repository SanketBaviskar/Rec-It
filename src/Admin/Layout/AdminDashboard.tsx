import React, { useState } from "react";
import Logo from "./Logo";
import UniversalSearch from "./UniversalSearch";
import RenderWindow from "./RenderWindow";
import UserFeatures from "./UserFeatures";
import Sidebar from "./SideBar/SideBar";

export default function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState("Access");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center px-4 h-16 bg-white shadow-sm border-b">
        <div className="w-64 flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-grow flex justify-center">
          <UniversalSearch />
        </div>
        <div className="w-64 flex justify-end">
          <UserFeatures />
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <Sidebar onSelect={setSelectedItem} />
        </div>
        <div className="flex-grow overflow-hidden">
          <RenderWindow selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}
