import { Route, Routes, Navigate } from "react-router-dom";
import { AppSidebar } from "./NavBar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import InventoryManagement from "./InvenntoryManagement/InventoryManagement";
import MainWindow from "./MainWindow"; // Use this as the main view container for Admin Dashboard
import Equipments from "./InvenntoryManagement/components/Equipments";

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <MainWindow/>
        </SidebarInset>
      </aside>
    </SidebarProvider>
  );
}
