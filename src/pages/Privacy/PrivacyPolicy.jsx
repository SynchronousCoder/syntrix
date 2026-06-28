import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const sections = [
  {
    title: "1. Who We Are",
    content: `Syntrix is a web design and development agency based in India. We craft digital experiences for startups, creators, and bold brands — including websites, interfaces, motion design, and full-stack web applications.

When you use our website (syntrixdesign.com), contact us, or engage our services, you share certain information with us. This policy explains what we collect, why we collect it, and how we handle it.

For any privacy-related questions, reach us at: hello@syntrixdesign.com`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect only what we genuinely need.

Contact form submissions — your name, email address, company name, and project details when you reach out to us.

Email correspondence — any information you share when communicating with us directly.

Analytics data — anonymised page view data, device type, browser, and approximate location (country/region level only). We use this to understand how people find and use our site. No personal identifiers are stored.

Cookies — we use minimal, functional cookies to keep the site running correctly. We do not use advertising cookies or tracking pixels.

We do not collect payment information through this website. Any project billing is handled separately through secure invoicing tools.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `Your information is used for exactly the purposes you would expect:

To respond to your enquiries and project briefs.

To communicate with you during an active project engagement.

To send you updates you have explicitly requested (we do not send unsolicited newsletters).

To understand aggregate traffic patterns on our website so we can improve it.

To comply with legal obligations where applicable.

We do not sell your data. We do not share your data with advertisers. We do not use your data to build profiles for third-party targeting.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `We process your personal data under the following legal bases in accordance with applicable Indian and international data protection law:

Consent — when you voluntarily submit information through our contact form.

Legitimate interests — when we use anonymised analytics to improve our website, in a way that does not override your privacy rights.

Contractual necessity — when processing is required to deliver services you have engaged us for.

Legal obligation — when we are required to retain certain records for tax, accounting, or legal compliance purposes.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain personal data only for as long as necessary for the purpose it was collected.

Contact enquiries — retained for up to 24 months so we can refer back to prior conversations if you re-engage us.

Project correspondence and files — retained for the duration of the project and up to 3 years after project completion for reference and legal compliance.

Analytics data — anonymised and aggregated; no personally identifiable records are kept beyond 14 months.

You may request deletion of your data at any time by emailing hello@syntrixdesign.com. We will action your request within 30 days.`,
  },
  {
    title: "6. Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties.

We work with a small number of trusted service providers to operate our business. These include:

Hosting and infrastructure providers (such as Vercel) to serve our website.

Email communication tools to handle correspondence.

Analytics tools that process only anonymised, aggregated data.

All third-party providers we use are contractually bound to handle your data securely and only for the specific purposes we instruct. They do not have the right to use your data for their own purposes.

If we are legally required to disclose information — for example, in response to a court order — we will do so, and where legally permitted, we will notify you first.`,
  },
  {
    title: "7. Cookies",
    content: `Our website uses cookies to function correctly and to understand how visitors use the site.

Essential cookies — required for the website to work. These cannot be disabled without affecting functionality.

Analytics cookies — anonymised data about pages visited, time spent, and device type. These do not identify you personally.

We do not use:
— Advertising or retargeting cookies
— Social media tracking pixels
— Third-party profiling tools

You can control cookie preferences through your browser settings. Disabling analytics cookies will not affect your ability to use the site.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the following rights in relation to your personal data:

Right of access — you may request a copy of the personal data we hold about you.

Right to rectification — you may ask us to correct inaccurate or incomplete data.

Right to erasure — you may ask us to delete your personal data, subject to any legal retention requirements.

Right to restrict processing — you may ask us to limit how we use your data in certain circumstances.

Right to data portability — you may request your data in a structured, machine-readable format.

Right to object — you may object to processing carried out on the basis of legitimate interests.

To exercise any of these rights, email us at hello@syntrixdesign.com. We will respond within 30 days. We do not charge for these requests.`,
  },
  {
    title: "9. Security",
    content: `We take reasonable and appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration.

These measures include:

Encrypted connections (HTTPS) across our entire website and services.

Access controls limiting who within our team can access project data.

Secure, reputable infrastructure providers with their own strong security certifications.

No method of transmission over the internet is 100% secure. In the unlikely event of a data breach affecting your personal information, we will notify you promptly and take immediate steps to contain and address the situation.`,
  },
  {
    title: "10. Third-Party Links",
    content: `Our website may contain links to external websites, client projects we have worked on, or tools we recommend. These third-party sites have their own privacy policies, and we are not responsible for their practices.

We encourage you to review the privacy policy of any third-party site you visit before providing any personal information.`,
  },
  {
    title: "11. Children's Privacy",
    content: `Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children.

If you believe a child has submitted personal information to us, please contact us immediately at hello@syntrixdesign.com and we will delete it promptly.`,
  },
  {
    title: "12. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the services we offer.

When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.

Continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "13. Contact Us",
    content: `If you have any questions, concerns, or requests relating to this Privacy Policy or the way we handle your personal data, please get in touch:

Syntrix Design
Email: hello@syntrixdesign.com
Website: syntrixdesign.com

We take privacy seriously and will respond to all enquiries within 5 business days.`,
  },
];

