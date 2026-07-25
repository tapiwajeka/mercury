import { news } from "@/lib/content";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "News & Updates | Mercury Zimbabwe",
};

export default function NewsPage() {
  const { featured, articles } = news;

  return (
    <div className="bg-mercuryBlack">
      {/* Hero */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-mercurySilver uppercase mb-4">
            Latest Updates
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            News &amp; Updates
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Stay updated with the latest Mercury developments, product
            announcements, and technology insights.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase bg-mercurySilver text-mercuryBlack px-3 py-1 rounded-full">
                {featured.category}
              </span>
              <span className="text-sm text-gray-400">{featured.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {featured.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
              {featured.excerpt}
            </p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-mercurySilver hover:gap-3 transition-all">
              Read Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </article>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <article
                key={a.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-mercurySilver mb-3">
                  {a.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">{a.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{a.date}</span>
                  <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for the latest updates and
              announcements delivered to your inbox.
            </p>
            <NewsletterForm />
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
