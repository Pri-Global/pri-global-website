import { useState, useMemo, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import {
  newsItems,
  NEWS_CATEGORIES,
  NEWS_TAGS,
  getNewsBySlug,
  filterNewsItems,
  sortNewsItems,
  getNewsCategoryCounts,
  getNewsTagCounts,
} from "../data/news";
import {
  caseStudies,
  CASE_STUDY_INDUSTRIES,
  filterCaseStudies,
  sortCaseStudies,
  getCaseStudyIndustryCounts,
} from "../data/caseStudies";
import NewsCard from "../components/news/NewsCard";
import NewsArticlePage from "../components/news/NewsArticlePage";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import FilterPills from "../components/ui/FilterPills";
import CallToAction from "../components/sections/CallToAction";
import PriCaresVideos from "../components/sections/PriCaresVideos";
import { CaseStudiesGrid, CaseStudiesCta } from "../components/sections/CaseStudies";

const RESOURCE_TABS = ["News", "Case Studies"];

function ResultSummary({ count, noun, sortLabel = "newest first" }) {
  return (
    <p className="text-sm text-[var(--text-muted)] mb-6">
      Showing <span className="font-semibold text-[var(--text-primary)]">{count}</span>{" "}
      {count === 1 ? noun : `${noun}s`} · sorted by date ({sortLabel})
    </p>
  );
}

function NewsContent() {
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");

  const categoryCounts = useMemo(() => getNewsCategoryCounts(), []);
  const tagCounts = useMemo(() => getNewsTagCounts(newsItems, category), [category]);

  const filtered = useMemo(() => {
    const items = filterNewsItems(newsItems, { category, tag });
    return sortNewsItems(items);
  }, [category, tag]);

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    if (tag !== "All") {
      const stillValid = filterNewsItems(newsItems, { category: nextCategory, tag }).length > 0;
      if (!stillValid) setTag("All");
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5 mb-8 space-y-5">
        <FilterPills
          label="Category"
          options={NEWS_CATEGORIES}
          value={category}
          onChange={handleCategoryChange}
          counts={categoryCounts}
          iconGroup="newsCategory"
        />
        <FilterPills
          label="Topic"
          options={NEWS_TAGS}
          value={tag}
          onChange={setTag}
          counts={tagCounts}
          iconGroup="newsTag"
        />
      </div>

      <ResultSummary count={filtered.length} noun="article" />

      {filtered.length === 0 ? (
        <p className="text-[var(--text-secondary)]">
          No articles match these filters yet. Try another category or topic.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}

      <PriCaresVideos />
    </>
  );
}

function CaseStudiesContent() {
  const [industry, setIndustry] = useState("All");

  const industryCounts = useMemo(() => getCaseStudyIndustryCounts(), []);

  const filtered = useMemo(() => {
    const items = filterCaseStudies(caseStudies, { industry });
    return sortCaseStudies(items);
  }, [industry]);

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5 mb-8">
        <FilterPills
          label="Industry"
          options={CASE_STUDY_INDUSTRIES}
          value={industry}
          onChange={setIndustry}
          counts={industryCounts}
          iconGroup="caseStudyIndustry"
        />
      </div>

      <ResultSummary count={filtered.length} noun="case study" />

      {filtered.length === 0 ? (
        <p className="text-[var(--text-secondary)]">
          No case studies match this industry yet. Try another filter.
        </p>
      ) : (
        <CaseStudiesGrid studies={filtered} />
      )}

      <CaseStudiesCta />
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
              News, case studies, and updates from PRI Global — browse by category, topic, or industry.
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

          {activeTab === "News" ? <NewsContent /> : <CaseStudiesContent />}
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
