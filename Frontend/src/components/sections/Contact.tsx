import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(leftColRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(rightColRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl relative">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        <div ref={leftColRef}>
          <SectionHeading 
            align="left"
            subtitle="Get in Touch"
            title="Let's Build Something Great"
            description="Ready to transform your ideas into reality? Reach out to us to discuss your project, and let our experts guide you to success."
            className="mb-12"
          />
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-colors">
                <Mail className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                <p className="text-neutral-400 hover:text-sky-400 cursor-pointer transition-colors">hello@silverpixelsoft.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-colors">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Call Us</h4>
                <p className="text-neutral-400 hover:text-purple-400 cursor-pointer transition-colors">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/30 transition-colors">
                <MapPin className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Visit Us</h4>
                <p className="text-neutral-400 leading-relaxed">
                  123 Tech Lane, Innovation City<br />
                  New York, 10001
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={rightColRef}
          className="bg-neutral-900 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-md"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Project Details</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your project..." 
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all resize-none"
              ></textarea>
            </div>
            
            <Button className="w-full py-4 rounded-xl text-base">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact