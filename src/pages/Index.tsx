
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DemoSetup from '@/components/DemoSetup';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    // Redirect authenticated users to appropriate dashboard
    switch (user.role) {
      case 'bank':
        return <Navigate to="/bank-dashboard" replace />;
      case 'company':
        return <Navigate to="/company-dashboard" replace />;
      case 'vendor':
        return <Navigate to="/vendor-dashboard" replace />;
      default:
        return <Navigate to="/profile" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to $CAT Token Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A decentralized platform for supply chain financing using tokenized assets
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Setup */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Try the Demo</h2>
            <DemoSetup />
          </div>

          {/* Login Options */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
            <Card>
              <CardHeader>
                <CardTitle>Access Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Login to access your dashboard and manage your $CAT tokens
                </p>
                <Button asChild className="w-full">
                  <a href="/login">Login to Platform</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Issue and manage $CAT tokens, oversee supply chain financing, monitor transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Request financing, manage vendor relationships, track token transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Receive payments, manage sub-vendors, redeem tokens for cash
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
