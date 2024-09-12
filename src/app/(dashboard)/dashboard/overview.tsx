import StatCard from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyCumulativePower, getCompanyUnitCount } from "@/lib/data";

export default async function OverviewCard() {
	const allVehiclesCount = await getCompanyUnitCount();

	const totalCumulativePower = await getCompanyCumulativePower();

	const vehiclesCount = allVehiclesCount
		? allVehiclesCount.toLocaleString("da-DK", {
				maximumFractionDigits: 0,
			})
		: null;
	const cumulativePower = (
		totalCumulativePower.cumulative_power / 1000
	).toLocaleString("da-DK", {
		maximumFractionDigits: 0,
	});

	const co2Saved = (
		(totalCumulativePower.cumulative_power / 1000) *
		2.68
	).toLocaleString("da-DK", {
		maximumFractionDigits: 0,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					<StatCard
						title="Vehicles"
						type="vehicle"
						unit=""
						value={vehiclesCount ? vehiclesCount : "--"}
					/>
					<StatCard
						title="Fuel Saved"
						type="fuel"
						unit="L"
						value={cumulativePower}
					/>
					<StatCard
						title="Power Generated"
						type="power"
						unit="kWh"
						value={cumulativePower}
					/>
					<StatCard
						title="CO2 Saved"
						type="co2"
						unit="kg"
						value={co2Saved}
						inverted
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export function OverviewCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					<Skeleton className="w-full h-[98px] rounded-lg" />
					<Skeleton className="w-full h-[98px] rounded-lg" />
					<Skeleton className="w-full h-[98px] rounded-lg" />
					<Skeleton className="w-full h-[98px] rounded-lg" />
				</div>
			</CardContent>
		</Card>
	);
}
