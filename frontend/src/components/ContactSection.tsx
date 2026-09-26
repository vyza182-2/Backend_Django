import { useState } from "react";
import { Button } from "@/components/ui/button";
import useScrollReveal from "@/hooks/useScrollReveal";

const contactItems = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    label: "Email",
    value: "vyza.18@gmail.com",
    href: "mailto:vyza.18@gmail.com",
    copyValue: "vyza.18@gmail.com"
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    label: "Phone",
    value: "+91 8187032002",
    href: "tel:+918187032002",
    copyValue: "+918187032002"
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: "Location",
    value: "Hyderabad, India",
    href: "https://maps.google.com/?q=Hyderabad,India",
    copyValue: "Hyderabad, India"
  },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch {
      setCopiedItem(null);
    }
  };

  return (
    <section id="contact" className="section-padding bg-slate-950/40 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-cyan-300 text-center mb-2 tracking-widest uppercase">07. GET IN TOUCH</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-wider font-dot uppercase">
            LET'S <span className="text-gradient">CONNECT</span>
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-md mx-auto text-sm">
            I'm actively looking for a fresher opportunity in AI/ML Engineering, MLOps, AWS DevOps, or Python development. Let's build something reliable.
          </p>
        </div>

        <div className={`max-w-2xl mx-auto reveal ${isVisible ? "visible" : ""} reveal-delay-1`}>
          <div className="card-pro-hover rounded-2xl p-8 md:p-12 border-slate-800/80 bg-slate-900/40">
            <div className="space-y-3 mb-10">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800/60 bg-slate-950/40 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group"
                >
                  <a href={item.href} className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-mono">{item.label}</p>
                      <p className="text-white group-hover:text-blue-400 transition-colors font-medium text-sm md:text-base">{item.value}</p>
                    </div>
                  </a>

                  <button
                    onClick={() => handleCopy(item.copyValue, item.label)}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                  >
                    {copiedItem === item.label ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="hero" size="lg" className="animate-pulse-glow bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-dot tracking-wider shadow-lg border-none" asChild>
                <a href="mailto:vyza.18@gmail.com">SEND EMAIL</a>
              </Button>
              <Button variant="heroOutline" size="lg" className="border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 text-white font-dot tracking-wider" asChild>
                <a href="https://github.com/vyza182-2" target="_blank" rel="noopener noreferrer">GITHUB</a>
              </Button>
              <Button variant="heroOutline" size="lg" className="border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 text-white font-dot tracking-wider" asChild>
                <a href="https://vyzareddy.in/" target="_blank" rel="noopener noreferrer">PORTFOLIO</a>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-2.5">
              {["Machine Learning", "Model Evaluation", "Generative AI", "Data Analytics", "Cross-Functional Collaboration"].map(skill => (
                <span key={skill} className="px-3 py-1.5 text-xs font-mono rounded-full border border-slate-800 text-slate-400 bg-slate-900/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
