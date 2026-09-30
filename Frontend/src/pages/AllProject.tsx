import { useRef, useState, useMemo, useEffect } from "react";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  Activity,
  X,
  LayoutGrid,
} from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";
import { SectionHeading } from "../components/ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../components/ui/CustomCursor";
import { AIAssistant } from "../components/ui/AIAssistant";
import { projectsData, type ProjectItem } from "../components/sections/Work";

const AllProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"deep-dive" | "grid">("deep-dive");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Web Development", "AI & Agents", "UI/UX Design"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Entrance animations for header and project items
  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (headingRef.current) {
        tl.from(headingRef.current, {
          y: 25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      if (projectsListRef.current) {
        tl.from(
          projectsListRef.current.children,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.2"
        );
      }
    },
    { dependencies: [activeFilter, viewMode], scope: containerRef }
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modal ESC key listener
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
    <div ref={containerRef} className="min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      <CustomCursor />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[300px] bg-sky-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[350px] bg-indigo-500/10 blur-[140px] -z-10 pointer-events-none rounded-full" />

      {/* Top Navigation & Header */}
      <div ref={headingRef} className="flex flex-col mb-10 gap-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors w-fit group font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" />
            Back to Home
          </button>

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
              <img
                src="/SPS.png"
                alt="Silver Pixel Soft Logo"
                className="relative h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.45)] transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors hidden sm:inline-block">
              Silver Pixel Soft
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            align="left"
            subtitle="Portfolio Archive"
            title="All Projects & System Architectures"
            description="Explore our complete catalogue of enterprise web applications, AI autonomous agents, and bespoke UI design systems with comprehensive engineering specifications."
            className="mb-0"
          />

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start lg:self-end bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setViewMode("deep-dive")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === "deep-dive"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Deep Dive View</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === "grid"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Showcase</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.02]"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DEEP DIVE VIEW (DEFAULT)                                               */}
      {/* ========================================================================= */}
      {viewMode === "deep-dive" && (
        <div ref={projectsListRef} className="flex flex-col gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-[#090d18]/90 border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Visual Browser Preview & Actions (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {/* Simulated Browser Frame */}
                  <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black/80 shadow-2xl">
                    {/* Browser Header Bar */}
                    <div className="px-3.5 py-2.5 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[150px]">
                        {project.id}.production.app
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 font-semibold">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Image Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Quick Action Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {project.role || "Lead Engineer"} • {project.completionYear || "2024"}
                    </div>
                    <div className="flex items-center gap-2">
                      {project.links[0] && (
                        <a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-neutral-300 hover:text-white transition-all border border-white/10"
                          title="View GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.links[1] && (
                        <a
                          href={project.links[1].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-md shadow-sky-500/20"
                          title="Launch Live Preview"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: In-Depth Architectural Details (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-5">
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                        {project.category}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                      >
                        <Activity className="w-3.5 h-3.5 text-sky-400" />
                        <span>Inspect Specs</span>
                      </button>
                    </div>

                    {/* Project Title */}
                    <h4 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                      {project.title}
                    </h4>

                    {/* Deep-dive summary */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {project.detailedOverview || project.description}
                    </p>

                    {/* Key Highlights / Capabilities */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="mb-5">
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-2.5 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>System Capabilities & Architecture Highlights</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-neutral-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* System Metrics Bar */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 mb-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
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

                  {/* Tech Stack Pills & Modal Trigger */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 font-mono border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-neutral-300 hover:text-white transition-all border border-white/10"
                    >
                      <span>Full Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GRID SHOWCASE VIEW (OPTIONAL ALTERNATIVE)                              */}
      {/* ========================================================================= */}
      {viewMode === "grid" && (
        <div ref={projectsListRef} className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl overflow-hidden bg-[#090d18] border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
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

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  {project.links[0] && (
                    <a
                      href={project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all shadow-lg"
                      title="Source Code on GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.links[1] && (
                    <a
                      href={project.links[1].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all shadow-lg"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
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

                  {/* Metrics bar */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 mb-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
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

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-sky-300 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Deep Dive Specs</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.links[0] && (
                        <a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-neutral-300 hover:text-white transition-all border border-white/10"
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-md shadow-sky-500/20"
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
      )}

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

      <AIAssistant />
    </div>
  );
};

export default AllProject;