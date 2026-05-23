import { useRef } from "react";
import { Laptop, Code2, Paintbrush, Smartphone } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: <Laptop className="h-6 w-6 text-cyan-400" />,
    iconBg: "bg-[#1e2333]",
    title: "Web Development",
    description: "Custom web applications built with React, Next.js, and Node.js. Fast, accessible, and scalable.",
    price: "INR 9,999"
  },
  {
    icon: <Smartphone className="h-6 w-6 text-yellow-400" />,
    iconBg: "bg-[#332f1e]",
    title: "Mobile App",
    description: "iOS and Android apps that are fast, intuitive, and built to scale.",
    price: "INR 12,999"
  },
  {
    icon: <Code2 className="h-6 w-6 text-purple-400" />,
    iconBg: "bg-[#251e33]",
    title: "Custom Software",
    description: "Tailored enterprise solutions that streamline complex business processes.",
    price: "INR 19,999"
  },
  {
    icon: <Paintbrush className="h-6 w-6 text-pink-400" />,
    iconBg: "bg-[#331e25]",
    title: "UI/UX Design",
    description: "Intuitive, user-centric interfaces that keep your customers engaged.",
    price: "INR 5,999"
  }  
];

const Service = () => {
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
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="service" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl relative">
      <SectionHeading 
        subtitle="What We Do"
        title="Services Built for Scale"
        description="From concept to launch, we cover every dimension of your digital needs with specialized teams and battle-tested processes."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el }}
            className="group relative flex flex-col p-8 rounded-3xl bg-[#0f0f15] border border-white/5 hover:border-white/10 transition-colors shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.iconBg} border border-white/5 shadow-inner`}>
              {service.icon}
            </div>
            
            <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
              {service.description}
            </p>
            
            <div className="h-[1px] w-full bg-white/5 mb-6" />
            
            <div className="flex items-end justify-between mt-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-neutral-400">Starting from</span>
                <span className="text-xl font-bold text-indigo-400">{service.price}</span>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm font-semibold border border-indigo-500/20 hover:bg-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Service