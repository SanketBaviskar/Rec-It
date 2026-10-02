import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/hooks/use-toast";

import AddNewEquipmentForm from "./AddNewEquipment"; // Import the form component
import { AddNewEquipmentFormProps } from "./InventorymanagementIntetrface";
import { getEquipmentById } from "@/Services/Api/Admin/Equipment/getEquipmentById";
import {
  EquipmentItem,
  deleteEquipmentItem,
  getEquipmentItems,
} from "@/Services/Api/Admin/Equipment/equipmentItems";

interface EquipmentProps {
  equipmentId: string;
  onComplete?: () => void;
}

const Equipment = ({ equipmentId, onComplete }: EquipmentProps) => {
  const { toast } = useToast();
  const [currentEquipment, setCurrentEquipment] =
    useState<AddNewEquipmentFormProps["equipment"]>();
  const [items, setItems] = useState<EquipmentItem[]>([]);

  const loadItems = useCallback(async () => {
    try {
      setItems(await getEquipmentItems(equipmentId));
    } catch (error) {
      console.error("Failed to fetch equipment items:", error);
    }
  }, [equipmentId]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipmentById(equipmentId);
        setCurrentEquipment(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
      }
    };
    fetchEquipment();
    loadItems();
  }, [equipmentId, loadItems]);

  const handleDeleteItem = async (item: EquipmentItem) => {
    try {
      await deleteEquipmentItem(item.id);
      toast({ title: "Deleted", description: `Removed ${item.serialNumber ?? "item"}` });
      await loadItems();
    } catch {
      toast({
        title: "Error",
        description: "Could not delete this item. Checked-out items cannot be removed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <AddNewEquipmentForm
        onComplete={() => onComplete?.()}
        equipment={currentEquipment}
        mode="edit"
        equipmentId={equipmentId}
      />
      <h3 className="text-lg font-semibold mt-8 mb-3">Items ({items.length})</h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Serial Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No items tracked for this equipment
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.serialNumber ?? "-"}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "available" ? "secondary" : "outline"}>
                    {item.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{item.condition}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={item.status === "checked_out"}
                    onClick={() => handleDeleteItem(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Equipment;
