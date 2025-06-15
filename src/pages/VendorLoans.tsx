
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Check, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const VendorLoans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRepayLoan = (loanId: string, amount: string) => {
    toast({
      title: "Loan Repayment Initiated",
      description: `Repayment for loan #${loanId} of amount ${amount} initiated`,
    });
  };

  const activeLoans = [
    { 
      id: 'L001', 
      amount: '₹8,000', 
      interest: '8.5%', 
      startDate: '2024-01-10', 
      dueDate: '2024-03-10',
      monthlyPayment: '₹850',
      remainingBalance: '₹7,200',
      status: 'Active'
    },
    { 
      id: 'L002', 
      amount: '₹7,000', 
      interest: '9.0%', 
      startDate: '2024-02-05', 
      dueDate: '2024-04-05',
      monthlyPayment: '₹750',
      remainingBalance: '₹6,500',
      status: 'Active'
    },
  ];

  const loanHistory = [
    { 
      id: 'L003', 
      amount: '₹5,000', 
      interest: '8.0%', 
      startDate: '2023-10-15', 
      endDate: '2023-12-15',
      status: 'Completed'
    },
    { 
      id: 'L004', 
      amount: '₹12,000', 
      interest: '9.5%', 
      startDate: '2023-08-01', 
      endDate: '2023-11-01',
      status: 'Completed'
    },
    { 
      id: 'L005', 
      amount: '₹3,000', 
      interest: '7.5%', 
      startDate: '2023-06-10', 
      endDate: '2023-08-10',
      status: 'Completed'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/vendor')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
            <p className="text-gray-600">Track your loans and repayments - {user?.organizationName}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Loans</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">₹13,700</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Payment</p>
                  <p className="text-2xl font-bold text-orange-600">₹1,600</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Loans</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Loans */}
        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Your current bank loans and payment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-lg">Loan #{loan.id}</p>
                          <p className="text-sm text-gray-600">
                            Original Amount: {loan.amount} | Interest: {loan.interest}
                          </p>
                          <p className="text-sm text-gray-600">
                            Start: {loan.startDate} | Due: {loan.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Remaining Balance</p>
                          <p className="font-medium text-red-600">{loan.remainingBalance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Monthly Payment</p>
                          <p className="font-medium text-blue-600">{loan.monthlyPayment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleRepayLoan(loan.id, loan.remainingBalance)}
                      >
                        <Check className="h-3 w-3 mr-1" /> Make Payment
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan History */}
        <Card>
          <CardHeader>
            <CardTitle>Loan History</CardTitle>
            <CardDescription>Your completed loan transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loanHistory.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Loan #{loan.id}</p>
                    <p className="text-sm text-gray-600">
                      Amount: {loan.amount} | Interest: {loan.interest}
                    </p>
                    <p className="text-sm text-gray-600">
                      {loan.startDate} - {loan.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      {loan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your loan portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center"
                onClick={() => navigate('/vendor')}
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                Request New Loan
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center"
              >
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Payment
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center"
              >
                <Check className="h-6 w-6 mb-2" />
                Payment History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorLoans;
