import { FormEvent, ReactNode, useEffect, useState } from "react";

type VisitorForm = {
  name: string;
  mobile: string;
  email: string;
  website: string;
};

const initialForm: VisitorForm = {
  name: "",
  mobile: "",
  email: "",
  website: "",
};

const VisitorAccessGate = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState(initialForm);
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsApproved(sessionStorage.getItem("portfolio-access-granted") === "true");
  }, []);

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
          errorData?.error ||
          "Visitor submission failed. Please check the backend connection.";
        throw new Error(errorMessage);
      }

      sessionStorage.setItem("portfolio-access-granted", "true");
      setIsApproved(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't send your details right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isApproved) return <>{children}</>;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12 tech-grid-pattern">
      <section className="w-full max-w-lg card-pro rounded-3xl p-7 sm:p-10 border-cyan-400/20 shadow-2xl">
        <div className="flex items-center justify-between gap-3 mb-8">
          <span className="font-dot text-sm font-bold tracking-[0.16em] text-cyan-300">VSKR<span className="text-amber-400">_</span></span>
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-300 uppercase">Portfolio access</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Welcome to <span className="text-gradient">Vyza's portfolio</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Please share your details to continue. Your information is used only to notify Vyza about portfolio visitors and opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="sr-only">Full name</span>
            <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Full name"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <label className="block">
            <span className="sr-only">Mobile number</span>
            <input
            required
            value={form.mobile}
            onChange={(event) => setForm({ ...form, mobile: event.target.value })}
            placeholder="Mobile number"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Email address"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <input
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {error && <p className="text-sm text-rose-300" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold tracking-wide text-slate-950 transition hover:from-cyan-300 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Opening portfolio..." : "Enter portfolio"}
          </button>
        </form>

        <p className="mt-5 text-[11px] text-slate-500">
          By continuing, you agree that Vyza may receive these contact details for professional communication.
        </p>
      </section>
    </main>
  );
};

export default VisitorAccessGate;
