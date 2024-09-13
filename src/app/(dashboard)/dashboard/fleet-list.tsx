import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyUnits, getUnitCumulativePower } from "@/lib/data";
import type { Unit } from "@/lib/definitions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function FleetListCard() {
	const limit = 5;
	const companyUnits = await getCompanyUnits(limit);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-row justify-between">
					<p>Fleet overview</p>
					<Button size="xs" asChild>
						<Link href="/fleet">
							See all <ArrowRight />
						</Link>
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{companyUnits.map((unit) => (
						<Suspense key={unit.imei} fallback={<FleetListUnitCardSkeleton />}>
							<FleetListUnitCard unit={unit} />
						</Suspense>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

async function FleetListUnitCard({ unit }: { unit: Unit }) {
	const cumulativePower = await getUnitCumulativePower(unit.imei).then(
		(data) => data.cumulative_power / 1000,
	);

	const power = cumulativePower.toLocaleString("da-DK", {
		maximumFractionDigits: 2,
	});
	const co2 = (cumulativePower * 2.68).toLocaleString("da-DK", {
		maximumFractionDigits: 2,
	});
	return (
		<Card key={unit.imei} className="bg-neutral-100 dark:bg-neutral-800">
			<div className="grid grid-cols-3 align-middle">
				<div className="p-2">
					<p className="font-bold">Vehicle</p>
					<p className="truncate">{unit.info ? unit.info.name : "Unnamed"}</p>
				</div>
				<div className="p-2">
					<p className="font-bold">Produced</p>
					<p>{cumulativePower ? `${power} kWh` : "--"}</p>
				</div>
				<div className="flex justify-between items-center">
					<div className="p-2">
						<p className="font-bold">CO2 saved</p>
						<p>{cumulativePower ? `${co2} kg` : "--"}</p>
					</div>
					<Button asChild className="p-1 -m-2 h-full rounded-l-none">
						<Link href={`/fleet/${unit.imei}`}>
							<ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
}

function FleetListUnitCardSkeleton() {
	return <Skeleton className="w-full h-[66px] rounded-lg" />;
}

export function FleetListCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-row justify-between">
					<p>Fleet overview</p>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<FleetListUnitCardSkeleton />
				</div>
			</CardContent>
		</Card>
	);
}
