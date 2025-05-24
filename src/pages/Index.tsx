
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Banknote, Building, Users } from 'lucide-react';

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
      title: 'Token Issuance',
      description: 'Banks can issue digital tokens to companies for supply chain financing',
    },
    {
      icon: Building,
      title: 'Company Management',
      description: 'Companies can transfer tokens to vendors and manage their supply chain',
    },
    {
      icon: Users,
      title: 'Vendor Network',
      description: 'Vendors can redeem tokens for loans or transfer to their own suppliers',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Banknote className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">TokenFlow Platform</h1>
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
                <Button onClick={() => navigate('/login')}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Digital Token Platform for{' '}
            <span className="text-blue-600">Supply Chain Finance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect banks, companies, and vendors in a seamless token-based ecosystem. 
            Enable efficient supply chain financing with digital tokens.
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

        {/* Flow Diagram */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Banknote className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Banks Issue Tokens</h3>
              <p className="text-sm text-gray-600">Banks create and distribute digital tokens to companies</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Companies Transfer</h3>
              <p className="text-sm text-gray-600">Companies use tokens to pay vendors in their supply chain</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Vendors Redeem</h3>
              <p className="text-sm text-gray-600">Vendors can redeem tokens for loans or transfer to suppliers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
