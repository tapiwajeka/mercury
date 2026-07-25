import { MapPinned, ShieldCheck } from "lucide-react";
import { aboutSections } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Motion";
import AboutHero from "@/components/about/AboutHero";
import ProductRow from "@/components/about/ProductRow";

export const metadata = {
  title: "About Us | Mercury Zimbabwe",
};

// Maps each product section (by title) to its studio image + short label.
const PRODUCT_META = {
  "Mercury Laptops": { image: "/assets/laptops.png", tag: "Laptops" },
  "Mercury Desktops": { image: "/assets/desktop.png", tag: "Desktops" },
  "Mercury Phones": { image: "/assets/phones.png", tag: "Phones" },
  "Mercury Tablets": { image: "/assets/tablet.png", tag: "Tablets" },
};

function BadgeCard({ emblem, title, subtitle }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(199,201,206,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex-shrink-0">{emblem}</div>
      <div className="relative min-w-0">
        <p className="text-sm font-bold text-mercuryWhite leading-tight">
          {title}
        </p>
        <p className="text-xs text-mercuryGray mt-1 leading-snug">{subtitle}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [intro, ...products] = aboutSections;

  return (
    <div className="bg-mercuryBlack">
      <AboutHero />

      {/* ---------- Intro: About Mercury ---------- */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Mercury chevron line-work — descending behind the opening statement */}
        <div
          className="mercury-pattern pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-mercuryAccent/[0.07] blur-[140px] animate-blob"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Who We Are" title={intro.title} />
          <div className="space-y-6">
            {intro.paragraphs.map((p, i) => (
              <FadeIn key={i} delay={i * 0.05} as="div">
                <p
                  className={
                    i === 0
                      ? "text-mercurySilver text-lg sm:text-xl leading-relaxed text-center"
                      : "text-mercuryGray leading-relaxed text-center"
                  }
                >
                  {p}
                </p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2} as="div">
            <div className="mt-12 grid sm:grid-cols-3 gap-4">
              <BadgeCard
                title="Proudly Zimbabwean"
                subtitle="Mercury Technologies"
                emblem={
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-1 ring-inset ring-white/10 bg-white/5 flex items-center justify-center">
                    <MapPinned
                      className="w-6 h-6 text-mercuryWhite relative z-10 -translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 inset-x-0 h-2 flex"
                    >
                      <span className="flex-1 bg-[#009739]" />
                      <span className="flex-1 bg-[#fdd116]" />
                      <span className="flex-1 bg-[#ef3340]" />
                      <span className="flex-1 bg-black" />
                    </span>
                  </div>
                }
              />
              <BadgeCard
                title="OEM"
                subtitle="Original Equipment Manufacturer"
                emblem={
                  <div className="w-14 h-14 rounded-full ring-2 ring-inset ring-mercurySilver/40 bg-white/5 flex items-center justify-center">
                    <span className="font-display text-sm font-bold tracking-wide text-mercurySilver">
                      OEM
                    </span>
                  </div>
                }
              />
              <BadgeCard
                title="Local Assembly & Support"
                subtitle="Assembled &amp; serviced in Zimbabwe"
                emblem={
                  <div className="w-14 h-14 rounded-xl ring-1 ring-inset ring-white/10 bg-white/5 flex items-center justify-center text-mercuryWhite">
                    <ShieldCheck className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
                  </div>
                }
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Lineup ---------- */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Lineup"
            title="The Mercury range."
            subtitle="From pocket to desk — a full family of devices, engineered and finished locally."
          />
          <div className="space-y-24 sm:space-y-32">
            {products.map((section, i) => {
              const meta = PRODUCT_META[section.title] || {};
              return (
                <ProductRow
                  key={section.title}
                  index={i + 1}
                  title={section.title}
                  tag={meta.tag || section.title}
                  image={meta.image}
                  paragraph={section.paragraphs[0]}
                  reverse={i % 2 === 1}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Mercury chevron line-work — rising to close the page */}
        <div
          className="mercury-pattern mercury-pattern--rise pointer-events-none absolute inset-0 opacity-[0.55]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-mercurySilver/[0.06] blur-[130px] animate-blob"
          style={{ animationDelay: "-5s" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn as="div">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-mercuryWhite tracking-tight mb-5">
              Ready to experience Mercury?
            </h2>
            <p className="text-mercuryGray text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Explore the full range or talk to our team about the right device
              for you — from a single laptop to a corporate rollout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/products" variant="primary" size="lg">
                Explore Products
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
