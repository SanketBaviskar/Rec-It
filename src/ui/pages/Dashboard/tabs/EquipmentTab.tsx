// src/pages/Dashboard/tabs/ManageTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  {BaseButton}  from "../../../../components/Button/BaseButton"

export default function ManageTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Activities</CardTitle>
        <CardDescription>Add, edit, or remove recreational activities</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseButton>Add New Activity</BaseButton>
      </CardContent>
    </Card>
  )
}
