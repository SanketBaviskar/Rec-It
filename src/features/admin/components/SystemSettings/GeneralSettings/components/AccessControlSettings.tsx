import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Scan } from "lucide-react";

export default function AccessControlSettings() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Access Control & IDs</h3>
				<p className="text-sm text-muted-foreground">
					Manage physical access, scanners, and ID card templates.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Barcode Scanner Configuration</CardTitle>
					<CardDescription>
						Configure how member ID cards are scanned at entry
						points.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-start gap-4 p-4 border rounded-md bg-muted/50">
						<Scan className="h-6 w-6 text-primary mt-1" />
						<div>
							<h4 className="font-medium">Scanner Integration</h4>
							<p className="text-sm text-muted-foreground">
								Ensure your barcode scanner is configured as a
								HID (Human Interface Device) keyboard wedge. The
								system listens for input ending with an 'Enter'
								keypress.
							</p>
						</div>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="barcodePrefix">
							Barcode Prefix (Optional)
						</Label>
						<Input
							id="barcodePrefix"
							placeholder="e.g. REC-"
							description="If your cards have a specific prefix (e.g. REC-1001), enter it here to filter invalid scans."
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Access Rules</CardTitle>
					<CardDescription>
						Define conditions for denying entry upon scan.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-1">
							<Label className="text-base">
								Deny Expired Memberships
							</Label>
							<span className="text-sm text-muted-foreground">
								Automatically flag scans from expired accounts.
							</span>
						</div>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-1">
							<Label className="text-base">
								Deny Wavier Incomplete
							</Label>
							<span className="text-sm text-muted-foreground">
								Prevent entry if liability waiver is not signed.
							</span>
						</div>
						<Switch defaultChecked />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
