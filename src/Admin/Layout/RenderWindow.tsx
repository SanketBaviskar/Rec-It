import { Suspense } from "react";
import { COMPONENT_REGISTRY, RegisteredComponents } from "../components/componentRegistry";
import LoadingSpinner from "@/components/ui/loadingSpinner";

// 1. Add proper component type
type LazyComponent = React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;

// 2. Make props more type-safe
interface RenderWindowProps {
  activeComponent: RegisteredComponents;
  // 3. Add optional props for component communication
  componentProps?: Record<string, unknown>;
}

export default function RenderWindow({ 
  activeComponent,
  componentProps = {} 
}: RenderWindowProps) {
  // 4. Add proper type assertion for dynamic component
  const Component = COMPONENT_REGISTRY[activeComponent] as LazyComponent || COMPONENT_REGISTRY.Default;

  return (
    <Suspense 
      fallback={
        <div className="h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Component {...componentProps} />
    </Suspense>
  );
}