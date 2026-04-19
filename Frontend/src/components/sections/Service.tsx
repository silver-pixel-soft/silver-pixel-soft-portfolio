import { useRef } from "react";
import { MonitorSmartphone, Code2, Paintbrush, CloudLightning } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-sky-400" />,
    title: "Web & Mobile App",
    description: "Native and cross-platform applications built for scale and performance."
  },
  {
    icon: <Code2 className="h-8 w-8 text-purple-400" />,
    title: "Custom Software",
    description: "Tailored enterprise solutions that streamline complex business processes."
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-pink-400" />,
    title: "UI/UX Design",
    description: "Intuitive, user-centric interfaces that keep your customers engaged."
  },
  {
    icon: <CloudLightning className="h-8 w-8 text-yellow-400" />,
    title: "Cloud Infrastructure",
    description: "Secure, scalable cloud architecture and deployment strategies."
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
        subtitle="Our Expertise"
        title="Innovative Solutions"
        description="We leverage cutting-edge technologies to build scalable, secure, and intuitive digital products."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el }}
            className="group relative p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black border border-white/5 shadow-lg">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
            <p className="text-neutral-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Service