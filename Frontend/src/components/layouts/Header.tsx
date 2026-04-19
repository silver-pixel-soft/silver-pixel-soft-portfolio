import { useState, useRef } from "react";
import useScrollToSection from "../../hooks/useScrollToSection";
import { MonitorPlay, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const scrollToSection = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isMobileMenuOpenRef = useRef(isMobileMenuOpen);
  isMobileMenuOpenRef.current = isMobileMenuOpen;

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "service" },
    { name: "Work", id: "work" },
    { name: "Pricing", id: "pricing" },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  useGSAP(() => {
    if (menuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(menuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          display: "block",
        });
      } else {
        gsap.to(menuRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(menuRef.current, { display: "none" });
          }
        });
      }
    }
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    if (!headerRef.current) return;

    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power3.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top-=" + 100,
      end: 99999,
      onUpdate: (self) => {
        if (isMobileMenuOpenRef.current) return;
        if (self.direction === 1) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-20">
        <div 
          className="flex cursor-pointer items-center gap-2"
          onClick={() => scrollToSection("home")}
        >
          <MonitorPlay className="h-8 w-8 text-sky-500" />
          <span className="text-xl font-bold tracking-tight text-white">Silver Pixel Soft</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navItems.map((item) => (
              <li 
                key={item.id}
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <Button onClick={() => scrollToSection("contact")}>
            Get Started
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
          className="p-2 text-neutral-300 md:hidden flex justify-center items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div 
        ref={menuRef}
        style={{ display: 'none', opacity: 0, transform: 'translateY(-20px)' }}
        className="absolute left-0 top-20 w-full border-b border-white/5 bg-neutral-950/95 px-6 py-6 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-6 text-base font-medium text-neutral-300">
          {navItems.map((item) => (
            <li 
              key={item.id}
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => handleNavClick(item.id)}
            >
              {item.name}
            </li>
          ))}
          <li className="pt-4">
            <Button 
              className="w-full text-base py-3"
              onClick={() => handleNavClick("contact")}
            >
              Get Started
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;