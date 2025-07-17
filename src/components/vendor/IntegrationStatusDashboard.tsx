import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Shield, TrendingUp } from 'lucide-react';

const IntegrationStatusDashboard = () => {
  const integrations = [
    {
      name: 'GSTN Verification',
      status: 'completed',
      score: 100,
      description: 'GST information verified',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Account Aggregator',
      status: 'connected',
      score: 85,
      description: '3 bank accounts connected',
      lastUpdated: '2024-01-16'
    },
    {
      name: 'KYC Compliance',
      status: 'pending',
      score: 60,
      description: 'Additional documents required',
      lastUpdated: '2024-01-10'
    },
    {
      name: 'Financial Health',
      status: 'analysis',
      score: 75,
      description: 'Credit assessment in progress',
      lastUpdated: '2024-01-16'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'analysis':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'connected':
        return 'bg-green-500/10 text-green-700';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700';
      case 'analysis':
        return 'bg-blue-500/10 text-blue-700';
      default:
        return 'bg-red-500/10 text-red-700';
    }
  };

  const overallProgress = Math.round(integrations.reduce((acc, item) => acc + item.score, 0) / integrations.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Integration Status Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overall Completion</span>
            <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Complete all integrations to maximize your vendor profile strength
          </p>
        </div>

        {/* Integration Items */}
        <div className="grid gap-3">
          {integrations.map((integration, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex-shrink-0">
                {getStatusIcon(integration.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{integration.name}</span>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {integration.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Updated: {new Date(integration.lastUpdated).toLocaleDateString()}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-medium">
                  {integration.score}%
                </div>
                <Progress value={integration.score} className="w-16 h-1 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-sm text-blue-700">Next Steps</span>
          </div>
          <p className="text-xs text-blue-600">
            Complete KYC compliance to unlock better credit terms and faster loan approvals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatusDashboard;