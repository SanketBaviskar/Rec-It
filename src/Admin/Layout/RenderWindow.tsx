// import InventoryManagementTab from "../components/InventoryManagement/InventoryManagementTab";
// import AccessSettingsTab from "../components/Access/AccessSettingTab";
// import SuspensionSettingsTab from "../components/Access/SuspensionSettingTab";

// export default function RenderWindow({ activeComponent }) {
//   return (
//     <>
//       {activeComponent === "Default" && (
//         <div>
//           After clicking options from the sidebar, we will show different
//           components here.
//         </div>
//       )}
//       {activeComponent === "Access Settings" && <AccessSettingsTab />}
//       {activeComponent === "Suspension Settings" && <SuspensionSettingsTab />}
//       {activeComponent === "Manage Inventory" && <InventoryManagementTab />}
//       {activeComponent === "Reports" && <div>This is the Reports Tab</div>}
//     </>
//   );
// }
import { Suspense } from "react";
import { COMPONENT_REGISTRY, RegisteredComponents } from "../components/componentRegistry";
import LoadingSpinner from "@/components/ui/loadingSpinner";

export default function RenderWindow({ activeComponent }: { activeComponent: RegisteredComponents }) {
  const Component = COMPONENT_REGISTRY[activeComponent] || COMPONENT_REGISTRY.Default;
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
}