import { Suspense } from "react";
import { COMPONENT_REGISTRY, RegisteredComponents } from "../components/componentRegistry";
import LoadingSpinner from "@/components/ui/loadingSpinner";

export default function RenderWindow({ activeComponent }: { activeComponent: RegisteredComponents }) {
  const Component = COMPONENT_REGISTRY[activeComponent] || COMPONENT_REGISTRY.Default;
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component onComplete={function (): void {
        throw new Error("Function not implemented.");
      } } categoryId={""} />
    </Suspense>
  );
}