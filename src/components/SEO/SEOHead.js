import React, { useEffect } from "react";
import { personalData } from "../../data/personal";

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = personalData.fullName,
  section = "portfolio",
}) => {
  // Default values from personal data
  const defaultTitle = personalData.seo.title;
  const defaultDescription = personalData.seo.description;
  const defaultKeywords = personalData.seo.keywords.join(", ");
  const defaultImage = `${personalData.socialLinks.portfolio}/images/og-image.jpg`;
  const defaultUrl = personalData.socialLinks.portfolio;

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Use useMemo to memoize structured data to prevent unnecessary re-renders
  const personStructuredData = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalData.fullName,
      alternateName: [
        personalData.displayName,
        personalData.firstName + " " + personalData.lastName,
        "Precious Okoyen",
      ],
      description: personalData.bio.medium,
      jobTitle: personalData.title,
      worksFor: {
        "@type": "Organization",
        name: personalData.currentCompany,
      },
      url: personalData.socialLinks.portfolio,
      image: `${personalData.socialLinks.portfolio}/images/profile/precious-okoyen-profile.jpg`,
      sameAs: [
        personalData.socialLinks.linkedin,
        personalData.socialLinks.github,
        personalData.socialLinks.twitter,
        personalData.socialLinks.medium,
        personalData.socialLinks.googleScholar,
      ],
      knowsAbout: personalData.expertise,
      alumniOf: [
        {
          "@type": "Organization",
          name: "Stanford University",
        },
        {
          "@type": "Organization",
          name: "University of California, Berkeley",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
      email: personalData.email,
      nationality: "US",
      hasOccupation: {
        "@type": "Occupation",
        name: "AI Engineer",
        occupationLocation: {
          "@type": "City",
          name: "San Francisco",
        },
        skills: personalData.expertise.join(", "),
      },
    }),
    [],
  );

  // Structured data for Professional Service/Portfolio
  const serviceStructuredData = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${personalData.fullName} - AI Engineering Services`,
      description: personalData.bio.long,
      provider: {
        "@type": "Person",
        name: personalData.fullName,
      },
      areaServed: "Worldwide",
      serviceType: "AI Engineering and Consulting",
      offers: [
        {
          "@type": "Offer",
          name: "AI System Development",
          description: "Custom AI and machine learning solutions",
        },
        {
          "@type": "Offer",
          name: "Prompt Engineering",
          description: "Advanced prompt optimization for LLMs",
        },
        {
          "@type": "Offer",
          name: "Technical Consulting",
          description: "AI strategy and implementation guidance",
        },
      ],
    }),
    [],
  );

  // Website structured data
  const websiteStructuredData = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${personalData.fullName} - AI Engineer Portfolio`,
      alternateName: "Precious Okoyen Portfolio",
      url: personalData.socialLinks.portfolio,
      description: personalData.seo.description,
      author: {
        "@type": "Person",
        name: personalData.fullName,
      },
      inLanguage: "en-US",
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        "@type": "Person",
        name: personalData.fullName,
      },
    }),
    [],
  );

  // Utility function to safely set meta content
  const setMetaContent = (name, content, isProperty = false) => {
    if (!content) return;

    const attribute = isProperty ? "property" : "name";
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);

    if (meta) {
      meta.setAttribute("content", content);
    } else {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, name);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    }
  };

  // Utility function to set link attributes
  const setLinkAttribute = (rel, href, attributes = {}) => {
    if (!href) return;

    let link = document.querySelector(`link[rel="${rel}"]`);

    if (link) {
      link.setAttribute("href", href);
    } else {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      link.setAttribute("href", href);
      document.head.appendChild(link);
    }

    // Set additional attributes
    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
  };

  // Function to add structured data
  const addStructuredData = (data, id) => {
    // Remove existing script if it exists
    const existingScript = document.querySelector(
      `script[data-schema-id="${id}"]`,
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema-id", id);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  useEffect(() => {
    // Set document title
    document.title = seoTitle;

    // Basic Meta Tags
    setMetaContent("description", seoDescription);
    setMetaContent("keywords", seoKeywords);
    setMetaContent("author", author);
    setMetaContent("creator", personalData.fullName);
    setMetaContent("publisher", personalData.fullName);

    // Robots and SEO Directives
    setMetaContent(
      "robots",
      "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    );
    setMetaContent(
      "googlebot",
      "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    );
    setMetaContent("bingbot", "index, follow");

    // Language and Locale
    setMetaContent("language", "English");

    // Set language meta tag
    let langMeta = document.querySelector(
      'meta[http-equiv="content-language"]',
    );
    if (langMeta) {
      langMeta.setAttribute("content", "en-US");
    } else {
      langMeta = document.createElement("meta");
      langMeta.setAttribute("http-equiv", "content-language");
      langMeta.setAttribute("content", "en-US");
      document.head.appendChild(langMeta);
    }

    // Canonical URL
    setLinkAttribute("canonical", seoUrl);

    // Open Graph / Facebook
    setMetaContent("og:type", type, true);
    setMetaContent("og:title", seoTitle, true);
    setMetaContent("og:description", seoDescription, true);
    setMetaContent("og:image", seoImage, true);
    setMetaContent("og:image:width", "1200", true);
    setMetaContent("og:image:height", "630", true);
    setMetaContent(
      "og:image:alt",
      `${personalData.fullName} - AI Engineer & Software Developer`,
      true,
    );
    setMetaContent("og:url", seoUrl, true);
    setMetaContent(
      "og:site_name",
      `${personalData.fullName} - AI Engineer Portfolio`,
      true,
    );
    setMetaContent("og:locale", "en_US", true);

    // Article specific (for blog posts/projects)
    if (type === "article") {
      setMetaContent("article:author", personalData.fullName, true);
      setMetaContent("article:section", section, true);
      if (publishedTime)
        setMetaContent("article:published_time", publishedTime, true);
      if (modifiedTime)
        setMetaContent("article:modified_time", modifiedTime, true);
    }

    // Twitter
    setMetaContent("twitter:card", "summary_large_image");
    setMetaContent("twitter:site", "@0x17green");
    setMetaContent("twitter:creator", "@0x17green");
    setMetaContent("twitter:title", seoTitle);
    setMetaContent("twitter:description", seoDescription);
    setMetaContent("twitter:image", seoImage);
    setMetaContent(
      "twitter:image:alt",
      `${personalData.fullName} - AI Engineer & Software Developer`,
    );

    // LinkedIn
    setMetaContent("linkedin:owner", personalData.socialLinks.linkedin, true);

    // Additional Meta Tags for Rich Snippets
    setMetaContent("application-name", `${personalData.fullName} Portfolio`);
    setMetaContent("msapplication-TileColor", "#1e3a8a");
    setMetaContent("theme-color", "#1e3a8a");

    // Contact Information
    setMetaContent("contact", personalData.email);
    setMetaContent(
      "copyright",
      `© ${new Date().getFullYear()} ${personalData.fullName}. All rights reserved.`,
    );

    // Geo Tags
    setMetaContent("geo.region", "US-CA");
    setMetaContent("geo.placename", "San Francisco");
    setMetaContent("geo.position", "37.7749;-122.4194");
    setMetaContent("ICBM", "37.7749, -122.4194");

    // Professional Tags
    setMetaContent("profession", "AI Engineer");
    setMetaContent("industry", "Technology");
    setMetaContent("expertise", personalData.expertise.join(", "));

    // Add Structured Data
    addStructuredData(personStructuredData, "person");
    addStructuredData(serviceStructuredData, "service");
    addStructuredData(websiteStructuredData, "website");

    // DNS Prefetch and Preconnect (only add if not exists)
    const dnsPrefetchDomains = [
      "//fonts.googleapis.com",
      "//fonts.gstatic.com",
      "//github.com",
      "//linkedin.com",
    ];

    dnsPrefetchDomains.forEach((domain) => {
      if (
        !document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)
      ) {
        setLinkAttribute("dns-prefetch", domain);
      }
    });

    // Preconnect
    if (
      !document.querySelector(
        'link[rel="preconnect"][href="https://fonts.googleapis.com"]',
      )
    ) {
      setLinkAttribute("preconnect", "https://fonts.googleapis.com");
    }

    if (
      !document.querySelector(
        'link[rel="preconnect"][href="https://fonts.gstatic.com"]',
      )
    ) {
      setLinkAttribute("preconnect", "https://fonts.gstatic.com", {
        crossOrigin: "",
      });
    }

    // Alternative Languages
    setLinkAttribute("alternate", seoUrl, { hrefLang: "en" });
    setLinkAttribute("alternate", seoUrl, { hrefLang: "x-default" });
  }, [
    seoTitle,
    seoDescription,
    seoKeywords,
    seoImage,
    seoUrl,
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    personStructuredData,
    serviceStructuredData,
    websiteStructuredData,
  ]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
