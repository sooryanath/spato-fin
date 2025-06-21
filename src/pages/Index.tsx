
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard, Building, Users } from 'lucide-react';

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
        return <Navigate to="/bank" replace />;
      case 'company':
        return <Navigate to="/company" replace />;
      case 'vendor':
        return <Navigate to="/vendor" replace />;
      default:
        return <Navigate to="/profile" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">Spato Finance</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
            Docs
          </a>
          <a href="/vendor-signup" className="text-gray-600 hover:text-gray-900 transition-colors">
            Vendor SignUp
          </a>
          <Button asChild className="bg-gray-900 hover:bg-gray-800">
            <a href="/login">Login</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-8">
          Platform helps credible sub-vendors access{' '}
          <span className="text-blue-600">collateral-free working capital loans</span>{' '}
          from banks and NBFCs instantly through credit access tokenization (CAT).
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Connect Banks, NBFCs other formal lenders, syndicate companies and vendors in a 
          seamless token gated ecosystem. Enable efficient deep tire financing with blockchain 
          and Credit Access Tokens.
        </p>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Credit Access Tokens */}
          <Card className="p-8 text-center bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Credit Access Tokens
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Banks can issue Credit Access Tokens (CAT) to Syndicate Companies for supply chain financing
              </p>
            </CardContent>
          </Card>

          {/* Syndicate Management */}
          <Card className="p-8 text-center bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Syndicate Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Syndicate companies can transfer CAT tokens to their vendors to finance their work
              </p>
            </CardContent>
          </Card>

          {/* Vendor Network */}
          <Card className="p-8 text-center bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Vendor Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vendors can redeem CAT for loans from bank or transfer CAT to their own sub vendors
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
