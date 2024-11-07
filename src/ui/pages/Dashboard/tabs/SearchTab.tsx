import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/index"
import  Input  from "../../../../components/Input/Input"

export default function SearchTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>Search for members, facilities, or activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="search" placeholder="Search..." className="max-w-sm" value={""} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error("Function not implemented.")
              } } />
      </CardContent>
    </Card>
  )
}
