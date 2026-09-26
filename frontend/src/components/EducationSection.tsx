import useScrollReveal from "@/hooks/useScrollReveal";

const educationList = [
  {
    degree: "B.Tech | Artificial Intelligence And Machine Learning",
    institution: "CMR Technical Campus, Hyderabad",
    period: "2020 – 2024",
    grade: "Grade: 6.88 / 10",
    details: "College Project: Developed a malware detection framework for reverse engineered Android applications using machine learning algorithms.",
  },
  {
    degree: "12th Standard",
    institution: "Telangana Board (English Medium)",
    period: "2018 – 2020",
    grade: "Marks: 71%",
    details: "Focus on Mathematics, Physics, and Computer Science.",
  },
  {
    degree: "10th Standard",
    institution: "Telangana Board (English Medium)",
    period: "2018",
    grade: "Marks: 80%",
    details: "Foundational education in English medium.",
  },
];

const certifications = [
  {
    title: "Agentic AI Foundations Associate (1Z0-1157-26)",
    issuer: "Oracle",
    badge: "Agentic AI",
  },
  {
    title: "Oracle Cloud Infrastructure 2024 AI Foundations Associate",
    issuer: "Oracle",
    badge: "AI & Cloud",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    badge: "Data Analytics",
  },
  {
    title: "SQL for Data Analysis",
    issuer: "Data Science & Analytics",
    badge: "Database & SQL",
  },
  {
    title: "Python for Data Science & Machine Learning",
    issuer: "AI / ML Specialization",
    badge: "Python & ML",
  },
  {
    title: "Git & GitHub Version Control",
    issuer: "Software Development",
    badge: "Dev Tools",
  },
];

const EducationSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="section-padding relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Education Sub-section */}
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">06. QUALIFICATIONS</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-wider font-dot uppercase">
            EDUCATION &amp; <span className="text-gradient">CERTIFICATIONS</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Education Timeline */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-white">
              <span className="text-blue-400">🎓</span> Education History
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {educationList.map((edu, i) => (
                <div
                  key={edu.degree}
                  className={`card-pro-hover rounded-2xl p-6 flex flex-col justify-between border-slate-800/80 bg-slate-900/40 reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">{edu.degree}</h4>
                    <p className="text-blue-400 font-mono text-xs mb-3">{edu.institution}</p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">{edu.details}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="px-2.5 py-0.5 text-[11px] rounded-full border border-slate-700/60 text-slate-400 font-mono">
                      {edu.period}
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] rounded-full border border-blue-500/30 text-blue-300 bg-blue-500/10 font-mono font-semibold">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-white">
              <span className="text-blue-400">📜</span> Professional Certifications
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`card-pro-hover rounded-xl p-5 border border-slate-800/80 bg-slate-900/40 hover:border-blue-500/40 transition-all reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
                      {cert.badge}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400 shrink-0">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug mb-1">{cert.title}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
