// src/pages/Dashboard/tabs/SalesTab.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { salesData } from "../chartConfig/chartData"

export default function SalesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>View and manage sales and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="var(--color-sales)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
