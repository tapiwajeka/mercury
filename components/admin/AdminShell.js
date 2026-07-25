"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, signOut } from "@/lib/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase";

// Wraps protected admin pages: enforces auth and renders the admin chrome.
export default function AdminShell({ children, title }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isSupabaseConfigured && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (!isSupabaseConfigured) {
    return <ConfigNotice />;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-10 h-10 border-2 border-white/20 border-t-mercurySilver rounded-full animate-spin-slow" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-mercuryBlack/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/assets/logo/mercurylogotext.png"
                alt="Mercury"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-semibold text-white hidden sm:inline">
                Admin
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-1 text-sm">
              <Link
                href="/admin"
                className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/admin/products/new"
                className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                New Product
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {title && (
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

function ConfigNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center bg-white/5 border border-white/10 rounded-2xl p-10">
        <h1 className="text-xl font-bold text-white mb-3">
          Supabase not configured
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Add your <code className="text-mercurySilver">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and{" "}
          <code className="text-mercurySilver">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          to <code className="text-mercurySilver">.env.local</code> and restart
          the dev server to enable the admin dashboard.
        </p>
      </div>
    </div>
  );
}
