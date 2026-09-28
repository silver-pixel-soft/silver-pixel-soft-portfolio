import { useRef, useState } from "react";
import { Mail, MapPin, Phone, ChevronDown, Send, CheckCircle2, Clock, Copy, Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    budget: "",
    message: ""
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("noreplyonlymail@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName) return;
    setFormSubmitted(true);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        once: true,
      },
    });

    tl.from(leftColRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
    }).from(
      rightColRef.current,
      {
        x: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-28 px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-start">
        
        {/* Left Column: Direct Info & Channels */}
        <div ref={leftColRef} className="lg:col-span-5 space-y-8">
          <SectionHeading
            align="left"
            subtitle="Let's Connect"
            title="Have an Idea? Let's Engineer It."
            description="Whether you're starting from scratch, scaling an existing product, or need a dedicated engineering pod — we're ready to make it real."
            className="mb-8"
          />

          {/* Quick SLA Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Guaranteed Response Within 24 Hours</span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Email Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-sky-500/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email Us Directly</h4>
                  <a
                    href="mailto:noreplyonlymail@gmail.com"
                    className="text-sm font-bold text-white hover:text-sky-400 transition-colors"
                  >
                    noreplyonlymail@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-purple-500/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Call / WhatsApp</h4>
                  <a
                    href="https://wa.me/918987700448"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-purple-400 transition-colors"
                  >
                    +91 8987700448
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/918987700448"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                WhatsApp
              </a>
            </div>

            {/* Location Card */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#090d18] border border-white/[0.08]">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">Headquarters</h4>
                <p className="text-sm font-bold text-white leading-snug">
                  Ranchi, Jharkhand, India
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Pin Code: 835103 • Working Worldwide (Remote First)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Interactive Contact Form */}
        <div
          ref={rightColRef}
          className="lg:col-span-7 bg-[#090d18]/90 border border-white/[0.1] rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative"
        >
          {formSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. Our technical team has received your project briefing and will follow up at <span className="text-sky-400 font-mono">{formData.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    First Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Rahul"
                    className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Verma"
                    className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Work Email Address <span className="text-sky-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@company.com"
                  className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Service of Interest
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer appearance-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="web">Web Application (React/Next.js)</option>
                      <option value="mobile">Mobile App (React Native/iOS/Android)</option>
                      <option value="software">Custom Enterprise Software / AI</option>
                      <option value="uiux">UI/UX & Product Design</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Expected Budget
                  </label>
                  <div className="relative">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer appearance-none"
                    >
                      <option value="">Select your budget range...</option>
                      <option value="under15k">Under ₹15,000</option>
                      <option value="15k-30k">₹15,000 - ₹30,000</option>
                      <option value="30k-60k">₹30,000 - ₹60,000</option>
                      <option value="60k-1lakh">₹60,000 - ₹1,00,000</option>
                      <option value="1lakh+">₹1,00,000+ (Enterprise)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Project Overview & Goals
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about what you want to build, target users, desired timeline, or any reference websites..."
                  className="w-full bg-[#050812] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full py-4 rounded-xl text-base font-bold shadow-xl shadow-sky-500/20 gap-2"
              >
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;