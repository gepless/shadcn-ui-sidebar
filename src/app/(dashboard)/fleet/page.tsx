import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCompanyUnits } from "@/lib/data";
import type { Unit } from "@/lib/definitions";
import { ArrowRight, Bus, Car, ShieldQuestion, Truck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UnitEventCard, { UnitEventCardSkeleton } from "./unit-event-card";
export default async function FleetPage() {
	const units = await getCompanyUnits();
	return (
		<ContentLayout title="Fleet" subtitle={units.length.toString()} icon={Car}>
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Filters</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Filters go here</p>
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Fleet overview</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						{units.map((unit) => (
							<Suspense
								key={unit.imei}
								fallback={<FleetListUnitCardSkeleton />}
							>
								<FleetListUnitCard unit={unit} />
							</Suspense>
						))}
					</CardContent>
				</Card>
			</div>
		</ContentLayout>
	);
}

async function FleetListUnitCard({ unit }: { unit: Unit }) {
	let Icon = ShieldQuestion;
	switch (unit.info?.vehicle.type) {
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
		<Card className="bg-neutral-100 dark:bg-neutral-800">
			<div className="grid grid-cols-5">
				<div className="flex flex-col justify-between p-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<p className="font-bold truncate">
									{unit.info ? unit.info.name : "Unnamed"}
								</p>
							</TooltipTrigger>
							<TooltipContent>
								<p> {unit.info ? unit.info.name : "Unnamed"}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<Icon size={128} />
					<p>
						{unit.info?.vehicle.type ? unit.info?.vehicle.type : "Undefined"}
					</p>
				</div>
				<div className="flex flex-col justify-between p-4">
					<p className="font-bold">Make</p>
					<p>{unit.info ? unit.info.vehicle.make : "Undefined"}</p>
					<p className="font-bold">Model</p>
					<p>{unit.info ? unit.info.vehicle.model : "Undefined"}</p>
					<p className="font-bold">Year</p>
					<p>{unit.info ? unit.info.vehicle.year : "Undefined"}</p>
					<p className="font-bold">Serial No.</p>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<p className="truncate">{unit.imei}</p>
							</TooltipTrigger>
							<TooltipContent>
								<p>{unit.imei}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="col-span-3">
					<div className="flex flex-row justify-between items-center h-full">
						<div className="p-2">
							<Suspense fallback={<UnitEventCardSkeleton />}>
								<UnitEventCard light imei={unit.imei} />
							</Suspense>
						</div>
						<Button asChild className="p-1 h-full rounded-r-xl rounded-l-none">
							<Link href={`/fleet/${unit.imei}`}>
								<ArrowRight />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}

function FleetListUnitCardSkeleton() {
	return (
		<Card className="bg-neutral-100 dark:bg-neutral-800">
			<div className="grid grid-cols-5">
				<div className="flex flex-col justify-between p-4">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-full w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
				<div className="flex flex-col justify-between p-4">
					<p className="font-bold">Make</p>
					<Skeleton className="h-6 w-full" />
					<p className="font-bold">Model</p>
					<Skeleton className="h-6 w-full" />
					<p className="font-bold">Year</p>
					<Skeleton className="h-6 w-full" />
					<p className="font-bold">Serial No.</p>
					<Skeleton className="h-6 w-full" />
				</div>
				<Skeleton className="h-6 w-full" />
			</div>
		</Card>
	);
}
