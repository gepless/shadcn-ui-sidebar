import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUnitInfo, getUnitLatestEvent } from "@/lib/data";
import { BatteryCharging, Sun } from "lucide-react";

export default async function UnitEventCard({ imei }: { imei: string }) {
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
	const batType = batTypeMap[vehicle ? vehicle.battery_type : 0];

	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex flex-row gap-2">
				<Sun />
				<p className="font-bold">{vehicle.panel_size} Wp</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<EventStatCard value={unitEvent.panel_volt} unit="V" title="Volts" />
				<EventStatCard value={unitEvent.panel_amps} unit="A" title="Amps" />
				<EventStatCard
					value={unitEvent.panel_volt * unitEvent.panel_amps}
					unit="W"
					title="Watts"
				/>
			</div>
			<div className="flex flex-row gap-2">
				<BatteryCharging />
				<p className="font-bold">
					{vehicle.battery_voltage}V / {batType}
				</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<EventStatCard value={unitEvent.battery_volt} unit="V" title="Volts" />
				<EventStatCard value={unitEvent.battery_amps} unit="A" title="Amps" />
			</div>
		</div>
	);
}

function EventStatCard({
	value,
	unit,
	title,
}: { value: number; unit: string; title: string }) {
	return (
		<Card className="bg-neutral-100 dark:bg-neutral-800 p-2 w-full h-[66px]">
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
				<Sun />
				<p className="font-bold">Loading...</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="bg-neutral-100 dark:bg-neutral-800 w-[66px] h-[66px] rounded-lg" />
				<Skeleton className="bg-neutral-100 dark:bg-neutral-800 w-[66px] h-[66px] rounded-lg" />
				<Skeleton className="bg-neutral-100 dark:bg-neutral-800 w-[66px] h-[66px] rounded-lg" />
			</div>
			<div className="flex flex-row gap-2">
				<BatteryCharging />
				<p className="font-bold">Loading...</p>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="bg-neutral-100 dark:bg-neutral-800 w-[66px] h-[66px] rounded-lg" />
				<Skeleton className="bg-neutral-100 dark:bg-neutral-800 w-[66px] h-[66px] rounded-lg" />
			</div>
		</div>
	);
}
