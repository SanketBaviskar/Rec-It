import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWindow from "@/pages/MainWindow/MainWindow";
import Login from "@/pages/Login/Login";
import AdminDashboard from "@/features/admin/Layout/AdminDashboard";
import DefaultView from "@/features/admin/components/Dashboard/DefaultView";
import SpaceManagementTab from "@/features/admin/components/FacilitiesAndAssets/FacilityManagement/SpaceManagementTab";

import ProductCatalog from "@/features/admin/components/CommerceAndFinance/ProductCatalog/ProductCatalog";
import AccessSettingTab from "@/features/admin/components/Operations/Access/AccessSettingTab";
import SuspensionSettingTab from "@/features/admin/components/Operations/Access/SuspensionSettingTab";
import MembershipSettings from "@/features/admin/components/MembersAndUsers/Memberships/MembershipSettings";
import MembershipAndPasses from "@/features/admin/components/MembersAndUsers/Memberships/MembershipAndPasses";
import MemberSettings from "@/features/admin/components/MembersAndUsers/Directory/MemberSettings";
import StaffList from "@/features/admin/components/MembersAndUsers/Staff/StaffList";
import RoleManager from "@/features/admin/components/SystemSettings/StaffRoles/RoleManager";
import GeneralSettings from "@/features/admin/components/SystemSettings/GeneralSettings/GeneralSettings";

// New configuration components
import POSConfig from "@/features/admin/components/Operations/POSConfig/POSConfig";
import EquipmentPolicyConfig from "@/features/admin/components/Operations/EquipmentConfig/EquipmentPolicyConfig";
import IntramuralsConfig from "@/features/admin/components/ProgramsAndActivities/Intramurals/IntramuralsConfig";
import GroupFitnessConfig from "@/features/admin/components/ProgramsAndActivities/GroupFitness/GroupFitnessConfig";
import AquaticsConfig from "@/features/admin/components/ProgramsAndActivities/Aquatics/AquaticsConfig";
import IncidentConfig from "@/features/admin/components/RiskAndCompliance/Incidents/IncidentConfig";
import WaiverConfig from "@/features/admin/components/RiskAndCompliance/Waivers/WaiverConfig";
import LockerConfig from "@/features/admin/components/FacilitiesAndAssets/Lockers/LockerConfig";
import CertificationConfig from "@/features/admin/components/RiskAndCompliance/Certifications/CertificationConfig";
import MarketingConfig from "@/features/admin/components/Engagement/Marketing/MarketingConfig";
import PersonalTrainingConfig from "@/features/admin/components/ProgramsAndActivities/PersonalTraining/PersonalTrainingConfig";
import OutdoorAdventuresConfig from "@/features/admin/components/ProgramsAndActivities/OutdoorAdventures/OutdoorAdventuresConfig";
import SchedulingConfig from "@/features/admin/components/FacilitiesAndAssets/Scheduling/SchedulingConfig";

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
				<Router
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true,
					}}
				>
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
								element={<SpaceManagementTab />}
							/>

							<Route
								path="inventory"
								element={<ProductCatalog />}
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
								path="member-settings"
								element={<MemberSettings />}
							/>
							<Route
								path="general-settings"
								element={<GeneralSettings />}
							/>
							<Route path="staff" element={<StaffList />} />
							<Route
								path="staff-roles"
								element={<RoleManager />}
							/>
							{/* New Configuration Routes */}
							<Route path="pos-config" element={<POSConfig />} />
							<Route
								path="equipment-config"
								element={<EquipmentPolicyConfig />}
							/>
							<Route
								path="intramurals"
								element={<IntramuralsConfig />}
							/>
							<Route
								path="group-fitness"
								element={<GroupFitnessConfig />}
							/>
							<Route
								path="aquatics"
								element={<AquaticsConfig />}
							/>
							<Route
								path="incidents"
								element={<IncidentConfig />}
							/>
							<Route path="waivers" element={<WaiverConfig />} />
							<Route path="lockers" element={<LockerConfig />} />
							<Route
								path="certifications"
								element={<CertificationConfig />}
							/>
							<Route
								path="marketing"
								element={<MarketingConfig />}
							/>
							<Route
								path="personal-training"
								element={<PersonalTrainingConfig />}
							/>
							<Route
								path="outdoor-adventures"
								element={<OutdoorAdventuresConfig />}
							/>
							<Route
								path="scheduling"
								element={<SchedulingConfig />}
							/>
						</Route>
					</Routes>
				</Router>
			</TooltipProvider>
		</ThemeProvider>
	);
}

export default App;
