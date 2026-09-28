import { useState, useRef, useEffect } from "react";
import useScrollToSection from "../../hooks/useScrollToSection";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const scrollToSection = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isMobileMenuOpenRef = useRef(isMobileMenuOpen);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "service" },
    { name: "Work", id: "work" },
    { name: "Process", id: "process" },
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
        duration: 0.45,
        ease: "power4.out",
        display: "flex",
      })
      .from(
        gsap.utils.toArray('.mobile-nav-link', menuRef.current),
        { y: 25, opacity: 0, duration: 0.35, stagger: 0.08, ease: "power3.out" },
        "-=0.2"
      );
  }, { scope: menuRef });

  useGSAP(() => {
    if (isMobileMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    if (!headerRef.current) return;

    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.35,
      ease: "power3.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top-=" + 80,
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
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-xl shadow-2xl shadow-black/40"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-20">
          {/* Brand Logo */}
          <div
            className="flex cursor-pointer items-center gap-3 group"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090d16] transition-colors group-hover:bg-[#0e1424]">
                <Sparkles className="h-5 w-5 text-sky-400 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Silver Pixel Soft
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                Digital Agency
              </span>
            </div>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 backdrop-blur-md md:flex shadow-inner">
            <ul className="flex items-center gap-1 text-sm font-medium text-neutral-300">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer rounded-full px-4 py-1.5 transition-all duration-200 hover:text-white hover:bg-white/[0.06] active:scale-95"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Area: Status Badge & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Q2
            </div>

            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="gap-1.5 shadow-lg shadow-sky-500/20"
            >
              <span>Start Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition-all hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <div
        ref={menuRef}
        style={{ display: "none", opacity: 0 }}
        className="fixed top-0 right-0 z-[100] h-screen w-full sm:w-[420px] border-l border-white/10 bg-[#060a12]/95 backdrop-blur-2xl md:hidden flex-col shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between px-8 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-neutral-300">Menu</span>
          </div>
          <button
            aria-label="Close Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-1 flex-col justify-between px-8 py-10 overflow-y-auto">
          <ul className="flex flex-col gap-5 text-2xl font-bold tracking-tight text-white">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="mobile-nav-link group flex items-center justify-between cursor-pointer py-2 border-b border-white/[0.04] transition-colors hover:text-sky-400"
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.name}</span>
                <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-400" />
              </li>
            ))}
          </ul>

          <div className="mobile-nav-link flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Accepting new projects worldwide
            </div>
            <Button
              className="w-full text-base py-3.5"
              onClick={() => handleNavClick("contact")}
            >
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;