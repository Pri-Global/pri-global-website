import { useState, useMemo, useEffect } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import { Share2, Mail, ArrowLeft } from "lucide-react";
import {
  newsItems,
  NEWS_CATEGORIES,
  getNewsBySlug,
  sortNewsItems,
} from "../data/news";
import NewsCard from "../components/news/NewsCard";
import NewsPoster from "../components/news/NewsPoster";
import { getNewsThumbnail } from "../utils/newsThumbnail";
import { formatNewsDate } from "../utils/formatNewsDate";
import { renderNewsBody } from "../utils/newsBody";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import CallToAction from "../components/sections/CallToAction";
import PriCaresVideos from "../components/sections/PriCaresVideos";
import { CaseStudiesContent } from "../components/sections/CaseStudies";

const RESOURCE_TABS = ["News", "Case Studies"];

const CATEGORY_STYLES = {
  Community: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
  Product: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25",
  Company: "bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/25",
  Insights: "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/25",
};

function NewsArticle({ article }) {
  const catClass = CATEGORY_STYLES[article.category] || CATEGORY_STYLES.Company;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(article.title);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const emailUrl = `mailto:?subject=${shareTitle}&body=${encodeURIComponent(shareUrl)}`;

  const hasPoster = Boolean(getNewsThumbnail(article));

  return (
    <article className="py-24 md:py-28">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${hasPoster ? "max-w-4xl" : "max-w-3xl"}`}>
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-royal dark:text-royaldark hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Back to News
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${catClass}`}>
            {article.category}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
            {article.tag}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{formatNewsDate(article.date)}</span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-8">
          {article.title}
        </h1>

        {getNewsThumbnail(article) && <NewsPoster item={article} />}

        <div className="prose-custom">{renderNewsBody(article.body)}</div>

        {article.link && (
          <p className="mt-6">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal dark:text-royaldark font-semibold hover:underline"
            >
              Learn more →
            </a>
          </p>
        )}

        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[var(--border)]">
          <span className="text-sm text-[var(--text-muted)]">Share:</span>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-royal hover:border-royal/40 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Share2 size={18} />
          </a>
          <a
            href={emailUrl}
            className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-royal hover:border-royal/40 transition-colors"
            aria-label="Share by email"
          >
            <Mail size={18} />
          </a>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <p className="text-[var(--text-secondary)] mb-4">
            Want to learn more about PRI Global?
          </p>
          <Button to="/about">Get in Touch</Button>
        </div>
      </div>
    </article>
  );
}

function NewsContent() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    const items =
      filter === "All" ? newsItems : newsItems.filter((n) => n.category === filter);
    return sortNewsItems(items);
  }, [filter]);

  const featured = filtered.find((n) => n.featured);
  const rest = filtered.filter((n) => n.id !== featured?.id);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-royal text-white"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--text-secondary)]">No articles in this category yet.</p>
      ) : (
        <div className="space-y-8">
          {featured && (
            <div className="w-full">
              <NewsCard item={featured} featured index={0} />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i + 1} />
            ))}
          </div>
        </div>
      )}

      <PriCaresVideos />
    </>
  );
}

function ResourcesList() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("News");

  useEffect(() => {
    if (location.state?.tab === "Case Studies") {
      setActiveTab("Case Studies");
    }
  }, [location.state]);

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-royal/6 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
              Resources
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              News, case studies, and updates from PRI Global.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {RESOURCE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-royal text-white"
                    : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "News" ? <NewsContent /> : <CaseStudiesContent showCta />}
        </div>
      </section>
    </>
  );
}

export default function Resources() {
  const { slug } = useParams();
  const article = slug ? getNewsBySlug(slug) : null;

  if (slug && !article) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <>
      {article ? (
        <SEO
          title={article.title}
          description={article.excerpt || article.summary || `Read ${article.title} from PRI Global.`}
          url={`/resources/${article.slug}`}
          type="article"
        />
      ) : (
        <SEO
          title="Resources — News, Case Studies & Insights"
          description="PRI Global news, case studies, and technology insights. Learn how we've delivered 600% ROI for automotive manufacturers and real-time analytics for restaurant chains."
          url="/resources"
        />
      )}
      {article ? <NewsArticle article={article} /> : <ResourcesList />}
      {!article && <CallToAction />}
    </>
  );
}
