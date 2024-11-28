import Logo from "./Logo";
import UniversalSearch from "./UniversalSearch";
import RenderWindow from "./RenderWindow";
import UserFeatures from "./UserFeatures";
import Sidebar from "./SideBar";


export default function AdminDashboard() {
  return (
    <div className="h-screen flex flex-col ">
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
      <div className="flex flex-grow h-[93vh]">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-50 p-6">
          <RenderWindow />
        </div>
      </div>
    </div>
  );
}
