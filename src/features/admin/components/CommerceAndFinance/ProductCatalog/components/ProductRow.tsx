import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PackageOpen } from "lucide-react";
import { Equipment } from "@/services/Api/Equipment/fetchEquipments";

interface ProductRowProps {
	product: Equipment;
	onEditProduct: (product: Equipment) => void;
	onReportDamage: (product: Equipment) => void;
	onViewItems: (product: Equipment) => void;
}

export function ProductRow({
	product,
	onEditProduct,
	onReportDamage,
	onViewItems,
}: ProductRowProps) {
	return (
		<TableRow key={product.id}>
			<TableCell>
				<div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					) : (
						<PackageOpen className="h-5 w-5 text-slate-300" />
					)}
				</div>
			</TableCell>
			<TableCell className="font-medium">{product.name}</TableCell>
			<TableCell className="font-mono text-xs text-muted-foreground">
				{product.code}
			</TableCell>
			<TableCell>{product.location}</TableCell>
			<TableCell className="text-right">
				<Badge
					variant={product.quantity > 0 ? "secondary" : "destructive"}
				>
					{product.quantity > 0
						? `${product.quantity} in stock`
						: "Out of Stock"}
				</Badge>
			</TableCell>
			<TableCell className="text-right">
				{product.price ? `$${product.price.toFixed(2)}` : "-"}
			</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => onEditProduct(product)}
						>
							Edit Details
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onViewItems(product)}>
							View Items
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onReportDamage(product)}
						>
							Report Damage
						</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600">
							Delete Product
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
