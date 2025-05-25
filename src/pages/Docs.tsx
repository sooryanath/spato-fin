
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote } from 'lucide-react';

const Docs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-800 hover:bg-gray-100 border border-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="flex items-center">
              <Banknote className="h-8 w-8 text-gray-800 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">Spato Finance</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Deep Tier Financing Platform Documentation
            </h1>
          </div>

          {/* Overview */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-700 mb-6">
              This platform facilitates structured, secure credit distribution across complex supply chains using a novel <strong className="text-gray-800">Token-Gated Credit Access System</strong>. It connects four key participants:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="font-bold text-gray-800 text-lg">1.</span>
                <div>
                  <span className="font-semibold text-gray-800">Lenders</span>
                  <span className="text-gray-700"> (Banks, NBFCs): Regulated institutions providing formal credit.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-gray-800 text-lg">2.</span>
                <div>
                  <span className="font-semibold text-gray-800">Syndicate Companies</span>
                  <span className="text-gray-700">: Large enterprises (e.g., Ultratech, Cochin Shipyard) with formal vendor systems.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-gray-800 text-lg">3.</span>
                <div>
                  <span className="font-semibold text-gray-800">Vendors</span>
                  <span className="text-gray-700">: Companies providing direct goods/services to syndicate firms.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-gray-800 text-lg">4.</span>
                <div>
                  <span className="font-semibold text-gray-800">Sub-Vendors</span>
                  <span className="text-gray-700">: Tier-2 suppliers delivering goods/services to Vendors.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Problem */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Problem</h2>
            <p className="text-gray-700">
              Banks are comfortable lending to syndicate companies due to their size and credit history. However, vendors and sub-vendors—despite being operationally vital—often lack the digital footprint or documentation to access timely formal credit. This gap is known as the <strong className="text-gray-800">deep tier financing problem</strong>.
            </p>
          </section>

          {/* Solution */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solution: Token-Gated Credit Access System (TGCAS)</h2>
            <p className="text-gray-700 mb-6">
              TGCAS introduces <strong className="text-gray-800">Credit Access Tokens (CATs)</strong> as programmable, trackable instruments of credit assurance across tiers of the supply chain.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How it Works:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. CAT Issuance:</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Syndicate companies request CATs from banks based on signed work orders.</li>
                  <li>Banks evaluate and issue CATs to syndicate companies accordingly.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. CAT Distribution:</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Syndicate companies distribute CATs to vendors when awarding work.</li>
                  <li>Vendors can:
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                      <li>Surrender CATs to banks for immediate working capital.</li>
                      <li>Forward CATs to sub-vendors for further financing needs.</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Credit Redemption:</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Sub-vendors can redeem CATs at partner banks for loans.</li>
                  <li>In case of repayment failure, the bank is guaranteed repayment directly by the syndicate company as per prior agreement.</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-4 font-medium">
              This mechanism establishes <strong className="text-gray-800">credit trust</strong> beyond the first tier.
            </p>
          </section>

          {/* Key Process Flows */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Process Flows</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-300">
                <CardHeader>
                  <CardTitle className="text-gray-800">Flow 1: CAT Lifecycle</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Work order created by Syndicate Company</li>
                    <li>CAT request submitted to Bank</li>
                    <li>CAT issued → transferred to Vendor → optionally passed to Sub-Vendor</li>
                    <li>CAT surrendered to Bank → Loan disbursed</li>
                    <li>Repayment tracked → disputes resolved via Syndicate Company guarantee</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300">
                <CardHeader>
                  <CardTitle className="text-gray-800">Flow 2: Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
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
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bank Dashboard Experience</h2>
            <p className="text-gray-700 mb-6">
              The <strong className="text-gray-800">Bank Dashboard</strong> is the control center for managing CAT issuance, monitoring vendor engagement, tracking active loans, and resolving disputes.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    <li>Total CATs issued</li>
                    <li>Tokens redeemed</li>
                    <li>Active companies/vendors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">2. Issue New Tokens:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Interface for banks to create CATs by entering company ID and token value.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">3. Recent Transactions:</h4>
                  <p className="ml-4 text-gray-700 text-sm">View of token issuance and redemption history</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">4. Active Loans:</h4>
                  <p className="ml-4 text-gray-700 text-sm">List of outstanding loans issued against CATs with due dates and remaining balances</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">5. Disputed Loans:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Centralized view of loans flagged for disputes, linked to associated syndicate firms</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">6. CAT Requests:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Syndicate company requests for CATs, with attached work orders for bank verification and approval</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong className="text-gray-800">Monitoring Risk:</strong> Quickly see which vendors are triggering disputes.</li>
              <li><strong className="text-gray-800">Evaluating Exposure:</strong> Check total outstanding liabilities across vendor relationships.</li>
              <li><strong className="text-gray-800">Auditing CAT Requests:</strong> Inspect work order files before token issuance.</li>
            </ul>
          </section>

          {/* Company Dashboard Experience */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Dashboard Experience</h2>
            <p className="text-gray-700 mb-6">
              The <strong className="text-gray-800">Company Dashboard</strong> enables syndicate companies to manage their CAT requests, distribute tokens to vendors, and oversee their supply chain financing operations.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    <li>Total CATs received from banks</li>
                    <li>CATs distributed to vendors</li>
                    <li>Active vendor relationships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">2. Request CAT:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Submit new CAT requests to banks with work order documentation and track approval status.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">3. Transfer Tokens:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Distribute received CATs to vendors based on work allocations and project requirements.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">4. Vendor Management:</h4>
                  <p className="ml-4 text-gray-700 text-sm">View registered vendors, their token allocation history, and performance metrics.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">5. CAT Request History:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Track all submitted requests to banks with status updates and approval timelines.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">6. Guarantee Obligations:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Monitor potential liabilities from vendor defaults and manage dispute resolution processes.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong className="text-gray-800">Project Planning:</strong> Request appropriate CAT amounts based on upcoming project requirements.</li>
              <li><strong className="text-gray-800">Vendor Allocation:</strong> Distribute tokens efficiently across multiple vendors for different project phases.</li>
              <li><strong className="text-gray-800">Risk Management:</strong> Monitor which vendors have redeemed tokens and potential exposure from guarantees.</li>
            </ul>
          </section>

          {/* Vendor Dashboard Experience */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vendor Dashboard Experience</h2>
            <p className="text-gray-700 mb-6">
              The <strong className="text-gray-800">Vendor Dashboard</strong> provides vendors with tools to manage received CATs, access working capital, and distribute tokens to their sub-vendors.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                    <li>Total CATs received from companies</li>
                    <li>Tokens redeemed for loans</li>
                    <li>Active sub-vendor relationships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">2. Redeem Tokens:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Convert CATs to working capital loans from partner banks with instant approval process.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">3. Transfer to Sub-Vendors:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Forward CATs to sub-vendors for their financing needs and project requirements.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">4. Loan Management:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Track active loans obtained through CAT redemption with payment schedules and balances.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">5. Transaction History:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Complete record of CAT receipts, redemptions, and transfers to sub-vendors.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">6. Sub-Vendor Network:</h4>
                  <p className="ml-4 text-gray-700 text-sm">Manage relationships with sub-vendors and track their token utilization patterns.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong className="text-gray-800">Cash Flow Management:</strong> Redeem CATs strategically to maintain optimal working capital.</li>
              <li><strong className="text-gray-800">Supply Chain Financing:</strong> Provide sub-vendors with tokens to ensure timely delivery of materials.</li>
              <li><strong className="text-gray-800">Credit Optimization:</strong> Balance between direct redemption and sub-vendor distribution for maximum efficiency.</li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="bg-white border border-gray-300 p-6 rounded-lg">
            <p className="text-gray-700 font-medium">
              <strong className="text-gray-800">Implementation Status:</strong> All participant dashboards (Bank, Company, Vendor) have been documented and are ready for development. Sub-vendor functionality can be added as an extension of the vendor dashboard.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Docs;
