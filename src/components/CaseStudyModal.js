import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';

const CaseStudyModal = ({ isOpen, onClose, caseStudy, onBookSimilar }) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#060c20] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 my-8"
          >
            {/* Gradient Top Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/30">
                  {caseStudy.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Client: {caseStudy.client}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {caseStudy.title}
              </h3>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {caseStudy.metrics?.map((m, idx) => (
                  <div key={idx} className="bg-[#0b1433] border border-cyan-500/20 rounded-xl p-3.5 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0b1433]/70 border border-white/5 rounded-xl p-4">
                  <h4 className="text-xs font-mono uppercase text-red-400 tracking-wider mb-2 font-semibold">
                    The Architectural Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div className="bg-[#0b1433]/70 border border-cyan-500/20 rounded-xl p-4">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2 font-semibold">
                    The TTF Engineering Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase text-gray-400 mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-black/50 border border-white/10 text-cyan-300 text-xs font-mono rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* App Store, Play Store & Website Links if available */}
              {(caseStudy.appStoreUrl || caseStudy.playStoreUrl || caseStudy.websiteUrl) && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#0a183d] to-[#0d1430] border border-cyan-500/30">
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                    <span>Live App & Web Downloads</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {caseStudy.appStoreUrl && (
                      <a
                        href={caseStudy.appStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/20 hover:border-cyan-400 text-white text-xs font-semibold transition-all shadow-md hover:scale-105"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.96 2.77 1.01.08 2.06-.52 2.69-1.28z"/>
                        </svg>
                        <div className="text-left leading-tight">
                          <div className="text-[9px] text-gray-400 font-normal">Download on the</div>
                          <div className="text-xs font-bold">App Store</div>
                        </div>
                      </a>
                    )}

                    {caseStudy.playStoreUrl && (
                      <a
                        href={caseStudy.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/20 hover:border-emerald-400 text-white text-xs font-semibold transition-all shadow-md hover:scale-105"
                      >
                        <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24">
                          <path d="M3.609 1.814L13.792 12 3.61 22.186c-.37-.367-.61-.926-.61-1.595V3.41c0-.669.24-1.228.609-1.596zm11.597 11.598l2.502 2.502-12.227 6.945 9.725-9.447zm0-2.824L5.48 1.141l12.228 6.945-2.502 2.502zm1.414 1.412l3.413 1.94c.983.559.983 1.468 0 2.027l-3.413 1.94-2.115-2.114 2.115-2.113z"/>
                        </svg>
                        <div className="text-left leading-tight">
                          <div className="text-[9px] text-gray-400 font-normal">GET IT ON</div>
                          <div className="text-xs font-bold">Google Play</div>
                        </div>
                      </a>
                    )}

                    {caseStudy.websiteUrl && (
                      <a
                        href={caseStudy.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/20 hover:border-cyan-400 text-white text-xs font-semibold transition-all shadow-md hover:scale-105"
                      >
                        <Globe className="w-5 h-5 text-cyan-400" />
                        <div className="text-left leading-tight">
                          <div className="text-[9px] text-gray-400 font-normal">VISIT OFFICIAL</div>
                          <div className="text-xs font-bold flex items-center gap-1">
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400">
                  Ready to deploy high-scale architecture?
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBookSimilar(caseStudy.title);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Build Similar Solution</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
