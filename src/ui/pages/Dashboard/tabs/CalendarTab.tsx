// src/pages/Dashboard/tabs/FacilitiesTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  {BaseButton}  from "../../../../components/Button/BaseButton"

export default function FacilitiesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facility Management</CardTitle>
        <CardDescription>Manage and maintain recreational facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseButton>Add New Facility</BaseButton>
      </CardContent>
    </Card>
  )
}
