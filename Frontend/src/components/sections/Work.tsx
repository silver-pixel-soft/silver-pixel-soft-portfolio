import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: "Fintech Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Eco E-Commerce",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "AI Medical Assistant",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Logistics Platform",
    category: "Enterprise Software",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  }
];

const Work = () => {
  const containerRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.from(projectsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <SectionHeading 
          align="left"
          subtitle="Our Work"
          title="Featured Case Studies"
          className="mb-0"
        />
        <Button variant="secondary" size="lg" className="whitespace-nowrap">
          View All Projects
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index}
            ref={(el) => { if (el) projectsRef.current[index] = el }}
            className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
              <div>
                <p className="text-sky-400 font-medium mb-2">{project.category}</p>
                <h4 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">{project.title}</h4>
              </div>
              <button aria-label={`View ${project.title} project`} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-sky-500">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Work