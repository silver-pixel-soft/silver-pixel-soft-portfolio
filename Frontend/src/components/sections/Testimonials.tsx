import { useRef } from "react";
import { Star, Quote, CheckCircle, ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const testimonials = [
  {
    quote: "Silver Pixel Soft delivered our SaaS platform three weeks ahead of schedule. Their attention to UX micro-interactions and performance optimization is unmatched in the industry.",
    author: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "ApexFlow Technologies",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    quote: "Working with the SPS team was effortless. They didn't just build our mobile application; they challenged our UX assumptions and helped us increase onboarding conversion by 42%.",
    author: "Sarah Jenkins",
    role: "Head of Product",
    company: "NovaScale Health",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    quote: "The cleanest codebase we've ever received from an agency. Zero technical debt, complete Docker containers, and full documentation. They are true software craftsmen.",
    author: "Rahul Sharma",
    role: "VP of Engineering",
    company: "DataPulse AI",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
    <section id="testimonials" ref={containerRef} className="py-28 px-6 lg:px-20 mx-auto max-w-7xl relative">
      <SectionHeading
        subtitle="Social Proof"
        title="Trusted by Fast-Growing Companies"
        description="Don't just take our word for it. Here is what startup founders and engineering leaders say about partnering with Silver Pixel Soft."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="group relative rounded-3xl bg-[#090d18] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div>
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-white/10 group-hover:text-sky-400/30 transition-colors" />
              </div>

              {/* Quote Text */}
              <p className="text-sm text-neutral-300 leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h5 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {t.author}
                  </h5>
                  <p className="text-xs text-neutral-400">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>

              {t.verified && (
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400" title="Verified Client">
                  <CheckCircle className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badge Strip */}
      <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 flex flex-wrap items-center justify-around gap-6 text-center backdrop-blur-md">
        <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span>Strict Non-Disclosure (NDA) Guaranteed</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>4.9 / 5.0 Average Client Score</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>100% On-Time Milestone Delivery</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
