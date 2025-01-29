import { lazy } from "react";

export const COMPONENT_REGISTRY = {
  "Default": lazy(() => import("./DefaultView")),
  "Access Settings": lazy(() => import("./Access/AccessSettingTab")),
  "Suspension Settings": lazy(() => import("./Access/SuspensionSettingTab")),
  "Manage Inventory": lazy(() => import("./InventoryManagement/InventoryManagementTab")),
//   "Reports": lazy(() => import("./Reports/ReportsTab")),
  "AddNewInventoryForm": lazy(() => import("./InventoryManagement/AddNewInventory")),
  "AddNewEquipmentForm": lazy(() => import("./InventoryManagement/AddNewEquipment")),
  "MembershipSettings": lazy(() => import("./Membership/MembershipSettings"))
} as const;

export type RegisteredComponents = keyof typeof COMPONENT_REGISTRY;