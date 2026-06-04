import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { newsItems } from "../../data/news";
import NewsCard from "../news/NewsCard";

const previewItems = [...newsItems].sort((a, b) => {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return 0;
});

export default function NewsPreview() {
  const featured = previewItems.find((n) => n.featured) || previewItems[0];
  const others = previewItems.filter((n) => n.id !== featured?.id).slice(0, 2);

  return (
    <section id="latest-news" className="py-20 md:py-28 bg-[var(--bg-primary)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
              LATEST NEWS
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              What&apos;s Happening at PRI Global
            </h2>
          </div>
          <Link
            to="/resources"
            className="text-sm font-semibold text-royal dark:text-royaldark hover:underline shrink-0"
          >
            View All News →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          {featured && (
            <div className="lg:col-span-2 lg:row-span-2">
              <NewsCard item={featured} featured index={0} />
            </div>
          )}
          {others.map((item, i) => (
            <div key={item.id} className="lg:col-span-1">
              <NewsCard item={item} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
