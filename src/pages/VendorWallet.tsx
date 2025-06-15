
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Banknote, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const VendorWallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [redeemAmount, setRedeemAmount] = useState('');

  const handleRedeemTokens = () => {
    if (!redeemAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter redeem amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Loan Request Submitted",
      description: `Request to redeem ${redeemAmount} tokens for loan submitted to bank`,
    });
    setRedeemAmount('');
  };

  const tokenHistory = [
    { id: '1', type: 'Received', from: 'TechCorp Industries', amount: '₹15,000', date: '2024-01-15' },
    { id: '2', type: 'Transferred', to: 'Sub Vendor A', amount: '₹8,000', date: '2024-01-14' },
    { id: '3', type: 'Redeemed', from: 'Bank Loan', amount: '₹10,000', date: '2024-01-13' },
    { id: '4', type: 'Received', from: 'Global Corp', amount: '₹12,000', date: '2024-01-12' },
    { id: '5', type: 'Transferred', to: 'Sub Vendor B', amount: '₹5,000', date: '2024-01-11' },
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
            <h1 className="text-3xl font-bold text-gray-900">Token Wallet</h1>
            <p className="text-gray-600">Manage your tokens - {user?.organizationName}</p>
          </div>
        </div>

        {/* Token Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold text-green-600">₹45,000</p>
                  <p className="text-sm text-green-600">+₹12,000 today</p>
                </div>
                <Banknote className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tokens Redeemed</p>
                  <p className="text-2xl font-bold text-purple-600">₹28,000</p>
                  <p className="text-sm text-purple-600">+₹5,000 this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earned</p>
                  <p className="text-2xl font-bold text-blue-600">₹73,000</p>
                  <p className="text-sm text-blue-600">All time</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Redeem Tokens Section */}
        <Card>
          <CardHeader>
            <CardTitle>Redeem Tokens for Loan</CardTitle>
            <CardDescription>Exchange your tokens for bank financing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="redeem-amount">Redeem Amount</Label>
                <Input
                  id="redeem-amount"
                  type="number"
                  placeholder="Enter amount to redeem"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleRedeemTokens} className="w-full bg-green-600 hover:bg-green-700">
                  Request Loan
                </Button>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Token redemption requests are processed within 24 hours. 
                Interest rates vary based on your credit score and relationship with the bank.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Token History */}
        <Card>
          <CardHeader>
            <CardTitle>Token Transaction History</CardTitle>
            <CardDescription>Your recent token activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-gray-600">
                      {item.from && `From: ${item.from}`}
                      {item.to && `To: ${item.to}`}
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      item.type === 'Received' ? 'text-green-600' : 
                      item.type === 'Transferred' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {item.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorWallet;
