// src/pages/Dashboard/tabs/ReportsTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Button  from "../../../../components/Button/Button"
import { FileBarChart } from 'lucide-react'

export default function ReportsTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Reports</CardTitle>
        <FileBarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription>Generate and view various reports</CardDescription>
        <Button className="mt-4">Generate Report</Button>
      </CardContent>
    </Card>
  )
}