const PrivacyPolicy = () => {
  const heroRef    = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.3,
    });
  });

  return (
    <div className="min-h-screen w-full bg-[#F1F1F1] text-[#212121]">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="w-full border-b border-[#212121]/10 px-6 sm:px-10 lg:px-[6vh] pt-[18vh] pb-[10vh]"
      >
        <p className="font-[font2] text-xs uppercase tracking-[0.2em] text-[#212121]/50 mb-4">
          Legal
        </p>
        <h1 className="font-[font1] text-[13vw] sm:text-[8vw] lg:text-[6vw] uppercase leading-none text-[#212121] mb-6">
          Privacy Policy
        </h1>
        <p className="font-[font2] text-sm text-[#212121]/50">
          Last updated: June 2025
        </p>
      </div>

      {/* ── Intro ──────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 lg:px-[6vh] py-12 border-b border-[#212121]/10 max-w-[72ch]">
        <p className="font-[font2] text-base sm:text-lg leading-relaxed text-[#212121]/75">
          At Syntrix, we believe that trust is the foundation of every
          relationship — including the one we have with visitors to our website.
          This Privacy Policy explains how we collect, use, store, and protect
          your personal information. We have written it to be read, not just
          published.
        </p>
      </div>

      {/* ── Sections ───────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="px-6 sm:px-10 lg:px-[6vh] py-16 flex flex-col gap-0"
      >
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="flex flex-col lg:flex-row gap-6 lg:gap-16 py-10 border-b border-[#212121]/10 last:border-none"
          >
            {/* Section title */}
            <div className="lg:w-[28%] shrink-0">
              <h2 className="font-[font1] text-[4.5vw] sm:text-[2.5vw] lg:text-[1.4vw] uppercase leading-tight text-[#212121] sticky top-[10vh]">
                {section.title}
              </h2>
            </div>

            {/* Section content */}
            <div className="lg:w-[72%]">
              {section.content.split("\n\n").map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="font-[font2] text-sm sm:text-base leading-relaxed text-[#212121]/70 mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer CTA ─────────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 lg:px-[6vh] py-16 border-t border-[#212121]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-[font1] text-[5vw] sm:text-[2vw] lg:text-[1.5vw] uppercase text-[#212121] mb-1">
            Questions about your data?
          </p>
          <p className="font-[font2] text-sm text-[#212121]/50">
            We'll respond within 5 business days.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#212121] font-[font2] text-sm uppercase tracking-wide text-[#212121] hover:bg-[#212121] hover:text-[#F1F1F1] transition-colors duration-300"
        >
          Get in touch
        </Link>
      </div>

    </div>
  );
};

export default PrivacyPolicy;