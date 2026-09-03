import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

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
