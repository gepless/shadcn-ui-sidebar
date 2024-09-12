import StatCard, { StatCardSkeleton } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUnitCumulativePower, getUnitInfo } from "@/lib/data";
import { Bus, Car, ShieldQuestion, Truck } from "lucide-react";

export default async function UnitCard({ imei }: { imei: string }) {
	const unit = await getUnitInfo(imei);
	const power = await getUnitCumulativePower(imei);

	const cumulativePower = (power.cumulative_power / 1000).toLocaleString(
		"da-DK",
		{
			maximumFractionDigits: 0,
		},
	);

	const co2Saved = ((power.cumulative_power / 1000) * 2.68).toLocaleString(
		"da-DK",
		{
			maximumFractionDigits: 0,
		},
	);
	let Icon = ShieldQuestion;
	switch (unit?.vehicle?.type) {
		case "bus":
			Icon = Bus;
			break;
		case "truck":
			Icon = Truck;
			break;
		case "van":
			Icon = Car;
			break;
		default:
			Icon = ShieldQuestion;
			break;
	}
	return (
		<Card>
			<CardContent className="grid grid-cols-5 p-4">
				<div className="flex flex-col justify-between">
					<p className="font-bold">{unit?.name ? unit.name : "Unnamed"}</p>
					<Icon size={128} />
					<p>{unit?.vehicle?.type ? unit.vehicle.type : "Undefined"}</p>
				</div>
				<div className="flex flex-col justify-between">
					<p className="font-bold">Make</p>
					<p>{unit?.vehicle?.make ? unit?.vehicle?.make : "Undefined"}</p>
					<p className="font-bold">Model</p>
					<p>{unit?.vehicle?.model ? unit?.vehicle?.model : "Undefined"}</p>
					<p className="font-bold">Year</p>
					<p>{unit?.vehicle?.year ? unit?.vehicle?.year : "Undefined"}</p>
					<p className="font-bold">Serial No.</p>
					<p>{imei}</p>
				</div>
				<div className="col-span-3">
					<p className="font-bold mb-2">Vehicle Stats</p>
					<div className="flex flex-row gap-2">
						<StatCard
							title="Fuel Saved"
							value={cumulativePower}
							type="fuel"
							unit="L"
						/>
						<StatCard
							title="Power Generated"
							value={cumulativePower}
							type="power"
							unit="kWh"
						/>
						<StatCard
							title="CO2 Saved"
							value={co2Saved}
							type="co2"
							unit="kg"
							inverted
						/>
					</div>
					{/* <div>Config</div> */}
				</div>
			</CardContent>
		</Card>
	);
}

export function UnitCardSkeleton() {
	return (
		<Card>
			<CardContent className="grid grid-cols-5 p-4">
				<div className="flex flex-col justify-between">
					<p>...</p>
					<Skeleton className="h-full w-full" />
					<p>...</p>
				</div>
				<div className="flex flex-col justify-between">
					<p>Make</p>
					<p>...</p>
					<p>Model</p>
					<p>...</p>
					<p>Year</p>
					<p>...</p>
				</div>
				<div className="col-span-3">
					<p className="mb-2">Vehicle Stats</p>
					<div className="flex flex-row gap-2">
						<StatCardSkeleton />
						<StatCardSkeleton />
						<StatCardSkeleton />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
