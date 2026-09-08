import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import CaseStudyModal from '../../components/CaseStudyModal';

const allPortfolioItems = [
  {
    id: 'kicknshot',
    category: 'Mobile & IoT',
    client: 'KicknShot',
    title: 'KicknShot — Next-Gen Sports Turf Booking & Player Community App',
    challenge: 'Sports turf venues and athletes suffered from chaotic manual scheduling, double-booked slots, and fragmented tournament management.',
    solution: 'Architected and launched an end-to-end mobile & web ecosystem featuring real-time slot calendar booking, instant payments, open match formation, and live tournament leaderboards.',
    metrics: [
      { value: '10k+', label: 'Active Downloads' },
      { value: '4.8 ★', label: 'Store Rating' },
      { value: '< 200ms', label: 'Slot Sync SLA' }
    ],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'AWS'],
    appStoreUrl: 'https://apps.apple.com/in/app/kicknshot/id6781648167',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.turfit',
    websiteUrl: 'https://kicknshot.com'
  },
  {
    id: 'trading-core',
    category: 'FinTech',
    client: 'Apex Ledger Financial',
    title: 'Sub-Millisecond Algorithmic Trading & Real-Time Ledger',
    challenge: 'Legacy monolith experienced severe latency degradation (800ms) during high volatility market opening windows, causing order drops.',
    solution: 'Designed high-throughput Go microservices with lock-free memory rings, Redis clusters, and Apache Kafka event sourcing running on AWS EKS.',
    metrics: [
      { value: '4ms', label: 'End-to-End Latency' },
      { value: '14M+', label: 'Daily Orders Handled' },
      { value: '99.999%', label: 'Production Uptime' }
    ],
    technologies: ['Go', 'Kafka', 'Redis', 'Kubernetes', 'PostgreSQL', 'Grafana']
  },
  {
    id: 'ai-diagnostics',
    category: 'AI & ML',
    client: 'NeuroVital Diagnostics',
    title: 'Autonomous Medical Vision & Diagnostic Inference Pipeline',
    challenge: 'Radiology groups had a 72-hour interpretation backlog for MRI & CT scans, resulting in delayed acute patient care.',
    solution: 'Built custom convolutional neural network (CNN) inference models deployed in a HIPAA-compliant AWS Bedrock and TensorRT architecture.',
    metrics: [
      { value: '98.4%', label: 'Diagnostic Sensitivity' },
      { value: '12x', label: 'Turnaround Acceleration' },
      { value: '350k+', label: 'Patients Scanned' }
    ],
    technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS Bedrock', 'DICOM']
  },
  {
    id: 'logistics-hub',
    category: 'Enterprise SaaS',
    client: 'OmniSupply Logistics',
    title: 'Autonomous Global Maritime & Fleet Telemetry Hub',
    challenge: 'Fragmented siloed databases across 4 continents prevented accurate ETAs and resulted in severe demurrage penalties.',
    solution: 'Unified real-time IoT vessel tracking and Snowflake data lakehouse with predictive ETA neural models and interactive mapping.',
    metrics: [
      { value: '$4.2M', label: 'Annual Fuel & Demurrage Saved' },
      { value: '99.2%', label: 'On-Time Routing Accuracy' },
      { value: '45,000', label: 'Active Fleet Vessels' }
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Snowflake', 'Terraform', 'WebSockets']
  },
  {
    id: 'bank-identity',
    category: 'Cybersecurity',
    client: 'Vanguard Trust Banking',
    title: 'Zero-Trust Biometric Authentication & Fraud Prevention Core',
    challenge: 'Growing credential stuffing and synthetic identity fraud attacks threatened consumer trust and regulatory standing.',
    solution: 'Engineered multi-modal biometric authentication (FIDO2 / WebAuthn) with behavioral graph analysis running in isolated hardware enclaves.',
    metrics: [
      { value: '-94%', label: 'Fraud Incidents' },
      { value: '100%', label: 'SOC2 & PCI-DSS Audit Pass' },
      { value: '3.8M', label: 'Protected Banking Users' }
    ],
    technologies: ['Rust', 'WebAuthn', 'HashiCorp Vault', 'AWS KMS', 'Kafka', 'Terraform']
  },
  {
    id: 'telecom-mesh',
    category: 'Cloud & DevOps',
    client: 'Aether Cellular Networks',
    title: '5G Edge Cloud Infrastructure & Multi-Region Service Mesh',
    challenge: 'Expanding cell towers required sub-5ms low latency packet routing with automated regional failover capabilities.',
    solution: 'Configured Istio-backed distributed Kubernetes clusters across 24 edge data centers with Prometheus and OpenTelemetry monitoring.',
    metrics: [
      { value: '2.1ms', label: 'Edge Packet Latency' },
      { value: '100Gbps', label: 'Network Throughput' },
      { value: '0 sec', label: 'Failover Downtime' }
    ],
    technologies: ['Kubernetes', 'Istio', 'Go', 'Prometheus', 'Envoy', 'AWS Wavelength']
  },
  {
    id: 'health-mobile',
    category: 'Mobile & IoT',
    client: 'Aura Vitality Wearables',
    title: 'Continuous Biosensing Mobile App & Telehealth Portal',
    challenge: 'Bluetooth Low Energy sensor data synchronization suffered high battery drain and frequent packet drops on mobile devices.',
    solution: 'Architected native background synchronization workers with SQLite offline caching and end-to-end encrypted telehealth WebRTC video.',
    metrics: [
      { value: '4.9 ★', label: 'App Store Rating' },
      { value: '65%', label: 'Reduced Battery Usage' },
      { value: '800k', label: 'Active Daily Wearers' }
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'SQLite', 'WebRTC', 'Node.js']
  }
];

