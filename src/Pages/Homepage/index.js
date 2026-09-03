import React, { useState, useEffect } from 'react';
import {
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  Shield,
  Palette,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  Server,
  Globe,
  Lock,
  ChevronRight,
  Star,
  Send,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CostEstimator from '../../components/CostEstimator';
import ServiceModal from '../../components/ServiceModal';
import CaseStudyModal from '../../components/CaseStudyModal';
import { Link } from 'react-router-dom';

// IT Services Catalog
const itServices = [
  {
    id: 'custom-software',
    title: 'Custom Enterprise Software & Web Platforms',
    description: 'Scalable, event-driven architectures designed for high transactional throughput and zero downtime.',
    icon: <Code2 className="w-6 h-6" />,
    features: [
      'Microservices & Event-Driven Architecture (Kafka / RabbitMQ)',
      'High-Concurrency Distributed Backend Systems',
      'Enterprise SaaS Platforms with Multi-Tenant Isolation',
      'Robust GraphQL & REST API Gateways'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Go', 'PostgreSQL', 'Redis'],
    badge: 'MISSION-CRITICAL'
  },
  {
    id: 'ai-ml',
    title: 'AI, LLM Systems & Intelligent Automation',
    description: 'Transform raw data into autonomous workflows, predictive intelligence, and proprietary enterprise copilot agents.',
    icon: <Cpu className="w-6 h-6" />,
    features: [
      'Enterprise RAG & Domain-Specific LLM Fine-Tuning',
      'Real-Time Predictive Analytics & Neural Pipelines',
      'Autonomous AI Agents & Intelligent RPA Workflows',
      'Computer Vision & Natural Language Processing'
    ],
    techStack: ['Python', 'PyTorch', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    badge: 'HIGH-DEMAND'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & Kubernetes DevOps',
    description: 'Resilient multi-cloud orchestration, automated CI/CD pipelines, and infrastructure-as-code hardening.',
    icon: <Cloud className="w-6 h-6" />,
    features: [
      'Multi-Cloud Orchestration (AWS, GCP, Azure)',
      'Automated Zero-Downtime GitOps CI/CD Pipelines',
      'Kubernetes Cluster Auto-Scaling & Service Mesh',
      'FinOps Cloud Cost Optimization & Redundancy'
    ],
    techStack: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'ArgoCD', 'Prometheus'],
    badge: 'ENTERPRISE SLA'
  },
  {
    id: 'mobile-app',
    title: 'High-Performance Mobile Engineering',
    description: 'Fluid, cross-platform and native mobile apps engineered for speed, offline-first reliability, and intuitive UX.',
    icon: <Smartphone className="w-6 h-6" />,
    features: [
      'Cross-Platform Apps with Native 60fps Performance',
      'Offline-First Data Sync & Local SQLite/Realm Storage',
      'Biometric Security & Hardware Sensor Integrations',
      'Automated App Store & Play Store CI/CD Deployments'
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    badge: 'NATIVE 60FPS'
  },
  {
    id: 'cybersecurity',
    title: 'Zero-Trust Cybersecurity & Compliance',
    description: 'Military-grade defense, continuous automated penetration testing, and rapid SOC2 / HIPAA readiness.',
    icon: <Shield className="w-6 h-6" />,
    features: [
      'End-to-End Zero-Trust Network Architecture',
      'Automated Vulnerability Scanning & Dynamic SAST/DAST',
      'SOC2 Type II, ISO 27001 & HIPAA Compliance Hardening',
      'Identity & Access Management (OAuth2 / SAML / OIDC)'
    ],
    techStack: ['HashiCorp Vault', 'WAF', 'SonarQube', 'OIDC', 'Cloudflare'],
    badge: 'DEFENSE-GRADE'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design Systems & Product Engineering',
    description: 'Award-winning digital interfaces that captivate enterprise users and accelerate product conversion.',
    icon: <Palette className="w-6 h-6" />,
    features: [
      'Scalable Design Tokens & Component Systems',
      'Deep User Research, Personas & Friction Audits',
      'Interactive Micro-Animations & Responsive Prototypes',
      'Accessibility Standards (WCAG 2.1 AA Compliance)'
    ],
    techStack: ['Figma', 'Storybook', 'TailwindCSS', 'Framer Motion'],
    badge: 'PREMIUM UX'
  }
];

// Tech stack technologies for marquee
const techList = [
  { name: 'React / Next.js', tag: 'Frontend' },
  { name: 'TypeScript', tag: 'Language' },
  { name: 'Python', tag: 'AI & Data' },
  { name: 'Go (Golang)', tag: 'Microservices' },
  { name: 'Kubernetes', tag: 'Orchestration' },
  { name: 'AWS Cloud', tag: 'Infra' },
  { name: 'Docker', tag: 'Containers' },
  { name: 'TensorFlow / PyTorch', tag: 'Neural' },
  { name: 'PostgreSQL', tag: 'Database' },
  { name: 'GraphQL', tag: 'API' },
  { name: 'Redis', tag: 'Cache' },
  { name: 'Google Cloud', tag: 'Cloud' },
  { name: 'FastAPI', tag: 'Backend' },
  { name: 'Tailwind CSS', tag: 'Styling' },
];

// Sample Case Studies
const caseStudies = [
  {
    id: 'fintech-core',
    category: 'FinTech & Cloud',
    client: 'Apex Ledger Financial',
    title: 'Sub-Millisecond Algorithmic Trading & Ledger Platform',
    challenge: 'Legacy monolith suffered from 800ms latency spikes and frequent thread locks during market volatility spikes.',
    solution: 'Engineered event-driven Go microservices with Redis caching and Apache Kafka streaming, deployed on auto-scaling Kubernetes.',
    metrics: [
      { value: '4ms', label: 'End-to-End Latency' },
      { value: '14M+', label: 'Daily Transactions' },
      { value: '99.999%', label: 'Uptime SLA' }
    ],
    technologies: ['Go', 'Kafka', 'Redis', 'Kubernetes', 'PostgreSQL', 'Grafana']
  },
  {
    id: 'ai-health',
    category: 'AI / Healthcare',
    client: 'NeuroVital Diagnostics',
    title: 'Autonomous AI Diagnostic Assistant & Imaging Pipeline',
    challenge: 'Radiology centers experienced 72-hour diagnostic backlogs with high clinician burnout.',
    solution: 'Built custom CNN neural vision models with a secure HIPAA-compliant cloud pipeline that pre-flags anomalies in real-time.',
    metrics: [
      { value: '98.4%', label: 'Model Precision' },
      { value: '12x', label: 'Faster Diagnosis' },
      { value: '350k+', label: 'Patients Scanned' }
    ],
    technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS Bedrock', 'DICOM']
  },
  {
    id: 'enterprise-saas',
    category: 'Enterprise SaaS',
    client: 'OmniSupply Logistics',
    title: 'Global Supply Chain Visibility & Predictive Logistics Hub',
    challenge: 'Fragmented legacy ERP databases created costly shipping bottlenecks and blind spots across 18 sea-freight corridors.',
    solution: 'Unified multi-cloud data lakehouse with real-time IoT tracking and an intuitive next-generation dashboard.',
    metrics: [
      { value: '$4.2M', label: 'Annual Cost Saved' },
      { value: '99.2%', label: 'On-Time Routing' },
      { value: '45,000', label: 'Active Fleets' }
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Snowflake', 'Terraform', 'WebSockets']
  }
];

// Testimonials
const testimonials = [
  {
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'FinSphere Global',
    content: 'To The Future delivered our next-generation transactional core ahead of schedule. Their engineering rigor, microservices architecture, and adherence to security standards are second to none.',
    rating: 5
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Engineering & AI',
    company: 'Synapse Healthcare',
    content: 'The team transformed our legacy machine learning models into a blazing-fast, HIPAA-compliant real-time inference pipeline. They operate with true principal-level velocity.',
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'VP of Product',
    company: 'HyperScale Systems',
    content: 'Working with To The Future felt like having a top-1% Silicon Valley engineering pod on demand. They took our architectural blueprint and scaled it seamlessly to millions of users.',
    rating: 5
  }
];

// Global hubs
const globalHubs = [
  { city: 'San Francisco', role: 'HQ & Architecture Labs', time: 'PST / UTC-8' },
  { city: 'London', role: 'European Operations', time: 'GMT / UTC+0' },
  { city: 'Singapore', role: 'APAC Engineering Hub', time: 'SGT / UTC+8' },
  { city: 'Bangalore', role: 'Cloud & AI Innovation Center', time: 'IST / UTC+5:30' },
];

const Homepage = ({ onOpenConsultation }) => {
  // Rotating keywords in hero
  const rotatingWords = ['AI & Neural Systems', 'Scalable Cloud Architecture', 'Next-Gen Enterprise Web', 'Zero-Trust Defense'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState('cloud');

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    service: 'Custom Enterprise Software & Web Platforms',
    budget: '$25k - $50k',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setContactSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff']
      });
    }, 800);
  };

  return (
    <div className="relative pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow effect behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>ARCHITECTING THE FUTURE OF ENTERPRISE IT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Engineering Resilient Software &{' '}
              <span className="block mt-2">
                <span className="gradient-text-cyan">{rotatingWords[currentWordIdx]}</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              <strong className="text-white font-semibold">To The Future (TTF)</strong> is a premier technology partner. We engineer high-velocity custom software, autonomous AI engines, and resilient cloud architectures that propel businesses into tomorrow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenConsultation('Enterprise Architecture Discovery')}
                className="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Schedule Strategy Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto glass-panel hover:border-cyan-400/50 text-gray-200 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Solutions</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Proof Metric Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-mono">
                  180+
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Systems Deployed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-mono">
                  99.99%
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Reliability SLA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-mono">
                  4.9 / 5.0
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Client Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive System Hologram */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-cyan-500/30 bg-[#060c22]/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 overflow-hidden">
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a1230] border-b border-cyan-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-cyan-300 ml-2 font-medium">
                    ttf-system-telemetry.v3
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE (12ms)</span>
                </div>
              </div>

              {/* Hologram Tabs */}
              <div className="flex border-b border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('cloud')}
                  className={`flex-1 py-2.5 text-center transition-colors ${
                    activeTab === 'cloud'
                      ? 'bg-cyan-950/50 text-cyan-300 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Cloud Nodes
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-2.5 text-center transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-cyan-950/50 text-cyan-300 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  AI Inference
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex-1 py-2.5 text-center transition-colors ${
                    activeTab === 'security'
                      ? 'bg-cyan-950/50 text-cyan-300 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Zero-Trust
                </button>
              </div>

              {/* Dynamic Tab Body */}
              <div className="p-5 font-mono text-xs">
                {activeTab === 'cloud' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#0d183d] p-3 rounded-xl border border-cyan-500/20">
                      <div>
                        <div className="text-gray-400 text-[11px]">K8s Cluster Health</div>
                        <div className="text-white font-bold text-sm">US-East & EU-Central Auto-Scale</div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-lg border border-emerald-500/30">
                        HEALTHY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#0b1433] p-3 rounded-xl border border-white/5">
                        <div className="text-gray-400 text-[10px]">THROUGHPUT</div>
                        <div className="text-cyan-300 text-lg font-bold">48,200 req/s</div>
                        <div className="text-gray-400 text-[10px] mt-1">▲ 14% vs avg</div>
                      </div>
                      <div className="bg-[#0b1433] p-3 rounded-xl border border-white/5">
                        <div className="text-gray-400 text-[10px]">CPU UTILIZATION</div>
                        <div className="text-blue-300 text-lg font-bold">34.2%</div>
                        <div className="text-emerald-400 text-[10px] mt-1">Optimal Pod Reserve</div>
                      </div>
                    </div>

                    <div className="bg-[#091129] p-3 rounded-xl text-[11px] text-gray-300 border border-white/5 space-y-1">
                      <div className="text-cyan-400">$ kubectl get pods -n ttf-prod</div>
                      <div className="text-gray-400">auth-service-789f [Running] 3/3 ready</div>
                      <div className="text-gray-400">order-pipeline-42b [Running] 4/4 ready</div>
                      <div className="text-emerald-400">✓ All 48 microservices synchronized</div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-3">
                    <div className="bg-[#0d183d] p-3 rounded-xl border border-cyan-500/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-cyan-300 font-bold">LLM Vector Search (RAG)</span>
                        <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                          Embeddings: 1536 dim
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px]">
                        Indexed 4.2M enterprise documents. Real-time neural re-ranking active.
                      </p>
                    </div>

                    <div className="bg-[#091129] p-3 rounded-xl border border-white/5 space-y-1.5 text-[11px]">
                      <div className="text-purple-400">{'// Inference benchmark'}</div>
                      <div className="text-gray-300">&gt; Prompt token latency: <span className="text-cyan-300">18ms</span></div>
                      <div className="text-gray-300">&gt; Hallucination guardrail: <span className="text-emerald-400">Active (99.8% pass)</span></div>
                      <div className="text-gray-300">&gt; GPU cluster: <span className="text-yellow-300">H100 TensorCore 8x</span></div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-3">
                    <div className="bg-[#0d183d] p-3 rounded-xl border border-cyan-500/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-emerald-400 font-bold">Zero-Trust Perimeter</span>
                        <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          SOC2 Type II
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px]">
                        Continuous vulnerability evaluation, automated mTLS encryption between all microservices.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-[#0b1433] p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">DDOS MITIGATION</span>
                        <span className="text-white font-bold">100Gbps Scrubbing</span>
                      </div>
                      <div className="bg-[#0b1433] p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">SECRETS VAULT</span>
                        <span className="text-cyan-400 font-bold">Rotated Every 12h</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom interactive action */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Architecture inspection:</span>
                  <button
                    onClick={() => onOpenConsultation('System Architecture Review')}
                    className="text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1"
                  >
                    <span>Request Technical Audit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE TECH MARQUEE */}
      <section id="tech-stack" className="relative py-12 border-y border-cyan-500/20 bg-[#040817]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-xs font-mono text-cyan-400/90 uppercase tracking-widest font-semibold">
            ✦ ENTERPRISE TECHNOLOGY ECOSYSTEM ✦
          </span>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex space-x-6 animate-marquee whitespace-nowrap py-3">
            {[...techList, ...techList, ...techList].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0a122e] border border-cyan-500/20 hover:border-cyan-400 transition-all text-sm text-gray-200 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-semibold text-white">{tech.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-cyan-300 border border-white/10">
                  {tech.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE IT SERVICES GRID */}
      <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Spectrum IT Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered For Scale, <span className="gradient-text-cyan">Built For The Future</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            From modernizing legacy architectures to building autonomous AI engines, explore our end-to-end technology solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl glass-panel p-6 sm:p-7 border border-cyan-500/20 hover:border-cyan-400/70 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/50 hover:-translate-y-1"
            >
              {/* Top Row: Icon & Badge */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                  {service.features.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 3).map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group-hover:translate-x-1 transition-transform ml-2"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE COST ESTIMATOR */}
      <CostEstimator
        onOpenConsultationWithEstimate={(service, budget) => {
          onOpenConsultation(service, budget);
        }}
      />

      {/* 5. CASE STUDIES SHOWCASE */}
      <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Proven Mission Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="gradient-text-cyan">Case Studies</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
              Real-world systems engineered for industry leaders, handling billions in transaction volume and millions of concurrent users.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-xl transition-all"
          >
            <span>View All Enterprise Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {cs.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {cs.client}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {cs.challenge}
                </p>

                {/* Metrics Highlight */}
                <div className="grid grid-cols-3 gap-2 bg-[#09122c] p-3 rounded-xl border border-white/5 mb-6 text-center">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
                      <div className="text-[10px] text-gray-400 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {cs.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY "TO THE FUTURE" (STATISTICS & STRATEGIC PILLARS) */}
      <section id="why-ttf" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>The TTF Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Enterprise Leaders <span className="gradient-text-cyan">Trust To The Future</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            We operate as your elite engineering pod—combining deep algorithmic mastery, enterprise security, and rapid sprint execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">High-Velocity Sprints</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Bi-weekly production releases, automated CI/CD deployments, and zero bureaucratic inertia.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Zero-Trust Security</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              SOC2 Type II and ISO 27001 compliance standards baked into every line of code from sprint zero.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI-Native Core</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Proprietary RAG engines and machine learning architectures custom-tuned for enterprise domain datasets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-pink-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mx-auto mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Dedicated Pods</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Senior software architects, DevOps specialists, and QA engineers fully integrated into your workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 7. 5-STEP ENGINEERING WORKFLOW */}
      <section id="workflow" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Execution Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our 5-Stage <span className="gradient-text-cyan">Engineering Lifecycle</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base">
            A battle-tested methodology designed to mitigate risk, accelerate time-to-market, and ensure architectural excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Discovery & Blueprint', desc: 'Requirements analysis, threat modeling, and system architecture design.' },
            { step: '02', title: 'Rapid Prototype', desc: 'Proof-of-concept validation, UX flow wireframing, and API contract freeze.' },
            { step: '03', title: 'Agile Engineering', desc: 'Iterative 2-week sprints with automated test suites and continuous code review.' },
            { step: '04', title: 'Security & QA Audit', desc: 'Penetration testing, chaos monkey resilience checks, and performance load tests.' },
            { step: '05', title: 'Launch & 24/7 SRE', desc: 'Zero-downtime blue/green deployment, Grafana telemetry, and ongoing evolution.' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400/40 font-mono mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Technology Leaders Say About <span className="gradient-text-cyan">TTF</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-7 rounded-2xl border border-cyan-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-cyan-400">{t.role}</div>
                <div className="text-xs text-gray-400">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GLOBAL HUBS & CONTACT CONSULTATION FORM */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Global Presence */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Presence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build The Next Generation <span className="gradient-text-cyan">Together</span>
              </h2>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                Whether you need a full-scale digital transformation, an AI architecture audit, or an elite dedicated engineering team, our architects are ready.
              </p>
            </div>

            {/* Direct Contact info */}
            <div className="space-y-3 bg-[#081230] p-5 rounded-2xl border border-cyan-500/20 text-xs text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Direct Inquiries: <a href="mailto:hello@tothefuture.tech" className="text-white hover:text-cyan-300 font-semibold">hello@tothefuture.tech</a></span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Direct Line: <span className="text-white font-semibold">+1 (800) 883-FUTURE</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Response Time SLA: <span className="text-emerald-400 font-semibold">&lt; 120 Minutes</span></span>
              </div>
            </div>

            {/* Global Hubs */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 font-semibold">
                Technology Centers
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {globalHubs.map((hub, idx) => (
                  <div key={idx} className="bg-[#09122c] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-1.5 text-white font-bold text-xs">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{hub.city}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">{hub.role}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{hub.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Initiate Project <span className="gradient-text-cyan">Discussion</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-6">
                Fill out the technical scope below to be paired with a Principal Architect.
              </p>

              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder="e.g. Jordan Hayes"
                        className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="jordan@enterprise.com"
                        className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Target Capability
                      </label>
                      <select
                        value={contactData.service}
                        onChange={(e) => setContactData({ ...contactData, service: e.target.value })}
                        className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        {itServices.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Budget Expectation
                      </label>
                      <select
                        value={contactData.budget}
                        onChange={(e) => setContactData({ ...contactData, budget: e.target.value })}
                        className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="$15k - $25k">$15k - $25k (Sprint MVP)</option>
                        <option value="$25k - $50k">$25k - $50k (Growth System)</option>
                        <option value="$50k - $100k">$50k - $100k (Enterprise Core)</option>
                        <option value="$100k+">$100k+ (Global Scalability)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Architecture Requirements or Technical Goals
                    </label>
                    <textarea
                      rows="4"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      placeholder="Share your tech stack, concurrency goals, timeline deadlines, or existing architectural bottlenecks..."
                      className="w-full bg-[#081230] border border-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Submitting To Principal Architect...</span>
                    ) : (
                      <>
                        <span>Submit Architectural Inquiry</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Inquiry Received!
                  </h4>
                  <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
                    Thank you, <span className="text-cyan-400 font-semibold">{contactData.name}</span>. Your requirements have been logged into our rapid evaluation pipeline. Expect a response at <span className="text-cyan-400">{contactData.email}</span> within 2 hours.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onBookService={(serviceTitle) => {
          onOpenConsultation(serviceTitle);
        }}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        caseStudy={selectedCaseStudy}
        onBookSimilar={(studyTitle) => {
          onOpenConsultation(`Case Study Architecture: ${studyTitle}`);
        }}
      />
    </div>
  );
};

export default Homepage;
