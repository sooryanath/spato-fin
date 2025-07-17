import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, AlertTriangle } from 'lucide-react';

interface FinancialInsightsProps {
  financialData?: any;
}

const FinancialInsights = ({ financialData = {} }: FinancialInsightsProps) => {
  // Mock financial data - in real implementation, this would come from AA data
  const insights = {
    creditScore: 750,
    avgMonthlyBalance: 145000,
    monthlyIncome: 180000,
    monthlyExpenses: 95000,
    savingsRate: 47,
    transactionVolume: 156,
    accountAge: 24, // months
    riskLevel: 'low'
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/10 text-green-700';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700';
      case 'high': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium text-sm">Financial Health Insights</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Credit Score */}
        <Card className="bg-muted/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Credit Score</span>
              <CreditCard className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className={`text-lg font-bold ${getCreditScoreColor(insights.creditScore)}`}>
              {insights.creditScore}
            </div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </CardContent>
        </Card>

        {/* Average Balance */}
        <Card className="bg-muted/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Avg Balance</span>
              <DollarSign className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">
              ₹{(insights.avgMonthlyBalance / 1000).toFixed(0)}K
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+12%</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card className="bg-muted/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Monthly Income</span>
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">
              ₹{(insights.monthlyIncome / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Stable pattern</p>
          </CardContent>
        </Card>

        {/* Savings Rate */}
        <Card className="bg-muted/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Savings Rate</span>
              <Calendar className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {insights.savingsRate}%
            </div>
            <Progress value={insights.savingsRate} className="h-1 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card className="bg-muted/20">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Risk Assessment</span>
            <Badge className={getRiskColor(insights.riskLevel)}>
              {insights.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-xs">
                Based on transaction patterns and financial behavior analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Account Age:</span>
          <span className="font-medium">{insights.accountAge} months</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Txn Volume:</span>
          <span className="font-medium">{insights.transactionVolume}/month</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;