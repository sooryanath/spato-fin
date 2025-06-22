
import React from 'react';

const StatsSection = () => {
  return (
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
  );
};

export default StatsSection;
