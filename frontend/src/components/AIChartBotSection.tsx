import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useScrollReveal from "@/hooks/useScrollReveal";
import profilePhoto from "@/assets/profile-photo.jpg";

type Message = {
  id: string;
  sender: "user" | "ai";
  title?: string;
  text: string;
  timestamp: string;
  action?: { label: string; href: string };
  photo?: boolean;
  tags?: string[];
};

const categoryPills = [
  { label: "💡 Overview", query: "Tell me about Shiva's background" },
  { label: "🧠 ML & Tech Stack", query: "What technical skills does Shiva have?" },
  { label: "💼 Work Experience", query: "Explain Shiva's work experience" },
  { label: "🚀 Projects", query: "Show me Shiva's top AI projects" },
  { label: "🎓 Certifications", query: "What certifications does Shiva hold?" },
  { label: "📸 Profile Photo", query: "Show Shiva's profile photo" },
  { label: "📄 Request Resume", query: "Please send me Shiva's updated resume" },
];

const generateResponse = (question: string): Omit<Message, "id" | "sender" | "timestamp"> => {
  const q = question.toLowerCase();
  
  if (q.includes("photo") || q.includes("image") || q.includes("picture") || q.includes("look like")) {
    return {
      title: "Shiva's Professional Profile",
      text: "Here is Vyza Shiva Kumar Reddy, a fresher AI/ML Engineer based in Hyderabad, India focused on Python, machine learning, Generative AI, AWS, and MLOps fundamentals.",
      photo: true,
      action: { label: "View Hero Section", href: "#home" },
      tags: ["Hyderabad, India", "AI/ML Engineer", "AWS + MLOps"]
    };
  }

  if (q.includes("summary") || q.includes("about") || q.includes("who is") || q.includes("who's") || q.includes("background") || q.includes("bio")) {
    return {
      title: "Professional Summary",
      text: "Vyza Shiva Kumar Reddy is a fresher AI/ML Engineer proficient in Machine Learning, Python, SQL, Generative AI, AWS, and DevOps fundamentals. He enjoys building practical, deployable machine learning workflows.",
      action: { label: "Explore Overview", href: "#about" },
      tags: ["AI/ML Engineering", "Data Preprocessing", "Model QA"]
    };
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("python") || q.includes("sql") || q.includes("language")) {
    return {
      title: "Technical Skills & Competencies",
      text: "Shiva's technical stack includes:\n• Languages & Libraries: Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch\n• AI/ML Domain: Model Evaluation, Feature Engineering, Data Cleaning, Dataset Validation, NLP, Generative AI\n• LLM & Tools: LLM Evaluation, LangChain, STT/TTS, Git, GitHub, Jupyter Notebook, VS Code.",
      action: { label: "View Technical Skills", href: "#skills" },
      tags: ["Python", "SQL", "Scikit-learn", "Generative AI", "LangChain"]
    };
  }

  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("career") || q.includes("role")) {
    return {
      title: "1 Year Work Experience Highlights",
      text: "Shiva is building an early-career foundation in AI/ML & cloud engineering:\n1. Model Quality: Evaluates AI/ML outputs and documents improvement opportunities.\n2. Data Workflows: Prepares structured and unstructured data for LLM, NLP, and vision applications.\n3. Engineering Practice: Uses Python, SQL, Git, Docker, and CI/CD fundamentals.\n4. Cloud Direction: Growing toward AWS-based model deployment and MLOps.",
      action: { label: "View Experience", href: "#experience" },
      tags: ["Model Evaluation", "LLM Validation", "Git Workflows"]
    };
  }

  if (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("app") || q.includes("summarizer")) {
    return {
      title: "Featured AI Projects",
      text: "Shiva has engineered 3 major projects:\n1. 🎥 AI Video Summarizer: YouTube transcript processing, automated summarization, and LLM chat portal.\n2. 🎙️ AI Voice Calling Agent: Real-time conversational agent using STT, TTS, LangChain & LLMs.\n3. 🛡️ Android Malware Detection: Reverse-engineering APK analysis using ML classification models.",
      action: { label: "View Featured Projects", href: "#projects" },
      tags: ["AI Video Portal", "Voice Agent", "Malware Detection"]
    };
  }

  if (q.includes("education") || q.includes("college") || q.includes("certif") || q.includes("degree") || q.includes("oracle") || q.includes("google")) {
    return {
      title: "Education & 6 Professional Certifications",
      text: "Academic Background:\n• B.Tech in AI & ML from CMR Technical Campus (2020–2024, Grade: 6.88/10)\n\nCertifications:\n1. Agentic AI Foundations Associate (1Z0-1157-26) - Oracle\n2. Oracle Cloud Infrastructure 2024 AI Foundations Associate\n3. Google Data Analytics Professional Certificate\n4. SQL for Data Analysis\n5. Python for Data Science & Machine Learning\n6. Git & GitHub Version Control",
      action: { label: "View Certifications", href: "#education" },
      tags: ["B.Tech AI/ML", "Agentic AI", "Oracle Certified"]
    };
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("curriculum")) {
    return {
      title: "Latest Resume",
      text: "Absolutely — here is my latest resume with my Junior Data Analyst experience, AI/ML projects, Python skills, and AWS & MLOps learning journey.\n\nFor opportunities or hiring discussions, feel free to contact me directly.",
      action: { label: "View Resume", href: "https://docs.google.com/document/d/11_9UII4rn396nlSORc9rU6TNAXm4M8Bw/edit" },
      tags: ["Junior Data Analyst", "AI/ML", "AWS & MLOps"]
    };
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    return {
      title: "Direct Contact Information",
      text: "Reach out to Shiva directly:\n• Phone: +91 8187032002\n• Email: vyza.18@gmail.com\n• Location: Hyderabad, India\n• GitHub: github.com/vyza182-2\n• Portfolio: vyzareddy.in",
      action: { label: "Get In Touch", href: "#contact" },
      tags: ["+91 8187032002", "vyza.18@gmail.com", "Hyderabad"]
    };
  }

  return {
    title: "Lollipop AI Portfolio Knowledge Assistant",
    text: "I am Shiva's custom AI Assistant trained on his portfolio. You can ask me about his technical skills, Junior Data Analyst experience, AI projects, education, certifications, or how to contact him!",
    tags: ["AI Assistant", "Portfolio Trained"]
  };
};

