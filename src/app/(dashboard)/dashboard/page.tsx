import { ContentLayout } from "@/components/admin-panel/content-layout";
import { LayoutDashboard } from "lucide-react";
import { Suspense } from "react";
import FleetListCard, { FleetListCardSkeleton } from "./fleet-list";
import OverviewCard, { OverviewCardSkeleton } from "./overview";

export default function DashboardPage() {
	return (
		<ContentLayout title="Dashboard" subtitle="Overview" icon={LayoutDashboard}>
			<div className="grid gap-4">
				<Suspense fallback={<OverviewCardSkeleton />}>
					<OverviewCard />
				</Suspense>
				<div className="grid grid-cols-2">
					<Suspense fallback={<FleetListCardSkeleton />}>
						<FleetListCard />
					</Suspense>
				</div>
			</div>
		</ContentLayout>
	);
}
