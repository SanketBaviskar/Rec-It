import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWindow from "../Pages/MainWindow/MainWindow";
import Login from "@/Pages/Login/Login";
import AdminDashboard from "@/Admin/Layout/AdminDashboard";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          {/* Root login page */}
          <Route path="/" element={<Login />} />

          {/* Main dashboard */}
          <Route path="/dashboard" element={<MainWindow />} />

          {/* Admin dashboard with nested routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
