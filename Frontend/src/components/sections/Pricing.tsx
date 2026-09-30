import { useRef, useState } from "react";
import { Check, Sparkles, ChevronDown, Zap, HelpCircle } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToSection from "../../hooks/useScrollToSection";

const plans = [
  {
    name: "Starter / MVP",
    price: "INR 9,999+",
    timeline: "1 - 2 Weeks Turnaround",
    description: "Ideal for founders looking to validate ideas quickly with a clean, high-performing MVP.",
    popular: false,
    features: [
      "Full Product Discovery & Wireframes",
      "Modern React / Next.js Web App",
      "Mobile Responsive & Fast Load Times",
      "Contact Form & Lead Capture",
      "100% Source Code Ownership",
      "14 Days Post-Launch Support"
    ],
  },
  {
    name: "Growth & Scale",
    price: "INR 19,999+",
    timeline: "3 - 4 Weeks Turnaround",
    popular: true,
    description: "Designed for growing startups needing a full-stack, scalable application with integrations.",
    features: [
      "Custom UI/UX Design System in Figma",
      "Full-Stack Web or Mobile App",
      "Authentication & Role-based Access",
      "Database & REST / GraphQL API Setup",
      "Payment Gateway Integration (Stripe/Razorpay)",
      "SEO & Core Web Vitals Hardening",
      "30 Days Priority SLA Support"
    ],
  },
  {
    name: "Enterprise Custom",
    price: "INR 99,999+",
    timeline: "Custom Agile Sprints",
    popular: false,
    description: "Mission-critical enterprise software, AI pipelines, and dedicated engineering pods.",
    features: [
      "Dedicated Full-Time Senior Engineers",
      "Custom Microservices & Cloud Infrastructure",
      "AI / LLM Integration & Automation",
      "Enterprise Security & OWASP Compliance",
      "Continuous CI/CD Pipeline & Dockerization",
      "Dedicated Slack Channel & Weekly Demos",
      "24/7 SLA & Ongoing Maintenance"
    ],
  },
];

const faqs = [
  {
    q: "How does the milestone payment structure work?",
    a: "We work on transparent, milestone-based payments (typically 30% kickoff, 40% design & development milestone, and 30% upon final acceptance and production deployment). No hidden fees ever."
  },
  {
    q: "Do I retain 100% ownership of the code and assets?",
    a: "Absolutely. Once the final invoice is cleared, all intellectual property, Figma design files, source code repositories, and deployment keys are 100% transferred to you."
  },
  {
    q: "Can we sign a Non-Disclosure Agreement (NDA) first?",
    a: "Yes! We treat confidentiality with utmost seriousness. We are happy to sign your standard mutual NDA or provide our own prior to any technical briefing."
  },
  {
    q: "What post-launch support and warranty is included?",
    a: "Every engagement includes complimentary post-launch bug fixing and monitoring (14 to 30 days depending on tier). We also offer flexible retainer packages for continuous feature development."
  }
];

const Pricing = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const scrollToSection = useScrollToSection();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <section id="pricing" ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      <SectionHeading
        subtitle="Transparent Investment"
        title="Predictable Pricing. Zero Surprises."
        description="Choose the right package for your current phase. Need something unique? We tailor solutions to your exact scope."
      />

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 items-stretch mb-24">
        {plans.map((plan, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? "bg-[#0c1222] border-2 border-sky-500 shadow-[0_0_50px_rgba(14,165,233,0.2)] md:-translate-y-3 z-10"
                : "bg-[#090d18] border border-white/[0.08] hover:border-white/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-indigo-500 text-black text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </div>
            )}

            <div>
              {/* Header */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-1.5">{plan.name}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">{plan.description}</p>
              </div>

              {/* Price & Timeline */}
              <div className="mb-8 pb-6 border-b border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {plan.price}
                </div>
                <div className="text-xs font-mono text-sky-400 mt-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{plan.timeline}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  What's included:
                </div>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-snug">
                    <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <Button
              onClick={() => scrollToSection("contact")}
              className={`w-full py-3.5 text-sm font-bold rounded-xl ${
                plan.popular ? "shadow-lg shadow-sky-500/25" : ""
              }`}
              variant={plan.popular ? "primary" : "secondary"}
            >
              Get Started with {plan.name.split(" ")[0]}
            </Button>
          </div>
        ))}
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-neutral-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            Got Questions?
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#090d18] overflow-hidden transition-colors hover:border-white/15"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-sky-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;