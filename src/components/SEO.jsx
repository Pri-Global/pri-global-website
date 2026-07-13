import { Helmet } from "react-helmet-async";

export const BASE_URL = "https://priglobal.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const BRAND_SUFFIX = " | PRI Global";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PRI Global",
  legalName: "PRI India Private Services Limited",
  url: BASE_URL,
  logo: `${BASE_URL}/pri-global-logo.png`,
  foundingDate: "1997",
  description:
    "PRI Global is a 28-year-old technology services and IT talent solutions company headquartered in Ellisville, Missouri.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "174 Clarkson Road",
    addressLocality: "Ellisville",
    addressRegion: "MO",
    postalCode: "63011",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-636-256-7172",
    contactType: "customer service",
    url: `${BASE_URL}/about#contact`,
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.pr1sm.ai",
    "https://priglobal.com",
    "https://www.linkedin.com/company/pri-global",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PRI Global",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/candidate-jobs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

ORG_SCHEMA["@id"] = `${BASE_URL}/#organization`;

function buildBreadcrumbSchema(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

function buildArticleSchema({ title, description, url, image, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    image: image || DEFAULT_IMAGE,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "PRI Global",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PRI Global",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/pri-global-logo.png`,
      },
    },
    mainEntityOfPage: `${BASE_URL}${url}`,
  };
}

function buildServiceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "PRI Global",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: ["United States", "India", "Philippines", "Canada"],
    },
  };
}

function buildFaqSchema(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PRI Global",
    image: `${BASE_URL}/pri-global-logo.png`,
    url: BASE_URL,
    telephone: "+1-636-256-7172",
    address: {
      "@type": "PostalAddress",
      streetAddress: "174 Clarkson Road",
      addressLocality: "Ellisville",
      addressRegion: "MO",
      postalCode: "63011",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: ORG_SCHEMA.sameAs,
  };
}

function resolveImage(image) {
  if (!image) return DEFAULT_IMAGE;
  return image.startsWith("http") ? image : `${BASE_URL}${image}`;
}

export default function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  noindex = false,
  breadcrumbs,
  article,
  service,
  faq,
  localBusiness = false,
  includeWebSite = false,
}) {
  const fullTitle = title
    ? `${title}${BRAND_SUFFIX}`
    : "PRI Global — Technology That Moves Business Forward";

  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const ogImage = resolveImage(image);

  const schemas = [ORG_SCHEMA];
  if (includeWebSite) schemas.push(WEBSITE_SCHEMA);

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  if (article) {
    schemas.push(
      buildArticleSchema({
        title: article.title || title,
        description: article.description || description,
        url: url || "/",
        image: ogImage,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
      })
    );
  }

  if (service) {
    schemas.push(
      buildServiceSchema({
        name: service.name || title,
        description: service.description || description,
        url: url || "/",
      })
    );
  }

  if (faq?.length) {
    const faqSchema = buildFaqSchema(faq);
    if (faqSchema) schemas.push(faqSchema);
  }

  if (localBusiness) {
    schemas.push(buildLocalBusinessSchema());
  }

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PRI Global" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
