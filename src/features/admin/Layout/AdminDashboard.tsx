import { useState } from "react";
import Logo from "./Header/Logo";
import UniversalSearch from "./Header/UniversalSearch";
import { Outlet } from "react-router-dom";
import UserFeatures from "./Header/UserFeatures";
import Sidebar from "./SideBar/SideBar";
import AdminDashboardFooter from "./Footer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
				{/* Pass state if you want to collapse sidebar, currently just rendering it */}
				<Sidebar onItemClick={() => {}} />
				<div className="flex-1 bg-gray-50 overflow-auto">
					<Outlet />
				</div>
			</main>

			{/* Footer Section */}
			<AdminDashboardFooter />
		</div>
	);
}
