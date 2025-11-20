import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/shadcn/components/card";

interface StatCardProps {
	title: string;
	icon: React.ReactNode;
	value: number;
}

export default function StatsCard({ title, icon, value }: StatCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				{icon}
				{/* <Building2 className="h-4 w-4 text-muted-foreground" /> */}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-semibold text-foreground">{value}</div>
			</CardContent>
		</Card>
	);
}
