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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function AccessRulesConfig() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">
					Access Control & Check-in
				</h3>
				<p className="text-sm text-muted-foreground">
					Manage physical access rules and hardware integration.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Hardware Integration</CardTitle>
					<CardDescription>
						Configure entry points and scanner types.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Primary Entry Method</Label>
							<Select defaultValue="barcode">
								<SelectTrigger>
									<SelectValue placeholder="Select method" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="barcode">
										Barcode / QR Code
									</SelectItem>
									<SelectItem value="rfid">
										RFID / NFC Card
									</SelectItem>
									<SelectItem value="biometric">
										Biometric (Fingerprint)
									</SelectItem>
									<SelectItem value="manual">
										Manual Staff Check-in
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Scanner Device Driver</Label>
							<Select defaultValue="hid">
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hid">
										Generic HID Keyboard
									</SelectItem>
									<SelectItem value="serial">
										Serial Port (COM)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Check-in Validation Logic</CardTitle>
					<CardDescription>
						Define conditions that trigger a "Red Flag" (Deny
						Access) at the turnstile.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Deny if Membership is Inactive/Expired</Label>
						<Switch defaultChecked disabled />
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col">
							<Label>
								Deny if Outstanding Balance Exceeds Limit
							</Label>
							<span className="text-xs text-muted-foreground">
								Blocks entry if user owes money.
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm">$</span>
								<Input
									type="number"
									className="w-20"
									defaultValue="50"
								/>
							</div>
							<Switch defaultChecked />
						</div>
					</div>
					<div className="flex items-center justify-between">
						<Label>Deny if Liability Waiver Unsigned</Label>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label>Deny if Profile Photo Missing</Label>
						<Switch />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Guest Policy</CardTitle>
					<CardDescription>
						Manage improved guest access rules.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<Label>Max Guests Per Member Per Month</Label>
						<Input
							type="number"
							defaultValue="2"
							className="w-24"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
