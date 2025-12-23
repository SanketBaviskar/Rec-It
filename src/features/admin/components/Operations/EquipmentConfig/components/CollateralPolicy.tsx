import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Key } from "lucide-react";
import { useEquipmentPolicy } from "../useEquipmentPolicy";

export default function CollateralPolicy() {
	const { config, updateConfig } = useEquipmentPolicy();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Key className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Collateral Policy</CardTitle>
						<CardDescription>
							Manage physical collateral requirements for returns.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Require Collateral</Label>
						<p className="text-xs text-muted-foreground">
							Staff must collect an item (e.g., ID card) during
							checkout.
						</p>
					</div>
					<Switch
						checked={config.requireCollateral}
						onCheckedChange={(c) =>
							updateConfig({ requireCollateral: c })
						}
					/>
				</div>
				{config.requireCollateral && (
					<div className="space-y-2 pt-2">
						<Label>Default Collateral Type</Label>
						<Select
							value={config.defaultCollateralType}
							onValueChange={(val) =>
								updateConfig({
									defaultCollateralType: val,
								})
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="id_card">ID Card</SelectItem>
								<SelectItem value="keys">Keys</SelectItem>
								<SelectItem value="phone">Phone</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
