import { useRef, useEffect } from "react";
import { ExternalLink, FileCodeCorner, ArrowLeft } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

// Image import 
import portfolioImage from "../assets/Portfolio.png";
import lioImage from "../assets/Lio.png";
import khabriImage from "../assets/Khabri.png";
import chatBotImage from "../assets/ChatBot.png";
import { CustomCursor } from "../components/ui/CustomCursor";

const projects = [
  {
    title: "Personal Portfolio",
    category: "UI/UX Design",
    image: portfolioImage,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Portfolio",
      },
      {
        name: "Live Demo",
        url: "https://akshay-kumar-two.vercel.app/",
      }
    ],
  },
  {
    title: "Lio",
    category: "URL Shortener & Analytics",
    image: lioImage,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Lio",
      },
      {
        name: "Live Demo",
        url: "https://lio-orcin.vercel.app/",
      }
    ],
  },
  {
    title: "Khabri",
    category: "News Application",
    image: khabriImage,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/khabri-web",
      },
      {
        name: "Live Demo",
        url: "https://khabri-web.vercel.app/",
      }
    ],
  },
  {
    title: "Chat Bot",
    category: "AI Agent",
    image: chatBotImage,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/akshaykumar401/Chat-Bot.",
      },
      {
        name: "Live Demo",
        url: "https://akshaykumar401.github.io/Chat-Bot./",
      }
    ],
  }
];

const AllProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(projectsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.4");
  }, { scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-6 lg:px-20 mx-auto max-w-7xl">
      <CustomCursor />
      <div ref={headingRef} className="flex flex-col mb-16 gap-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors w-fit mb-4 group font-medium"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        <SectionHeading
          align="left"
          subtitle="Portfolio"
          title="All Projects"
          className="mb-0"
        />
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
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
              <div>
                <p className="text-sky-400 font-medium mb-2">{project.category}</p>
                <h4 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">{project.title}</h4>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => { window.open(project.links[0].url, '_blank') }}
                  aria-label={`View ${project.title} project source`} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-sky-500"
                  title="Source Code"
                >
                  <FileCodeCorner className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { window.open(project.links[1].url, '_blank') }}
                  aria-label={`View ${project.title} project demo`} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-sky-500"
                  title="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProject