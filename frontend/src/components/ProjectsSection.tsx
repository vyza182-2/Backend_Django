import { useEffect, useState } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

type Project = {
  id: string;
  title: string;
  category: string;
  desc: string;
  highlights: string[];
  tags: string[];
  gradient: string;
};

const projects: Project[] = [
  {
    id: "proj-1",
    title: "AI Video Summarizer & Conversational Portal",
    category: "NLP & Generative AI",
    desc: "Developed an AI portal integrating YouTube video analysis, automated summarization, and LLM-based conversational interaction. Extracted and processed video transcripts using NLP & Generative AI techniques to generate summaries, key takeaways, and timestamps, with an LLM-driven chat interface for querying content.",
    highlights: [
      "Extracted transcripts automatically via YouTube API & Whisper STT models.",
      "Engineered prompt templates for multi-step chunked LLM summarization.",
      "Implemented a RAG (Retrieval-Augmented Generation) pipeline for querying video topics.",
      "Built interactive timestamps for direct video section navigation."
    ],
    tags: ["Python", "NLP", "Generative AI", "LLMs", "YouTube API", "Transcript Processing"],
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
  },
  {
    id: "proj-2",
    title: "AI-Powered Voice Calling Agent",
    category: "Speech AI & Telephony",
    desc: "Developed an AI-powered voice calling agent enabling natural real-time conversations using Speech-to-Text (STT), Text-to-Speech (TTS), and LLMs. Implemented LangChain for prompt management and integrated telephony APIs for conversational flow.",
    highlights: [
      "Integrated STT & TTS engines for ultra-low latency bi-directional audio streaming.",
      "Configured LangChain prompt orchestration for dynamic context maintenance.",
      "Connected telephony APIs to automate voice calls and handle inbound inquiries.",
      "Implemented fallback intent detection for robust conversational flows."
    ],
    tags: ["Python", "LangChain", "STT / TTS", "LLMs", "Telephony API", "Conversational AI"],
    gradient: "from-purple-600/20 via-blue-600/10 to-transparent",
  },
  {
    id: "proj-3",
    title: "Android Malware Detection System",
    category: "Machine Learning & Cyber Security",
    desc: "Developed a framework for detecting malware in reverse-engineered Android applications using machine learning algorithms to address mobile security threats. Applied feature extraction and ML classifiers to accurately identify malicious APKs.",
    highlights: [
      "Reverse-engineered Android APKs to extract static intent permissions & API call logs.",
      "Trained Random Forest, SVM, and XGBoost classifiers with Scikit-learn.",
      "Achieved high precision and recall on real-world malware datasets.",
      "Documented feature importance analysis for threat signature detection."
    ],
    tags: ["Python", "Machine Learning", "Scikit-learn", "Android Reverse Eng", "Security"],
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
  },
  {
    id: "proj-4",
    title: "MLOps Deployment Learning Lab",
    category: "AWS & DevOps",
    desc: "A hands-on learning project for packaging a Python ML service, exposing predictions through an API, and understanding repeatable cloud deployment.",
    highlights: [
      "Practiced containerizing a Python inference service with Docker and environment-based configuration.",
      "Explored Git-based CI checks for linting, tests, and build verification.",
      "Mapped an AWS deployment path using IAM, ECR, and compute fundamentals.",
      "Documented monitoring, rollback, and model versioning concepts."
    ],
    tags: ["Python", "AWS", "Docker", "CI/CD", "MLOps", "Model Deployment"],
    gradient: "from-emerald-600/20 via-cyan-600/10 to-transparent",
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [activeProject]);

  return (
    <section id="projects" className="section-padding bg-slate-950/40 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">04. PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-wider font-dot uppercase">
            FEATURED <span className="text-gradient">PROJECTS</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12 text-sm">
            Click on any project card to inspect full system architecture highlights and engineering details.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <div key={p.id} className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}>
              <div
                onClick={() => setActiveProject(p)}
                className="card-pro-hover rounded-2xl p-6 h-full border-slate-800/80 bg-slate-900/40 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold uppercase">
                      {p.category}
                    </span>
                    <span className="text-slate-500 group-hover:text-blue-400 text-xs font-mono transition-colors">
                      Details ↗
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed line-clamp-4">{p.desc}</p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} project details`}
          >
            <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-blue-500/30 bg-slate-900 p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold uppercase">
                    {activeProject.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-dot tracking-wide mt-2">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close project details"
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{activeProject.desc}</p>

              <div>
                <h4 className="text-xs font-dot text-blue-400 font-bold uppercase tracking-wider mb-3">
                  Technical Architecture &amp; Key Highlights
                </h4>
                <ul className="space-y-2">
                  {activeProject.highlights.map((item) => (
                    <li key={item} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-blue-400 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-dot bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
