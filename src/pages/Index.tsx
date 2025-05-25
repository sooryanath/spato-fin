
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Docs
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-600">
                      Deep Tier Financing Platform Documentation
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[70vh] pr-4">
                    <div className="space-y-6">
                      {/* Overview */}
                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                        <p className="text-gray-700 mb-4">
                          This platform facilitates structured, secure credit distribution across complex supply chains using a novel <strong>Token-Gated Credit Access System</strong>. It connects four key participants:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-blue-600">1.</span>
                            <div>
                              <span className="font-semibold">Lenders</span> (Banks, NBFCs): Regulated institutions providing formal credit.
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-blue-600">2.</span>
                            <div>
                              <span className="font-semibold">Syndicate Companies</span>: Large enterprises (e.g., Ultratech, Cochin Shipyard) with formal vendor systems.
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-blue-600">3.</span>
                            <div>
                              <span className="font-semibold">Vendors</span>: Companies providing direct goods/services to syndicate firms.
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-blue-600">4.</span>
                            <div>
                              <span className="font-semibold">Sub-Vendors</span>: Tier-2 suppliers delivering goods/services to Vendors.
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Problem */}
                      <section className="bg-red-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 mb-3">Problem</h3>
                        <p className="text-red-700">
                          Banks are comfortable lending to syndicate companies due to their size and credit history. However, vendors and sub-vendors—despite being operationally vital—often lack the digital footprint or documentation to access timely formal credit. This gap is known as the <strong>deep tier financing problem</strong>.
                        </p>
                      </section>

                      {/* Solution */}
                      <section className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">Solution: Token-Gated Credit Access System (TGCAS)</h3>
                        <p className="text-green-700 mb-4">
                          TGCAS introduces <strong>Credit Access Tokens (CATs)</strong> as programmable, trackable instruments of credit assurance across tiers of the supply chain.
                        </p>
                        
                        <h4 className="font-semibold text-green-800 mb-2">How it Works:</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="font-semibold text-green-700">1. CAT Issuance:</span>
                            <ul className="list-disc list-inside ml-4 text-green-600 space-y-1">
                              <li>Syndicate companies request CATs from banks based on signed work orders.</li>
                              <li>Banks evaluate and issue CATs to syndicate companies accordingly.</li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-semibold text-green-700">2. CAT Distribution:</span>
                            <ul className="list-disc list-inside ml-4 text-green-600 space-y-1">
                              <li>Syndicate companies distribute CATs to vendors when awarding work.</li>
                              <li>Vendors can:
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                  <li>Surrender CATs to banks for immediate working capital.</li>
                                  <li>Forward CATs to sub-vendors for further financing needs.</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-semibold text-green-700">3. Credit Redemption:</span>
                            <ul className="list-disc list-inside ml-4 text-green-600 space-y-1">
                              <li>Sub-vendors can redeem CATs at partner banks for loans.</li>
                              <li>In case of repayment failure, the bank is guaranteed repayment directly by the syndicate company as per prior agreement.</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-green-700 mt-3 font-medium">
                          This mechanism establishes <strong>credit trust</strong> beyond the first tier.
                        </p>
                      </section>

                      {/* Key Process Flows */}
                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Process Flows</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Flow 1: CAT Lifecycle</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="list-decimal list-inside space-y-1 text-sm">
                                <li>Work order created by Syndicate Company</li>
                                <li>CAT request submitted to Bank</li>
                                <li>CAT issued → transferred to Vendor → optionally passed to Sub-Vendor</li>
                                <li>CAT surrendered to Bank → Loan disbursed</li>
                                <li>Repayment tracked → disputes resolved via Syndicate Company guarantee</li>
                              </ol>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Flow 2: Dispute Resolution</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="list-decimal list-inside space-y-1 text-sm">
                                <li>Vendor/Sub-vendor defaults or under-delivers</li>
                                <li>Bank flags loan as disputed</li>
                                <li>Syndicate Company steps in:
                                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Pays bank directly (as per agreement)</li>
                                    <li>Resolves internal dispute separately with Vendor/Sub-vendor</li>
                                  </ul>
                                </li>
                              </ol>
                            </CardContent>
                          </Card>
                        </div>
                      </section>

                      {/* Bank Dashboard Experience */}
                      <section className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Bank Dashboard Experience</h3>
                        <p className="text-blue-700 mb-4">
                          The <strong>Bank Dashboard</strong> is the control center for managing CAT issuance, monitoring vendor engagement, tracking active loans, and resolving disputes.
                        </p>
                        
                        <h4 className="font-semibold text-blue-800 mb-2">Dashboard Modules:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div>
                              <span className="font-semibold text-blue-700">1. Overview Metrics:</span>
                              <ul className="list-disc list-inside ml-4 text-blue-600 text-sm">
                                <li>Total CATs issued</li>
                                <li>Tokens redeemed</li>
                                <li>Active companies/vendors</li>
                              </ul>
                            </div>
                            <div>
                              <span className="font-semibold text-blue-700">2. Issue New Tokens:</span>
                              <p className="ml-4 text-blue-600 text-sm">Interface for banks to create CATs by entering company ID and token value.</p>
                            </div>
                            <div>
                              <span className="font-semibold text-blue-700">3. Recent Transactions:</span>
                              <p className="ml-4 text-blue-600 text-sm">View of token issuance and redemption history</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="font-semibold text-blue-700">4. Active Loans:</span>
                              <p className="ml-4 text-blue-600 text-sm">List of outstanding loans issued against CATs with due dates and remaining balances</p>
                            </div>
                            <div>
                              <span className="font-semibold text-blue-700">5. Disputed Loans:</span>
                              <p className="ml-4 text-blue-600 text-sm">Centralized view of loans flagged for disputes, linked to associated syndicate firms</p>
                            </div>
                            <div>
                              <span className="font-semibold text-blue-700">6. CAT Requests:</span>
                              <p className="ml-4 text-blue-600 text-sm">Syndicate company requests for CATs, with attached work orders for bank verification and approval</p>
                            </div>
                          </div>
                        </div>

                        <h4 className="font-semibold text-blue-800 mt-4 mb-2">Example Use Cases:</h4>
                        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                          <li><strong>Monitoring Risk:</strong> Quickly see which vendors are triggering disputes.</li>
                          <li><strong>Evaluating Exposure:</strong> Check total outstanding liabilities across vendor relationships.</li>
                          <li><strong>Auditing CAT Requests:</strong> Inspect work order files before token issuance.</li>
                        </ul>
                      </section>

                      {/* Next Steps */}
                      <section className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">
                          <strong>Next Step:</strong> Upload other participant dashboards (Syndicate Company, Vendor, Sub-Vendor) to continue this documentation.
                        </p>
                      </section>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
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
