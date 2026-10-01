import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, RefreshCw, Check, Copy, AlertTriangle, Sparkles, Laugh, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface MemeOtpVerificationProps {
  visitorName?: string;
  onSuccess: () => void;
  onBack: () => void;
}

const DEFAULT_OTP = "910296";

const RESEND_MESSAGES = [
  "📡 Carrier Update: SMS tower still offline! Please use 910296 😂",
  "🕊️ Dispatched carrier pigeon with the code: 910296",
  "📨 Resent OTP via telepathy! (Spoiler: it is still 910296)",
  "⚠️ Telecom cables undergoing maintenance. Just use 910296!",
  "🤖 AI Assistant: I asked the server, it said 'use 910296 bro'",
];

const WRONG_OTP_MESSAGES = [
  "🤦‍♂️ Bro, it literally says 910296 right above the box!",
  "❌ Invalid OTP! Please read line 2 again carefully 😂",
  "🔍 Look 2 inches up... The secret code is 910296!",
  "😅 Why did you guess when the answer was given to you?!",
  "🧠 200 IQ test failed! Hint: Copy 910296",
];

export const MemeOtpVerification: React.FC<MemeOtpVerificationProps> = ({
  visitorName,
  onSuccess,
  onBack,
}) => {
  const [otpInput, setOtpInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [themeMode, setThemeMode] = useState<"classic" | "cyber">("classic");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  const handleValidate = () => {
    const cleaned = otpInput.trim();
    setErrorMsg("");

    if (!cleaned) {
      setErrorMsg("Please enter the OTP shown above.");
      triggerShake();
      return;
    }

    setIsValidating(true);

    setTimeout(() => {
      setIsValidating(false);
      if (cleaned === DEFAULT_OTP) {
        toast.success("Identity Verified! 🎉", {
          description: "SMS failed successfully! Welcome to Vyza's portfolio.",
          duration: 3000,
        });
        onSuccess();
      } else {
        const randomMsg = WRONG_OTP_MESSAGES[Math.floor(Math.random() * WRONG_OTP_MESSAGES.length)];
        setErrorMsg(randomMsg);
        triggerShake();
        toast.error("Invalid OTP", {
          description: `Hint: The OTP is literally ${DEFAULT_OTP}`,
        });
      }
    }, 450);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleResend = () => {
    setIsResending(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsResending(false);
      const msg = RESEND_MESSAGES[resendCount % RESEND_MESSAGES.length];
      setResendCount((prev) => prev + 1);
      toast.info("OTP Resent!", {
        description: msg,
        duration: 4000,
      });
    }, 600);
  };

  const handleAutofill = () => {
    setOtpInput(DEFAULT_OTP);
    setErrorMsg("");
    setCopied(true);
    toast.success("Autofilled 910296! Click VALIDATE to enter.", { duration: 2500 });
    setTimeout(() => setCopied(false), 2000);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleValidate();
    }
  };

  return (
    <div className="w-full max-w-xl transition-all duration-300 animate-in fade-in zoom-in-95">
      {/* Header Bar with Back and Theme switch */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
            Step 2 of 2: Security Verification
          </span>
          <button
            type="button"
            onClick={() => setThemeMode(themeMode === "classic" ? "cyber" : "classic")}
            className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-900/80 text-[11px] font-mono text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition"
          >
            {themeMode === "classic" ? "⚡ Cyber View" : "🖥️ Classic View"}
          </button>
        </div>
      </div>

      {/* Main Container */}
      {themeMode === "classic" ? (
        /* Authentic Meme Light Recreation */
        <div className="relative rounded-2xl bg-[#f8fafc] text-slate-900 p-8 sm:p-12 shadow-2xl border-4 border-slate-300/80 font-sans overflow-hidden">
          {/* Subtle Screen Scanline Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
              backgroundSize: "100% 3px",
            }}
          />

          {/* Top High Security Protection Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[11px] font-mono text-slate-400 ml-2">sms_gateway_v1.0 (Emergency Mode)</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> High Security Protection
            </span>
          </div>

          {/* Heading - Exactly like the Photo */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0288d1] mb-4">
            OTP
          </h1>

          {/* Notification sentence - Exactly like photo */}
          <div className="mb-8">
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              We are facing an SMS issue. Please use{" "}
              <button
                type="button"
                onClick={handleAutofill}
                title="Click to autofill 910296"
                className="font-bold text-slate-900 bg-amber-200/80 hover:bg-amber-300 px-2 py-0.5 rounded border border-amber-300 transition-all cursor-pointer inline-flex items-center gap-1 group shadow-sm"
              >
                <span>910296</span>
                <Copy className="w-3 h-3 text-slate-600 group-hover:scale-110 transition" />
              </button>{" "}
              as your OTP
            </p>
            {visitorName && (
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Authenticating visitor: <strong className="text-slate-700">{visitorName}</strong>
              </p>
            )}
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="otp-input" className="block text-xs sm:text-sm font-bold tracking-wider text-[#d32f2f] uppercase">
                ENTER OTP
              </label>
              <button
                type="button"
                onClick={handleAutofill}
                className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3" />}
                {copied ? "Autofilled!" : "Quick fill code"}
              </button>
            </div>

            <div className={`transition-transform duration-200 ${isShaking ? "animate-bounce" : ""}`}>
              <input
                ref={inputRef}
                id="otp-input"
                type="text"
                maxLength={8}
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value.replace(/[^0-9]/g, ""));
                  if (errorMsg) setErrorMsg("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="910296"
                className="w-full rounded border-2 border-slate-400 bg-white px-4 py-3 text-xl font-mono tracking-widest text-slate-900 outline-none transition focus:border-[#0288d1] focus:ring-2 focus:ring-[#0288d1]/30 shadow-inner"
              />
            </div>

            {errorMsg && (
              <div className="mt-2.5 p-2.5 rounded bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-medium flex items-center gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Action Buttons - Layout mirroring photo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isValidating}
              onClick={handleValidate}
              className={`flex-1 rounded px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all shadow-sm ${
                otpInput.trim() === DEFAULT_OTP
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                  : otpInput.trim().length > 0
                  ? "bg-slate-700 hover:bg-slate-800 text-white"
                  : "bg-[#d8d8d8] hover:bg-[#c8c8c8] text-slate-700 border border-slate-300"
              }`}
            >
              {isValidating ? "Validating..." : "VALIDATE"}
            </button>

            <button
              type="button"
              disabled={isResending}
              onClick={handleResend}
              className="flex-1 sm:flex-initial rounded bg-[#0088cc] hover:bg-[#0077b5] active:bg-[#006699] px-7 py-3 text-sm font-bold tracking-wider text-white uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
              <span>{isResending ? "Sending..." : "RESEND OTP"}</span>
            </button>
          </div>

          {/* Humorous Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Reliable 2FA System
            </span>
            <span className="text-slate-400 italic">
              "Never let SMS outages stop your visitors"
            </span>
          </div>
        </div>
      ) : (
        /* Cyberpunk Dark Mode Recreation */
        <div className="relative rounded-3xl card-pro p-8 sm:p-10 border-cyan-400/30 shadow-2xl text-foreground font-sans overflow-hidden">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <span className="font-dot text-sm font-bold tracking-[0.16em] text-cyan-300">
              VSKR<span className="text-amber-400">_</span>AUTH
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              SMS Gateway Bypass
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-400 mb-2">
            OTP Verification
          </h1>

          <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">NOTICE:</span>
              <span>
                We are currently facing an SMS issue. Please use{" "}
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="font-mono font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 px-2 py-0.5 rounded border border-cyan-500/40 inline-flex items-center gap-1 group transition cursor-pointer"
                >
                  <span>910296</span>
                  <Copy className="w-3 h-3 text-cyan-400 group-hover:scale-110" />
                </button>{" "}
                as your OTP code.
              </span>
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="otp-cyber-input" className="block text-xs font-mono font-bold text-rose-400 tracking-wider uppercase">
                ENTER OTP
              </label>
              <button
                type="button"
                onClick={handleAutofill}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Auto-fill (910296)
              </button>
            </div>

            <div className={isShaking ? "animate-bounce" : ""}>
              <input
                ref={inputRef}
                id="otp-cyber-input"
                type="text"
                maxLength={8}
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value.replace(/[^0-9]/g, ""));
                  if (errorMsg) setErrorMsg("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="910296"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xl font-mono tracking-widest text-cyan-200 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            {errorMsg && (
              <p className="mt-2 text-xs font-mono text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {errorMsg}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={isValidating}
              onClick={handleValidate}
              className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold tracking-wider text-slate-950 uppercase transition hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 shadow-lg shadow-cyan-500/20"
            >
              {isValidating ? "Validating..." : "VALIDATE"}
            </button>

            <button
              type="button"
              disabled={isResending}
              onClick={handleResend}
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 px-6 py-3.5 text-sm font-bold tracking-wider text-cyan-300 uppercase transition flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
              <span>{isResending ? "Resending..." : "RESEND OTP"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeOtpVerification;
