import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Star,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`mt-2 flex items-center text-xs ${
              trend.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            <TrendingUp className="mr-1 h-3 w-3" />
            {trend.isPositive ? "+" : "-"}{trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Appointments",
      value: "248",
      description: "All time appointments",
      icon: <Calendar className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Active Patients",
      value: "156",
      description: "Current patient count",
      icon: <Users className="h-4 w-4" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Average Wait Time",
      value: "14 min",
      description: "Last 30 days",
      icon: <Clock className="h-4 w-4" />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: "Patient Satisfaction",
      value: "4.8",
      description: "Out of 5 stars",
      icon: <Star className="h-4 w-4" />,
      trend: { value: 3, isPositive: true },
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
