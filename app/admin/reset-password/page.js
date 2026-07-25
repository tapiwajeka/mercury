"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sendResetEmail, updatePassword } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [mode, setMode] = useState("request"); // "request" | "update"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Detect arrival from a password-recovery link.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setMode("update");
    }
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => subscription?.unsubscribe();
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/admin/reset-password`
          : undefined;
      await sendResetEmail(email, redirectTo);
      setMessage("Check your email for a password reset link.");
    } catch (err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      await updatePassword(password);
      setMessage("Password updated. Redirecting to login...");
      setTimeout(() => router.replace("/admin/login"), 1500);
    } catch (err) {
      setError(err.message || "Unable to update password.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mercurySilver/50 transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/assets/logo/mercurylogotext.png"
            alt="Mercury"
            width={80}
            height={80}
            className="w-20 h-20 object-contain mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            {mode === "update" ? "Set New Password" : "Reset Password"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {mode === "update"
              ? "Enter a new password for your account"
              : "We'll email you a reset link"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          {message && (
            <p className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          {mode === "update" ? (
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="new-password">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-premium btn-primary w-full disabled:opacity-60"
              >
                {submitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequest} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-premium btn-primary w-full disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center">
            <Link
              href="/admin/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
