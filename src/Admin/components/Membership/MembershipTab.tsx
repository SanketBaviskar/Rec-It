import MembershipAndPasses from "./MembershipAndPasses";
import MembershipSettings from "./MembershipSettings";

export type ActiveComponents = "membershipSettings" | "membershipAndPasses";
export default function MembershipTab() {
    const componentMap: Record<ActiveComponents, React.ReactNode> = {
        membershipSettings: (<MembershipSettings onComplete = {() => setActiveComponent("membershipSettings")} />),
        membershipAndPasses: <MembershipAndPasses onComplete = {() => setActiveComponent("membershipAndPasses")}/>
    };
    

    return(
        <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
        <div className="h-full overflow-y-auto">{renderActiveComponent()}</div>
      </div>
    </div>
    )
};
