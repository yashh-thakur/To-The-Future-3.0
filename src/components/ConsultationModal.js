import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

const ConsultationModal = ({ isOpen, onClose, initialService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'Custom Software Development',
    budget: '$25k - $50k',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      
      // Trigger festive cyber confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#3b82f6', '#8b5cf6', '#ffffff']
      });
    }, 700);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#070e24] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-900/30 overflow-hidden z-10 my-8"
          >
            {/* Header Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {!isSubmitted ? (
                <>
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Free Architecture & Strategy Consultation</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Schedule Your <span className="gradient-text-cyan">Discovery Call</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Connect with our Principal Software Architects to discuss your technology roadmap, system requirements, and rapid sprint timelines.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full bg-[#0d1738] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full bg-[#0d1738] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Enterprise / Startup Name"
                          className="w-full bg-[#0d1738] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Primary Service
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#0d1738] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          <option value="Custom Software Development">Custom Software Development</option>
                          <option value="AI & Machine Learning Solutions">AI & Machine Learning Solutions</option>
                          <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                          <option value="Mobile App Engineering">Mobile App Engineering</option>
                          <option value="Cybersecurity & Audit">Cybersecurity & Audit</option>
                          <option value="Digital Transformation Consulting">Digital Transformation Consulting</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Target Budget Bracket
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'].map((tier) => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setFormData({ ...formData, budget: tier })}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              formData.budget === tier
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                                : 'bg-[#0d1738] border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Project Overview or Goals
                      </label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly tell us what you're building, key technical challenges, or upcoming deadlines..."
                        className="w-full bg-[#0d1738] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      />
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Strict NDA Protection
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        Guaranteed response within 2 hours
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Transmitting Blueprint Request...</span>
                      ) : (
                        <>
                          <span>Confirm & Book Technical Briefing</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
                    Thank you, <span className="text-cyan-400 font-semibold">{formData.name || 'Valued Partner'}</span>. Our Lead Architect has been notified. We will review your requirements for <span className="text-blue-400">{formData.service}</span> and reach out at <span className="text-cyan-400">{formData.email}</span> shortly.
                  </p>
                  <div className="p-4 bg-[#0d1738] rounded-xl border border-cyan-500/20 text-left text-xs space-y-2 text-gray-300 max-w-sm mx-auto mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response SLA:</span>
                      <span className="text-emerald-400 font-semibold">&lt; 120 Minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Project Bracket:</span>
                      <span className="text-white font-semibold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-cyan-400 font-semibold">Priority Routing Active</span>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
