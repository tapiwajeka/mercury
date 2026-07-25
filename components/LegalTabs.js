"use client";

import { useEffect, useState } from "react";
import { legal } from "@/lib/content";

const TABS = [
  { key: "terms", label: "Terms of Service" },
  { key: "privacy", label: "Privacy Policy" },
  { key: "warranty", label: "Warranty" },
];

export default function LegalTabs() {
  const [active, setActive] = useState("terms");

  // Deep-link support: /legal#privacy selects the matching tab.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (TABS.some((t) => t.key === hash)) setActive(hash);
  }, []);

  const selectTab = (key) => {
    setActive(key);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }
  };

  const doc = legal[active];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => selectTab(t.key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === t.key
                ? "bg-mercurySilver text-mercuryBlack"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-2">
          {TABS.find((t) => t.key === active).label}
        </h2>
        {doc.lastUpdated && (
          <p className="text-sm text-gray-500 mb-8">
            Last updated: {doc.lastUpdated}
          </p>
        )}
        <div className="space-y-8">
          {doc.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-3">
                {section.title}
              </h3>
              {Array.isArray(section.content) ? (
                <ul className="space-y-2">
                  {section.content.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <span className="text-mercurySilver mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
