import React, { useState, useMemo } from "react";
import {
  Star,
  Quote,
  ShieldCheck,
  Search,
  ThumbsUp,
  Share2,
  ExternalLink,
  TrendingUp,
  Sparkles,
  Award,
  Check,
} from "lucide-react";
import { type ReviewItem } from "./reviewData";

interface ReviewWallProps {
  reviews: ReviewItem[];
  onLikeReview: (id: string) => void;
  onNavigateToWrite: () => void;
}

export const ReviewWall: React.FC<ReviewWallProps> = ({
  reviews,
  onLikeReview,
  onNavigateToWrite,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "Web Development",
    "AI & Agents",
    "UI/UX Design",
    "Enterprise Systems",
  ];

  // Calculate Aggregates
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { avg: 5.0, count: 0, starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    
    let sum = 0;
    const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      sum += r.rating;
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      starCounts[rounded] = (starCounts[rounded] || 0) + 1;
    });

    return {
      avg: Number((sum / total).toFixed(1)),
      count: total,
      starCounts,
    };
  }, [reviews]);

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        // Category filter
        if (selectedCategory !== "All" && r.service !== selectedCategory) {
          return false;
        }
        // Rating filter
        if (minRating !== "all" && r.rating < minRating) {
          return false;
        }
        // Search filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchAuthor = r.author.toLowerCase().includes(q);
          const matchCompany = r.company.toLowerCase().includes(q);
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchQuote = r.quote.toLowerCase().includes(q);
          const matchService = r.service.toLowerCase().includes(q);
          const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchAuthor && !matchCompany && !matchTitle && !matchQuote && !matchService && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        if (sortBy === "helpful") {
          return b.likes - a.likes;
        }
        // default recent: newly submitted first, then original order
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }, [reviews, selectedCategory, minRating, searchTerm, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (r: ReviewItem) => {
    const textToCopy = `"${r.quote}" — ${r.author}, ${r.role} at ${r.company} (Silver Pixel Soft Client Review)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(r.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* ================= RATINGS & SOCIAL PROOF METRICS DASHBOARD ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121624] via-[#0d101b] to-[#121624] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Big Score (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
              {stats.avg}
            </span>
            <span className="text-2xl text-slate-500 font-bold">/ 5.0</span>
          </div>

          <div className="flex items-center gap-1.5 my-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              />
            ))}
          </div>

          <p className="text-sm text-slate-300 font-medium">
            Based on{" "}
            <strong className="text-white font-bold">{stats.count} Verified Client Reviews</strong>
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs font-mono text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Authentic & Verified
          </div>
        </div>

        {/* Star Rating Breakdown Bars (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stats.starCounts[stars] || 0;
            const pct = stats.count > 0 ? Math.round((count / stats.count) * 100) : 0;
            return (
              <button
                key={stars}
                type="button"
                onClick={() => setMinRating(minRating === stars ? "all" : stars)}
                className={`flex items-center gap-3 text-xs w-full py-0.5 rounded px-2 transition-all ${
                  minRating === stars
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-12 text-left font-mono font-semibold flex items-center gap-1">
                  {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>

                <div className="flex-1 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="w-12 text-right font-mono text-slate-400">
                  {pct}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Key Operational Highlights (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Delivery Track Record</div>
              <div className="text-sm font-bold text-white">100% On-Time Milestones</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Average Performance Gain</div>
              <div className="text-sm font-bold text-white">+38% Core Web Vitals / Speed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Client Repeat / Referral</div>
              <div className="text-sm font-bold text-white">98% Retention & Referrals</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH & FILTER CONTROLS ================= */}
      <div className="space-y-4">
        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, company, keyword (e.g. Next.js, 60 FPS, security)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#141722] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 whitespace-nowrap font-medium">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "recent" | "rating" | "helpful")
              }
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#141722] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="recent">Most Recent First</option>
              <option value="rating">Highest Rated (5★)</option>
              <option value="helpful">Most Helpful Upvotes</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Active Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : "bg-[#141722] text-slate-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Result Count and Clear Filters */}
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>
              Showing <strong className="text-white">{filteredReviews.length}</strong>{" "}
              {filteredReviews.length === 1 ? "review" : "reviews"}
            </span>

            {(selectedCategory !== "All" || minRating !== "all" || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setMinRating("all");
                  setSearchTerm("");
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= REVIEWS GRID ================= */}
      {filteredReviews.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#141722]/50 border border-white/10 text-center space-y-4">
          <Quote className="w-12 h-12 text-slate-600 mx-auto" />
          <h4 className="text-xl font-bold text-white">No reviews match your filters</h4>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search query or selecting a different service category.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMinRating("all");
                setSearchTerm("");
              }}
              className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
            >
              Show All Reviews
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => {
            const isExpanded = !!expandedCards[r.id];
            const isLong = r.quote.length > 170;
            const displayQuote =
              isLong && !isExpanded ? `${r.quote.slice(0, 170)}...` : r.quote;

            return (
              <div
                key={r.id}
                className={`group relative rounded-3xl bg-[#090d18] border transition-all duration-300 p-7 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl ${
                  r.isNew
                    ? "border-cyan-400/60 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    : "border-white/[0.09] hover:border-indigo-500/40"
                }`}
              >
                {/* If New Submission Badge */}
                {r.isNew && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-[10px] font-mono font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider">
                    NEW SUBMISSION
                  </div>
                )}

                <div>
                  {/* Top Bar: Service tag + Outcome metric */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-semibold">
                      {r.service}
                    </span>

                    {r.metric && (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        {r.metric}
                      </span>
                    )}
                  </div>

                  {/* Stars + Quote Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-white/10 group-hover:text-indigo-400/30 transition-colors" />
                  </div>

                  {/* Headline */}
                  <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-indigo-200 transition-colors">
                    {r.title}
                  </h4>

                  {/* Quote */}
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-4">
                    "{displayQuote}"
                  </p>

                  {/* Expand button */}
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(r.id)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold mb-4 block"
                    >
                      {isExpanded ? "Show less" : "Read full review →"}
                    </button>
                  )}

                  {/* Tags */}
                  {r.tags && r.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {r.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Profile, Likes & Share */}
                <div className="pt-5 border-t border-white/[0.08] space-y-4">
                  {/* Author Profile */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={r.avatar}
                        alt={r.author}
                        className="w-10 h-10 rounded-full object-cover border border-white/15"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs sm:text-sm font-bold text-white">
                            {r.author}
                          </h5>
                          {r.verified && (
                            <span title="Verified Client" className="inline-flex">
                              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span>{r.role},</span>
                          {r.clientUrl ? (
                            <a
                              href={r.clientUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-300 hover:underline flex items-center gap-0.5"
                            >
                              {r.company}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-slate-300 font-medium">
                              {r.company}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date, Upvote & Share action bar */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="font-mono text-[11px]">{r.date}</span>

                    <div className="flex items-center gap-2">
                      {/* Helpful Button */}
                      <button
                        type="button"
                        onClick={() => onLikeReview(r.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 border border-white/[0.08] transition-all text-xs"
                        title="Mark review as helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{r.likes}</span>
                      </button>

                      {/* Share Button */}
                      <button
                        type="button"
                        onClick={() => handleShare(r)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/[0.08] transition-all"
                        title="Copy review quote"
                      >
                        {copiedId === r.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= BOTTOM CTA BANNER ================= */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-cyan-900/40 border border-white/15 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            PARTNERED WITH SILVER PIXEL SOFT?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have you completed a sprint with us?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your honest feedback drives our technical direction. Submit your review in 2 minutes and get featured across our official portfolio.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToWrite}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_36px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Write Your Review Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
