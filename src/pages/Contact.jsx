import SEO from "../components/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ContactForm from "../components/forms/ContactForm";
import CallToAction from "../components/sections/CallToAction";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact PRI Global"
        description="Contact PRI Global for IT staffing, managed services, and PR1SM.AI. Call 636.256.7172 or send a message — we respond within one business day."
        keywords="contact PRI Global, IT staffing inquiry, technology consulting contact"
        url="/contact"
        localBusiness
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-royal/6 rounded-full blur-[120px]" />
        </div>
        <div className="site-container relative">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ]}
          />
          <div className="max-w-2xl mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Contact us
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Whether you need talent, managed services, or enterprise AI — our team is ready to help.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
