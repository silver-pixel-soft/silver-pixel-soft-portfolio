import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  getMergedReviews,
  type ReviewItem,
} from "../../pages/review/reviewData";

const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  // Load blended reviews (both verified initial and user-submitted from localStorage)
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(() =>
    getMergedReviews()
  );

  useEffect(() => {
    // Refresh reviews on mount or storage update
    setReviewsList(getMergedReviews());
    const handleStorage = () => {
      setReviewsList(getMergedReviews());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Display top 3 reviews on homepage
  const displayedReviews = reviewsList.slice(0, 3);

  useGSAP(
    () => {
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
    },
    { scope: containerRef, dependencies: [displayedReviews.length] }
  );

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        subtitle="Social Proof"
        title="Trusted by Fast-Growing Companies"
        description="Don't just take our word for it. Here is genuine feedback from startup founders and engineering leaders who partnered with Silver Pixel Soft."
      />

      {/* Reviews Grid (Exactly 3 reviews) */}
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {displayedReviews.map((t, index) => (
          <div
            key={t.id || index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`group relative rounded-3xl bg-[#090d18] border p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
              t.isNew
                ? "border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                : "border-white/[0.08] hover:border-sky-500/40"
            }`}
          >
            {/* If New Client Review */}
            {t.isNew && (
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-[9px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
                RECENT REVIEW
              </div>
            )}

            <div>
              {/* Category pill & Metric badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-semibold">
                  {t.service}
                </span>

                {t.metric && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    {t.metric}
                  </span>
                )}
              </div>

              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-white/10 group-hover:text-sky-400/30 transition-colors" />
              </div>

              {/* Headline if available */}
              {t.title && (
                <h5 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-sky-200 transition-colors">
                  {t.title}
                </h5>
              )}

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
                  <div className="flex items-center gap-1.5">
                    <h6 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {t.author}
                    </h6>
                    {t.verified && (
                      <span title="Verified Client" className="inline-flex">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {t.role} •{" "}
                    <span className="text-slate-300 font-medium">
                      {t.company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Actions: Explore Wall of Love & Write Review */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <button
          onClick={() => navigate("/user/review")}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:shadow-[0_0_36px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Explore All Client Reviews (Wall of Love)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate("/user/review", { state: { write: true } })}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-xs sm:text-sm hover:border-cyan-400/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Trust Badge Strip */}
      <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 flex flex-wrap items-center justify-around gap-6 text-center backdrop-blur-md">
        <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span>Strict Non-Disclosure (NDA) Guaranteed</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>4.9 / 5.0 Average Client Score ({reviewsList.length}+ Reviews)</span>
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
