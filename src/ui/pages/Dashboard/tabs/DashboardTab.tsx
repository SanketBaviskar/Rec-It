// src/pages/Dashboard/tabs/DashboardTab.tsx

import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/index'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { salesData } from '../chartConfig/chartData'
const hasData = salesData
console.log(hasData)

export default function DashboardTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
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
