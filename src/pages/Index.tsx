
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Banknote, Building, Users, FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      // Redirect to appropriate dashboard
      navigate(`/${user.role}`);
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: Banknote,
      title: 'Credit Access Tokens',
      description: 'Banks can issue Credit Access Tokens (CAT) to Syndicate Companies for supply chain financing',
    },
    {
      icon: Building,
      title: 'Syndicate Management',
      description: 'Syndicate companies can transfer CAT tokens to their vendors to finance their work',
    },
    {
      icon: Users,
      title: 'Vendor Network',
      description: 'Vendors can redeem CAT for loans from bank or transfer CAT to their own sub vendors',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Banknote className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">Spato Finance</h1>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/docs')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Docs
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name} ({user.organizationName})
                  </span>
                  <Button onClick={() => navigate(`/${user.role}`)} variant="outline">
                    Go to Dashboard
                  </Button>
                  <Button onClick={logout} variant="ghost">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button onClick={() => navigate('/vendor-signup')} variant="outline">
                    Vendor SignUp
                  </Button>
                  <Button onClick={() => navigate('/login')}>
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Token Gated Platform for{' '}
            <span className="text-blue-600">Deep Tier Financing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect Banks, NBFCs other formal lenders, syndicate companies and vendors in a seamless token gated ecosystem. 
            Enable efficient deep tire financing with blockchain and Credit Access Tokens.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
