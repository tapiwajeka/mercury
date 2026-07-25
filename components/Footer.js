import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { company, navLinks } from "@/lib/siteConfig";

const legalLinks = [
  { label: "Terms of Service", to: "/legal" },
  { label: "Privacy Policy", to: "/legal#privacy" },
  { label: "Warranty", to: "/legal#warranty" },
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${company.address.street}, ${company.address.suburb}, ${company.address.city}`
  );

function FooterLink({ href, external, children }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="h-px w-0 bg-mercurySilver/70 transition-all duration-300 group-hover:w-4"
      />
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
    </>
  );
  const cls =
    "group inline-flex items-center gap-2 text-sm text-mercuryGray hover:text-mercuryWhite transition-colors";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function ContactRow({ icon: Icon, href, external, label, children }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="group flex items-start gap-3.5"
    >
      <span className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-mercurySurface ring-1 ring-inset ring-white/10 text-mercurySilver transition-all duration-300 group-hover:ring-mercurySilver/30 group-hover:text-mercuryWhite group-hover:-translate-y-0.5">
        <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="text-sm text-mercuryGray leading-relaxed group-hover:text-mercuryWhite transition-colors">
        {children}
      </span>
    </a>
  );
}

const socials = [
  {
    label: "TikTok",
    href: company.socials.tiktok,
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z",
  },
  {
    label: "Instagram",
    href: company.socials.instagram,
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.6-.07-4.74-.07zm0 2.76a5.46 5.46 0 1 0 0 10.92 5.46 5.46 0 0 0 0-10.92zm0 9a3.54 3.54 0 1 1 0-7.08 3.54 3.54 0 0 1 0 7.08zm5.68-9.22a1.28 1.28 0 1 1-2.56 0 1.28 1.28 0 0 1 2.56 0z",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-mercuryDark border-t border-white/[0.06] mt-auto overflow-hidden">
      {/* metallic silver top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/60 to-transparent"
      />
      {/* ambient silver glow + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-56 w-[44rem] rounded-full bg-mercurySilver/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-[0.15]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Mercury — home"
              className="inline-flex items-center group focus-visible:outline-none"
            >
              <Image
                src="/assets/logo/mercurylogotext.png"
                alt="Mercury"
                width={112}
                height={112}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm text-mercuryGray leading-relaxed">
              {company.tagline}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-mercurySurface/60 px-3.5 py-1.5">
              <span className="flex gap-0.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#009739]" />
                <span className="h-2 w-2 rounded-full bg-[#fdd116]" />
                <span className="h-2 w-2 rounded-full bg-[#ef3340]" />
              </span>
              <span className="text-xs font-semibold tracking-[0.15em] text-mercurySilver uppercase">
                Assembled in Zimbabwe
              </span>
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-5">
              Explore
            </h3>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <FooterLink href={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="lg:col-span-2" aria-label="Legal">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-5">
              Legal
            </h3>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-5">
              Get in touch
            </h3>
            <div className="space-y-4">
              <ContactRow icon={MapPin} href={mapUrl} external label="Our location">
                {company.address.street}, {company.address.suburb}
                <br />
                {company.address.city}, {company.address.country}
              </ContactRow>
              <ContactRow
                icon={Phone}
                href={`tel:${company.phones[0].tel}`}
                label="Call us"
              >
                {company.phones[0].display}
              </ContactRow>
              <ContactRow
                icon={Mail}
                href={`mailto:${company.emails.general}`}
                label="Email us"
              >
                {company.emails.general}
              </ContactRow>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-mercurySurface ring-1 ring-inset ring-white/10 text-mercuryGray transition-all duration-300 hover:-translate-y-0.5 hover:text-mercuryWhite hover:ring-mercurySilver/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-mercuryGray">
          <p>
            © 2026 {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs tracking-wide">
            Designed &amp; assembled in Harare, Zimbabwe.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <a
            href="https://www.dataage.co.zw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-mercurySilver/80 transition-colors hover:text-mercuryWhite"
          >
            Website developed by Data Age
          </a>
        </div>
      </div>
    </footer>
  );
}
