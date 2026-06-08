import { Helmet } from "react-helmet-async";

export const BASE_URL = "https://pri-global.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

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
  },
  sameAs: ["https://www.pr1sm.ai", "https://priglobal.com"],
};

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | PRI Global`
    : "PRI Global — Technology That Moves Business Forward";

  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PRI Global" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
    </Helmet>
  );
}
