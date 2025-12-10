import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWindow from "@/pages/MainWindow/MainWindow";
import Login from "@/pages/Login/Login";
import AdminDashboard from "@/features/admin/Layout/AdminDashboard";

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
						/>
					</Routes>
				</Router>
			</TooltipProvider>
		</ThemeProvider>
	);
}

export default App;
