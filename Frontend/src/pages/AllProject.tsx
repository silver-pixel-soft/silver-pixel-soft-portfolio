import { useRef, useState, useMemo, useEffect } from "react";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";
import { SectionHeading } from "../components/ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../components/ui/CustomCursor";
import { projectsData } from "../components/sections/Work";

const AllProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Web Applications", "AI & Automation", "UI/UX & Tools"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: 25,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    if (projectsGridRef.current) {
      tl.from(
        projectsGridRef.current.children,
        {
          y: 35,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  }, { dependencies: [activeFilter], scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-24 px-6 lg:px-20 mx-auto max-w-7xl">
      <CustomCursor />
      
      <div ref={headingRef} className="flex flex-col mb-12 gap-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors w-fit group font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" />
          Back to Home
        </button>

        <SectionHeading
          align="left"
          subtitle="Portfolio Archive"
          title="All Featured Projects & Case Studies"
          description="A complete showcase of enterprise web solutions, AI workflows, and bespoke UI design systems built by Silver Pixel Soft."
          className="mb-0"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={projectsGridRef} className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-3xl overflow-hidden bg-[#090d18] border border-white/[0.08] hover:border-sky-500/40 transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col"
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  {project.status}
                </span>
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <a
                  href={project.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all shadow-lg"
                  title="Source Code on GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={project.links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all shadow-lg"
                  title="Open Live Preview"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col flex-grow justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2 block">
                  {project.categoryLabel}
                </span>

                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {project.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags & Demo */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
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

                <a
                  href={project.links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProject;