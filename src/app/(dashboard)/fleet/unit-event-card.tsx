import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUnitInfo, getUnitLatestEvent } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BatteryCharging, Sun } from "lucide-react";

export default async function UnitEventCard({
	imei,
	light,
}: { imei: string; light?: boolean }) {
	const unitEvent = await getUnitLatestEvent(imei);
	const vehicle = await getUnitInfo(imei);

	if (!unitEvent || !vehicle) {
		return <div>Unit not found</div>;
	}

	const batTypeMap = {
		0: "Undefined",
		1: "Lead-Acid",
		2: "Lead-Acid",
		3: "Gel",
		4: "Lithium",
	};
	const batType = batTypeMap[vehicle.battery_type ? vehicle.battery_type : 0];

	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex flex-row gap-2">
				<Sun />
				<p className="font-bold">
					{vehicle.panel_size ? vehicle.panel_size : "Undefined"} Wp
				</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<EventStatCard
					light={light}
					value={unitEvent.panel_volt}
					unit="V"
					title="Volts"
				/>
				<EventStatCard
					light={light}
					value={unitEvent.panel_amps}
					unit="A"
					title="Amps"
				/>
				<EventStatCard
					light={light}
					value={unitEvent.panel_volt * unitEvent.panel_amps}
					unit="W"
					title="Watts"
				/>
			</div>
			<div className="flex flex-row gap-2">
				<BatteryCharging />
				<p className="font-bold">
					{vehicle.battery_voltage
						? `${vehicle.battery_voltage}V`
						: "Undefined"}{" "}
					/ {batType}
				</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<EventStatCard
					light={light}
					value={unitEvent.battery_volt}
					unit="V"
					title="Volts"
				/>
				<EventStatCard
					light={light}
					value={unitEvent.battery_amps}
					unit="A"
					title="Amps"
				/>
			</div>
		</div>
	);
}

function EventStatCard({
	value,
	unit,
	title,
	light,
}: { value: number; unit: string; title: string; light?: boolean }) {
	return (
		<Card
			className={cn(
				"p-2 min-w-16 min-h-16 aspect-square",
				light ? "" : "bg-neutral-100 dark:bg-neutral-800",
			)}
		>
			<p>{title}</p>
			<p className="font-bold">
				{value.toLocaleString("da-DK", {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1,
				})}{" "}
				{unit}
			</p>
		</Card>
	);
}

export function UnitEventCardSkeleton() {
	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex flex-row gap-2">
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="w-16 h-16 rounded-lg" />
				<Skeleton className="w-16 h-16 rounded-lg" />
				<Skeleton className="w-16 h-16 rounded-lg" />
			</div>
			<div className="flex flex-row gap-2">
				<Skeleton className="h-6 w-full" />
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="w-16 h-16 rounded-lg" />
				<Skeleton className="w-16 h-16 rounded-lg" />
			</div>
		</div>
	);
}
