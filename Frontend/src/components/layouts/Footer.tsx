import useScrollToSection from "../../hooks/useScrollToSection";
import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from "../ui/Icons";

const Footer = () => {
  const scrollToSection = useScrollToSection();

  return (
    <footer className="border-t border-white/[0.08] bg-[#02050c] px-6 py-16 lg:px-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 font-medium relative z-10">
        
        {/* Brand Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090d16]">
                <Sparkles className="h-4 w-4 text-sky-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Silver Pixel Soft
            </span>
          </div>

          <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
            Award-winning digital studio engineering high-performance web applications, scalable mobile apps, and custom software systems for forward-thinking enterprises.
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ranchi, India • Open for Global Remote Engagements</span>
          </div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { name: "Twitter / X", href: "https://x.com/Silver59063Soft", icon: <TwitterIcon className="w-4 h-4" /> },
              { name: "GitHub", href: "https://github.com/silver-pixel-soft", icon: <GithubIcon className="w-4 h-4" /> },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/silver-pixel-soft-undefined-577887405/", icon: <LinkedinIcon className="w-4 h-4" /> },
              { name: "Instagram", href: "https://www.instagram.com/silverpixelsoft?igsh=MWQ0NDM3a2RxMGJ2MA%3D%3D&utm_source=ig_contact_invite", icon: <InstagramIcon className="w-4 h-4" /> },
              { name: "Facebook", href: "https://www.facebook.com/share/1CWx32CcH4/", icon: <FacebookIcon className="w-4 h-4" /> },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-sky-500/40 hover:bg-sky-500/10 text-neutral-400 hover:text-sky-400 flex items-center justify-center transition-all"
                title={soc.name}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li>
              <button onClick={() => scrollToSection("home")} className="hover:text-sky-400 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")} className="hover:text-sky-400 transition-colors">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("service")} className="hover:text-sky-400 transition-colors">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("process")} className="hover:text-sky-400 transition-colors">
                Our Process
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("work")} className="hover:text-sky-400 transition-colors">
                Case Studies
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("pricing")} className="hover:text-sky-400 transition-colors">
                Pricing & FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Direct Contact Column (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <a href="mailto:noreplyonlymail@gmail.com" className="hover:text-sky-400 transition-colors truncate">
                noreplyonlymail@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-purple-400 shrink-0" />
              <a href="tel:+918987700448" className="hover:text-purple-400 transition-colors">
                +91 8987700448
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Ranchi, Jharkhand, India, PIN 835103
              </span>
            </li>
          </ul>
        </div>

        {/* Legal Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Legal & Terms</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li>
              <Link to="/privacy-policy" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <span>Privacy Policy</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <span>Terms of Service</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </li>
            <li>
              <Link to="/all-projects" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <span>Portfolio Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-footer */}
      <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Silver Pixel Soft. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Engineered with passion for high performance</span>
          <span className="text-sky-400 font-bold">•</span>
          <span>Next-Gen Agency</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;