import { FormEvent, ReactNode, useEffect, useState } from "react";
import MemeOtpVerification from "./MemeOtpVerification";
import {
  Sparkles,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

type VisitorForm = {
  name: string;
  mobile: string;
  email: string;
  website: string;
  purpose: string;
  agreedToTerms: boolean;
};

const initialForm: VisitorForm = {
  name: "",
  mobile: "",
  email: "",
  website: "",
  purpose: "Opportunity / Hiring",
  agreedToTerms: true,
};

const DEMO_PROFILES = [
  {
    name: "Alex Carter",
    mobile: "+1 5553000000",
    email: "alex.carter@techventures.io",
    purpose: "Opportunity / Hiring",
  },
  {
    name: "Elena Rostova",
    mobile: "+91 9876543210",
    email: "elena@cloudscale.dev",
    purpose: "Opportunity / Hiring",
  },
  {
    name: "David Kim",
    mobile: "+91 9123456780",
    email: "david.kim@innovate.co",
    purpose: "Networking & Chat",
  },
];

const PURPOSES = [
  { label: "💼 Opportunity / Hiring", value: "Opportunity / Hiring" },
  { label: "🤝 Project Collaboration", value: "Project Collaboration" },
  { label: "💬 Networking & Chat", value: "Networking & Chat" },
  { label: "🔍 Exploring Portfolio", value: "Exploring Portfolio" },
];

const VisitorAccessGate = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState(initialForm);
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"details" | "security-otp">("details");

  useEffect(() => {
    setIsApproved(sessionStorage.getItem("portfolio-access-granted") === "true");
  }, []);

  const handleDemoFill = () => {
    const randomProfile =
      DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
    setForm({
      ...form,
      name: randomProfile.name,
      mobile: randomProfile.mobile,
      email: randomProfile.email,
      purpose: randomProfile.purpose,
    });
    setError("");
    toast.success(`Filled demo data for ${randomProfile.name}`, {
      description: "Click 'Continue to Security Verification' to proceed.",
      duration: 3000,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[+0-9][0-9\s()-]{7,19}$/.test(form.mobile.trim())) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          website: form.website,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.detail ||
          errorData?.name?.[0] ||
          errorData?.full_name?.[0] ||
          errorData?.email?.[0] ||
          errorData?.mobile?.[0] ||
          errorData?.error;

        if (errorMessage) {
          throw new Error(errorMessage);
        }
      }

      // Transition to Step 2: High Security OTP check!
      setStep("security-otp");
    } catch (submissionError) {
      // If backend network error during dev/mock, let the user enjoy the flow
      if (
        submissionError instanceof TypeError &&
        submissionError.message.includes("fetch")
      ) {
        setStep("security-otp");
      } else {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "We couldn't transmit your details right now. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSuccess = () => {
    sessionStorage.setItem("portfolio-access-granted", "true");
    setIsApproved(true);
  };

  if (isApproved) return <>{children}</>;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 sm:px-6 py-10 tech-grid-pattern relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Soft Glow Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {step === "security-otp" ? (
        <MemeOtpVerification
          visitorName={form.name}
          onSuccess={handleVerificationSuccess}
          onBack={() => setStep("details")}
        />
      ) : (
        <section className="w-full max-w-xl card-pro rounded-3xl p-6 sm:p-10 border border-cyan-400/20 shadow-2xl relative z-10 animate-in fade-in zoom-in-95">
          {/* Top Status Header */}
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="font-dot text-sm font-bold tracking-[0.16em] text-cyan-300">
                VSKR<span className="text-amber-400">_</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.18em] text-cyan-300 uppercase bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              PORTFOLIO ACCESS
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Welcome to <span className="text-gradient">Vyza's portfolio</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Please share your details to continue. Your information is used only to notify Vyza about portfolio visitors and opportunities.
            </p>
          </div>

          {/* Quick Demo Autofill Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 mb-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick fill for testing:</span>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 px-3 py-1 rounded-lg border border-cyan-500/40 transition flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Quick Fill Demo
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name *</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="e.g. John Doe"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mobile Number *</span>
              </label>
              <input
                required
                value={form.mobile}
                onChange={(event) => setForm({ ...form, mobile: event.target.value })}
                placeholder="e.g. +91 98765 43210"
                type="tel"
                autoComplete="tel"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address *</span>
              </label>
              <input
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="e.g. contact@example.com"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
              />
            </div>

            {/* Visit Purpose Chips */}
            <div>
              <span className="block text-xs font-mono text-slate-400 font-semibold mb-2">
                Purpose of Visit
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PURPOSES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setForm({ ...form, purpose: item.value })}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition border text-left flex items-center justify-between ${
                      form.purpose === item.value
                        ? "bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-sm"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    {form.purpose === item.value && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Honey-pot website field for bot protection */}
            <input
              value={form.website}
              onChange={(event) => setForm({ ...form, website: event.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.agreedToTerms}
                  onChange={(e) =>
                    setForm({ ...form, agreedToTerms: e.target.checked })
                  }
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
                <span className="text-xs text-slate-400 leading-snug">
                  I agree that Vyza may receive these contact details for professional communication.
                </span>
              </label>
            </div>

            {/* Error Message with Shake */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-xs sm:text-sm text-rose-300 font-mono animate-in fade-in flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold tracking-wide text-slate-950 transition hover:from-cyan-300 hover:to-blue-400 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Validating details...</span>
              ) : (
                <>
                  <span>Continue to Security Verification (Step 2/2)</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Your information is kept secure and used solely for direct communication with Vyza.
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default VisitorAccessGate;



