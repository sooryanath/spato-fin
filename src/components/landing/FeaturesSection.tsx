
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Building, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
