import { useRef } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const plans = [
  {
    name: "Starter",
    price: "INR 9,999+",
    description: "Perfect for startups needing an MVP.",
    features: [
      "Discovery & Strategy",
      "UI/UX Design for MVP",
      "Basic Web Application",
      "Standard Support"
    ]
  },
  {
    name: "Growth",
    price: "INR 19,999+",
    popular: true,
    description: "For scaling businesses wanting a solid foundation.",
    features: [
      "Advanced UI/UX Design",
      "Full Stack Development",
      "Mobile App Integration",
      "Priority Support"
    ]
  },
  {
    name: "Enterprise",
    price: "INR 99,999+",
    description: "Complex software solutions for large organizations.",
    features: [
      "Dedicated Team",
      "Custom Architecture",
      "AI & ML Capabilities",
      "Security & Compliance",
      "24/7 SLA Support"
    ]
  }
];

const Pricing = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="pricing" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl">
      <SectionHeading
        subtitle="Investment"
        title="Simple, Transparent Pricing"
        description="We offer custom quotes tailored to the specific needs and scale of your project."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el }}
            className={`relative p-8 rounded-3xl border flex flex-col h-full bg-neutral-900 ${plan.popular ? 'border-sky-500 shadow-[0_0_40px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/50 scale-105 z-10' : 'border-white/10'
              }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
              <p className="text-neutral-400 text-sm mb-6 h-10">{plan.description}</p>
              <div className="text-4xl font-black text-white">{plan.price}</div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex flex-start gap-3 text-neutral-300 text-sm">
                  <Check className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full py-4 text-base"
              variant={plan.popular ? "primary" : "secondary"}
            >
              Request Quote
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing