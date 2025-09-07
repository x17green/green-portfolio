import React from 'react';
import { Helmet } from 'react-helmet-async';
import { personalData } from '../../data/personal';

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = personalData.fullName,
  section = 'portfolio'
}) => {
  // Default values from personal data
  const defaultTitle = personalData.seo.title;
  const defaultDescription = personalData.seo.description;
  const defaultKeywords = personalData.seo.keywords.join(', ');
  const defaultImage = `${personalData.socialLinks.portfolio}/images/profile.png`;
  const defaultUrl = personalData.socialLinks.portfolio;

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Structured data for Person/Professional
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalData.fullName,
    "alternateName": [
      personalData.displayName,
      personalData.firstName + " " + personalData.lastName,
      "Precious Okoyen"
    ],
    "description": personalData.bio.medium,
    "jobTitle": personalData.title,
    "worksFor": {
      "@type": "Organization",
      "name": personalData.currentCompany
    },
    "url": personalData.socialLinks.portfolio,
    "image": `${personalData.socialLinks.portfolio}/images/profile.png`,
    "sameAs": [
      personalData.socialLinks.linkedin,
      personalData.socialLinks.github,
      personalData.socialLinks.twitter,
      personalData.socialLinks.medium,
      personalData.socialLinks.googleScholar
    ],
    "knowsAbout": personalData.expertise,
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "African Leadership Experience (ALX Africa)"
      },
      {
        "@type": "Organization",
        "name": "Government Secondary School, Amassoma"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yenagoa",
      "addressRegion": "BY",
      "addressCountry": "NG"
    },
    "email": personalData.email,
    "nationality": "NG",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Software Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "Yenagoa, Bayelsa, Nigeria"
      },
      "skills": personalData.expertise.join(', ')
    }
  };

  // Structured data for Professional Service/Portfolio
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${personalData.fullName} - AI Engineering Services`,
    "description": personalData.bio.long,
    "provider": {
      "@type": "Person",
      "name": personalData.fullName
    },
    "areaServed": "Worldwide",
    "serviceType": "AI Engineering and Consulting",
    "offers": [
      {
        "@type": "Offer",
        "name": "AI System Development",
        "description": "Custom AI and machine learning solutions"
      },
      {
        "@type": "Offer",
        "name": "Prompt Engineering",
        "description": "Advanced prompt optimization for LLMs"
      },
      {
        "@type": "Offer",
        "name": "Technical Consulting",
        "description": "AI strategy and implementation guidance"
      }
    ]
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${personalData.fullName} - AI Engineer Portfolio`,
    "alternateName": "Precious Okoyen Portfolio",
    "url": personalData.socialLinks.portfolio,
    "description": personalData.seo.description,
    "author": {
      "@type": "Person",
      "name": personalData.fullName
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": personalData.fullName
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      <meta name="creator" content={personalData.fullName} />
      <meta name="publisher" content={personalData.fullName} />

      {/* Robots and SEO Directives */}
      <meta name="robots" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />

      {/* Language and Locale */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${personalData.fullName} - AI Engineer & Software Developer`} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={`${personalData.fullName} - AI Engineer Portfolio`} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific (for blog posts/projects) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={personalData.fullName} />
          <meta property="article:section" content={section} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@precious_okoyen" />
      <meta name="twitter:creator" content="@precious_okoyen" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={`${personalData.fullName} - AI Engineer & Software Developer`} />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content={personalData.socialLinks.linkedin} />

      {/* Additional Meta Tags for Rich Snippets */}
      <meta name="application-name" content={`${personalData.fullName} Portfolio`} />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="theme-color" content="#1e3a8a" />

      {/* Contact Information */}
      <meta name="contact" content={personalData.email} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${personalData.fullName}. All rights reserved.`} />

      {/* Geo Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="San Francisco" />
      <meta name="geo.position" content="37.7749;-122.4194" />
      <meta name="ICBM" content="37.7749, -122.4194" />

      {/* Professional Tags */}
      <meta name="profession" content="AI Engineer" />
      <meta name="industry" content="Technology" />
      <meta name="expertise" content={personalData.expertise.join(', ')} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Alternative Languages (if needed) */}
      <link rel="alternate" hrefLang="en" href={seoUrl} />
      <link rel="alternate" hrefLang="x-default" href={seoUrl} />

      {/* Feed Links (if blog exists) */}
      {/* <link rel="alternate" type="application/rss+xml" title={`${personalData.fullName} - Blog Feed`} href={`${seoUrl}/feed.xml`} /> */}
    </Helmet>
  );
};

export default SEOHead;
