import { MonitorPlay } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";

const Footer = () => {
  const scrollToSection = useScrollToSection();

  return (
    <footer className="border-t border-white/5 bg-neutral-950 px-6 py-12 lg:px-20">
      <div className="mx-auto max-w-7xl grid gap-12 font-medium md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <MonitorPlay className="h-6 w-6 text-sky-500" />
            <span className="text-lg font-bold text-white tracking-tight">Silver Pixel Soft</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
            Crafting premium digital experiences and scalable software solutions for modern businesses.
          </p>
          <div className="mt-6 flex items-center gap-4 text-neutral-400 text-sm">
            <a href="#" className="hover:text-sky-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-sky-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-sky-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Instagram</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <button onClick={() => scrollToSection("about")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">About Us</button>
          <button onClick={() => scrollToSection("service")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Services</button>
          <button onClick={() => scrollToSection("work")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Our Work</button>
          <button onClick={() => scrollToSection("pricing")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Pricing</button>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <span className="text-sm text-neutral-400">hello@silverpixelsoft.com</span>
          <span className="text-sm text-neutral-400">+1 (555) 123-4567</span>
          <span className="text-sm text-neutral-400">123 Tech Lane, Innovation City, NY</span>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <a href="/privacy-policy" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Privacy Policy</a>
          <a href="/terms-of-service" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Terms of Service</a>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl mt-12 border-t border-white/5 pt-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Silver Pixel Soft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;