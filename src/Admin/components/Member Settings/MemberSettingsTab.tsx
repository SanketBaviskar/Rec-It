import { useState } from "react";
import MemberTypes from "./MemberTypes";

export type ActiveComponents = "memberTypes";

export default function MemberSettingsTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponents | null>(null);
  
  const componentMap = {
    memberTypes: (
      <MemberTypes onComplete={() => setActiveComponent(null)} />
    )
  };

  const renderActiveComponent = () => {
    if (!activeComponent) return null;
    return componentMap[activeComponent];
  };

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
        <div className="h-full overflow-y-auto">
          {activeComponent ? (
            renderActiveComponent()
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a section from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
