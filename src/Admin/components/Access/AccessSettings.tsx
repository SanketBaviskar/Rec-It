"use client";

import { useState } from "react";
import {AccessSettingsForm} from "./AccessSettingTab";
// import AccessProfiles from "./AccessProfiles";
// import IdentificationTypes from "./IdentificationTypes";
// import SuspensionSettings from "./SuspensionSettings";

type ActiveComponent =
  | "accessSettingsForm"
  | "accessProfiles"
  | "identificationTypes"
  | "suspensionSettings";

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    "accessSettingsForm"
  ); // Default to the first component

  const renderActiveComponent = () => {
    const componentMap: Record<ActiveComponent, React.ReactNode> = {
      accessSettingsForm: (
        <AccessSettingsForm
          onComplete={() => setActiveComponent("accessSettingsForm")}
        />
      ),
      // accessProfiles: (
      //   <AccessProfiles
      //     onComplete={() => setActiveComponent("accessProfiles")}
      //   />
      // ),
      // identificationTypes: (
      //   <IdentificationTypes
      //     onComplete={() => setActiveComponent("identificationTypes")}
      //   />
      // ),
      // suspensionSettings: (
      //   <SuspensionSettings
      //     onComplete={() => setActiveComponent("suspensionSettings")}
      //   />
      // ),
    };

    return componentMap[activeComponent];
  };

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
        <div className="h-full overflow-y-auto">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}
