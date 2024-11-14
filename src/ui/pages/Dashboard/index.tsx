import { useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import DashboardContent from "../Dashboard/DasboardContent";
import Toolbar from "@mui/material/Toolbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      {/* Navbar Component with Active Tab Management */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Spacer Toolbar to offset content below Navbar */}
      <Toolbar /> {/* This creates space equal to the AppBar height */}
      {/* Main Content Area */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {" "}
        {/* Adjust padding as needed */}
        <DashboardContent activeTab={activeTab} />
      </Box>
    </Box>
  );
}
