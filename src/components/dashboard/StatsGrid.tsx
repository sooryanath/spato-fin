
import React from 'react';
import StatCard from './StatCard';
import { Banknote, Building, TrendingUp, Users } from 'lucide-react';

const StatsGrid: React.FC = () => {
  const stats = [
    {
      title: "Total Tokens Issued",
      value: "₹2,45,000",
      change: "+12%",
      icon: Banknote,
    },
    {
      title: "Active Companies",
      value: "24",
      change: "+3",
      icon: Building,
    },
    {
      title: "Tokens Redeemed",
      value: "₹1,89,000",
      change: "+8%",
      icon: TrendingUp,
    },
    {
      title: "Active Vendors",
      value: "156",
      change: "+15",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
