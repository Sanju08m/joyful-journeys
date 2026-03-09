import { Anchor, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
    { name: "Developers", href: "#developers" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-gold">
            <Anchor className="w-6 h-6" />
            <span className="font-display text-lg font-bold tracking-wider">GLTF 2026</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf2Wxi3RSQhtzPoqHFi7r5bRFnuXKCnNQ55Zr-vFXK0jlhYUA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs rounded-full"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf2Wxi3RSQhtzPoqHFi7r5bRFnuXKCnNQ55Zr-vFXK0jlhYUA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs rounded-full w-fit"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
