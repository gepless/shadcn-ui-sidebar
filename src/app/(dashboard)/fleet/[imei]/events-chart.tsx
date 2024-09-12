"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { UnitEvent } from "@/lib/definitions";

const chartConfig = {
	battery_amps: {
		label: "Battery Amps",
		color: "hsl(var(--chart-1))",
	},
	battery_volt: {
		label: "Battery Volts",
		color: "hsl(var(--chart-2))",
	},
	panel_amps: {
		label: "Panel Amps",
		color: "hsl(var(--chart-3))",
	},
	panel_volt: {
		label: "Panel Volts",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig;

export default function EventsChart({
	events,
}: { events: UnitEvent[] | undefined }) {
	if (!events) {
		return <div>No events found</div>;
	}

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<LineChart accessibilityLayer data={events}>
				<CartesianGrid />
				<XAxis
					dataKey="timestamp"
					tickFormatter={(value) =>
						new Date(value).toLocaleTimeString("da-DK", {
							hour: "2-digit",
							minute: "2-digit",
						})
					}
				/>
				<ChartTooltip
					content={
						<ChartTooltipContent
							indicator="line"
							labelFormatter={(label) =>
								new Date(label).toLocaleTimeString("da-DK", {
									hour: "2-digit",
									minute: "2-digit",
								})
							}
						/>
					}
				/>
				<ChartLegend content={<ChartLegendContent />} />
				<Line
					type="natural"
					dataKey="battery_amps"
					dot={false}
					stroke="var(--color-battery_amps)"
					strokeWidth={2}
				/>
				<Line
					type="natural"
					dataKey="battery_volt"
					dot={false}
					stroke="var(--color-battery_volt)"
					strokeWidth={2}
				/>
				<Line
					type="natural"
					dataKey="panel_amps"
					dot={false}
					stroke="var(--color-panel_amps)"
					strokeWidth={2}
				/>
				<Line
					type="natural"
					dataKey="panel_volt"
					dot={false}
					stroke="var(--color-panel_volt)"
					strokeWidth={2}
				/>
			</LineChart>
		</ChartContainer>
	);
}
