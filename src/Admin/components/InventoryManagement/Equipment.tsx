import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddNewEquipmentForm from "./AddNewEquipment"; // Import the form component
import { getEquipmentById } from "@/Services/Api/Admin/Equipment/getEquipmentById";

interface Equipment {
  id: string;
  name: string;
  code: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  replacementFees: number;
  location: string;
  inventoryId: number;
}
const Equipment = ({ equipmentId }: { equipmentId: string }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [currentEquipment, setCurrentEquipment] = useState<Equipment | undefined>();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipmentById(equipmentId);
        setCurrentEquipment(response.data);
        console.log("Equipment fetched:", response);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
      }
    };
    fetchEquipment();
  }, [equipmentId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <AddNewEquipmentForm
        onComplete={() => console.log("Equipment added")}
        equipment={currentEquipment}
        mode="edit"
        equipmentId = {equipmentId}
      />
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentList.map((equipment) => (
              <TableRow key={equipment.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{equipment.name}</TableCell>
                <TableCell>{equipment.code}</TableCell>
                <TableCell>{equipment.quantity}</TableCell>
                <TableCell>${equipment.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(equipment)}
                      className="hover:bg-gray-100"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(equipment.id)}
                      className="hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
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
