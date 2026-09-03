import React, { useState } from 'react';
import { Calculator, Check, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';

const domains = [
  { id: 'web', name: 'Enterprise Web & Cloud SaaS', basePrice: 20000, weeks: 6 },
  { id: 'ai', name: 'AI, LLM & Machine Learning Systems', basePrice: 28000, weeks: 8 },
  { id: 'mobile', name: 'Cross-Platform Mobile (iOS/Android)', basePrice: 22000, weeks: 7 },
  { id: 'cloud', name: 'Cloud Infrastructure & Kubernetes DevOps', basePrice: 18000, weeks: 5 },
  { id: 'cyber', name: 'Zero-Trust Cybersecurity & Audit', basePrice: 16000, weeks: 4 },
];

const scales = [
  { id: 'mvp', name: 'MVP / Proof of Concept', multiplier: 1.0, weeksAdd: 0 },
  { id: 'growth', name: 'Growth Scale System', multiplier: 1.8, weeksAdd: 3 },
  { id: 'enterprise', name: 'Global Enterprise Scale', multiplier: 3.2, weeksAdd: 6 },
];

const addOnsList = [
  { id: 'soc2', name: 'SOC2 & HIPAA Compliance Hardening', price: 6000, icon: <Shield className="w-4 h-4 text-emerald-400" /> },
  { id: 'rag', name: 'Custom AI Vector Search / RAG Pipeline', price: 9500, icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
  { id: 'sre', name: '24/7 SRE Monitoring & Multi-Region Failover', price: 5000, icon: <Zap className="w-4 h-4 text-yellow-400" /> },
];

const CostEstimator = ({ onOpenConsultationWithEstimate }) => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedScale, setSelectedScale] = useState(scales[1]);
  const [selectedAddOns, setSelectedAddOns] = useState(['soc2']);

  const toggleAddOn = (id) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Calculations
  const addOnsTotal = selectedAddOns.reduce((acc, currId) => {
    const item = addOnsList.find(a => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);

  const baseCalculated = Math.round((selectedDomain.basePrice * selectedScale.multiplier) + addOnsTotal);
  const minEstimate = Math.round(baseCalculated * 0.9 / 1000) * 1000;
  const maxEstimate = Math.round(baseCalculated * 1.15 / 1000) * 1000;
  const totalWeeks = selectedDomain.weeks + selectedScale.weeksAdd;

  const handleProceed = () => {
    onOpenConsultationWithEstimate(selectedDomain.name, `$${minEstimate.toLocaleString()} - $${maxEstimate.toLocaleString()}`);
  };

  return (
    <section id="estimator" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Cost & Architecture Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Estimate Your Project <span className="gradient-text-cyan">Timeline & Investment</span>
        </h2>
        <p className="text-gray-400 mt-4 text-base sm:text-lg">
          Configure your technical requirements to receive a real-time budget bracket and rapid delivery milestone calculation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options Configurator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Solution Domain */}
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-white text-base font-semibold mb-3 flex items-center justify-between">
              <span>1. Select Core Technology Domain</span>
              <span className="text-xs text-cyan-400 font-mono">STEP 01/03</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {domains.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                    selectedDomain.id === dom.id
                      ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                      : 'bg-[#09122c]/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{dom.name}</span>
                  {selectedDomain.id === dom.id && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 ml-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: System Scale */}
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-white text-base font-semibold mb-3 flex items-center justify-between">
              <span>2. System Scale & Complexity</span>
              <span className="text-xs text-blue-400 font-mono">STEP 02/03</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {scales.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScale(s)}
                  className={`p-3.5 rounded-xl text-center border transition-all ${
                    selectedScale.id === s.id
                      ? 'bg-blue-950/60 border-blue-400 text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#09122c]/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold mb-1">{s.name}</div>
                  <div className="text-[11px] text-gray-400">
                    {s.id === 'mvp' ? 'Rapid Proof' : s.id === 'growth' ? 'High Traction' : 'Mission-Critical'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Enterprise Add-ons */}
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-white text-base font-semibold mb-3 flex items-center justify-between">
              <span>3. Architecture Upgrades & Modules</span>
              <span className="text-xs text-purple-400 font-mono">STEP 03/03</span>
            </h4>
            <div className="space-y-2.5">
              {addOnsList.map((addon) => {
                const active = selectedAddOns.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      active
                        ? 'bg-purple-950/40 border-purple-400/70 text-white'
                        : 'bg-[#09122c]/50 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        {addon.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-cyan-300">+${addon.price.toLocaleString()}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                        active ? 'bg-purple-500 border-purple-400 text-white' : 'border-white/20'
                      }`}>
                        {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Calculation Display Card */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="relative rounded-3xl p-7 border border-cyan-500/40 bg-gradient-to-b from-[#081232] via-[#050b1d] to-[#02050f] shadow-2xl shadow-cyan-950/50 overflow-hidden">
            {/* Top Glow Orb */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
                TTF SPECIFICATION SUMMARY
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono border border-emerald-500/30">
                LIVE ESTIMATE
              </span>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-1">Estimated Investment Bracket</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">
                ${minEstimate.toLocaleString()} – ${maxEstimate.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Fixed-price agile sprint breakdown with milestone-based sign-offs.
              </div>
            </div>

            {/* Spec Details */}
            <div className="space-y-3.5 bg-black/40 rounded-xl p-4 border border-white/5 text-xs text-gray-300 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Target Track:</span>
                <span className="text-white font-medium text-right max-w-[200px] truncate">{selectedDomain.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scale Scope:</span>
                <span className="text-cyan-300 font-medium">{selectedScale.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sprint Delivery Window:</span>
                <span className="text-emerald-400 font-mono font-semibold">~{totalWeeks} to {totalWeeks + 2} Weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Add-ons Active:</span>
                <span className="text-purple-300 font-medium">{selectedAddOns.length} Included</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-[11px]">
                <span className="text-gray-400">Engineering SLA:</span>
                <span className="text-white font-mono">Zero-Downtime Guarantee</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleProceed}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Lock In Estimate & Book Briefing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <p className="text-[11px] text-gray-400 text-center mt-3">
              No commitment required. We sign strict non-disclosure agreements prior to technical review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
