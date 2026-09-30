import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, ShieldCheck, Zap, Cpu, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToSection from "../../hooks/useScrollToSection";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<"app" | "metrics">("app");
  const [uptimeCount, setUptimeCount] = useState(99.98);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeCount((prev) => {
        const delta = (Math.random() - 0.5) * 0.02;
        return Number(Math.min(99.99, Math.max(99.95, prev + delta)).toFixed(2));
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(textRef.current?.children || [], {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
    });

    tl.from(
      visualRef.current,
      { scale: 0.92, y: 30, opacity: 0, duration: 1 },
      "-=0.6"
    );

    if (floatCard1Ref.current) {
      gsap.to(floatCard1Ref.current, { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    if (floatCard2Ref.current) {
      gsap.to(floatCard2Ref.current, { y: 12, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    }
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-[92vh] w-full flex-col justify-center px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl overflow-hidden pt-12 pb-20"
    >
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%)"
        }}
      />

      {/* Atmospheric Luminous Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-indigo-600/35 to-cyan-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[550px] h-[300px] md:h-[550px] bg-gradient-to-bl from-fuchsia-500/20 to-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8">

        {/* Left Column: Hero Text */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col gap-6 items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-400/30 backdrop-blur-md shadow-inner transition-transform hover:scale-105">
            <img src="/SPS.png" alt="SPS Logo" className="h-4 w-4 object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
              Award-Winning Digital Agency
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-slate-300 font-medium">Est. 2021</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Next-Gen Software <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-fuchsia-400">
              Engineered to Scale.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
            We partner with visionary founders and global enterprises to craft immersive web platforms, hyper-scalable mobile apps, and custom high-performance software.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto">
            <Button
              onClick={() => scrollToSection("service")}
              size="lg"
              className="w-full sm:w-auto gap-2 text-base shadow-xl shadow-indigo-500/30 group"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              onClick={() => scrollToSection("work")}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base"
            >
              <Play className="h-4 w-4 fill-indigo-400 text-indigo-400" />
              <span>View Portfolio</span>
            </Button>
          </div>

          {/* Trust Strip */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Projects Shipped</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">99.8%</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Uptime SLA</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-fuchsia-400">4.9★</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Client Rating</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Console */}
        <div ref={visualRef} className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-500/15 to-cyan-400/15 rounded-3xl blur-2xl -z-10" />

          {/* Main IDE Window */}
          <div className="relative rounded-2xl border border-white/[0.15] bg-[#12151f]/95 backdrop-blur-2xl shadow-2xl shadow-black/70 overflow-hidden">

            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.1] bg-black/30">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
                <span className="h-3 w-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
                <span className="ml-3 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <img src="/SPS.png" alt="SPS" className="w-3.5 h-3.5 object-contain" />
                  SilverPixelSoft.tsx
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-lg bg-white/[0.06] p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setActiveCodeTab("app")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeCodeTab === "app" ? "bg-indigo-500/30 text-indigo-200 font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setActiveCodeTab("metrics")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeCodeTab === "metrics" ? "bg-indigo-500/30 text-indigo-200 font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Metrics
                </button>
              </div>
            </div>

            {/* Code Area */}
            <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-relaxed select-none min-h-[260px] overflow-x-auto">
              {activeCodeTab === "app" ? (
                <div className="space-y-1.5">
                  <div className="text-slate-500">// Silver Pixel Soft Digital Pipeline</div>
                  <div className="text-purple-400">
                    <span className="text-cyan-400">import</span> {"{ createMasterpiece }"} <span className="text-cyan-400">from</span> <span className="text-emerald-300">'@sps/core'</span>;
                  </div>
                  <div className="h-2"></div>
                  <div>
                    <span className="text-cyan-400">export const</span> <span className="text-yellow-300">agencyConfig</span> = {"{"}
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">stack:</span> [<span className="text-emerald-300">'React 19'</span>, <span className="text-emerald-300">'Next.js'</span>, <span className="text-emerald-300">'Python'</span>, <span className="text-emerald-300">'Unreal'</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">speedIndex:</span> <span className="text-amber-400">0.24</span>, <span className="text-slate-500">// ultra fast</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">securityGrade:</span> <span className="text-emerald-300">'A+ Enterprise'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">deliverable:</span> <span className="text-indigo-300">() =&gt;</span> createMasterpiece(),
                  </div>
                  <div>{"};"}  </div>
                  <div className="pt-2 text-emerald-400 flex items-center gap-1.5 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>✓ Build 2026.4.1 compiled successfully in 142ms</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-400" /> System Uptime
                    </span>
                    <span className="text-emerald-400 font-bold">{uptimeCount}%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Avg. Latency
                    </span>
                    <span className="text-white font-bold">18ms (Edge CDN)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-fuchsia-400" /> Code Audit
                    </span>
                    <span className="text-emerald-300 font-bold">100% Passed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> Lighthouse Score
                    </span>
                    <span className="text-cyan-300 font-bold">99 / 100</span>
                  </div>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-t border-white/[0.07] text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Ready for Deployment
              </span>
              <span>UTF-8 • TypeScript</span>
            </div>
          </div>

          {/* Floating Badge 1 */}
          <div
            ref={floatCard1Ref}
            className="absolute -top-6 -right-4 sm:-right-6 bg-[#1a1e2e]/95 border border-indigo-500/40 p-3.5 rounded-2xl shadow-xl backdrop-blur-xl hidden sm:flex items-center gap-3 z-20"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/25 border border-indigo-500/35 flex items-center justify-center text-indigo-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300">Performance</div>
              <div className="text-sm font-bold text-white flex items-center gap-1">
                10x Speed <span className="text-indigo-400 text-xs font-normal">Boost</span>
              </div>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div
            ref={floatCard2Ref}
            className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#1a1e2e]/95 border border-cyan-500/35 p-3.5 rounded-2xl shadow-xl backdrop-blur-xl hidden sm:flex items-center gap-3 z-20"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300">Architecture</div>
              <div className="text-sm font-bold text-white">
                Zero Vulnerabilities
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;