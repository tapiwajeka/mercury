import Link from "next/link";
import { sustainability as s } from "@/lib/content";

export const metadata = {
  title: "Sustainability | Mercury Zimbabwe",
};

export default function SustainabilityPage() {
  return (
    <div className="bg-mercuryBlack">
      {/* Hero */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-mercurySilver uppercase mb-4">
            {s.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            {s.title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">{s.intro}</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {s.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-3">
                  {pillar.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <ul className="space-y-3">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="py-16 bg-mercuryDark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {s.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-metallic inline-block mb-2">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm tracking-widest text-gray-400 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2030 Goals */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our 2030 Goals
            </h2>
            <p className="text-gray-400">{s.goalsIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {s.goals.map((goal) => (
              <div
                key={goal.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{goal.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {goal.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Partner with us to build a sustainable technology ecosystem in
              Africa. Together, we can make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-premium btn-primary">
                Partner With Us
              </Link>
              <Link href="/about" className="btn-premium btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
