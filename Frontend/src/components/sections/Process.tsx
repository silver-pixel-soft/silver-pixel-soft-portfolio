import { useRef } from "react";
import { Compass, Palette, Terminal, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToSection from "../../hooks/useScrollToSection";

const steps = [
  {
    number: "01",
    icon: <Compass className="w-6 h-6 text-indigo-400" />,
    accent: "hover:border-indigo-500/50",
    title: "Discovery & Blueprint",
    description: "We dissect your product goals, define scalable architecture, analyze competitors, and map out bi-weekly sprint deliverables.",
    points: ["Requirements audit & feasibility", "System architecture diagram", "Defined milestone timeline"]
  },
  {
    number: "02",
    icon: <Palette className="w-6 h-6 text-fuchsia-400" />,
    accent: "hover:border-fuchsia-500/50",
    title: "UI/UX & Prototyping",
    description: "Crafting modern, accessible, and high-converting user interfaces with pixel-perfect Figma design systems and clickable prototypes.",
    points: ["Design tokens & style guide", "Interactive prototype testing", "Micro-animations & brand identity"]
  },
  {
    number: "03",
    icon: <Terminal className="w-6 h-6 text-emerald-400" />,
    accent: "hover:border-emerald-500/50",
    title: "Agile Development & QA",
    description: "Clean, modular code written in modern frameworks with continuous testing, strict linting, and weekly staging previews.",
    points: ["Clean TypeScript codebase", "Automated unit & E2E tests", "Live staging demo previews"]
  },
  {
    number: "04",
    icon: <Rocket className="w-6 h-6 text-pink-400" />,
    accent: "hover:border-pink-500/50",
    title: "Deployment & Scaling",
    description: "Zero-downtime deployment to global Edge networks with 95+ Lighthouse speed, complete source code handover, and ongoing support.",
    points: ["Edge CDN & Cloud configuration", "SEO & Performance hardening", "30-day warranty & maintenance"]
  }
];

const Process = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const scrollToSection = useScrollToSection();

  useGSAP(() => {
    gsap.from(stepsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        once: true,
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all",
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-28 px-6 lg:px-20 mx-auto max-w-7xl relative">
      <SectionHeading
        subtitle="How We Work"
        title="Our Proven 4-Step Process"
        description="A transparent, battle-tested methodology designed to bring products from raw concepts to market-dominating realities."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => { if (el) stepsRef.current[index] = el; }}
            className={`group relative rounded-3xl bg-[#1e2235] border border-white/[0.12] p-8 flex flex-col justify-between ${step.accent} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div>
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="font-mono text-3xl font-black text-white/15 group-hover:text-white/30 transition-colors">
                  {step.number}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-4 border-t border-white/[0.1]">
              {step.points.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <button
          onClick={() => scrollToSection("contact")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 group"
        >
          <span>Kickstart Your Discovery Phase</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default Process;
