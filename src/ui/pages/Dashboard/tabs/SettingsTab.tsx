// src/pages/Dashboard/tabs/SettingsTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Button  from "../../../../components/Button/Button"

export default function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure system settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  )
}
