import useScrollToSection from "../../hooks/useScrollToSection";

const Header = () => {
  const scrollToSection = useScrollToSection();

  return (
    <header className="flex min-h-[10vh] w-full flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 max-w-7xl mx-auto">
      <div>Header</div>
      <nav className="flex items-center gap-6">
        <ul className="flex items-center gap-6">
          <li className="cursor-pointer" onClick={() => scrollToSection("home")}>Home</li>
          <li className="cursor-pointer" onClick={() => scrollToSection("about")}>About</li>
          <li className="cursor-pointer" onClick={() => scrollToSection("service")}>Service</li>
          <li className="cursor-pointer" onClick={() => scrollToSection("work")}>Work</li>
          <li className="cursor-pointer" onClick={() => scrollToSection("pricing")}>Pricing</li>
          <li className="cursor-pointer" onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header