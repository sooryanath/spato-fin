
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const LandingHeader = () => {
  const navigate = useNavigate();

  const handleViewDocs = () => {
    navigate('/docs');
  };

  return (
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
  );
};

export default LandingHeader;
