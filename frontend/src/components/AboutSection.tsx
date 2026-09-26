import useScrollReveal from "@/hooks/useScrollReveal";

const stats = [
  { number: "AI/ML", label: "Engineering Focus" },
  { number: "AWS", label: "Cloud & DevOps" },
  { number: "5+", label: "Certifications" },
  { number: "Python", label: "Primary Language" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">01. OVERVIEW</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-wider font-dot uppercase">
            ABOUT <span className="text-gradient">ME</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <div className={`md:col-span-3 reveal ${isVisible ? "visible" : ""} reveal-delay-1`}>
            <div className="card-pro rounded-2xl p-8 border-slate-800/80 bg-slate-900/50">
              <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                I am a <span className="text-white font-semibold">fresher AI/ML Engineer</span> focused on building useful machine learning products with <span className="text-white font-semibold">Python, AWS, MLOps, SQL, and Generative AI</span>.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                My strength is connecting the full path from <span className="text-white font-semibold">clean data and reliable experiments to deployment</span>. I am actively developing my AWS and DevOps skills across Linux, Git, Docker, CI/CD, cloud services, and model monitoring.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                I am looking for an entry-level role where I can learn fast, contribute to production-minded teams, and grow into an AI/ML or MLOps engineer.
              </p>
              
              <div className="border-t border-slate-800/80 pt-5 mt-5 grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider block mb-1">Current Focus</span>
                  <p className="text-slate-300">AWS, Docker, CI/CD, Model Deployment</p>
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider block mb-1">What I Bring</span>
                  <p className="text-slate-300">Curiosity, ownership, consistent learning</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {["Python", "AWS", "MLOps", "Docker", "Generative AI", "Git & CI/CD"].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full border border-blue-500/20 text-blue-300 bg-blue-500/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`md:col-span-2 reveal ${isVisible ? "visible" : ""} reveal-delay-2`}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((stat) => (
                <div key={stat.label} className="card-pro-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-900/40">
                  <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-2">{stat.number}</p>
                  <p className="text-slate-400 text-xs font-mono">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
