"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Filters() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Filters</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Label>
					Search
					<Input placeholder="Search..." className="w-full" />
				</Label>
				<Label>
					Sorting
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Newest vehicle first" />
						</SelectTrigger>
					</Select>
				</Label>
				<Label>
					Make of vehicle
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Choose make" />
						</SelectTrigger>
					</Select>
				</Label>
				<Label>
					Model of vehicle
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Choose model" />
						</SelectTrigger>
					</Select>
				</Label>
				<Label>
					Production year
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Choose year" />
						</SelectTrigger>
					</Select>
				</Label>
				<Label>
					Solar panel set (Wp)
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Choose set size" />
						</SelectTrigger>
					</Select>
				</Label>
				<Label>
					Battery type
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Choose battery type" />
						</SelectTrigger>
					</Select>
				</Label>
			</CardContent>
		</Card>
	);
}
