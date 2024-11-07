// src/pages/Dashboard/tabs/FacilitiesTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Button  from "../../../../components/Button/Button"

export default function FacilitiesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facility Management</CardTitle>
        <CardDescription>Manage and maintain recreational facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Add New Facility</Button>
      </CardContent>
    </Card>
  )
}
