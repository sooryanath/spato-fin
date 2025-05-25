
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote } from 'lucide-react';

const Docs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white hover:text-black border border-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="flex items-center">
              <Banknote className="h-8 w-8 text-white mr-2" />
              <h1 className="text-xl font-bold text-white">Spato Finance</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Deep Tier Financing Platform Documentation
            </h1>
          </div>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-white mb-6">
              This platform facilitates structured, secure credit distribution across complex supply chains using a novel <strong className="text-white">Token-Gated Credit Access System</strong>. It connects four key participants:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="font-bold text-white text-lg">1.</span>
                <div>
                  <span className="font-semibold text-white">Lenders</span>
                  <span className="text-white"> (Banks, NBFCs): Regulated institutions providing formal credit.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-white text-lg">2.</span>
                <div>
                  <span className="font-semibold text-white">Syndicate Companies</span>
                  <span className="text-white">: Large enterprises (e.g., Ultratech, Cochin Shipyard) with formal vendor systems.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-white text-lg">3.</span>
                <div>
                  <span className="font-semibold text-white">Vendors</span>
                  <span className="text-white">: Companies providing direct goods/services to syndicate firms.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-white text-lg">4.</span>
                <div>
                  <span className="font-semibold text-white">Sub-Vendors</span>
                  <span className="text-white">: Tier-2 suppliers delivering goods/services to Vendors.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Problem */}
          <section className="bg-black border border-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Problem</h2>
            <p className="text-white">
              Banks are comfortable lending to syndicate companies due to their size and credit history. However, vendors and sub-vendors—despite being operationally vital—often lack the digital footprint or documentation to access timely formal credit. This gap is known as the <strong className="text-white">deep tier financing problem</strong>.
            </p>
          </section>

          {/* Solution */}
          <section className="bg-white border border-black p-6 rounded-lg text-black">
            <h2 className="text-2xl font-semibold text-black mb-4">Solution: Token-Gated Credit Access System (TGCAS)</h2>
            <p className="text-black mb-6">
              TGCAS introduces <strong className="text-black">Credit Access Tokens (CATs)</strong> as programmable, trackable instruments of credit assurance across tiers of the supply chain.
            </p>
            
            <h3 className="text-xl font-semibold text-black mb-4">How it Works:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">1. CAT Issuance:</h4>
                <ul className="list-disc list-inside ml-4 text-black space-y-1">
                  <li>Syndicate companies request CATs from banks based on signed work orders.</li>
                  <li>Banks evaluate and issue CATs to syndicate companies accordingly.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">2. CAT Distribution:</h4>
                <ul className="list-disc list-inside ml-4 text-black space-y-1">
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
                <h4 className="font-semibold text-black mb-2">3. Credit Redemption:</h4>
                <ul className="list-disc list-inside ml-4 text-black space-y-1">
                  <li>Sub-vendors can redeem CATs at partner banks for loans.</li>
                  <li>In case of repayment failure, the bank is guaranteed repayment directly by the syndicate company as per prior agreement.</li>
                </ul>
              </div>
            </div>
            <p className="text-black mt-4 font-medium">
              This mechanism establishes <strong className="text-black">credit trust</strong> beyond the first tier.
            </p>
          </section>

          {/* Key Process Flows */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Key Process Flows</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-black text-black">
                <CardHeader>
                  <CardTitle className="text-black">Flow 1: CAT Lifecycle</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-black">
                    <li>Work order created by Syndicate Company</li>
                    <li>CAT request submitted to Bank</li>
                    <li>CAT issued → transferred to Vendor → optionally passed to Sub-Vendor</li>
                    <li>CAT surrendered to Bank → Loan disbursed</li>
                    <li>Repayment tracked → disputes resolved via Syndicate Company guarantee</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-black border-white text-white">
                <CardHeader>
                  <CardTitle className="text-white">Flow 2: Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-white">
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
          <section className="bg-black border border-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Bank Dashboard Experience</h2>
            <p className="text-white mb-6">
              The <strong className="text-white">Bank Dashboard</strong> is the control center for managing CAT issuance, monitoring vendor engagement, tracking active loans, and resolving disputes.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-white text-sm">
                    <li>Total CATs issued</li>
                    <li>Tokens redeemed</li>
                    <li>Active companies/vendors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">2. Issue New Tokens:</h4>
                  <p className="ml-4 text-white text-sm">Interface for banks to create CATs by entering company ID and token value.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">3. Recent Transactions:</h4>
                  <p className="ml-4 text-white text-sm">View of token issuance and redemption history</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">4. Active Loans:</h4>
                  <p className="ml-4 text-white text-sm">List of outstanding loans issued against CATs with due dates and remaining balances</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">5. Disputed Loans:</h4>
                  <p className="ml-4 text-white text-sm">Centralized view of loans flagged for disputes, linked to associated syndicate firms</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">6. CAT Requests:</h4>
                  <p className="ml-4 text-white text-sm">Syndicate company requests for CATs, with attached work orders for bank verification and approval</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-white space-y-1">
              <li><strong className="text-white">Monitoring Risk:</strong> Quickly see which vendors are triggering disputes.</li>
              <li><strong className="text-white">Evaluating Exposure:</strong> Check total outstanding liabilities across vendor relationships.</li>
              <li><strong className="text-white">Auditing CAT Requests:</strong> Inspect work order files before token issuance.</li>
            </ul>
          </section>

          {/* Company Dashboard Experience */}
          <section className="bg-white border border-black p-6 rounded-lg text-black">
            <h2 className="text-2xl font-semibold text-black mb-4">Company Dashboard Experience</h2>
            <p className="text-black mb-6">
              The <strong className="text-black">Company Dashboard</strong> enables syndicate companies to manage their CAT requests, distribute tokens to vendors, and oversee their supply chain financing operations.
            </p>
            
            <h3 className="text-xl font-semibold text-black mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-black mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-black text-sm">
                    <li>Total CATs received from banks</li>
                    <li>CATs distributed to vendors</li>
                    <li>Active vendor relationships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">2. Request CAT:</h4>
                  <p className="ml-4 text-black text-sm">Submit new CAT requests to banks with work order documentation and track approval status.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">3. Transfer Tokens:</h4>
                  <p className="ml-4 text-black text-sm">Distribute received CATs to vendors based on work allocations and project requirements.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-black mb-1">4. Vendor Management:</h4>
                  <p className="ml-4 text-black text-sm">View registered vendors, their token allocation history, and performance metrics.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">5. CAT Request History:</h4>
                  <p className="ml-4 text-black text-sm">Track all submitted requests to banks with status updates and approval timelines.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">6. Guarantee Obligations:</h4>
                  <p className="ml-4 text-black text-sm">Monitor potential liabilities from vendor defaults and manage dispute resolution processes.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-black mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-black space-y-1">
              <li><strong className="text-black">Project Planning:</strong> Request appropriate CAT amounts based on upcoming project requirements.</li>
              <li><strong className="text-black">Vendor Allocation:</strong> Distribute tokens efficiently across multiple vendors for different project phases.</li>
              <li><strong className="text-black">Risk Management:</strong> Monitor which vendors have redeemed tokens and potential exposure from guarantees.</li>
            </ul>
          </section>

          {/* Vendor Dashboard Experience */}
          <section className="bg-black border border-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Vendor Dashboard Experience</h2>
            <p className="text-white mb-6">
              The <strong className="text-white">Vendor Dashboard</strong> provides vendors with tools to manage received CATs, access working capital, and distribute tokens to their sub-vendors.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Dashboard Modules:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">1. Overview Metrics:</h4>
                  <ul className="list-disc list-inside ml-4 text-white text-sm">
                    <li>Total CATs received from companies</li>
                    <li>Tokens redeemed for loans</li>
                    <li>Active sub-vendor relationships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">2. Redeem Tokens:</h4>
                  <p className="ml-4 text-white text-sm">Convert CATs to working capital loans from partner banks with instant approval process.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">3. Transfer to Sub-Vendors:</h4>
                  <p className="ml-4 text-white text-sm">Forward CATs to sub-vendors for their financing needs and project requirements.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">4. Loan Management:</h4>
                  <p className="ml-4 text-white text-sm">Track active loans obtained through CAT redemption with payment schedules and balances.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">5. Transaction History:</h4>
                  <p className="ml-4 text-white text-sm">Complete record of CAT receipts, redemptions, and transfers to sub-vendors.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">6. Sub-Vendor Network:</h4>
                  <p className="ml-4 text-white text-sm">Manage relationships with sub-vendors and track their token utilization patterns.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Example Use Cases:</h3>
            <ul className="list-disc list-inside text-white space-y-1">
              <li><strong className="text-white">Cash Flow Management:</strong> Redeem CATs strategically to maintain optimal working capital.</li>
              <li><strong className="text-white">Supply Chain Financing:</strong> Provide sub-vendors with tokens to ensure timely delivery of materials.</li>
              <li><strong className="text-white">Credit Optimization:</strong> Balance between direct redemption and sub-vendor distribution for maximum efficiency.</li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="bg-white border border-black p-6 rounded-lg">
            <p className="text-black font-medium">
              <strong className="text-black">Implementation Status:</strong> All participant dashboards (Bank, Company, Vendor) have been documented and are ready for development. Sub-vendor functionality can be added as an extension of the vendor dashboard.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Docs;
