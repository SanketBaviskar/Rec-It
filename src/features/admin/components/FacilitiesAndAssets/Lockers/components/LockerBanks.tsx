import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Lock, Plus, Edit, Trash2 } from "lucide-react";
import { useLockerConfig } from "../useLockerConfig";

export default function LockerBanks() {
	const { lockerBanks, removeLockerBank, addLockerBank } = useLockerConfig();

	const handleAddBank = () => {
		addLockerBank({
			name: "New Bank",
			location: "Location",
			total: 50,
			available: 50,
			active: true,
		});
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Lock className="h-5 w-5 text-primary" />
						<div>
							<CardTitle>Locker Banks</CardTitle>
							<CardDescription>
								Manage locker locations and availability.
							</CardDescription>
						</div>
					</div>
					<Button size="sm" onClick={handleAddBank}>
						<Plus className="h-4 w-4 mr-2" />
						Add Bank
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Bank Name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Available</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-24">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lockerBanks.map((bank) => (
							<TableRow key={bank.id}>
								<TableCell className="font-medium">
									{bank.name}
								</TableCell>
								<TableCell>{bank.location}</TableCell>
								<TableCell>{bank.total}</TableCell>
								<TableCell>
									<Badge
										variant={
											bank.available > 10
												? "default"
												: "destructive"
										}
									>
										{bank.available}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										variant={
											bank.active
												? "default"
												: "secondary"
										}
									>
										{bank.active ? "Active" : "Inactive"}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-destructive hover:bg-destructive/10"
											onClick={() =>
												removeLockerBank(bank.id)
											}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
						{lockerBanks.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center text-muted-foreground h-24"
								>
									No locker banks configured. Click "Add Bank"
									to create one.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
