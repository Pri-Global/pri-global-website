import { useState, useMemo, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import {
  newsItems,
  NEWS_CATEGORIES,
  getNewsBySlug,
  sortNewsItems,
} from "../data/news";
import NewsCard from "../components/news/NewsCard";
import NewsArticlePage from "../components/news/NewsArticlePage";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import CallToAction from "../components/sections/CallToAction";
import PriCaresVideos from "../components/sections/PriCaresVideos";
import { CaseStudiesContent } from "../components/sections/CaseStudies";

const RESOURCE_TABS = ["News", "Case Studies"];

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
        <div className="site-container relative">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Resources", url: "/resources" },
            ]}
          />
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
        <div className="site-container">
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
          title={article.title.length > 46 ? article.title.slice(0, 43) + "…" : article.title}
          description={(article.excerpt || article.summary || `Read ${article.title} from PRI Global.`).slice(0, 155)}
          keywords={`${article.category}, PRI Global news, technology insights, ${article.tag}`}
          url={`/resources/${article.slug}`}
          type="article"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources" },
            { name: article.title, url: `/resources/${article.slug}` },
          ]}
          article={{
            title: article.title,
            description: article.excerpt || article.summary,
            datePublished: article.date,
            dateModified: article.date,
          }}
        />
      ) : (
        <SEO
          title="Resources — News & Case Studies"
          description="PRI Global news, case studies, and technology insights. See how we delivered 600% ROI for automotive manufacturers. Explore our latest articles today."
          keywords="PRI Global news, IT case studies, technology insights, success stories"
          url="/resources"
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources" },
          ]}
        />
      )}
      {article ? <NewsArticlePage article={article} /> : <ResourcesList />}
      {!article && <CallToAction />}
    </>
  );
}
