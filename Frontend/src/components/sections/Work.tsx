import { useRef, useState, useMemo } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

// Image import
import portfolioImage from "../../assets/Portfolio.png";
import lioImage from "../../assets/Lio.png";
import khabriImage from "../../assets/Khabri.png";
import chatBotImage from "../../assets/ChatBot.png";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: string;
  image: string;
  categoryLabel: string;
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
    description: "Award-winning interactive digital showcase with fluid micro-interactions, dark aesthetic, and smooth Lenis physics.",
    tags: ["React 19", "GSAP", "Tailwind CSS", "Vite"],
    status: "Featured Showcase",
    image: portfolioImage,
    categoryLabel: "Portfolio",
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
    id: "lio",
    title: "Lio",
    category: "Web Development",
    description: "Cloud-native link management platform featuring real-time click stream analytics, geo-tracking, and sub-50ms redirection.",
    tags: ["React", "Node.js", "Analytics", "REST API"],
    status: "Active SaaS",
    image: lioImage,
    categoryLabel: "Lio",
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
    id: "khabri",
    title: "Khabri",
    category: "Web Development",
    description: "Curated content delivery application aggregating global news categories with instant filtering and responsive reader mode.",
    tags: ["React", "News API", "Tailwind", "Responsive"],
    status: "Live App",
    image: khabriImage,
    categoryLabel: "Khabri",
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
    id: "chatbot",
    title: "Chat Bot",
    category: "AI & Agents",
    description: "Intelligent conversational assistant powered by large language models, streaming markdown responses with context retention.",
    tags: ["AI / LLM", "JavaScript", "NLP", "API Integration"],
    status: "AI Model Deployed",
    image: chatBotImage,
    categoryLabel: "Chat Bot",
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
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Web Development", "AI & Agents", "UI/UX Design"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  useGSAP(() => {
    if (projectsGridRef.current) {
      gsap.from(projectsGridRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  }, { dependencies: [activeFilter], scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="py-28 px-6 lg:px-20 mx-auto max-w-7xl relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeading
          align="left"
          subtitle="Our Work"
          title="Featured Case Studies"
          description="Explore our handpicked selection of production applications and scalable digital solutions."
          className="mb-0"
        />
        <Button
          onClick={() => navigate("/all-projects")}
          variant="secondary"
          size="lg"
          className="whitespace-nowrap gap-2 self-start md:self-end border-white/10"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeFilter === cat
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={projectsGridRef} className="grid md:grid-cols-2 gap-8">
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
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-black/20 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  {project.status}
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
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {project.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
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

                {/* Direct Action Links */}
                <div className="flex items-center gap-2">
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

                  <a
                    href={project.links[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-md shadow-sky-500/20"
                    title="Open Live Preview"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;