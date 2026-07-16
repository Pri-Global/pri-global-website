import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Share2, Mail, Clock } from "lucide-react";
import NewsPoster from "./NewsPoster";
import { getNewsThumbnail } from "../../utils/newsThumbnail";
import { formatNewsDate } from "../../utils/formatNewsDate";
import { renderNewsBody, estimateReadMinutes } from "../../utils/newsBody";
import { newsItems } from "../../data/news";
import Breadcrumbs from "../ui/Breadcrumbs";
import Button from "../ui/Button";
import { scrollToPageTop } from "../../utils/scrollToPageTop";

const CATEGORY_BADGE = {
  Community: "bg-emerald-400/20 text-emerald-100 border-emerald-400/30",
  Product: "bg-sky-400/20 text-sky-100 border-sky-400/30",
  Company: "bg-amber-400/20 text-amber-100 border-amber-400/30",
  Insights: "bg-violet-400/20 text-violet-100 border-violet-400/30",
};

function ArticleLink({ href, children }) {
  if (href?.startsWith("/")) {
    return (
      <Link to={href} className="text-royal dark:text-royaldark font-semibold hover:underline">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-royal dark:text-royaldark font-semibold hover:underline"
    >
      {children}
    </a>
  );
}

export default function NewsArticlePage({ article }) {
  const badgeClass = CATEGORY_BADGE[article.category] || CATEGORY_BADGE.Company;
  const readMinutes = estimateReadMinutes(article.body);
  const hasPoster = Boolean(getNewsThumbnail(article));
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(article.title);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const emailUrl = `mailto:?subject=${shareTitle}&body=${encodeURIComponent(shareUrl)}`;

  const related = useMemo(
    () =>
      newsItems
        .filter((n) => n.id !== article.id && n.category === article.category)
        .slice(0, 3),
    [article.id, article.category]
  );

  useEffect(() => {
    scrollToPageTop();
  }, [article.slug]);

  return (
    <article>
      {/* Top nav */}
      <div className="site-container pt-28 md:pt-32 pb-4">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources" },
            { name: article.title, url: `/resources/${article.slug}` },
          ]}
        />
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-royal dark:text-royaldark hover:underline mt-4 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to News
        </Link>
      </div>

      {/* Title band — always dark, always readable */}
      <header className="bg-navy text-white">
        <div className="site-container max-w-4xl py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 mb-5">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
              {article.category}
            </span>
            <span className="uppercase tracking-widest text-[11px] font-bold text-white/50">
              {article.tag}
            </span>
            <span>{formatNewsDate(article.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden />
              {readMinutes} min read
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-[1.15] mb-5 break-words">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Article body */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <div className="site-container max-w-3xl py-12 md:py-16">
          {hasPoster && (
            <div className="mb-10 -mt-4 md:-mt-8">
              <NewsPoster item={article} />
            </div>
          )}

          <div className="news-article-body">{renderNewsBody(article.body)}</div>

          {article.link && (
            <p className="mt-10 pt-8 border-t border-[var(--border)]">
              <ArticleLink href={article.link}>Learn more →</ArticleLink>
            </p>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium text-[var(--text-primary)]">Share this article</span>
            <div className="flex flex-wrap gap-2">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:border-royal/40 hover:text-royal dark:hover:text-royaldark transition-colors"
              >
                <Share2 size={16} />
                LinkedIn
              </a>
              <a
                href={emailUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:border-royal/40 hover:text-royal dark:hover:text-royaldark transition-colors"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="site-container max-w-5xl py-14 md:py-16">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6">
            More in {article.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/resources/${item.slug}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 hover:border-royal/35 transition-colors"
              >
                <p className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase mb-2">
                  {formatNewsDate(item.date)}
                </p>
                <h3 className="font-heading text-sm font-bold text-[var(--text-primary)] group-hover:text-royal dark:group-hover:text-royaldark transition-colors line-clamp-3">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA — light background, high-contrast buttons */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="site-container max-w-3xl py-14 md:py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-royal dark:text-royaldark mb-3">
            Next step
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
            Ready to put these ideas into action?
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-lg mx-auto mb-8">
            Tell us what you need — staffing, managed services, or PR1SM.AI — and we&apos;ll respond within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Button to="/get-pricing" size="lg" variant="primary">
              Talk to an expert <ArrowRight size={18} />
            </Button>
            <Button to="/ai-innovation" size="lg" variant="secondary">
              Explore PR1SM.AI
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
