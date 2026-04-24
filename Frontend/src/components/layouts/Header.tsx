import { useState, useRef, useEffect } from "react";
import useScrollToSection from "../../hooks/useScrollToSection";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const scrollToSection = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isMobileMenuOpenRef = useRef(isMobileMenuOpen);
  
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

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
    if (!menuRef.current) return;
    
    gsap.set(menuRef.current, { xPercent: 100, opacity: 0 });

    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        display: "flex",
      })
      .from(
        gsap.utils.toArray('.mobile-nav-link', menuRef.current),
        { y: 30, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );
  }, { scope: menuRef });

  useGSAP(() => {
    if (isMobileMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
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
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-20">
        <div 
          className="flex cursor-pointer items-center gap-2"
          onClick={() => scrollToSection("home")}
        >
          <h1 className="text-xl font-bold tracking-tight text-white">Silver Pixel Soft</h1>
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

      </header>

      {/* Mobile Nav */}
      <div 
        ref={menuRef}
        style={{ display: 'none', opacity: 0 }}
        className="fixed top-0 right-0 z-[100] h-screen w-full sm:w-[400px] border-l border-white/5 bg-neutral-950/95 backdrop-blur-2xl md:hidden flex-col"
      >
        {/* Close Button */}
        <div className="flex h-20 items-center justify-end px-6">
          <button 
            aria-label="Close Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-1 flex-col justify-center px-12 pb-20">
          <ul className="flex flex-col gap-8 text-4xl font-bold tracking-tight text-white">
            {navItems.map((item) => (
              <li 
                key={item.id}
                className="mobile-nav-link cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => handleNavClick(item.id)}
              >
                {item.name}
              </li>
            ))}
            <li className="mobile-nav-link pt-4">
              <Button 
                className="w-full text-lg py-4"
                onClick={() => handleNavClick("contact")}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;