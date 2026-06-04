export const newsItems = [
  {
    id: "pri-cares-community",
    title: "PRI Cares — Supporting the Communities We Serve",
    slug: "pri-cares-community",
    date: "2025",
    category: "Community",
    tag: "PRI CARES",
    excerpt:
      "PRI Global's commitment goes beyond technology. Through our PRI Cares initiative, we support local communities, charitable causes, and the people who make our region great.",
    body: `At PRI Global, we believe that business success and community success go hand in hand.

Through **PRI Cares**, our team supports local charities, gift-giving initiatives, and community programs across the regions we serve — from Ellisville, Missouri to our global offices.

Watch our community videos on the Resources page to see how we give back, or get in touch to partner with us on a cause that matters to your organization.`,
    image: null,
    posterImage: null,
    featured: false,
    link: null,
  },
  {
    id: "hero-network-golf-2025",
    title: "PRI Global & PR1SM.AI — Proud Sponsor of the St. Louis Hero Network Golf Event",
    slug: "hero-network-golf-2025",
    date: "2025",
    category: "Community",
    tag: "SPONSORSHIP",
    excerpt:
      "PRI Global and PR1SM.AI are proud sponsors of the St. Louis Hero Network Golf Event — supporting those who serve and strengthening the communities we share.",
    body: `PRI Global and PR1SM.AI are honored to be proud sponsors of the 
St. Louis Hero Network Golf Event.

The St. Louis Hero Network is dedicated to supporting local heroes — 
firefighters, police officers, military veterans, and EMS professionals — 
who serve our communities every day.

**Supporting Those Who Serve. Strengthening the Communities We Share.**

As a St. Louis-area company in business since 1997, community is at the 
heart of everything we do. We believe in honoring the service of those 
who protect and serve, and in building a better tomorrow — together.

**Honoring Their Service. Supporting Their Future.**
Together, We Make a Difference.

- Supporting Local Heroes
- Strengthening Our Community  
- Building a Better Tomorrow
- Thank You For Your Support
- Together, We Can

PR1SM.AI — Smarter Data. Stronger Decisions. Better Outcomes.

For more information about the St. Louis Hero Network:
Visit: stlouisheronetwork.org`,
    image: null,
    posterImage: "hero-network-poster",
    featured: true,
    link: null,
  },
  {
    id: "prism-ai-launch-2024",
    title: "PRI Global Launches PR1SM.AI — Your AI Intelligence Layer",
    slug: "prism-ai-launch",
    date: "2024",
    category: "Product",
    tag: "ANNOUNCEMENT",
    excerpt:
      "PRI Global introduces PR1SM.AI, a proprietary enterprise AI platform that turns your data into decisions — instantly.",
    body: `PRI Global is proud to announce the launch of PR1SM.AI — 
Your AI Intelligence Layer.

PR1SM.AI connects to all your existing systems and data, delivering 
real-time business insights in plain English. No SQL. No analyst queue. 
No rip-and-replace.

Talk to Your Data. Get Answers. Make Smarter Moves.

Visit www.pr1sm.ai to learn more.`,
    image: null,
    posterImage: null,
    featured: false,
    link: "https://www.pr1sm.ai",
  },
  {
    id: "pri-global-28-years",
    title: "28 Years of Trusted Technology Services — A Message from Our CEO",
    slug: "28-years-trusted-services",
    date: "2025",
    category: "Company",
    tag: "MILESTONE",
    excerpt:
      "From a single office in Ellisville, Missouri to a global technology partner across 4 countries — PRI Global celebrates 28 years of delivering excellence.",
    body: `Since 1997, PRI Global has been delivering cutting-edge IT solutions 
that propel businesses into the future.

Over 28 years of trusted services for clients in St. Louis, nationally 
and globally — we've placed 12,700+ IT professionals, delivered 300+ 
projects, and maintained a 96% client retention rate.

We are just getting started.

— Ajay Patel, Chairman, PRI Global & CEO, PR1SM.AI`,
    image: null,
    posterImage: null,
    featured: false,
    link: null,
  },
];

export const NEWS_CATEGORIES = ["All", "Community", "Product", "Company"];

export function getNewsBySlug(slug) {
  return newsItems.find((item) => item.slug === slug);
}

export function sortNewsItems(items) {
  return [...items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}
