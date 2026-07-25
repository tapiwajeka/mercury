import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { whyChoose } from "@/lib/content";
import { company } from "@/lib/siteConfig";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductStack from "@/components/home/ProductStack";
import WhyMercury from "@/components/home/WhyMercury";
import Hero from "@/components/home/Hero";

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    cta: "Get directions",
    lines: [
      `${company.address.street}, ${company.address.suburb}`,
      `${company.address.city}, ${company.address.country}`,
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    cta: "Start a call",
    href: `tel:${company.phones[0].tel}`,
    lines: [company.phones[0].display],
  },
  {
    icon: Mail,
    title: "Email Us",
    cta: "Send a message",
    href: `mailto:${company.emails.general}`,
    lines: [company.emails.general],
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <Hero />

      {/* ---------- Our Products (scroll-driven card stack — animation untouched) ---------- */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Lineup" title="Our Products." />
          <ProductStack />
        </div>
      </section>

      {/* ---------- Why Choose Mercury ---------- */}
      <section className="relative bg-mercuryDark py-24 sm:py-32 overflow-hidden">
        <div
          className="pointer-events-none absolute top-1/3 -left-24 w-[26rem] h-[26rem] rounded-full bg-mercuryAccent/[0.08] blur-[130px] animate-blob"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Mercury"
            title="Why Choose Mercury?"
            subtitle="Four reasons Mercury devices hold up long after the box is opened."
          />
          <WhyMercury features={whyChoose} />
        </div>
      </section>

      {/* ---------- Let's Talk Technology (contact) ---------- */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Mercury chevron line-work texture */}
        <div
          className="mercury-pattern pointer-events-none absolute inset-0 opacity-[0.55]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-32 left-[10%] w-[28rem] h-[28rem] rounded-full bg-mercuryAccent/10 blur-[120px] animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-[8%] w-[22rem] h-[22rem] rounded-full bg-mercurySilver/[0.06] blur-[110px] animate-blob"
          style={{ animationDelay: "-7s" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Let's Talk Technology."
            subtitle="Whether you're looking for a device, a corporate solution, or simply want to know more — we'd love to hear from you."
          />

          <div className="grid lg:grid-cols-5 gap-5">
            <Stagger className="lg:col-span-3 flex flex-col gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const body = (
                  <div className="flex items-center gap-5 -m-8 p-6 sm:p-7">
                    <div className="relative flex-shrink-0" aria-hidden="true">
                      <span className="absolute inset-0 rounded-2xl border border-mercurySilver/40 animate-ring-pulse" />
                      <div className="relative w-14 h-14 rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10 flex items-center justify-center text-mercurySilver transition-all duration-300 group-hover:bg-mercurySilver/10 group-hover:ring-mercurySilver/30 group-hover:text-mercuryWhite group-hover:-rotate-6 group-hover:scale-105">
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-mercuryWhite mb-1">
                        {card.title}
                      </h3>
                      {card.lines.map((line) => (
                        <p
                          key={line}
                          className="text-mercuryGray text-sm truncate"
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-mercurySilver flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      {card.cta}
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                  </div>
                );
                return (
                  <StaggerItem key={card.title}>
                    <Card as={card.href ? "a" : "div"} href={card.href}>
                      {body}
                    </Card>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <StaggerItem className="lg:col-span-2">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-mercurySurface to-mercuryBlack p-8 sm:p-10 flex flex-col">
                {/* metallic silver top-edge highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
                />
                <div
                  className="absolute inset-0 grid-lines opacity-40"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-3/4 rounded-full bg-mercurySilver/[0.07] blur-3xl"
                />
                <div className="relative flex-1">
                  <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
                    Prefer to talk directly?
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-mercuryWhite mb-4 tracking-tight">
                    Let&apos;s build something reliable.
                  </h3>
                  <p className="text-mercuryGray text-sm leading-relaxed">
                    Our team typically replies within one business day —
                    whether it&apos;s a single device or a corporate rollout.
                  </p>
                </div>

                <div className="relative flex flex-col sm:flex-row lg:flex-col gap-3 mt-8">
                  <Button
                    href={`mailto:${company.emails.general}`}
                    variant="primary"
                    className="w-full"
                  >
                    Email Us
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </Button>
                  <Button
                    href={`tel:${company.phones[0].tel}`}
                    variant="secondary"
                    className="w-full"
                  >
                    Call Us
                  </Button>
                </div>

                <div className="relative flex items-center gap-3 mt-8 pt-8 border-t border-white/[0.06]">
                  <a
                    href={company.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-inset ring-white/10 hover:bg-mercurySilver/10 hover:ring-mercurySilver/30 flex items-center justify-center text-mercuryGray hover:text-mercuryWhite transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                    </svg>
                  </a>
                  <a
                    href={company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-inset ring-white/10 hover:bg-mercurySilver/10 hover:ring-mercurySilver/30 flex items-center justify-center text-mercuryGray hover:text-mercuryWhite transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.6-.07-4.74-.07zm0 2.76a5.46 5.46 0 1 0 0 10.92 5.46 5.46 0 0 0 0-10.92zm0 9a3.54 3.54 0 1 1 0-7.08 3.54 3.54 0 0 1 0 7.08zm5.68-9.22a1.28 1.28 0 1 1-2.56 0 1.28 1.28 0 0 1 2.56 0z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${company.emails.general}`}
                    className="ml-auto text-xs text-mercuryGray hover:text-mercuryWhite transition-colors truncate"
                  >
                    {company.emails.general}
                  </a>
                </div>
              </div>
            </StaggerItem>
          </div>
        </div>
      </section>
    </div>
  );
}
