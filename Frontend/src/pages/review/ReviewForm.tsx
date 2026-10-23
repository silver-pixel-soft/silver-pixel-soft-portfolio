import React, { useState } from "react";
import {
  Star,
  Sparkles,
  CheckCircle2,
  Send,
  User,
  Building2,
  Mail,
  Globe,
  Quote,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import {
  type ReviewItem,
  AVATAR_PRESETS,
  SERVICE_OPTIONS,
  PROMPT_CHIPS,
  BADGE_OPTIONS,
} from "./reviewData";

interface ReviewFormProps {
  onReviewSubmit: (review: ReviewItem) => void;
  onViewWall: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onReviewSubmit,
  onViewWall,
}) => {
  // Form State
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [clientUrl, setClientUrl] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatar, setCustomAvatar] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [metric, setMetric] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  // Sub ratings
  const [communication, setCommunication] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [quality, setQuality] = useState(5);
  const [value, setValue] = useState(5);
  const [showSubRatings, setShowSubRatings] = useState(false);

  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Clean Code",
    "On-Time Delivery",
  ]);
  const [verifiedConsent, setVerifiedConsent] = useState(true);
  const [publicConsent, setPublicConsent] = useState(true);

  // UI state
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<ReviewItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ratingDescriptions: Record<number, string> = {
    1: "Needs Substantial Work (1/5)",
    2: "Fair, Some Issues (2/5)",
    3: "Good Project Delivery (3/5)",
    4: "Very Good & Professional (4/5)",
    5: "Exceptional / Flawless Execution! (5/5)",
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 4) return;
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (!quote.trim()) {
      setQuote(prompt + ". ");
    } else {
      setQuote((prev) => prev.trim() + " " + prompt + ". ");
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!author.trim()) newErrors.author = "Please enter your full name";
    if (!company.trim()) newErrors.company = "Please enter your company or project name";
    if (!role.trim()) newErrors.role = "Please enter your role or title";
    if (!title.trim()) newErrors.title = "Please provide a headline for your review";
    if (!quote.trim()) {
      newErrors.quote = "Please share your experience (min 20 characters)";
    } else if (quote.trim().length < 20) {
      newErrors.quote = "Feedback must be at least 20 characters long";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const activeAvatar = customAvatar.trim() || avatar;

    const newReview: ReviewItem = {
      id: `rev-client-${Date.now()}`,
      author: author.trim(),
      role: role.trim(),
      company: company.trim(),
      avatar: activeAvatar,
      rating,
      subRatings: {
        communication,
        speed,
        quality,
        value,
      },
      title: title.trim(),
      quote: quote.trim(),
      service,
      tags: selectedTags.length > 0 ? selectedTags : ["Client Review"],
      metric: metric.trim() || undefined,
      date: "Just now",
      verified: true,
      isNew: true,
      likes: 1,
      clientUrl: clientUrl.trim() || undefined,
    };

    setTimeout(() => {
      onReviewSubmit(newReview);
      setSubmittedReview(newReview);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 600);
  };

  const handleReset = () => {
    setAuthor("");
    setRole("");
    setCompany("");
    setEmail("");
    setClientUrl("");
    setTitle("");
    setQuote("");
    setMetric("");
    setRating(5);
    setErrors({});
  };

  const currentDisplayRating = hoverRating !== null ? hoverRating : rating;
  const activeAvatarSrc = customAvatar.trim() || avatar;

  return (
    <div className="relative">
      {/* Mobile Mode Switcher: Form vs Preview */}
      <div className="lg:hidden flex items-center justify-center p-1.5 bg-[#181c27] rounded-2xl border border-white/10 mb-8 max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === "edit"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Review Form
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === "preview"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= FORM COLUMN (lg:col-span-7) ================= */}
        <div
          className={`lg:col-span-7 ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-[#141722]/90 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8"
          >
            {/* Header info */}
            <div className="border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>OFFICIAL CLIENT FEEDBACK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tell Us About Your Project Experience
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Your direct review helps us continuously elevate our engineering
                craftsmanship and lets future partners know what it’s like to work
                with Silver Pixel Soft.
              </p>
            </div>

            {/* Overall Rating Section */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Overall Experience Rating <span className="text-indigo-400">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = starVal <= currentDisplayRating;
                  return (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all transform hover:scale-110 active:scale-95"
                      aria-label={`${starVal} star`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs sm:text-sm font-medium text-amber-300 ml-2 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  {ratingDescriptions[currentDisplayRating]}
                </span>
              </div>

              {/* Sub-aspect ratings expandable toggle */}
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowSubRatings(!showSubRatings)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {showSubRatings
                    ? "Hide detailed metrics breakdown"
                    : "+ Add detailed ratings breakdown (Communication, Speed, Quality, ROI)"}
                </button>

                {showSubRatings && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 rounded-2xl bg-[#0d0f17] border border-white/[0.06]">
                    {/* Communication */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Communication & Transparency</span>
                        <span className="text-indigo-400 font-mono font-bold">
                          {communication}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={communication}
                        onChange={(e) => setCommunication(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    {/* Speed */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Turnaround Speed & Deadlines</span>
                        <span className="text-indigo-400 font-mono font-bold">
                          {speed}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    {/* Quality */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Code & System Quality</span>
                        <span className="text-indigo-400 font-mono font-bold">
                          {quality}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    {/* Value */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Value for Investment</span>
                        <span className="text-indigo-400 font-mono font-bold">
                          {value}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Client Profile Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                Client & Organization Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Liam Sterling"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0d0f17] border ${
                        errors.author ? "border-rose-500" : "border-white/10"
                      } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all`}
                    />
                  </div>
                  {errors.author && (
                    <p className="text-xs text-rose-400 mt-1">{errors.author}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Job Title / Role <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & CTO"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#0d0f17] border ${
                      errors.role ? "border-rose-500" : "border-white/10"
                    } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all`}
                  />
                  {errors.role && (
                    <p className="text-xs text-rose-400 mt-1">{errors.role}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company or Project <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Lumina Cloud Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#0d0f17] border ${
                        errors.company ? "border-rose-500" : "border-white/10"
                      } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-xs text-rose-400 mt-1">{errors.company}</p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Work Email (Private verification)
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0f17] border ${
                        errors.email ? "border-rose-500" : "border-white/10"
                      } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company / Product Website (Optional link)
                </label>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={clientUrl}
                    onChange={(e) => setClientUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0f17] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Select Profile Picture or Provide Avatar URL
                </label>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {AVATAR_PRESETS.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setAvatar(preset);
                        setCustomAvatar("");
                      }}
                      className={`relative rounded-full p-0.5 transition-all ${
                        avatar === preset && !customAvatar
                          ? "ring-2 ring-indigo-400 scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={preset}
                        alt={`Preset ${index + 1}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  placeholder="Or paste your custom avatar photo URL"
                  value={customAvatar}
                  onChange={(e) => setCustomAvatar(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#0d0f17] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Service & Outcome Metric */}
            <div className="space-y-4 pt-2 border-t border-white/[0.08]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                Service Delivered & Results
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Service Category
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0f17] border border-white/10 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0f1117] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Key Metric Highlight */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Key Outcome / Metric (Optional)</span>
                    <span className="text-[10px] text-cyan-400 font-mono">e.g. +40% Speed</span>
                  </label>
                  <div className="relative flex items-center">
                    <TrendingUp className="w-4 h-4 text-slate-500 absolute left-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. 3 Weeks Early, +45% Conversions"
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0f17] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Review & Headline */}
            <div className="space-y-4 pt-2 border-t border-white/[0.08]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                <Quote className="w-4 h-4 text-indigo-400" />
                Review Content
              </h3>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Review Headline <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Transformed our business with modern architecture and zero bugs"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#0d0f17] border ${
                    errors.title ? "border-rose-500" : "border-white/10"
                  } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all`}
                />
                {errors.title && (
                  <p className="text-xs text-rose-400 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Review Story Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Testimonial & Story <span className="text-rose-400">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      quote.length >= 20 ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    {quote.length} characters (min 20)
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Share details of the collaboration, technical quality, responsiveness, and end result..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#0d0f17] border ${
                    errors.quote ? "border-rose-500" : "border-white/10"
                  } text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm leading-relaxed transition-all`}
                />
                {errors.quote && (
                  <p className="text-xs text-rose-400 mt-1">{errors.quote}</p>
                )}

                {/* Quick Prompt Chips */}
                <div className="mt-2.5">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                    Need inspiration? Click any highlight to insert:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PROMPT_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(chip)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/[0.08] transition-colors"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlight Badges / Tags */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Highlight Tags (Select up to 4)
                </label>
                <div className="flex flex-wrap gap-2">
                  {BADGE_OPTIONS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm"
                            : "bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white"
                        }`}
                      >
                        {tag} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Verification & Consent Checkboxes */}
            <div className="pt-2 border-t border-white/[0.08] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedConsent}
                  onChange={(e) => setVerifiedConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that this review represents an authentic engagement with Silver Pixel Soft.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={publicConsent}
                  onChange={(e) => setPublicConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  Allow Silver Pixel Soft to feature this testimonial on its website, portfolio, and pitch decks.
                </span>
              </label>
            </div>

            {/* Form Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Form
              </button>

              <div className="w-full sm:w-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="lg:hidden flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Preview Card
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_36px_rgba(99,102,241,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Verified Review</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ================= LIVE PREVIEW CARD (lg:col-span-5) ================= */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-28 space-y-4 ${
            activeTab === "edit" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Eye className="w-4 h-4" />
              LIVE TESTIMONIAL PREVIEW
            </span>
            <span className="bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/20 text-[10px]">
              Real-time Rendering
            </span>
          </div>

          {/* Glowing Showcase Card */}
          <div className="relative group rounded-3xl bg-[#090d18] border border-white/[0.12] p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header: Service pill + Metric badge */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-semibold">
                  {service}
                </span>

                {metric.trim() ? (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    {metric}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">
                    Verified Client
                  </span>
                )}
              </div>

              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-700"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-1.5">
                    {rating}.0
                  </span>
                </div>
                <Quote className="w-6 h-6 text-white/15" />
              </div>

              {/* Headline */}
              <h4 className="text-lg font-bold text-white mb-3 leading-snug">
                {title.trim() ? title : "Your Review Headline Will Appear Here"}
              </h4>

              {/* Quote Story */}
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "{quote.trim()
                  ? quote
                  : "Type your review in the form to see your real-time quote preview here. The layout updates dynamically with your avatar, company role, and highlight badges."}"
              </p>

              {/* Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedTags.map((tg) => (
                    <span
                      key={tg}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Reviewer Profile Footer */}
            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeAvatarSrc}
                  alt={author || "Reviewer"}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-400/40"
                  onError={(e) => {
                    // Fallback to default preset if URL fails
                    (e.target as HTMLImageElement).src = AVATAR_PRESETS[0];
                  }}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold text-white">
                      {author.trim() ? author : "Your Name"}
                    </h5>
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {role.trim() ? role : "Your Role"},{" "}
                    <span className="text-indigo-300 font-medium">
                      {company.trim() ? company : "Company"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">
                  Date
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* Quick Guide Card */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              What makes a helpful review?
            </div>
            <p className="leading-relaxed">
              Specific metrics (e.g. reduction in bug reports, increase in customer conversion, speed to market) give prospective clients the most actionable insight.
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUCCESS CELEBRATION MODAL ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full bg-[#181c27] border border-white/15 rounded-3xl p-8 shadow-[0_0_60px_rgba(99,102,241,0.4)] text-center space-y-6">
            {/* Glowing Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                THANK YOU FOR YOUR FEEDBACK!
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Your Review Is Live
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Thank you,{" "}
                <strong className="text-white">{submittedReview?.author}</strong>!
                Your testimonial has been added to our official review showcase.
              </p>
            </div>

            {/* Mini Summary Card */}
            {submittedReview && (
              <div className="p-4 rounded-2xl bg-[#0e111a] border border-white/10 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(submittedReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                    Verified
                  </span>
                </div>
                <p className="text-xs font-semibold text-white">
                  "{submittedReview.title}"
                </p>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {submittedReview.quote}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  handleReset();
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.05] text-xs font-semibold transition-all"
              >
                Write Another Review
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onViewWall();
                }}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                Explore Review Showcase →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
