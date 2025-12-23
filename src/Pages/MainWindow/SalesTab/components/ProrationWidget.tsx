interface ProrationWidgetProps {
	semesterStart: Date;
	semesterEnd: Date;
	purchaseDate: Date;
}

export function ProrationWidget({
	semesterStart,
	semesterEnd,
	purchaseDate,
}: ProrationWidgetProps) {
	const totalDays =
		(semesterEnd.getTime() - semesterStart.getTime()) /
		(1000 * 60 * 60 * 24);
	const elapsedDays =
		(purchaseDate.getTime() - semesterStart.getTime()) /
		(1000 * 60 * 60 * 24);
	const remainingDays = totalDays - elapsedDays;

	const pastPercent = Math.max(
		0,
		Math.min(100, (elapsedDays / totalDays) * 100)
	);
	const activePercent = Math.max(
		0,
		Math.min(100 - pastPercent, (remainingDays / totalDays) * 100)
	);

	const formatDate = (date: Date) =>
		date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

	const prorationAmount = (remainingDays / totalDays) * 100;

	return (
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center justify-between mb-2">
				<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
					Billing Period
				</span>
				<span className="text-xs font-semibold text-primary">
					{prorationAmount.toFixed(0)}% of semester
				</span>
			</div>

			{/* Visual Timeline Bar */}
			<div className="relative h-3 rounded-full overflow-hidden bg-muted mb-2">
				{/* Past (Elapsed) - Grey */}
				<div
					className="absolute top-0 left-0 h-full bg-zinc-500/50 transition-all"
					style={{ width: `${pastPercent}%` }}
				/>
				{/* Active (Paying Today) - Green/Primary */}
				<div
					className="absolute top-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
					style={{
						left: `${pastPercent}%`,
						width: `${activePercent}%`,
					}}
				/>
				{/* Today Marker */}
				<div
					className="absolute top-0 w-0.5 h-full bg-white shadow-lg"
					style={{ left: `${pastPercent}%` }}
				/>
			</div>

			{/* Date Labels */}
			<div className="flex justify-between text-[10px] text-muted-foreground">
				<span>{formatDate(semesterStart)}</span>
				<span className="font-medium text-foreground">
					Today: {formatDate(purchaseDate)}
				</span>
				<span>{formatDate(semesterEnd)}</span>
			</div>

			{/* Legend */}
			<div className="flex gap-4 mt-2 pt-2 border-t border-border/50">
				<div className="flex items-center gap-1.5 text-[10px]">
					<div className="w-2.5 h-2.5 rounded-sm bg-zinc-500/50" />
					<span className="text-muted-foreground">Elapsed</span>
				</div>
				<div className="flex items-center gap-1.5 text-[10px]">
					<div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-emerald-500 to-emerald-400" />
					<span className="text-muted-foreground">Paying Today</span>
				</div>
			</div>
		</div>
	);
}
