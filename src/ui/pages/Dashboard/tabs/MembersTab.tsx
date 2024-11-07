// src/pages/Dashboard/tabs/MembersTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Button  from "../../../../components/Button/Button"

export default function MembersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Management</CardTitle>
        <CardDescription>View and manage member information</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Add New Member</Button>
      </CardContent>
    </Card>
  )
}
