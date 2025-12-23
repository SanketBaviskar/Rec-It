import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { useMarketingConfig } from "../useMarketingConfig";

export default function EmailSettings() {
	const { config, updateConfig } = useMarketingConfig();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Mail className="h-5 w-5 text-primary" />
					<div>
						<CardTitle>Email Settings</CardTitle>
						<CardDescription>
							Configure email sender information.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Enable Email Marketing</Label>
						<p className="text-xs text-muted-foreground">
							Allow sending marketing emails to members.
						</p>
					</div>
					<Switch
						checked={config.emailEnabled}
						onCheckedChange={(c) =>
							updateConfig({ emailEnabled: c })
						}
					/>
				</div>

				{config.emailEnabled && (
					<>
						<Separator />
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Sender Name</Label>
								<Input
									value={config.senderName}
									onChange={(e) =>
										updateConfig({
											senderName: e.target.value,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Sender Email</Label>
								<Input
									type="email"
									value={config.senderEmail}
									onChange={(e) =>
										updateConfig({
											senderEmail: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label>Reply-To Email</Label>
							<Input
								type="email"
								value={config.replyToEmail}
								onChange={(e) =>
									updateConfig({
										replyToEmail: e.target.value,
									})
								}
							/>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
