// src/pages/Dashboard/tabs/ManageTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Button  from "../../../../components/Button/Button"

export default function ManageTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Activities</CardTitle>
        <CardDescription>Add, edit, or remove recreational activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Add New Activity</Button>
      </CardContent>
    </Card>
  )
}
