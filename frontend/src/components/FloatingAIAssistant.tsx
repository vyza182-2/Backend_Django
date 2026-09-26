import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

type Message = {
  id: string;
  sender: "user" | "ai";
  title?: string;
  text: string;
  action?: { label: string; href: string };
  photo?: boolean;
};

const quickPills = [
  "What are Shiva's skills?",
  "Tell me about Shiva's experience",
  "Show top projects",
  "Send me Shiva's resume",
];

const generateMiniResponse = (q: string): Omit<Message, "id" | "sender"> => {
  const query = q.toLowerCase();
  if (query.includes("photo") || query.includes("picture") || query.includes("image")) {
    return {
      title: "Profile Photo",
      text: "Here is Vyza Shiva Kumar Reddy, a fresher AI/ML Engineer based in Hyderabad focused on Python, AWS, MLOps, and Generative AI.",
      photo: true,
      action: { label: "Go to top", href: "#home" }
    };
  }
  if (query.includes("skill") || query.includes("python") || query.includes("sql") || query.includes("tech")) {
    return {
      title: "Technical Skills",
      text: "Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, Model Evaluation, Generative AI, LangChain, STT/TTS, and Git.",
      action: { label: "View Skills", href: "#skills" }
    };
  }
  if (query.includes("experience") || query.includes("work") || query.includes("job")) {
    return {
      title: "Work Experience",
      text: "Early-career experience evaluating model outputs, validating dataset pipelines for LLMs, and building Python, Docker, AWS, and CI/CD fundamentals.",
      action: { label: "View Experience", href: "#experience" }
    };
  }
  if (query.includes("project") || query.includes("built") || query.includes("app")) {
    return {
      title: "Projects",
      text: "1. AI Video Summarizer & Chat Portal\n2. AI Voice Calling Agent\n3. Android Malware Detection System",
      action: { label: "View Projects", href: "#projects" }
    };
  }
  if (query.includes("resume") || query.includes("cv") || query.includes("curriculum")) {
    return {
      title: "Latest Resume",
      text: "Absolutely — here is my latest resume with my Junior Data Analyst experience, AI/ML projects, Python skills, and AWS & MLOps learning journey.\n\nFor opportunities or hiring discussions, feel free to contact me directly.",
      action: { label: "View Resume", href: "https://docs.google.com/document/d/11_9UII4rn396nlSORc9rU6TNAXm4M8Bw/edit" }
    };
  }
  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("reach")) {
    return {
      title: "Contact Details",
      text: "Phone: +91 8187032002\nEmail: vyza.18@gmail.com\nLocation: Hyderabad, India",
      action: { label: "View Contact Section", href: "#contact" }
    };
  }
  return {
    title: "Lollipop AI Assistant",
    text: "Ask me about Shiva's skills, Junior Data Analyst experience, AI projects, certifications, or contact info!",
  };
};

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      title: "🤖 Lollipop AI Assistant",
      text: "Hi! Need quick info about Shiva? Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text = input) => {
    const clean = text.trim();
    if (!clean || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: clean
    };

    setMessages((prev) => [...prev, userMsg]);
    if (text === input) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateMiniResponse(clean);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", ...resp }]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Drawer Popover */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-dot text-xs text-blue-300 tracking-wider">LOLLIPOP AI ASSISTANT</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-lg font-bold px-1"
            >
              ✕
            </button>
          </div>

          {/* Chat area */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 font-sans text-xs bg-slate-950/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "ai" && <div className="text-sm">🤖</div>}
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                  }`}
                >
                  {m.title && <div className="font-dot font-bold text-blue-400 mb-1">{m.title}</div>}
                  <p className="whitespace-pre-line">{m.text}</p>
                  {m.photo && (
                    <img src={profilePhoto} alt="Shiva" className="mt-2 h-28 w-24 rounded-lg object-cover border border-blue-500/30" />
                  )}
                  {m.action && (
                    <a
                      href={m.action.href}
                      target={m.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="inline-block mt-2 font-mono text-[11px] text-blue-400 hover:underline"
                    >
                      {m.action.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-[11px] font-mono text-blue-400 flex items-center gap-1">
                <span>🤖 Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick pills */}
          <div className="px-3 py-2 border-t border-slate-800 bg-slate-900/40 flex flex-wrap gap-1">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSend(pill)}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-300"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Lollipop AI..."
              className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
            />
            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 border-none">
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl border border-blue-400/30 transition-all duration-300 hover:scale-105"
        aria-label="Open Lollipop AI Assistant"
      >
        <span className="text-lg">🤖</span>
        <span className="font-dot text-xs tracking-wider hidden sm:inline-block">ASK LOLLIPOP AI</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </button>
    </div>
  );
};

export default FloatingAIAssistant;
