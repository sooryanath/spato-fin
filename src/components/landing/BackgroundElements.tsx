
import React from 'react';

const BackgroundElements = () => {
  return (
    <>
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
    </>
  );
};

export default BackgroundElements;
