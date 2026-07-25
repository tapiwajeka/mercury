import { faqs } from "@/lib/content";
import { company } from "@/lib/siteConfig";
import { FadeIn } from "@/components/ui/Motion";
import SupportHero from "@/components/support/SupportHero";
import SupportChannels from "@/components/support/SupportChannels";
import SupportJourney from "@/components/support/SupportJourney";
import WarrantyCoverage from "@/components/support/WarrantyCoverage";
import SupportFaq from "@/components/support/SupportFaq";

export const metadata = {
  title: "Support | Mercury Zimbabwe",
  description:
    "Repairs, warranty and after-sales support for Mercury devices — handled locally by trained technicians in Zimbabwe.",
};

const phone = company.phones[0];
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${company.address.street}, ${company.address.suburb}, ${company.address.city}`
  );

export default function SupportPage() {
  return (
    <div className="bg-mercuryDark overflow-hidden">
      <SupportHero phone={phone.display} tel={phone.tel} />

      <SupportChannels
        phone={phone.display}
        tel={phone.tel}
        email={company.emails.general}
        sales={company.emails.sales}
        mapUrl={mapUrl}
      />

      <SupportJourney />

      <WarrantyCoverage />

      {/* FAQ */}
      <SupportFaq
        items={faqs}
        phone={phone.display}
        tel={phone.tel}
        email={company.emails.general}
      />

      {/* Still need help */}
      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-mercurySurface via-mercuryBlack to-mercuryBlack" />
            <div className="absolute inset-0 grid-lines opacity-20" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
            />
            <div aria-hidden="true" className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-56 w-[36rem] rounded-full bg-mercurySilver/[0.06] blur-3xl" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <FadeIn>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-mercuryWhite mb-5">
                  Still need <span className="text-metallic">help?</span>
                </h2>
                <p className="max-w-2xl mx-auto text-mercuryGray text-lg mb-10">
                  Our support team is available Monday through Saturday to assist
                  you with any question or issue — reach out and we&apos;ll take
                  it from there.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="btn-premium btn-primary">
                    Contact Support
                  </a>
                  <a
                    href={`mailto:${company.emails.general}`}
                    className="btn-premium btn-outline"
                  >
                    Email Us
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
