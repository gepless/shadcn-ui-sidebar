import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { getCompanyUnits } from "@/lib/data";
import { Car } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Fleet2Page() {
	const units = await getCompanyUnits();

	return (
		<ContentLayout title="Fleet" subtitle={units.length.toString()} icon={Car}>
			<Card>
				<CardContent>
					<DataTable columns={columns} data={units} />
				</CardContent>
			</Card>
		</ContentLayout>
	);
}
