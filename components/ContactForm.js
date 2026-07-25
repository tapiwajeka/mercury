"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { company } from "@/lib/siteConfig";

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Information" },
  { value: "support", label: "Technical Support" },
  { value: "business", label: "Business Partnership" },
  { value: "media", label: "Media Inquiry" },
];

const inputClass = "w-full input-premium";
const labelClass = "block text-sm font-medium text-mercuryGray mb-2";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    const subjectLabel =
      SUBJECTS.find((s) => s.value === form.subject)?.label ||
      "General Inquiry";
    const subject = `Contact Form Submission - ${subjectLabel}`;
    const body = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Subject: ${subjectLabel}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    setStatus("sending");
    window.setTimeout(() => {
      window.location.href = `mailto:${company.emails.general}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 2500);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            placeholder="John"
            value={form.firstName}
            onChange={update("firstName")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            placeholder="Doe"
            value={form.lastName}
            onChange={update("lastName")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          value={form.email}
          onChange={update("email")}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={update("subject")}
          className={inputClass}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value} className="bg-mercuryDark">
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Tell us about your inquiry or how we can help..."
          value={form.message}
          onChange={update("message")}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full group relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryBlack"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-mercurySilver via-mercuryWhite to-mercurySilver bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />
        <span className="relative z-10 text-mercuryBlack flex items-center justify-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Send className="w-5 h-5" strokeWidth={2} />
                Send Message
              </motion.span>
            )}
            {status === "sending" && (
              <motion.span
                key="sending"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="w-4 h-4 rounded-full border-2 border-mercuryBlack/30 border-t-mercuryBlack animate-spin-slow" />
                Sending...
              </motion.span>
            )}
            {status === "sent" && (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" strokeWidth={2.5} />
                Opening your email app...
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </form>
  );
}
