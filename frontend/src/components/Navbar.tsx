import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "AI Assistant", href: "#chart-bot" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="text-base font-dot text-blue-400 font-bold tracking-widest flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          VSKR<span className="text-amber-400">_</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${
                activeSection === l.href.slice(1)
                  ? "text-cyan-200 bg-cyan-400/10 border border-cyan-400/20 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl" : "max-h-0"}`}>
        <div className="px-6 pb-4 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 px-3 text-xs font-mono rounded-lg transition-all ${
                activeSection === l.href.slice(1)
                  ? "text-blue-300 bg-blue-500/10 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
