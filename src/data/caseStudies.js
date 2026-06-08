import { caseStudiesMore } from "./caseStudiesMore";

const featuredCaseStudies = [
  {
    id: "automotive-manufacturer",
    slug: "automotive-manufacturer",
    title: "PRI Transforms Operations for a Leading Automotive Manufacturer",
    industry: "Manufacturing",
    industryIcon: "Factory",
    date: "2024-08-01",
    challenge:
      "Legacy systems not equipped for Industry 4.0, fragmented supply chain, and production inefficiencies across multiple locations.",
    solution:
      "Digital transformation strategy, cloud migration, advanced analytics & AI for supply chain, smart manufacturing integration, and lean manufacturing implementation.",
    results: [
      { metric: "20%", label: "Increase in operational efficiency" },
      { metric: "15%", label: "Reduction in supply chain lead times" },
      { metric: "30%", label: "Faster time-to-market for EV models" },
      { metric: "600%", label: "ROI within 2 years" },
    ],
    tags: ["Cloud Migration", "AI & Analytics", "Industry 4.0", "Supply Chain"],
    imageUrl: "/case-studies/automotive.png",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "PRI Global, a leading digital consultancy, recently partnered with a recognized automotive manufacturer to help modernize their systems. They were struggling to integrate modern technologies with their legacy systems, optimize their supply chain, and streamline production processes to meet the growing demand for vehicles.",
          "PRI was able to bring in strategic leadership to get them fully integrating Industry 4.0 technologies and support their development efforts. This case study outlines the situation, the business gaps, and the solutions we put in place.",
        ],
      },
      {
        heading: "Client Background",
        paragraphs: [
          "This client was encountering several critical challenges. Their legacy IT systems were not equipped to handle the demands of modern automotive production — including the integration of new digital tools and technologies that are essential for fully achieving Industry 4.0.",
          "They did a good job of collecting data and information, but were struggling to make sense of it, integrate it, and operationalize those insights into the hands of business decision makers in real time.",
        ],
      },
      {
        heading: "Challenges",
        list: [
          "Legacy System Integration: Legacy IT systems were not equipped for modern automotive production. They weren't integrated with other modern systems, making it hard to take advantage of emerging tech (AI, analytics, automation). Acquisitions had created disparate systems and processes between locations, requiring standardization.",
          "Supply Chain Optimization: The global supply chain was fragmented, leading to inefficiencies, delays, and increased costs. The company needed more real-time insight into forecasting, demand planning, inventory optimization, and supplier visibility.",
          "Production Efficiency: Smart manufacturing and IoT devices were collecting data at many locations, but the client was not leveraging it for real-time decision making. They needed to optimize production lines, reduce downtime, reduce waste, and increase throughput.",
        ],
      },
      {
        heading: "PRI Global's Solution",
        paragraphs: [
          "Like many engagements, it started with PRI conducting a strategic assessment on the client's prioritized business requirements. With that we created a repeatable and scalable roadmap that could be implemented across the needed manufacturing locations.",
        ],
        subsections: [
          {
            title: "Digital Transformation and Legacy System Integration",
            list: [
              "Assessment and Strategy Development: Comprehensive assessment of existing IT infrastructure and a digital transformation strategy prioritizing integration of new technologies with legacy systems.",
              "Cloud Migration: Migrated core systems to a cloud-based infrastructure, enabling greater flexibility, scalability, and real-time data access — reducing unnecessary technical debt.",
            ],
          },
          {
            title: "Supply Chain Optimization",
            list: [
              "Advanced Analytics and AI: Deployed AI tools for real-time supply chain insights, predictive analytics, and inventory optimization to prevent shortages and stock-outs.",
              "Supplier Collaboration Platform: Digital platform for better communication with suppliers, improving transparency, reducing lead times, and enhancing supplier performance management.",
            ],
          },
          {
            title: "Production Efficiency Enhancement",
            list: [
              "Smart Manufacturing Technologies: Integrated IoT sensors and automated machinery to monitor and optimize production in real time — enabling predictive maintenance and reducing downtime.",
              "Lean Manufacturing: Wider integration of information enabled waste reduction, continuous improvement, and maximized throughput — critical as the company transitioned to electric vehicle production.",
            ],
          },
        ],
      },
      {
        heading: "Results and Benefits",
        list: [
          "Increased Operational Efficiency: Integration of modern systems and smart manufacturing technologies resulted in a 20% increase in overall operational efficiency. Production lines became more agile and capable of handling electric vehicle manufacturing complexities.",
          "Enhanced Supply Chain Resilience: Advanced analytics and AI-driven supply chain management improved the company's ability to respond to disruptions, reducing lead times by 15% and cutting supply chain costs by 10%.",
          "Faster Time-to-Market for Electric Vehicles: Optimized production processes enabled the manufacturer to bring new EV models to market 30% faster, staying competitive in the rapidly growing EV market.",
          "Cost Savings and ROI: Digital transformation initiatives led to substantial cost savings, with an estimated ROI of 600% within two years of project completion.",
          "Improved Productivity: Automation of manual tasks reduced time spent on administrative activities and decreased reliance on non-collaborative, non-real-time Excel workflows.",
          "Ensured Compliance: PRI implemented robust security measures and ensured adherence to all industry standards and regulations.",
          "Enabled Sustainability: Fully integrated information allowed the client to track, maintain, improve, and report on sustainability initiatives with suppliers, regulators, and partners.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Through PRI's strategy and development efforts, we helped our client navigate the challenges of modernizing operations and embracing digital transformation. By integrating cutting-edge technologies, enabling better data analytics, and modernizing to cloud technologies, PRI enabled them to achieve their business goals, optimize the supply chain, improve production, and keep pace in the competitive automotive industry.",
        ],
      },
    ],
  },
  {
    id: "restaurant-analytics",
    slug: "restaurant-analytics",
    title: "PRI Empowers a Leading Restaurant Chain with Real-Time Analytics",
    industry: "Retail & Food Service",
    industryIcon: "UtensilsCrossed",
    date: "2024-09-01",
    challenge:
      "Fragmented data across POS, inventory, and customer systems. Reports delayed by days, limiting real-time decision-making for hundreds of locations.",
    solution:
      "Cloud data infrastructure, automated ETL pipelines, role-based real-time dashboards, and an AI-powered mobile app for store operators and managers.",
    results: [
      { metric: "Real-time", label: "Data access across all locations" },
      { metric: "100%", label: "Mobile accessibility for managers" },
      {
        metric: "Significant",
        cardMetric: "Sales ↑",
        label: "Sales growth from optimized promotions",
      },
      {
        metric: "AI-powered",
        cardMetric: "AI Insights",
        label: "Predictive insights & alerts",
      },
    ],
    tags: ["Real-Time Analytics", "Mobile App", "AI Insights", "Cloud"],
    imageUrl: "/case-studies/restaurant.png",
    sections: [
      {
        heading: "Client Background",
        paragraphs: [
          "A prominent quick service restaurant (QSR) chain with hundreds of locations across various regions was struggling to leverage its data effectively for business growth. The chain's data was fragmented across different systems, and insights were delayed, limiting the ability of key decision-makers like store operators, general managers, and area directors to make informed choices.",
          "The client sought a solution that could centralize its data, provide real-time analytics, and support improved decision-making — all without disrupting daily operations.",
        ],
      },
      {
        heading: "Challenges",
        list: [
          "Fragmented Data Systems: Data spread across disparate legacy systems including POS, inventory, and customer feedback tools — making comprehensive analysis difficult.",
          "Delayed Reporting: Reports were delayed by several days, limiting the ability of store operators and managers to act quickly on emerging trends or issues.",
          "Lack of Real-Time Analytics: Regional directors and area managers lacked timely insights into store performance, sales trends, and customer satisfaction.",
          "Scalability Issues: Existing infrastructure struggled to scale with growing data volume, especially during peak business periods.",
          "Operational Disruption: Store operators were already burdened with daily tasks — new data tools needed to integrate without impacting store efficiency.",
        ],
      },
      {
        heading: "PRI Global's Solution",
        paragraphs: [
          "PRI was engaged to modernize the client's data infrastructure and deliver real-time analytics without interrupting store operations.",
        ],
        subsections: [
          {
            title: "Data Infrastructure Modernization",
            list: [
              "Cloud Migration: Migrated legacy systems to a scalable cloud platform, consolidating POS, customer feedback, and inventory data into a single repository.",
              "Automated Data Pipelines: Advanced ETL tools automated data flow for real-time ingestion of sales, customer behavior, and inventory metrics.",
            ],
          },
          {
            title: "Real-Time Analytics Implementation",
            list: [
              "Advanced Analytics Platform: State-of-the-art platform for real-time reporting with custom dashboards for every stakeholder level.",
              "Role-Based Dashboards: Store operators track daily sales and staffing; managers access regional performance and customer satisfaction.",
              "Mobile Accessibility: Dashboards accessible via mobile devices so managers can review data without stepping away from duties.",
            ],
          },
          {
            title: "Generative Mobile App for Seamless Data Access",
            list: [
              "Data Democratization: User-friendly mobile app providing real-time data access for operators, managers, and area directors.",
              "Intuitive Interface: Simple design for non-technical staff with minimal training required.",
              "AI-Generated Insights: Contextual recommendations like optimizing staffing during peak hours or managing slow-moving inventory.",
              "Non-Intrusive Notifications: Real-time alerts for dips in customer satisfaction or sales fluctuations.",
              "Offline Capabilities: App functions offline and syncs automatically when reconnected.",
            ],
          },
          {
            title: "Data-Driven Decision Making & Ongoing Support",
            list: [
              "AI and Predictive Analytics: Machine learning models for sales forecasts based on customer preferences and weather patterns.",
              "Real-Time Alerts: Customizable alerts when KPIs drop below thresholds.",
              "24/7 Support and Updates: Continuous technical support with regular feature enhancements based on user feedback.",
            ],
          },
        ],
      },
      {
        heading: "Results and Benefits",
        list: [
          "Enhanced Store Operations: Store operators monitor real-time performance metrics like sales and customer satisfaction for quick, data-driven adjustments.",
          "Faster Decision-Making: Role-based dashboards and mobile accessibility empowered managers to decide swiftly with minimal disruption.",
          "Sales Growth: Significant sales increases driven by optimized promotional strategies and improved inventory management.",
          "Improved Data Access: The mobile app democratized data across the organization regardless of technical expertise.",
          "Reduced Waste and Overhead: Predictive analytics fine-tuned inventory management, resulting in significant cost savings.",
          "Higher Customer Satisfaction: Real-time alerts enabled store operators to address service issues promptly.",
        ],
      },
      {
        heading: "Final Outcomes and Strategic Impact",
        paragraphs: [
          "PRI's data-driven solution revolutionized the client's operations, providing real-time insights across all management levels through a generative mobile app. This innovative approach empowered decision-makers to act quickly and efficiently without disrupting day-to-day store operations.",
          "By modernizing the client's data infrastructure and enabling real-time analytics, PRI helped the QSR chain streamline operations, boost sales, and improve overall customer satisfaction in an increasingly competitive market.",
        ],
      },
    ],
  },
  {
    id: "aerospace-merger",
    slug: "aerospace-merger",
    title: "PRI Leads Integration for a Major Aerospace Merger",
    industry: "Aerospace & Defense",
    industryIcon: "Plane",
    date: "2024-09-15",
    challenge:
      "Complex merger requiring full IT systems integration, data consolidation, and business process harmonization with zero operational disruption.",
    solution:
      "Full IT integration, cloud migration, ERP unification, centralized data lake, advanced analytics, RPA automation, and comprehensive change management.",
    results: [
      { metric: "25%", label: "Reduction in operational downtime" },
      { metric: "15%", label: "Production efficiency improvement" },
      { metric: "10%", label: "Supply chain lead time reduction" },
      { metric: "Zero", label: "Major operational disruptions" },
    ],
    tags: ["M&A Integration", "Cloud Migration", "ERP", "Data Governance"],
    imageUrl: "/case-studies/aerospace.png",
    sections: [
      {
        heading: "Client Background",
        paragraphs: [
          "A leading aerospace manufacturer, renowned for producing critical components for both commercial and defense aircraft, recently expanded its market reach by acquiring key assets from a prominent aerospace company specializing in aerostructures and aftermarket services.",
          "This acquisition aimed to strengthen the company's supply chain and boost its competitive advantage. However, integrating the newly acquired company's systems, data, and business processes presented a significant challenge. PRI was brought on board to lead the integration, tasked with unifying IT systems, consolidating data, and streamlining processes while ensuring minimal disruption to ongoing operations.",
        ],
      },
      {
        heading: "Objectives",
        list: [
          "Integrate IT Systems: Unify both companies' IT infrastructures for cross-compatibility with minimal operational disruption.",
          "Consolidate and Govern Data: Merge and standardize data to enhance reporting and decision-making.",
          "Harmonize Business Processes: Optimize and align workflows across various departments.",
          "Modernize Technology: Upgrade the acquired company's technology to match the acquirer's cloud-based approach.",
          "Ensure Stability: Maintain business continuity and mitigate operational risks during the integration.",
        ],
      },
      {
        heading: "PRI Global's Approach",
        subsections: [
          {
            title: "1. Discovery and Assessment",
            list: [
              "System Audits and Due Diligence: Detailed audits of ERP, supply chain management, and PLM systems to identify dependencies and compatibility issues.",
              "Data Mapping and Governance: Mapped data flows with attention to security and compliance; created a governance framework for data integrity.",
              "Business Process Analysis: Analyzed engineering, procurement, and aftermarket services workflows for alignment opportunities.",
            ],
          },
          {
            title: "2. Technology Integration",
            list: [
              "Cloud Migration: Migrated critical applications to modern cloud infrastructure with a hybrid model ensuring uninterrupted operations.",
              "ERP System Unification: Middleware solutions facilitated data exchange; full transition to the acquiring company's ERP completed.",
              "Supply Chain and PLM Integration: Unified systems enabling real-time collaboration in product design and supplier management.",
              "API and Middleware Solutions: Real-time data flow between different systems via API-based bridges.",
            ],
          },
          {
            title: "3. Data Integration and Analytics",
            list: [
              "Data Cleansing and Migration: ETL pipelines to cleanse, migrate, and validate data including historical records for future analytics.",
              "Data Lake Creation: Centralized data lake for structured and unstructured data enabling efficient reporting.",
              "Advanced Analytics Tools: Insights into production efficiency, supply chain optimization, and operational performance.",
            ],
          },
          {
            title: "4. Process Harmonization",
            list: [
              "Standardizing Workflows: Unified operational framework from engineering to procurement.",
              "Automation and Optimization: RPA implemented to streamline procurement and supply chain operations.",
              "Supply Chain Integration: Consolidated suppliers into a single procurement platform with improved tracking and lead times.",
            ],
          },
          {
            title: "5. Change Management and Training",
            list: [
              "Change Management Strategy: Leadership engagement, regular communication, and cross-functional workshops.",
              "Employee Training: Comprehensive sessions on new technologies; knowledge transfer for IT staff post-integration.",
            ],
          },
          {
            title: "6. Security and Compliance",
            list: [
              "Data Security Enhancements: Multi-layered security protocols protecting critical data per international regulations.",
              "Regulatory Compliance: All migration and integration activities compliant with industry-specific regulations.",
            ],
          },
        ],
      },
      {
        heading: "Results",
        list: [
          "Seamless IT Integration: Acquired company systems integrated without major disruptions — business operations continued smoothly.",
          "Data Consolidation and Insights: Centralized data lake and advanced analytics enabled more informed decisions; predictive analytics reduced operational downtime by 25%.",
          "Process Standardization: Workflow standardization and automation improved production efficiency by 15%, reducing bottlenecks.",
          "Supply Chain Optimization: Integration enhanced visibility, reduced material shortages, and cut lead times by 10%.",
          "Scalable Technology Infrastructure: Modernized technology stack enabling the client to scale and manage future acquisitions with greater flexibility.",
        ],
      },
      {
        heading: "Final Outcomes and Strategic Impact",
        paragraphs: [
          "PRI's successful collaboration ensured a seamless integration following the acquisition. By addressing the technical challenges of unifying systems, data, and processes, PRI played a pivotal role in enhancing operational efficiency and ensuring business continuity.",
          "This case study highlights the critical importance of strategic IT consulting in mergers and acquisitions, particularly in industries where precision, security, and compliance are non-negotiable.",
        ],
      },
    ],
  },
];

export { featuredCaseStudies };

export const caseStudies = [
  ...featuredCaseStudies,
  ...caseStudiesMore.sort((a, b) => new Date(b.date) - new Date(a.date)),
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((s) => s.slug === slug);
}
