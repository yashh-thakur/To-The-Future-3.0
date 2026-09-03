import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service, onBookService }) => {
  if (!service) return null;

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#060c20] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 my-8"
          >
            {/* Top Accent Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400">
                  {service.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                    Enterprise Capability
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Architecture & Core Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0b1433] border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-center space-x-2 text-cyan-300 text-sm font-semibold mb-3">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Technical Architecture</span>
                  </div>
                  <ul className="space-y-2.5">
                    {service.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0b1433] border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-center space-x-2 text-blue-300 text-sm font-semibold mb-3">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>Core Engineering Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Production Ready
                    </span>
                    <span className="text-cyan-400 font-mono">99.99% SLA</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 text-center sm:text-left">
                  Deployment timeline: <span className="text-white font-medium">4 to 12 Weeks per Phase</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBookService(service.title);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Build With This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
