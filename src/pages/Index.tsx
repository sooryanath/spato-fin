import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard, Building, Users, Shield, Zap, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
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

  const handleLaunchPlatform = () => {
    navigate('/login');
  };

  const handleViewDocs = () => {
    navigate('/docs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/10 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-white/15 -rotate-12"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Spato Finance</span>
        </div>
        <div className="flex items-center space-x-8">
          <button
            onClick={handleViewDocs}
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Read Documentation
          </button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 py-2 shadow-lg"
            onClick={() => navigate('/login')}
          >
            Access Platform
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 text-center max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-purple-200 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Next-Generation Financial Infrastructure
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Deep Tier Financing
          </span>
          <br />
          <span className="text-white/90 text-5xl md:text-6xl">Platform for MSMEs</span>
          <br />
          <span className="text-4xl md:text-5xl text-gray-300 font-light">
            Instant Working Capital Loans for credit vendors
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Blockchain-powered tokenization ecosystem connecting Banks, NBFCs, syndicate companies and vendors. 
          Enable efficient deep tier financing with advanced Credit Access Tokens and smart contract automation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl border-0"
            onClick={handleLaunchPlatform}
          >
            Launch Platform
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 px-8 py-4 text-lg backdrop-blur-lg"
            onClick={handleViewDocs}
          >
            Read Documentation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Powered by <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Advanced Technology</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of supply chain financing with our tokenized ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tokenizing Credit Access */}
          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Tokenizing Credit Access
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Platform tokenize access to formal credit by leveraging trust and relationship with Syndicate companies, Vendors and Banks, which helps vendors to get formal credit instantly using a Credit Access Token (CAT)
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Syndicate Management */}
          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building className="w-10 h-10 text-white" />
              </div>
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Smart Syndicate Management
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Automated token distribution system enables syndicate companies to seamlessly transfer CAT tokens to vendors for instant financing
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Vendor Network */}
          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Dynamic Vendor Network
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Multi-tier vendor ecosystem where CAT tokens can be redeemed for instant loans or transferred to sub-vendors for deep tier financing
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-gray-300">Loans Facilitated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Active Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Partner Banks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.8%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Spato Finance. Revolutionizing supply chain financing through blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
