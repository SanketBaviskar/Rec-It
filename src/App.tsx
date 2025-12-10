import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWindow from "@/pages/MainWindow/MainWindow";
import Login from "@/pages/Login/Login";
import AdminDashboard from "@/features/admin/Layout/AdminDashboard";
import DefaultView from "@/features/admin/components/DefaultView";
import FacilityManagementTab from "@/features/admin/components/FacilityManagement/FacilityManagementTab";
import FacilityCategories from "@/features/admin/components/FacilityManagement/FacilityCategories";
import InventoryManagementTab from "@/features/admin/components/InventoryManagement/InventoryManagementTab";
import AccessSettingTab from "@/features/admin/components/Access/AccessSettingTab";
import SuspensionSettingTab from "@/features/admin/components/Access/SuspensionSettingTab";
import MembershipSettings from "@/features/admin/components/Membership/MembershipSettings";
import MembershipAndPasses from "@/features/admin/components/Membership/MembershipAndPasses";
import MemberTypes from "@/features/admin/components/Member Settings/MemberTypes";

function App() {
	return (
		<ThemeProvider
			defaultTheme="light"
			storageKey="vite-ui-theme"
			attribute="class"
		>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<Router>
					<Routes>
						{/* Root login page */}
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />

						{/* Main dashboard */}
						<Route path="/dashboard" element={<MainWindow />} />

						{/* Admin dashboard with nested routes */}
						<Route
							path="/admin-dashboard"
							element={<AdminDashboard />}
						>
							<Route index element={<DefaultView />} />
							<Route
								path="facilities"
								element={<FacilityManagementTab />}
							/>
							<Route
								path="facility-categories"
								element={<FacilityCategories />}
							/>
							<Route
								path="inventory"
								element={<InventoryManagementTab />}
							/>
							<Route
								path="access"
								element={<AccessSettingTab />}
							/>
							<Route
								path="suspension"
								element={<SuspensionSettingTab />}
							/>
							<Route
								path="memberships"
								element={<MembershipSettings />}
							/>
							<Route
								path="passes"
								element={<MembershipAndPasses />}
							/>
							<Route
								path="member-types"
								element={<MemberTypes />}
							/>
						</Route>
					</Routes>
				</Router>
			</TooltipProvider>
		</ThemeProvider>
	);
}

export default App;
