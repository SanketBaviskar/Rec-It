"use client";

import { useState } from "react";
import AccessSettingsTab from "./AccessSettingTab";
// import AccessProfiles from "./AccessProfiles";
// import IdentificationTypes from "./IdentificationTypes";
import SuspensionSettingsTab from "./SuspensionSettingTab";

export type ActiveComponent =
  | "accessSettingsTab"
  | "accessProfiles"
  | "identificationTypes"
  | "suspensionSettingsTab";

export default function AccessManagementTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    "accessSettingsTab"
  ); // Default to the first component

  const renderActiveComponent = () => {
    const componentMap: Record<ActiveComponent, React.ReactNode> = {
      accessSettingsTab: (
        <AccessSettingsTab
          onComplete={() => setActiveComponent("accessSettingsTab")}
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
      suspensionSettingsTab: (
        <SuspensionSettingsTab
          onComplete={() => setActiveComponent("suspensionSettingsTab")}
        />
      ),
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
