import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/siteConfig";
import Button from "@/components/ui/Button";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Mercury Zimbabwe",
  description:
    "Get in touch with Mercury — visit our Harare office, call, email, or send us a message. We typically reply within one business day.",
};

const fullAddress = `${company.address.street}, ${company.address.suburb}, ${company.address.city}, ${company.address.country}`;
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress
)}`;
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  fullAddress
)}&z=15&output=embed`;

const quickContacts = [
  {
    icon: MapPin,
    title: "Visit Us",
    value: `${company.address.street}, ${company.address.suburb}, ${company.address.city}`,
    cta: "Get directions",
    href: mapsSearchUrl,
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    value: company.phones[0].display,
    cta: "Start a call",
    href: `tel:${company.phones[0].tel}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    value: company.emails.general,
    cta: "Send a message",
    href: `mailto:${company.emails.general}`,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-mercuryBlack min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-7rem)] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/bg-contact.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(90deg,rgba(5,8,12,0.85)_0%,rgba(5,8,12,0.65)_38%,rgba(5,8,12,0.28)_70%,rgba(5,8,12,0.06)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack/85 via-mercuryBlack/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mercuryBlack/80 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 left-[15%] w-[26rem] h-[26rem] rounded-full bg-mercurySilver/[0.08] blur-[130px] animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-mercurySilver/[0.06] blur-[110px] animate-blob"
          style={{ animationDelay: "-6s" }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left py-20 sm:py-24 lg:py-28">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-3.5 py-1.5 mr-auto">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mercurySilver/60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mercurySilver" />
              </span>
              <span className="text-xs font-semibold tracking-[0.18em] text-mercuryWhite uppercase">
                We reply within a business day
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[0.95]">
              <span className="block text-mercuryWhite drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">Let&apos;s start a </span>
              <span className="block text-metallic drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">conversation.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl mr-auto text-mercurySilver text-lg leading-relaxed">
              Ready to learn more about Mercury products or need support? Our
              team is here to help — reach out however suits you best.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Quick contact row ---------- */}
      <section className="relative -mt-14 sm:-mt-16 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid sm:grid-cols-3 gap-5">
            {quickContacts.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.title}>
                  <SpotlightCard
                    as="a"
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="h-full"
                  >
                    <div className="relative z-10 flex flex-col items-center p-7 text-center">
                      <div className="relative mb-5" aria-hidden="true">
                        <span className="absolute inset-0 rounded-2xl border border-mercurySilver/30 animate-ring-pulse" />
                        <div className="relative w-14 h-14 rounded-2xl bg-white/[0.05] ring-1 ring-inset ring-white/10 flex items-center justify-center text-mercurySilver transition-all duration-300 group-hover:bg-white/[0.1] group-hover:ring-mercurySilver/30 group-hover:text-mercuryWhite group-hover:-rotate-6 group-hover:scale-105">
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-mercuryWhite mb-1.5">
                        {c.title}
                      </h3>
                      <p className="text-mercuryGray text-sm mb-4 break-words">
                        {c.value}
                      </p>
                      <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-mercurySilver transition-all duration-300 group-hover:text-mercuryWhite group-hover:gap-2.5">
                        {c.cta}
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------- Form + sidebar ---------- */}
      <section className="relative pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Form */}
            <FadeIn className="lg:col-span-3" as="div">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface/60 p-8 sm:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
                />
                <h2 className="font-display text-2xl font-bold text-mercuryWhite mb-2">
                  Send us a message
                </h2>
                <p className="text-mercuryGray mb-8">
                  Fill out the form and we&apos;ll get back to you within one
                  business day.
                </p>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.1} className="lg:col-span-2" as="div">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-mercurySurface to-mercuryBlack p-8 sm:p-10 flex flex-col">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
                />
                <div
                  className="absolute inset-0 grid-lines opacity-40"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
                    Business Hours
                  </p>
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 ring-1 ring-inset ring-white/10 flex items-center justify-center text-mercurySilver">
                      <Clock className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <dl className="text-sm space-y-1.5 flex-1">
                      <div className="flex justify-between gap-6">
                        <dt className="text-mercuryGray">Mon &ndash; Fri</dt>
                        <dd className="text-mercuryWhite font-medium">
                          8:00 &ndash; 17:00
                        </dd>
                      </div>
                      <div className="flex justify-between gap-6">
                        <dt className="text-mercuryGray">Saturday</dt>
                        <dd className="text-mercuryWhite font-medium">
                          9:00 &ndash; 13:00
                        </dd>
                      </div>
                      <div className="flex justify-between gap-6">
                        <dt className="text-mercuryGray">Sunday</dt>
                        <dd className="text-mercuryWhite font-medium">Closed</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="h-px bg-white/[0.06] mb-8" />

                  <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
                    Our Office
                  </p>
                  <address className="not-italic text-sm text-mercuryGray leading-relaxed mb-8">
                    {company.address.street}, {company.address.suburb}
                    <br />
                    {company.address.city}, {company.address.country}
                  </address>

                  <div className="h-px bg-white/[0.06] mb-8" />

                  <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
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
                  </div>
                </div>

                <div className="relative mt-auto pt-8">
                  <Button
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="w-full"
                  >
                    Get Directions
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ---------- Live map ---------- */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] h-[360px] sm:h-[460px]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
              />
              {/* Dark-themed embed; reveals full colour on hover */}
              <iframe
                title="Mercury office location"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.4] transition-[filter] duration-500 [filter:invert(0.9)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)] group-hover:[filter:none]"
              />
              {/* Floating address card */}
              <div className="pointer-events-none absolute inset-0 flex items-end p-5 sm:p-8">
                <div className="pointer-events-auto max-w-sm rounded-2xl border border-white/10 bg-mercuryBlack/80 backdrop-blur-md p-6">
                  <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-3">
                    Find us
                  </p>
                  <h3 className="text-lg font-bold text-mercuryWhite mb-1.5">
                    Mercury {company.address.city}
                  </h3>
                  <address className="not-italic text-sm text-mercuryGray leading-relaxed mb-4">
                    {company.address.street}, {company.address.suburb}
                    <br />
                    {company.address.city}, {company.address.country}
                  </address>
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-mercuryWhite"
                  >
                    <span className="border-b border-transparent pb-0.5 transition-colors group-hover/link:border-mercurySilver/60">
                      Open in Google Maps
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
