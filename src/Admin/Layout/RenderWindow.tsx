import InventoryManagementTab from "../components/InventoryManagement/InventoryManagementTab";
import AccessSettingsTab from "../components/Access/AccessSettings";

export default function RenderWindow({ activeComponent }) {
  return (
    <>
      {activeComponent === "Default" && (
        <div>
          After clicking options from the sidebar, we will show different
          components here.
        </div>
      )}
      {activeComponent === "Access Settings" && <AccessSettingsTab />}
      {activeComponent === "Manage Inventory" && <InventoryManagementTab />}
      {activeComponent === "Reports" && (
        <div>This is the Reports Tab</div>
      )}
    </>
  );
}
