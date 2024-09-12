import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUnitEvents, getUnitInfo } from "@/lib/data";
import { ArrowLeft, Bus, Car, ShieldQuestion, Truck } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UnitEventCard, { UnitEventCardSkeleton } from "../unit-event-card";
import EventsChart from "./events-chart";
import UnitCard, { UnitCardSkeleton } from "./unit-card";

type UnitPageProps = {
	params: { imei: string };
};

export async function generateMetadata(
	{ params }: UnitPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const imei = params.imei;
	const unit = await getUnitInfo(imei);

	return {
		title: unit ? unit?.name : imei,
	};
}

export default async function UnitPage({ params }: UnitPageProps) {
	const unitInfo = await getUnitInfo(params.imei);
	const events = await getUnitEvents(params.imei, 100);
	events?.reverse();

	if (!unitInfo) {
		return <div>Unit not found</div>;
	}

	let Icon = ShieldQuestion;
	switch (unitInfo.vehicle?.type) {
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
		<ContentLayout
			title={unitInfo.name || "Unnamed"}
			subtitle={params.imei}
			icon={Icon}
		>
			<div className="flex justify-between -mt-4 mb-4">
				<Button size="sm" asChild>
					<Link href="/fleet">
						<ArrowLeft /> Back to fleet
					</Link>
				</Button>
				{/* <Button size="sm" asChild>
					<Link href="#">
						Edit vehicle{""}
						<Edit />
					</Link>
				</Button> */}
			</div>
			<Suspense fallback={<UnitCardSkeleton />}>
				<UnitCard imei={params.imei} />
			</Suspense>
			<div className="grid grid-cols-3 gap-4 mt-4">
				<Card>
					<CardHeader>
						<CardTitle>Latest events</CardTitle>
					</CardHeader>
					<CardContent>
						<Suspense fallback={<UnitEventCardSkeleton />}>
							<UnitEventCard imei={params.imei} />
						</Suspense>
					</CardContent>
				</Card>
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Daily stats</CardTitle>
					</CardHeader>
					<CardContent>
						<EventsChart events={events} />
					</CardContent>
				</Card>
			</div>
		</ContentLayout>
	);
}
