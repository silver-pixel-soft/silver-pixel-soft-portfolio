import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(textRef.current?.children || [], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    });

    tl.from(visualRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-[100vh] w-full flex-col justify-center px-6 lg:px-20 mx-auto max-w-7xl overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span className="text-sm font-medium text-sky-400">Award-winning Digital Agency</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Crafting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
              Excellence.
            </span>
          </h1>

          <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
            We build innovative software solutions, stunning websites, and powerful mobile applications that drive business growth and user engagement.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg">
              Start a Project <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="lg">
              <Play className="h-5 w-5 fill-current" /> Showreel
            </Button>
          </div>
        </div>

        <div ref={visualRef} className="relative hidden lg:block">
          <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative UI elements for tech vibe */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center opacity-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="h-2 w-20 bg-white/20 rounded-full" />
            </div>
            <div className="mt-12 space-y-4 opacity-70">
              <div className="h-8 w-3/4 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-32 w-full bg-sky-500/10 border border-sky-500/20 rounded-lg" />
              <div className="h-8 w-1/2 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-8 w-full bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero