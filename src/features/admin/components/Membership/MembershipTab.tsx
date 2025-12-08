import { useState } from "react";
import MembershipAndPasses from "./MembershipAndPasses";
import MembershipSettings from "./MembershipSettings";

export type ActiveComponents = "membershipSettings" | "membershipAndPasses";

export default function MembershipTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponents | null>(null);
  
  const componentMap: Record<ActiveComponents, React.ReactNode> = {
    membershipSettings: (
      <MembershipSettings onComplete={() => setActiveComponent(null)} />
    ),
    membershipAndPasses: (
      <MembershipAndPasses onComplete={() => setActiveComponent(null)} />
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
