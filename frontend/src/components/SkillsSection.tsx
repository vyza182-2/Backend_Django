import useScrollReveal from "@/hooks/useScrollReveal";

const skillCategories = [
  { 
    title: "Python & Data",
    icon: "💻", 
    skills: ["Python", "SQL", "Pandas", "NumPy", "Jupyter Notebook", "Structured & Unstructured Data Analysis"] 
  },
  { 
    title: "Machine Learning",
    icon: "🧠", 
    skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Model Evaluation", "Feature Engineering", "Data Cleaning", "Data Preprocessing", "Dataset Validation"] 
  },
  { 
    title: "Generative AI",
    icon: "🤖", 
    skills: ["Generative AI", "LLM Evaluation", "Prompt Management", "LangChain", "STT / TTS", "NLP", "Data Visualization"] 
  },
  { 
    title: "AWS & MLOps",
    icon: "🛠️", 
    skills: ["AWS", "Docker", "Linux", "CI/CD", "GitHub Actions", "Model Deployment", "Monitoring", "Terraform Basics"]
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="skills" className="section-padding bg-slate-950/40 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">02. EXPERTISE</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-wider font-dot uppercase">TECHNICAL <span className="text-gradient">SKILLS</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, i) => (
            <div key={category.title} className={`card-pro-hover rounded-2xl p-6 reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">{category.icon}</span>
                <h3 className="text-white font-semibold text-base">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700/60 hover:border-blue-500/50 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
