import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const CERT_DATA = [
	{
		id: 1,
		staffName: "Jessica Pearson",
		cert: "WSI (Water Safety Instructor)",
		expiry: "2023-12-01",
		status: "Expired",
	},
	{
		id: 2,
		staffName: "Mike Ross",
		cert: "CPR/AED Level C",
		expiry: "2024-01-15",
		status: "Expiring Soon",
	},
	{
		id: 3,
		staffName: "B. Wayne",
		cert: "First Aid",
		expiry: "2025-06-20",
		status: "Valid",
	},
	{
		id: 4,
		staffName: "D. Prince",
		cert: "Lifeguard NLS",
		expiry: "2024-02-01",
		status: "Expiring Soon",
	},
];

export default function StaffCertifications() {
	return (
		<div className="space-y-6 h-full p-8 md:p-10 pt-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">
					Certification Tracker
				</h2>
				<p className="text-muted-foreground">
					Monitor validities of critical staff qualifications.
				</p>
			</div>

			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Staff Member</TableHead>
							<TableHead>Certification</TableHead>
							<TableHead>Expiry Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{CERT_DATA.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">
									{item.staffName}
								</TableCell>
								<TableCell>{item.cert}</TableCell>
								<TableCell>{item.expiry}</TableCell>
								<TableCell>
									{item.status === "Expired" && (
										<Badge variant="destructive">
											<AlertTriangle className="mr-1 h-3 w-3" />{" "}
											Expired
										</Badge>
									)}
									{item.status === "Expiring Soon" && (
										<Badge
											variant="outline"
											className="border-yellow-500 text-yellow-500"
										>
											<Clock className="mr-1 h-3 w-3" />{" "}
											Warning
										</Badge>
									)}
									{item.status === "Valid" && (
										<Badge
											variant="default"
											className="bg-green-600 hover:bg-green-700"
										>
											<CheckCircle className="mr-1 h-3 w-3" />{" "}
											Good
										</Badge>
									)}
								</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="sm">
										Log Renewal
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
