import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  MessageSquareHeart,
  PlusCircle,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { CustomCursor } from "../../components/ui/CustomCursor";
import { AIAssistant } from "../../components/ui/AIAssistant";
import { Footer } from "../../components/layouts";
import { ReviewForm } from "./ReviewForm";
import { ReviewWall } from "./ReviewWall";
import {
  type ReviewItem,
  getMergedReviews,
  STORAGE_KEY_REVIEWS,
  STORAGE_KEY_LIKES,
} from "./reviewData";

const Review: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Active view: 'wall' | 'write' (detect location.state or query param)
  const [activeView, setActiveView] = useState<"wall" | "write">(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (
        (location.state as { write?: boolean } | null)?.write ||
        searchParams.get("mode") === "write"
      ) {
        return "write";
      }
    } catch {
      // ignore
    }
    return "wall";
  });

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>(() => getMergedReviews());

  // Upvoted review tracking
  const [likedReviews, setLikedReviews] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LIKES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // GSAP Hero entrance
  useGSAP(
    () => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef, dependencies: [activeView] }
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  // Handle new review submission
  const handleReviewSubmit = (newReview: ReviewItem) => {
    setReviews((prev) => {
      const updated = [newReview, ...prev];
      try {
        const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
        const userList = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          STORAGE_KEY_REVIEWS,
          JSON.stringify([newReview, ...userList])
        );
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Handle upvoting
  const handleLikeReview = (id: string) => {
    if (likedReviews.includes(id)) {
      // Unlike
      const updatedLikes = likedReviews.filter((item) => item !== id);
      setLikedReviews(updatedLikes);
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updatedLikes));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: Math.max(0, r.likes - 1) } : r))
      );
    } else {
      // Like
      const updatedLikes = [...likedReviews, id];
      setLikedReviews(updatedLikes);
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updatedLikes));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#030712] text-white w-full max-w-[100vw] overflow-x-hidden relative"
    >
      <CustomCursor />

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 h-20 flex items-center justify-between">
          {/* Left: Back & Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white group px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/SPS.png"
                  alt="Silver Pixel Soft Logo"
                  className="relative h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.45)] transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">
                  Silver Pixel Soft
                </span>
                <span className="text-[9px] uppercase tracking-widest text-sky-400 font-mono">
                  Client Reviews & Proof
                </span>
              </div>
            </div>
          </div>

          {/* Right: Switch Mode Tabs */}
          <div className="flex items-center gap-2 bg-[#181c27] p-1.5 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setActiveView("wall")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === "wall"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Wall of Love</span>
              <span className="sm:hidden">Reviews</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded-full">
                {reviews.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("write")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === "write"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Submit Review</span>
              <span className="sm:hidden">Write</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto relative z-10">
        {/* ================= HERO SECTION ================= */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-xs font-semibold text-indigo-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AUTHENTIC CLIENT EXPERIENCES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Engineered with Passion.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Validated by Results.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore authentic testimonials from forward-thinking founders, engineering
            directors, and product teams who trusted Silver Pixel Soft to build their
            critical digital systems.
          </p>

          {/* Trust Stat Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Average Score</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>100% Verified Partners</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>On-Time Milestone Guarantee</span>
            </div>
          </div>
        </div>

        {/* ================= CONDITIONAL CONTENT VIEWS ================= */}
        {activeView === "wall" ? (
          <ReviewWall
            reviews={reviews}
            onLikeReview={handleLikeReview}
            onNavigateToWrite={() => setActiveView("write")}
          />
        ) : (
          <ReviewForm
            onReviewSubmit={handleReviewSubmit}
            onViewWall={() => setActiveView("wall")}
          />
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Review;