const initialMessages: Message[] = [
  {
    id: "welcome-msg",
    sender: "ai",
    title: "🤖 Lollipop AI Assistant Active",
    text: "Hello! I am Lollipop AI, Shiva's interactive portfolio assistant. Ask me anything about Shiva's Junior Data Analyst experience, technical skills, Generative AI projects, or certifications!",
    timestamp: "Just now",
    tags: ["Online", "v2.5 Trained"]
  }
];

const AIChartBotSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (queryToSend = inputQuery) => {
    const clean = queryToSend.trim();
    if (!clean || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: clean,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (queryToSend === inputQuery) setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const respData = generateResponse(clean);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        ...respData,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <section id="chart-bot" className="section-padding relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="flex justify-center mb-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-dot text-blue-300 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LOLLIPOP AI • LIVE PORTFOLIO INTELLIGENCE
            </span>
          </div>
          <p className="font-dot text-xs text-blue-400 text-center mb-2 tracking-widest uppercase">05. AI ASSISTANT</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-wider font-dot uppercase">
            PORTFOLIO <span className="text-gradient">ASSISTANT</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-10 text-sm">
            Ask questions directly to Lollipop AI for instant insights into Shiva's experience, technical capabilities, and project portfolio.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto card-pro rounded-2xl border-slate-800/90 bg-slate-950/70 shadow-2xl overflow-hidden reveal ${isVisible ? "visible" : ""} reveal-delay-1`}>
          {/* Chat Window Header */}
          <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-dot text-xs shadow-md">
                🤖
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-dot tracking-wider">LOLLIPOP AI AGENT</h3>
                <p className="text-[11px] text-blue-400 font-mono">Trained on Shiva's Resume &amp; Portfolio</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="px-3 py-1.5 text-[11px] font-mono rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                title="Reset conversation"
              >
                Clear Chat
              </button>
            </div>
          </div>

          {/* Chat Message Stream */}
          <div
            ref={chatContainerRef}
            className="p-6 h-[380px] overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-950 bg-slate-950/40"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm shrink-0 mt-1">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-lg font-sans"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                  }`}
                >
                  {msg.title && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                      <h4 className="font-bold text-blue-300 font-dot tracking-wide text-xs uppercase">{msg.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                  )}

                  <p className="whitespace-pre-line text-sm">{msg.text}</p>

                  {msg.photo && (
                    <div className="mt-4 relative inline-block group">
                      <img
                        src={profilePhoto}
                        alt="Vyza Shiva Kumar Reddy"
                        className="h-44 w-36 rounded-xl border-2 border-blue-500/40 object-cover shadow-xl transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}

                  {msg.tags && msg.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/60">
                      {msg.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.sender === "ai" && (
                    <div className="mt-3 flex items-center justify-between gap-3 pt-2 border-t border-slate-800/40">
                      {msg.action ? (
                        <a
                          href={msg.action.href}
                          target={msg.action.href.startsWith("http") ? "_blank" : undefined}
                          rel={msg.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors font-mono"
                        >
                          {msg.action.label} →
                        </a>
                      ) : <div />}

                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="text-[11px] font-mono text-slate-400 hover:text-blue-300 transition-colors"
                      >
                        {copiedId === msg.id ? "✓ Copied!" : "📋 Copy"}
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs text-white font-mono shrink-0 mt-1">
                    YOU
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm shrink-0">
                  🤖
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs font-mono text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  Lollipop AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Quick Query Category Suggestions */}
          <div className="px-6 py-3 border-t border-b border-slate-800/80 bg-slate-900/30">
            <p className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">Suggested Queries:</p>
            <div className="flex flex-wrap gap-2">
              {categoryPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handleSend(pill.query)}
                  className="rounded-full border border-blue-500/20 bg-slate-900 px-3 py-1 text-xs font-mono text-blue-300 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-sm"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-900/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <input
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Lollipop AI e.g. What projects has Shiva built?"
                className="flex-1 rounded-xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500 font-sans placeholder:text-slate-500"
              />
              <Button
                type="submit"
                disabled={isTyping || !inputQuery.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white font-dot tracking-wider px-6 py-3 rounded-xl shadow-lg border-none disabled:opacity-50"
              >
                ASK AI ↵
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChartBotSection;
