import { useRef } from "react";
import { Mail, MapPin, Phone, ChevronDown } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate background glow
    gsap.to(".bg-glow", {
      y: 30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    tl.from(leftColRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(".contact-item", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4")
    .from(rightColRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")
    .from(".form-field", {
      y: 15,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-24 px-6 lg:px-20 mx-auto max-w-7xl relative overflow-hidden">
      <div className="bg-glow absolute top-1/2 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

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
            <div className="contact-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-colors">
                <Mail className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                <Link to="mailto:noreplyonlymail@gmail.com" className="text-neutral-400 hover:text-sky-400 cursor-pointer transition-colors">noreplyonlymail@gmail.com</Link>
              </div>
            </div>

            <div className="contact-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-colors">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Call Us</h4>
                <Link to="tel:+918987700448" className="text-neutral-400 hover:text-purple-400 cursor-pointer transition-colors">+91 8987700448
                </Link>
              </div>
            </div>

            <div className="contact-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/30 transition-colors">
                <MapPin className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Visit Us</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Ranchi, Jharkhand<br />
                  India, Pin - 835103
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
            <div className="form-field grid md:grid-cols-2 gap-6">
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

            <div className="form-field space-y-2">
              <label className="text-sm font-medium text-neutral-300">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
            </div>

            <div className="form-field grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Service Interest</label>
                <div className="relative">
                  <select defaultValue="" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all cursor-pointer appearance-none">
                    <option value="" disabled>Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="software">Custom Software</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Budget</label>
                <div className="relative">
                  <select defaultValue="" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all cursor-pointer appearance-none">
                    <option value="" disabled>Select your budget</option>
                    <option value="under10k">Under ₹10,000</option>
                    <option value="10k-25k">₹10,000 - ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-1lakh">₹50,000 - ₹1,00,000</option>
                    <option value="1lakh+">₹1,00,000+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="form-field space-y-2">
              <label className="text-sm font-medium text-neutral-300">Project Details</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <Button className="form-field w-full py-4 rounded-xl text-base">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact