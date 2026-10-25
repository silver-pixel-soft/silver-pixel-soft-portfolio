import { useRef, useState, useEffect } from "react";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  X,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

// Image imports
import portfolioImage from "../../assets/Portfolio.png";
import lioImage from "../../assets/Lio.png";
import khabriImage from "../../assets/Khabri.png";
import chatBotImage from "../../assets/ChatBot.png";
import NextStopImage from "../../assets/NextStop.png";
import ThyroidImage from "../../assets/Throat.png";
import AIWebImage from "../../assets/AI Web Dev.png";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: string;
  image: string;
  categoryLabel: string;
  featured?: boolean;
  role?: string;
  completionYear?: string;
  detailedOverview?: string;
  highlights?: string[];
  metrics?: ProjectMetric[];
  architecture?: string[];
  links: {
    name: string;
    url: string;
  }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    category: "UI/UX Design",
    description:
      "Award-winning interactive showcase featuring fluid GSAP animations, virtual inertial scrolling via Lenis, and physics-based cursor interactions.",
    detailedOverview:
      "Engineered as a high-performance personal brand showcase featuring GSAP-powered timeline orchestration, virtual inertial scrolling via Lenis physics, interactive magnetic cursor tracking, glassmorphic UI elevations, and zero-layout-shift responsive performance.",
    tags: ["React 19", "GSAP 3", "Lenis Scroll", "Tailwind CSS", "Vite", "TypeScript"],
    status: "Featured Showcase",
    image: portfolioImage,
    categoryLabel: "UI/UX & Motion",
    featured: true,
    role: "Lead UI Engineer & Designer",
    completionYear: "2025",
    metrics: [
      { label: "Performance", value: "99/100" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Motion Engine", value: "GSAP 3 + Lenis" },
    ],
    highlights: [
      "Virtual inertial smooth scroll synchronized with GSAP ScrollTrigger timelines and zero frame drops",
      "Physics-based magnetic cursor tracking with spring dynamics and interactive hover attraction states",
      "Accessible high-contrast dark aesthetic with layered glassmorphic depth elevations and ambient lighting",
      "Zero-cumulative-layout-shift (CLS) architecture engineered for sub-second first contentful paint",
    ],
    architecture: ["React 19", "GSAP 3 Core & ScrollTrigger", "Lenis Physics", "Tailwind CSS", "Vite", "TypeScript"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Portfolio",
      },
      {
        name: "Live Demo",
        url: "https://akshay-kumar-two.vercel.app/",
      },
    ],
  },
  {
    id: "nextstop",
    title: "NextStop — Travel & Tourism",
    category: "Web Development",
    description:
      "Full-stack tour and travel management platform featuring automated booking pipelines, dynamic package itineraries, and secure online payments.",
    detailedOverview:
      "A comprehensive travel and hospitality booking platform engineered with Python and Django. Features dynamic holiday package catalogs, seamless online payment integration via Razorpay, cloud-hosted media optimization through Cloudinary CDN, and customer reservation dashboards.",
    tags: ["Python", "Django", "Razorpay", "Cloudinary", "MongoDB", "JavaScript"],
    status: "Live Platform",
    image: NextStopImage,
    categoryLabel: "Travel & Hospitality",
    featured: true,
    role: "Full Stack Engineer",
    completionYear: "2026",
    metrics: [
      { label: "Payment Gateway", value: "Razorpay" },
      { label: "Media Pipeline", value: "Cloudinary CDN" },
      { label: "Architecture", value: "Django MVC" },
    ],
    highlights: [
      "End-to-end holiday package booking workflow with dynamic pricing and automated invoice confirmations",
      "Secure online transaction settlement integrated with Razorpay payment gateway and webhooks",
      "High-performance media pipeline using Cloudinary CDN for responsive destination galleries",
      "Customer authentication, booking history portal, and administrative tour catalog management controls",
    ],
    architecture: ["Python 3", "Django Web Framework", "Razorpay Payment Gateway", "Cloudinary CDN", "MongoDB", "JavaScript (ES6+)"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Tour_-_Traval",
      },
      {
        name: "Live Demo",
        url: "https://nextstop-7slu.onrender.com/",
      },
    ],
  },
  {
    id: "lio",
    title: "Lio — Link Analytics & Telemetry",
    category: "Web Development",
    description:
      "High-throughput link management and clickstream telemetry platform offering sub-50ms edge redirects, geo-analytics, and dynamic QR generation.",
    detailedOverview:
      "A production-grade SaaS URL shortening and telemetry platform built with distributed edge routing, granular clickstream analytics, geolocation heatmaps, and customizable QR code generation.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "REST API"],
    status: "Active SaaS",
    image: lioImage,
    categoryLabel: "Analytics & SaaS",
    featured: true,
    role: "Full Stack Developer",
    completionYear: "2026",
    metrics: [
      { label: "Redirect Speed", value: "<50ms" },
      { label: "Telemetry", value: "Real-time" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    highlights: [
      "Sub-50ms URL redirection pipeline with distributed edge caching and low memory footprint",
      "Interactive geo-location telemetry & clickstream funnel visual graphs powered by Chart.js",
      "RESTful microservices architecture with JWT authentication, rate limiting, and audit logging",
      "Dynamic QR code generator supporting custom vector SVG/PNG export with embedded tracking metadata",
    ],
    architecture: ["React.js", "Node.js / Express", "MongoDB Atlas", "Chart.js / Analytics", "REST API"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Lio",
      },
      {
        name: "Live Demo",
        url: "https://lio-orcin.vercel.app/",
      },
    ],
  },
  {
    id: "thyroid",
    title: "Thyroid AI — Vocal Diagnostics",
    category: "AI & Agents",
    description:
      "Non-invasive acoustic diagnostic platform analyzing vocal cord frequency biomarkers and throat chakra indicators to detect thyroid disorders.",
    detailedOverview:
      "An acoustic intelligence healthcare application combining a React frontend with a Python Flask signal-processing engine. It captures vocal cord biometric samples and computes acoustic biomarkers—including Pitch (F0), Jitter, Hoarseness (HNR), and Spectral Centroid via Librosa—to screen for thyroid anomalies.",
    tags: ["Python", "Flask", "Librosa", "Audio DSP", "NumPy", "React", "Google API"],
    status: "AI Diagnostic Engine",
    image: ThyroidImage,
    categoryLabel: "HealthTech AI",
    featured: true,
    role: "Lead ML & Systems Engineer",
    completionYear: "2026",
    metrics: [
      { label: "Biomarkers", value: "Pitch, Jitter, HNR" },
      { label: "DSP Engine", value: "Librosa & NumPy" },
      { label: "API Latency", value: "<200ms Processing" },
    ],
    highlights: [
      "In-browser high-precision microphone audio recording with direct waveform spectrogram capture",
      "Acoustic biomarker extraction pipeline computing fundamental frequency (F0), jitter, and Harmonic-to-Noise Ratio (HNR)",
      "Decoupled Python Flask microservice processing complex audio transforms via Librosa and NumPy",
      "Automated synchronization with Google Sheets API for clinical record keeping and medical audit trails",
    ],
    architecture: ["Python 3", "Flask & Flask-CORS", "Librosa Audio DSP", "NumPy", "React (Vite)", "Tailwind CSS", "Google Sheets API"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/SBU-Disese-Detect-using-Chakras",
      },
    ],
  },
  {
    id: "khabri",
    title: "Khabri — Global News Wire",
    category: "Web Development",
    description:
      "Real-time global news aggregation portal with debounced multi-category querying, bookmarking, and a distraction-free responsive reader experience.",
    detailedOverview:
      "A high-speed content delivery web application consuming live international news feeds across multiple categories and languages. Engineered with client-side query debounce, instantaneous source filtering, offline bookmark persistence, and zero-layout-shift image skeleton loaders.",
    tags: ["React 18", "News API", "Tailwind CSS", "Vite", "JavaScript"],
    status: "Live Application",
    image: khabriImage,
    categoryLabel: "Content & Media",
    featured: false,
    role: "Frontend Engineer",
    completionYear: "2025",
    metrics: [
      { label: "Global Sources", value: "50+ Feeds" },
      { label: "Search Latency", value: "<15ms" },
      { label: "Reader UX", value: "Distraction-Free" },
    ],
    highlights: [
      "Live REST API feed ingestion filtering international news, business, technology, and entertainment",
      "Distraction-free clean reader layout optimized for high readability across mobile and desktop screens",
      "Debounced search architecture delivering instant headline filtering with sub-15ms response times",
      "Persistent stateful bookmarking with zero-layout-shift image skeleton loaders and fallback caching",
    ],
    architecture: ["React 18", "News API Ingestion", "Tailwind CSS", "Debounced Search", "Vite Bundler"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/khabri-web",
      },
      {
        name: "Live Demo",
        url: "https://khabri-web.vercel.app/",
      },
    ],
  },
  {
    id: "ai_web",
    title: "NayePankh — AI Social Impact",
    category: "AI & Agents",
    description:
      "Full-stack social welfare platform featuring the Panah-AI multilingual chatbot powered by Google Gemini, volunteer pipelines, and an admin command center.",
    detailedOverview:
      "A mission-driven social impact platform built for NayePankh Foundation. Features a responsive React 19 frontend with Tailwind CSS v4 bento grids, the Panah-AI conversational assistant powered by Google Gemini 2.5 Flash, an automated changemaker onboarding pipeline, and a secure session-authenticated Flask admin management console.",
    tags: ["React 19", "Python Flask", "Gemini 2.5 Flash", "Tailwind CSS v4", "MongoDB", "AI Chatbot"],
    status: "Production Platform",
    image: AIWebImage,
    categoryLabel: "Social Impact AI",
    featured: false,
    role: "Full Stack & AI Engineer",
    completionYear: "2026",
    metrics: [
      { label: "AI Engine", value: "Gemini 2.5 Flash" },
      { label: "Volunteer Pipeline", value: "Automated" },
      { label: "Admin Security", value: "Session Auth" },
    ],
    highlights: [
      "Panah-AI conversational assistant powered by Google Gemini 2.5 Flash with intelligent rule-based prompt caching",
      "Responsive bento-grid user experience engineered with React 19, Tailwind CSS v4, and interactive micro-animations",
      "Session-authenticated administration dashboard for volunteer application review, search, and analytics",
      "Decoupled client-server architecture with high-concurrency Python Flask REST endpoints and database persistence",
    ],
    architecture: ["React 19", "Python Flask", "Google Gemini 2.5 Flash", "Tailwind CSS v4", "React Router v7", "MongoDB Atlas"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/AI-Web-Devlopment--Internship-2026--By-NayePankh-Foundation",
      },
      {
        name: "Live Demo",
        url: "https://internship-frontend-rho-orpin.vercel.app/",
      },
    ],
  },
  {
    id: "chatbot",
    title: "Chat Bot — Conversational AI",
    category: "AI & Agents",
    description:
      "Streaming conversational assistant powered by large language models, featuring syntax-highlighted code blocks, context memory, and customizable personas.",
    detailedOverview:
      "An AI conversational web application delivering low-latency token streaming, multi-turn prompt context retention, and copyable markdown code blocks with prism syntax highlighting. Includes customizable prompt personas and responsive chat bubble animations.",
    tags: ["AI / LLM", "JavaScript", "SSE Streaming", "NLP", "API Integration", "CSS3"],
    status: "Live AI Model",
    image: chatBotImage,
    categoryLabel: "Conversational AI",
    featured: false,
    role: "AI & Frontend Engineer",
    completionYear: "2025",
    metrics: [
      { label: "Response Mode", value: "Token Stream" },
      { label: "Context Window", value: "Multi-Turn" },
      { label: "Code Highlighting", value: "Markdown & Prism" },
    ],
    highlights: [
      "Real-time Server-Sent Events (SSE) token streaming with automatic scroll-to-bottom anchor",
      "Rich markdown syntax formatting with copyable code snippets and syntax highlighting",
      "Session history management with multi-turn prompt context retention and persona directives",
      "Adaptive chat bubble rendering with conversational typing indicators and smooth micro-animations",
    ],
    architecture: ["JavaScript (ESNext)", "LLM / OpenRouter API", "SSE Streaming", "Prism.js", "CSS3 Animations"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Chat-Bot.",
      },
      {
        name: "Live Demo",
        url: "https://akshaykumar401.github.io/Chat-Bot./",
      },
    ],
  },
];

const Work = () => {
  const containerRef = useRef<HTMLElement>(null);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Exactly 2 featured projects for the Home page
  const homeProjects = projectsData.slice(0, 2);

  // Smooth entrance animation
  useGSAP(
    () => {
      if (featuredGridRef.current) {
        gsap.from(featuredGridRef.current.children, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    },
    { scope: containerRef }
  );

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="work" ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[300px] bg-indigo-500/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeading
          align="left"
          subtitle="Our Portfolio"
          title="Featured Projects"
          description="Explore our handpicked flagship applications showcasing cutting-edge frontend engineering, scalable architecture, and fluid motion design."
          className="mb-0"
        />
        <Button
          onClick={() => navigate("/all-projects")}
          variant="secondary"
          size="lg"
          className="whitespace-nowrap gap-2 self-start md:self-end border-white/10 hover:border-sky-500/40 hover:bg-white/[0.08] transition-all"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* 2 FEATURED PROJECTS DISPLAY ON HOME PAGE                                  */}
      {/* ========================================================================= */}
      <div ref={featuredGridRef} className="grid md:grid-cols-2 gap-8 mb-14">
        {homeProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative rounded-3xl overflow-hidden bg-[#090d18] border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
              <img
                src={project.image}
                alt={project.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-black/30 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  {project.status}
                </span>
              </div>

              {/* Number Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-neutral-300">
                  FLAGSHIP 0{idx + 1}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    {project.category}
                  </span>
                  {project.completionYear && (
                    <span className="text-[11px] font-mono text-neutral-500">
                      {project.completionYear}
                    </span>
                  )}
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {project.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Metrics Highlight Pill Row */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 mb-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[10px] uppercase font-semibold text-neutral-400">
                          {metric.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-sky-300 truncate">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags & Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 font-mono border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links & Deep Dive button */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Deep Dive Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links[0] && (
                      <a
                        href={project.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-neutral-300 hover:text-white transition-all border border-white/10"
                        title="Source Code on GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}

                    {project.links[1] && (
                      <a
                        href={project.links[1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-md shadow-sky-500/20"
                        title="Open Live Preview"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to Archive */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-white">
              Interested in more architectural case studies?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Explore our full portfolio archive with deep-dive technical breakdowns, live telemetry, and source code.
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/all-projects")}
          variant="primary"
          size="md"
          className="whitespace-nowrap gap-2 w-full sm:w-auto"
        >
          <span>Explore All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* DETAILED SPECIFICATIONS MODAL                                             */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d18] border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  {selectedProject.category}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-400 font-mono">
                  {selectedProject.role || "Lead Engineer"} ({selectedProject.completionYear || "2024"})
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                {selectedProject.detailedOverview || selectedProject.description}
              </p>
            </div>

            {/* Modal Image Preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10 mb-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Metrics */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      {metric.label}
                    </div>
                    <div className="text-base font-bold text-sky-400">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Technical & Architectural Highlights</span>
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Stack Pill Badges */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedProject.architecture || selectedProject.tags).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] text-neutral-200 font-mono border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              {selectedProject.links[0] && (
                <a
                  href={selectedProject.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-neutral-300 hover:text-white transition-all border border-white/10"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}
              {selectedProject.links[1] && (
                <a
                  href={selectedProject.links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-lg shadow-sky-500/25"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;