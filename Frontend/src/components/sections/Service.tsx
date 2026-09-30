import { useRef } from "react";
import { Laptop, Code2, Paintbrush, Smartphone, Check, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToSection from "../../hooks/useScrollToSection";

const services = [
  {
    icon: <Laptop className="h-6 w-6 text-indigo-400" />,
    badge: "Most Popular",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    glowColor: "hover:border-indigo-500/50",
    glowBg: "group-hover:bg-indigo-500/12",
    title: "Web App Development",
    description: "Lightning-fast, search-engine optimized web applications engineered with React 19, Next.js, and TypeScript.",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
    deliverables: [
      "Custom responsive design (Mobile + Desktop)",
      "Lighthouse 95+ speed & SEO architecture",
      "API integrations & Database modeling",
      "Free 30-day post-launch support"
    ],
    price: "INR 9,999",
    timeline: "1 - 3 Weeks",
    accent: "text-indigo-300"
  },
  {
    icon: <Smartphone className="h-6 w-6 text-amber-400" />,
    badge: "High Demand",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    glowColor: "hover:border-amber-500/50",
    glowBg: "group-hover:bg-amber-500/10",
    title: "Mobile App Development",
    description: "Intuitive iOS and Android applications built with React Native and Flutter with native performance.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    deliverables: [
      "Cross-platform iOS & Android build",
      "Push notifications & offline caching",
      "App Store & Google Play submission assistance",
      "Biometric login & Secure data storage"
    ],
    price: "INR 12,999",
    timeline: "2 - 4 Weeks",
    accent: "text-amber-300"
  },
  {
    icon: <Code2 className="h-6 w-6 text-fuchsia-400" />,
    badge: "Enterprise",
    badgeColor: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
    glowColor: "hover:border-fuchsia-500/50",
    glowBg: "group-hover:bg-fuchsia-500/10",
    title: "Custom Software & AI",
    description: "Tailored enterprise SaaS solutions, AI agent workflows, and automated microservices that scale.",
    tags: ["Python", "FastAPI", "OpenAI / Gemini", "PostgreSQL"],
    deliverables: [
      "Custom architecture & database schemas",
      "AI chatbots & automated workflow pipelines",
      "Role-based access control (RBAC)",
      "Comprehensive API documentation"
    ],
    price: "INR 19,999",
    timeline: "3 - 6 Weeks",
    accent: "text-fuchsia-300"
  },
  {
    icon: <Paintbrush className="h-6 w-6 text-pink-400" />,
    badge: "Design First",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    glowColor: "hover:border-pink-500/50",
    glowBg: "group-hover:bg-pink-500/10",
    title: "UI/UX & Product Design",
    description: "Engaging user experiences, scalable Figma design systems, and hyper-realistic interactive prototypes.",
    tags: ["Figma", "Design Systems", "Wireframing", "User Testing"],
    deliverables: [
      "Complete Figma design tokens & components",
      "Interactive clickable high-fidelity prototype",
      "User journey maps & wireframes",
      "Developer handoff ready with specs"
    ],
    price: "INR 5,999",
    timeline: "1 - 2 Weeks",
    accent: "text-pink-300"
  }
];

const Service = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const scrollToSection = useScrollToSection();

  useGSAP(() => {
    gsap.from(cardsRef.current, {
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
    <section id="service" ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      <SectionHeading
        subtitle="Services & Capabilities"
        title="Engineered for Exponential Growth"
        description="From rapid MVPs to mission-critical enterprise systems, our dedicated teams cover every step of your product lifecycle."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el }}
            className={`group relative flex flex-col p-7 rounded-3xl bg-[#1e2235] border border-white/[0.12] ${service.glowColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            {/* Hover glow bg */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.glowBg}`} />

            {/* Top Row */}
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                {service.badge}
              </span>
            </div>

            {/* Title & Description */}
            <h4 className={`text-xl font-bold text-white mb-2 relative z-10 group-hover:${service.accent} transition-colors`}>
              {service.title}
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 relative z-10">
              {service.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
              {service.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-mono border border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Deliverables */}
            <div className="space-y-2.5 mb-8 flex-grow relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                What's included:
              </p>
              {service.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-200 leading-snug">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="h-[1px] w-full bg-white/[0.08] mb-5 relative z-10" />

            {/* Pricing & CTA */}
            <div className="flex items-center justify-between mt-auto relative z-10">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Starting from</span>
                <span className="text-lg font-black text-white">{service.price}</span>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-indigo-500 text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 group/btn border border-white/[0.12]"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Requirement Banner */}
      <div className="mt-12 rounded-2xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 hidden sm:flex">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h5 className="text-base font-bold text-white">Have a unique or multi-platform requirement?</h5>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              We design custom enterprise engagements, dedicated developer pods, and revenue-share models.
            </p>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("contact")}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/35 text-center"
        >
          Book Custom Consultation
        </button>
      </div>
    </section>
  );
};

export default Service;