import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, Check, Sparkles } from 'lucide-react';

const Footer = ({ onOpenConsultation }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#02050f] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden z-10">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-500/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center">
                  TO THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ml-1.5">FUTURE</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase -mt-1 font-semibold">
                  ENTERPRISE IT & AI SYSTEMS
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              We architect, engineer, and deploy high-throughput enterprise software, autonomous AI systems, and cloud infrastructure for the global technology leaders of tomorrow.
            </p>

            {/* Live System Beacon */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#071333] border border-cyan-500/30 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-gray-300 font-mono text-[11px]">
                TTF Global Infrastructure: <span className="text-emerald-400 font-semibold">100% Operational (12ms)</span>
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Custom Enterprise Apps</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">AI & Machine Learning</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Cloud & Kubernetes DevOps</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Cross-Platform Mobile</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Zero-Trust Cybersecurity</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">UI/UX Design Systems</a></li>
            </ul>
          </div>

          {/* KicknShot App Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              KicknShot App
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://apps.apple.com/in/app/kicknshot/id6781648167" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">App Store (iOS)</a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.turfit" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">Google Play (Android)</a></li>
              <li><a href="https://kicknshot.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">kicknshot.com</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
              Engineering Dispatch
            </h4>
            <p className="text-xs text-gray-400">
              Receive quarterly architectural briefs on AI engineering, cloud benchmarks, and tech trends.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cto@enterprise.com"
                  required
                  className="w-full bg-[#081333] border border-cyan-500/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Engineering Dispatch!</span>
                </div>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-medium">To The Future Technologies Inc.</span> All rights reserved. Built for speed & scale.
          </div>

          <div className="flex items-center space-x-5 text-gray-400">
            <span className="hover:text-cyan-400 cursor-pointer">Security Policy</span>
            <span className="hover:text-cyan-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-cyan-400 cursor-pointer">Privacy Blueprint</span>
            <span className="hover:text-cyan-400 cursor-pointer">SOC2 Certified</span>
          </div>

          <div className="flex items-center space-x-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="X / Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
