import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headset, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
	return (
		<ContentLayout title="Support" subtitle="Need help?" icon={Headset}>
			<Card>
				<CardHeader>
					<CardTitle>Contact fleet manager support team</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="items-center flex flex-col p-4 mb-4">
						<Headset size={128} />
					</div>
					<Card className="p-4 bg-neutral-100 dark:bg-neutral-700 mb-4">
						<CardContent className="flex flex-col items-center p-2">
							<MessageSquare size={64} className="mb-4" />
							<Link href="mailto:support@greenenergy.pro">
								support@greenenergy.pro
							</Link>
						</CardContent>
					</Card>
					<Card className="p-4 bg-neutral-100 dark:bg-neutral-700">
						<CardContent className="flex flex-col items-center p-2">
							<Phone size={64} className="mb-4" />
							<Link href="tel:+4593206207">+45 93 206 207</Link>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
		</ContentLayout>
	);
}
