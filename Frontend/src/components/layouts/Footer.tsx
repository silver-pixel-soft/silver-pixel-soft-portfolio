import useScrollToSection from "../../hooks/useScrollToSection";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = useScrollToSection();

  return (
    <footer className="border-t border-white/5 bg-neutral-950 px-6 py-12 lg:px-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 font-medium">
        {/* Brand */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-white tracking-tight">Silver Pixel Soft</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
            Crafting premium digital experiences and scalable software solutions for modern businesses.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-neutral-400 text-sm">
            <Link to="https://x.com/Silver59063Soft" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">X (Twitter)</Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">GitHub</Link>
            <Link to="https://www.linkedin.com/in/silver-pixel-soft-undefined-577887405/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</Link>
            <Link to="https://www.instagram.com/silverpixelsoft?igsh=MWQ0NDM3a2RxMGJ2MA%3D%3D&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Instagram</Link>
            <Link to="https://www.facebook.com/share/1CWx32CcH4/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Facebook</Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 lg:ml-auto">
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <button onClick={() => scrollToSection("about")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">About Us</button>
          <button onClick={() => scrollToSection("service")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Services</button>
          <button onClick={() => scrollToSection("work")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Our Work</button>
          <button onClick={() => scrollToSection("pricing")} className="text-left text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Pricing</button>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <Link to="mailto:noreplyonlymail@gmail.com" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">nonoreplyonlymail@gmail.com</Link>
          <Link to="tel:+918987700448" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">+91 8987700448</Link>
          <span className="text-sm text-neutral-400">Ranchi, Jharkhand, India, Pincode: 835103</span>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <Link to="/privacy-policy" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors w-fit">Terms of Service</Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-12 border-t border-white/5 pt-8 text-center sm:flex sm:items-center sm:justify-between text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Silver Pixel Soft. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Designed with passion.</p>
      </div>
    </footer>
  );
};

export default Footer;