const categories = ['All', 'AI & ML', 'FinTech', 'Cloud & DevOps', 'Enterprise SaaS', 'Cybersecurity', 'Mobile & IoT'];

const Portfolio = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalStudy, setActiveModalStudy] = useState(null);

  const filteredItems = allPortfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proven Engineering Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Architectural Triumphs & <span className="gradient-text-cyan">Case Studies</span>
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg">
          Explore how To The Future designs, engineers, and operates high-scale enterprise platforms for market leaders around the globe.
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'glass-panel text-gray-400 hover:text-white hover:border-cyan-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech, client, or topic..."
            className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredItems.map((study) => (
          <div
            key={study.id}
            className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/50"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {study.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {study.client}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {study.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                {study.challenge}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#09122c] p-3 rounded-xl border border-white/5 mb-6 text-center">
                {study.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
                    <div className="text-[10px] text-gray-400 truncate">{m.label}</div>
                  </div>
                ))}
              </div>
              {/* Direct Store Links if available */}
              {(study.appStoreUrl || study.playStoreUrl) && (
                <div className="flex items-center space-x-2 mb-4 pt-2 border-t border-white/5">
                  {study.appStoreUrl && (
                    <a
                      href={study.appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black border border-white/10 hover:border-cyan-400 text-white text-[11px] font-medium transition-all"
                      title="Download on App Store"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.96 2.77 1.01.08 2.06-.52 2.69-1.28z"/>
                      </svg>
                      <span>App Store</span>
                    </a>
                  )}
                  {study.playStoreUrl && (
                    <a
                      href={study.playStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black border border-white/10 hover:border-emerald-400 text-white text-[11px] font-medium transition-all"
                      title="Get it on Google Play"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.37-.367-.61-.926-.61-1.595V3.41c0-.669.24-1.228.609-1.596zm11.597 11.598l2.502 2.502-12.227 6.945 9.725-9.447zm0-2.824L5.48 1.141l12.228 6.945-2.502 2.502zm1.414 1.412l3.413 1.94c.983.559.983 1.468 0 2.027l-3.413 1.94-2.115-2.114 2.115-2.113z"/>
                      </svg>
                      <span>Play Store</span>
                    </a>
                  )}
                  {study.websiteUrl && (
                    <a
                      href={study.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium transition-all"
                      title="Official Website"
                    >
                      <span>Website ↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {study.technologies.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveModalStudy(study)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">No case studies matched your search query. Try another keyword or filter.</p>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-[#061033] via-[#09194a] to-[#04081c] text-center shadow-2xl shadow-cyan-950/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Build Your <span className="gradient-text-cyan">Next Breakthrough?</span>
        </h3>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Partner with To The Future's principal engineers to design, build, and deploy resilient digital architecture for your business.
        </p>

        <button
          onClick={() => onOpenConsultation('Portfolio Architecture Inquiry')}
          className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl shadow-cyan-500/25 transition-all inline-flex items-center space-x-2"
        >
          <span>Schedule Technical Discovery Call</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={!!activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        caseStudy={activeModalStudy}
        onBookSimilar={(studyTitle) => {
          onOpenConsultation(`Case Study Architecture: ${studyTitle}`);
        }}
      />
    </div>
  );
};

export default Portfolio;
