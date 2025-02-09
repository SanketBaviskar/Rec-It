import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InventoryList from "./InventoryList";
import { RegisteredComponents } from "../componentRegistry";
import RenderWindow from "@/Admin/Layout/RenderWindow";
import { fetchInventoryCategories } from "@/Services/Api/Equipment/inventorySidebar";
import { deleteInventory } from "@/Services/Api/Admin/Inventory/deleteInventory"; // Add this import
import { useToast } from "@/components/ui/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function InventoryManagementTab() {
  const { toast } = useToast();
  const [activeComponent, setActiveComponent] =
    useState<RegisteredComponents | null>(null);
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>(
    {}
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [deletingCategory, setDeletingCategory] = useState<number | null>(null);

  // Add a handler for category selection
  const handleCategorySelect = (categoryId: string) => {
    
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    try {
      const response = await deleteInventory(deletingCategory);
      toast({
        title: response.status === "success" ? "Success" : "Error",
        description: response.message || "Inventory deleted successfully",
        variant: response.status === "success" ? "default" : "destructive",
      });
      await loadCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete inventory",
        variant: "destructive",
      });
      console.error("Delete inventory error:", error);
    } finally {
      setDeletingCategory(null);
    }
  };

  // Update loadCategories to handle cache properly
  const loadCategories = async () => {
    try {
      // Add cache-buster to prevent stale data
      const response = await fetchInventoryCategories({ ts: Date.now() });
      if (response.status === "success") {
        setCategories(response.data?.items || []);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    }
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-64 border-r bg-background p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Inventory List</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveComponent("AddNewInventoryForm")}
            aria-label="Add New Inventory"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <InventoryList
          categories={categories}
          onCategorySelect={handleCategorySelect}
          onAddEquipment={(id, name) => {
            setActiveComponent("AddNewEquipmentForm");
            setComponentProps({ categoryId: id, catagoryName:name});
            
          }}
          onDeleteCategory={(id) => setDeletingCategory(id)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
        {!activeComponent && (
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="h-full overflow-y-auto">
          {activeComponent ? (
            <RenderWindow
              activeComponent={activeComponent}
              componentProps={{
                onComplete: () => {
                  setActiveComponent(null);
                  loadCategories(); // Refresh categories when closing
                },
                categoryId: componentProps.categoryId,
                categoryName: componentProps.catagoryName,
              }}
            />
          ) : (
            <p className="text-center text-muted-foreground">
              Welcome to Inventory Management. Please select an action.
            </p>
          )}
        </div>
      </div>

      <AlertDialog open={!!deletingCategory}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              inventory and remove all associated equipment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingCategory(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Inventory
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
