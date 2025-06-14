
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Banknote, Building, TrendingUp, Users, ExternalLink } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const StatsGrid = () => {
  const navigate = useNavigate();

  const stats: StatItem[] = [
    {
      title: "Total Tokens Issued",
      value: "₹2,45,000",
      change: "+12%",
      icon: Banknote,
      route: "/token-explorer"
    },
    {
      title: "Active Companies",
      value: "24",
      change: "+3",
      icon: Building,
      route: "/active-companies"
    },
    {
      title: "Tokens Redeemed",
      value: "₹1,89,000",
      change: "+8%",
      icon: TrendingUp,
      route: "/tokens-redeemed"
    },
    {
      title: "Active Vendors",
      value: "156",
      change: "+15",
      icon: Users,
      route: "/active-vendors"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => navigate(stat.route)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className="flex items-center space-x-2">
                <stat.icon className="h-8 w-8 text-blue-600" />
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
