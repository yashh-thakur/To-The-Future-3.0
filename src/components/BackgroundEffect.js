import React from 'react';

const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Cybernetic Ambient Glowing Orbs */}
      <div 
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, #00f0ff 0%, #0051ff 60%, transparent 80%)' }}
      />
      <div 
        className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full blur-[150px] opacity-25"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, #3b82f6 50%, transparent 80%)' }}
      />
      <div 
        className="absolute -bottom-20 left-1/3 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, #00f0ff 0%, #6366f1 50%, transparent 80%)' }}
      />

      {/* Subtle Noise / Radial Vignette for Depth */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
};

export default BackgroundEffect;
