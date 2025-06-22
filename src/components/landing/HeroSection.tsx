
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLaunchPlatform = () => {
    navigate('/login');
  };

  const handleViewDocs = () => {
    navigate('/docs');
  };

  return (
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
  );
};

export default HeroSection;
