'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast" // shadcn's useToast hook
import { Search } from 'lucide-react'

interface EquipmentItem {
  id: number
  name: string
  itemNumber: string
  checkedOutBy: string
  checkedOutDate: string
  dueDate: string
}

interface EquipmentManagementProps {
  initialItems: EquipmentItem[]
}

export function EquipmentManage({ initialItems }: EquipmentManagementProps) {
    
  const [checkedOutItems, setCheckedOutItems] = useState<EquipmentItem[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState<EquipmentItem[]>(initialItems)

  // Use the toast hook from shadcn
  const { toast } = useToast()

  // Handle item check-in
  const handleCheckIn = (id: number) => {
    // Remove the checked-in item from the list
    setCheckedOutItems(prevItems => prevItems.filter(item => item.id !== id))

    // Trigger the toast
    toast({
      title: "Item Checked In",
      description: "The item has been successfully checked in.",
    })
  }

  // Filter items based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = checkedOutItems.filter(item =>
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.itemNumber.toLowerCase().includes(lowercasedQuery) ||
      item.checkedOutBy.toLowerCase().includes(lowercasedQuery)
    )
    setFilteredItems(filtered)
  }, [searchQuery, checkedOutItems])

  return (
    <div className="p-4 h-[83vh] flex flex-col">
      <h2 className="text-xl font-bold mb-4">Equipment Management</h2>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
          <TableRow >
            <TableHead>Item Name</TableHead>
            <TableHead>Item Number</TableHead>
            <TableHead>Checked Out By</TableHead>
            <TableHead>Checked Out Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[10vh]">
          {filteredItems.map((item) => (
            <TableRow key={item.id} className="h-[1vh] !important">
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.itemNumber}</TableCell>
              <TableCell>{item.checkedOutBy}</TableCell>
              <TableCell>{item.checkedOutDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCheckIn(item.id)}
                >
                  Check In
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Render the Toaster to handle toast notifications */}
      <Toaster />
    </div>
  )
}
