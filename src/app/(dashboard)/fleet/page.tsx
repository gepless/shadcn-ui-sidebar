import { ContentLayout } from "@/components/admin-panel/content-layout";
import DataTableTest from "@/components/data-table-test";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function FleetPage() {
	return (
		<ContentLayout title="Fleet" subtitle="32 vehicles" icon={Car}>
			<Card>
				<CardHeader>
					<CardTitle>Fleet overview</CardTitle>
				</CardHeader>
				<CardContent>
					<DataTableTest />
				</CardContent>
			</Card>
		</ContentLayout>
	);
}
