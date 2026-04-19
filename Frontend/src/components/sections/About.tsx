import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(leftColRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(rightColRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div ref={leftColRef} className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Team collaborating" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-8 -right-8 bg-neutral-900 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-sky-400">10+</div>
              <div className="text-sm text-neutral-400 font-medium leading-tight">
                Years of <br /> Experience
              </div>
            </div>
          </div>
        </div>

        <div ref={rightColRef}>
          <SectionHeading 
            align="left"
            subtitle="About Us"
            title="Empowering Your Digital Journey"
            description="At Silver Pixel Soft, we believe in the power of technology to transform businesses. Our team of expert engineers, designers, and strategists work collaboratively to deliver exceptional digital products."
            className="mb-8"
          />
          
          <ul className="space-y-4 mb-8">
            {[
              "Agile development methodology",
              "Expert team of senior engineers",
              "Focus on scalable architecture",
              "Commitment to quality & delivery"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-neutral-300">
                <CheckCircle2 className="h-5 w-5 text-sky-500" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button variant="secondary" size="lg">
            Discover Our Story
          </Button>
        </div>
      </div>
    </section>
  )
}

export default About