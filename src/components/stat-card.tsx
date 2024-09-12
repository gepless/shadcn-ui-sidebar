import { Car, Fuel, Gauge, Route, Sun } from "lucide-react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const iconMap = {
	vehicle: Car,
	fuel: Fuel,
	power: Sun,
	co2: Gauge,
	distance: Route,
};

export default function StatCard({
	title,
	value,
	inverted,
	type,
	unit,
}: {
	title: string;
	value: number | string;
	inverted?: boolean;
	type: "vehicle" | "fuel" | "power" | "co2" | "distance";
	unit: string;
}) {
	const Icon = iconMap[type];

	return (
		<Card
			className={`${inverted ? "bg-foreground text-background" : "bg-background text-foreground"}`}
		>
			<div className="flex flex-row items-center justify-center py-4 px-2">
				{Icon ? (
					<Icon
						className={`rounded-lg p-2 ${inverted ? "bg-background text-foreground" : "text-background bg-foreground"}`}
						size={64}
					/>
				) : null}
				<div className="pl-2">
					<p className="font-bold text-lg">
						{value.toLocaleString("da-DK", {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}{" "}
						{unit}
					</p>
					<p className="text-sm -mt-1">{title}</p>
				</div>
			</div>
		</Card>
	);
}

export function StatCardSkeleton() {
	return <Skeleton className="w-full h-[98px] rounded-lg" />;
}
