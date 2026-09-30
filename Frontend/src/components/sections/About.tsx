import { useRef } from "react";
import {
  CheckCircle2,
  Layers,
  Code2,
  Smartphone,
  Cpu,
  Gamepad2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const techStacks = [
  { category: "Web & Frontend", icon: <Layers className="w-4 h-4 text-indigo-400" />, items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Three.js"] },
  { category: "Mobile Apps", icon: <Smartphone className="w-4 h-4 text-fuchsia-400" />, items: ["React Native", "Flutter", "iOS & Android", "Expo"] },
  { category: "Backend & AI", icon: <Cpu className="w-4 h-4 text-emerald-400" />, items: ["Python", "Node.js", "FastAPI", "Gemini & OpenAI", "PostgreSQL"] },
  { category: "Gaming & 3D", icon: <Gamepad2 className="w-4 h-4 text-pink-400" />, items: ["Unreal Engine 5", "C++", "Shaders", "Interactive 3D"] },
];

const coreValues = [
  {
    icon: <Rocket className="w-5 h-5 text-indigo-400" />,
    title: "High-Velocity Sprints",
    desc: "Rapid agile delivery with bi-weekly testable builds so you get to market months ahead."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-fuchsia-400" />,
    title: "Obsession with Detail",
    desc: "From 60fps micro-animations to typographic rhythm, we obsess over every single pixel."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: "Battle-Tested Scale",
    desc: "Robust cloud architecture designed to handle peak loads without breaking a sweat."
  },
  {
    icon: <Users className="w-5 h-5 text-amber-400" />,
    title: "True Co-Founders",
    desc: "We don't just execute tickets; we challenge assumptions and co-create high-ROI products."
  }
];

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(bentoRef.current?.children || [], {
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
    <section id="about" ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      <SectionHeading
        subtitle="Who We Are"
        title="Engineering Meets Artistry"
        description="Silver Pixel Soft is a premier technology and digital design collective. We turn ambitious visions into high-performing, revenue-generating software."
      />

      {/* Bento Grid */}
      <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card 1: Studio Philosophy */}
        <div className="lg:col-span-2 relative rounded-3xl border border-white/[0.12] bg-[#1e2235] p-8 sm:p-10 overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/12 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-indigo-500/18 transition-colors" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6">
            <Code2 className="w-3.5 h-3.5" />
            Our Vision
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
            Bridging the gap between cutting-edge technology and breathtaking human experiences.
          </h3>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-8 max-w-2xl">
            Founded with a passion for software craftsmanship, Silver Pixel Soft provides full-cycle engineering from product roadmap to cloud infrastructure. We eliminate clunky software and deliver frictionless platforms users love to use every day.
          </p>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.1]">
            <div>
              <div className="text-3xl font-black text-white">5+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-400">50+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Products Shipped</div>
            </div>
            <div>
              <div className="text-3xl font-black text-fuchsia-400">99%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Client Retention</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">24/7</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">SLA Support</div>
            </div>
          </div>
        </div>

        {/* Card 2: Tech Stack */}
        <div className="relative rounded-3xl border border-white/[0.12] bg-[#1e2235] p-8 group hover:border-fuchsia-500/35 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-xs font-semibold text-fuchsia-300 mb-6">
              <Cpu className="w-3.5 h-3.5" />
              Technology Stack
            </div>

            <h4 className="text-xl font-bold text-white mb-3">Modern & Future-Proof</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              We leverage modern enterprise frameworks ensuring maximum speed, SEO visibility, and security.
            </p>

            <div className="space-y-4">
              {techStacks.map((stack, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2">
                    {stack.icon}
                    <span>{stack.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-mono border border-white/[0.06]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards 3-6: 4 Core Pillars */}
        {coreValues.map((val, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/[0.12] bg-[#1e2235] p-8 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {val.icon}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{val.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{val.desc}</p>
          </div>
        ))}

        {/* Card 7: Guaranteed Quality Banner */}
        <div className="lg:col-span-2 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/10 to-transparent p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-300 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Full Code Ownership & Documentation</span>
            </div>
            <p className="text-sm text-slate-300 max-w-md">
              Every line of code belongs 100% to you. Clean commits, automated tests, Docker containers, and complete architectural documentation included.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-4 py-2 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-xs font-semibold uppercase tracking-wider">
              Zero Vendor Lock-in
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;