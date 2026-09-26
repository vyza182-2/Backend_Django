import useScrollReveal from "@/hooks/useScrollReveal";

const experiences = [
  {
    role: "Junior Data Analyst",
    company: "TAO Digital Solutions",
    period: "Aug 2025 - May 2026",
    type: "Contract",
    points: [
      "Analyze and validate structured and unstructured datasets to support AI and Machine Learning projects.",
      "Perform data cleaning, preprocessing, annotation, and rigorous quality assurance to develop high-quality training datasets.",
      "Collaborate with AI engineers to prepare datasets for NLP and Computer Vision applications.",
      "Maintain high data quality through validation and quality control checks.",
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">03. CAREER TRACK</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-wider font-dot uppercase">
            WORK <span className="text-gradient">EXPERIENCE</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-slate-800" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={exp.company} className={`relative pl-12 md:pl-16 reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}>
                <div className="absolute left-2.5 md:left-4.5 top-3 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-slate-950 shadow-md shadow-blue-500/50" />
                <div className="card-pro-hover rounded-2xl p-6 md:p-8 border-slate-800/80 bg-slate-900/40">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                      <p className="text-blue-400 font-mono text-xs mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs rounded-full border border-blue-500/30 text-blue-300 bg-blue-500/10 font-mono">{exp.type}</span>
                      <span className="text-slate-400 text-xs font-mono">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((point) => (
                      <li key={point} className="text-slate-300 text-sm flex gap-3 leading-relaxed">
                        <span className="text-blue-400 mt-1 shrink-0 font-bold">✓</span>{point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
