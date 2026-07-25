import { company } from "@/lib/siteConfig";
import LegalTabs from "@/components/LegalTabs";

export const metadata = {
  title: "Legal | Mercury Zimbabwe",
};

export default function LegalPage() {
  return (
    <div className="bg-mercuryBlack">
      {/* Hero */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            Legal Documents
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Review our terms of service, privacy policy, and other legal
            information.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LegalTabs />
        </div>
      </section>

      {/* Contact legal */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              If you have any questions about our legal documents, please contact
              our legal team.
            </p>
            <a
              href={`mailto:${company.emails.general}`}
              className="btn-premium btn-primary"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
