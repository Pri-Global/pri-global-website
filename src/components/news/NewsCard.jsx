import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getNewsThumbnail } from "../../utils/newsThumbnail";
import { formatNewsDate } from "../../utils/formatNewsDate";
import NewsThumbnail from "./NewsThumbnail";

const CATEGORY_STYLES = {
  Community: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
  Product: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25",
  Company: "bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/25",
  Insights: "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/25",
};

export default function NewsCard({ item, featured = false, index = 0 }) {
  const catClass = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Company;
  const hasThumbnail = Boolean(getNewsThumbnail(item));

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className={`group flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${
        featured ? "h-full" : ""
      }`}
    >
      {hasThumbnail && (
        <NewsThumbnail item={item} featured={featured} linkToArticle />
      )}

      <div className={`flex flex-col flex-1 ${featured ? "p-6 md:p-8" : "p-5"}`}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${catClass}`}>
            {item.category}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
            {item.tag}
          </span>
        </div>

        <p className="text-xs text-[var(--text-muted)] mb-2">{formatNewsDate(item.date)}</p>

        <h3
          className={`font-heading font-bold text-[var(--text-primary)] line-clamp-2 mb-2 ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 flex-1 mb-4">
          {item.excerpt}
        </p>

        <Link
          to={`/resources/${item.slug}`}
          className="text-sm font-semibold text-royal dark:text-royaldark hover:underline mt-auto"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
