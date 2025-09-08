import { useEffect, useCallback } from 'react';
import { personalData } from '../data/personal';

/**
 * Custom hook for managing page-specific SEO
 * Provides easy-to-use SEO management for different pages/sections
 */
const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  section = 'portfolio',
  publishedTime,
  modifiedTime,
  author = personalData.fullName,
} = {}) => {
  // Default values from personal data
  const defaultTitle = personalData.seo.title;
  const defaultDescription = personalData.seo.description;
  const defaultKeywords = personalData.seo.keywords.join(', ');
  const defaultImage = `${personalData.socialLinks.portfolio}/images/og-image.jpg`;
  const defaultUrl = personalData.socialLinks.portfolio;

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Utility function to safely update meta content
  const updateMetaContent = useCallback((name, content, isProperty = false) => {
    if (!content) return;

    const attribute = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);

    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }, []);

  // Update document title
  const updateTitle = useCallback(newTitle => {
    document.title = newTitle;
  }, []);

  // Update Open Graph tags
  const updateOpenGraph = useCallback(() => {
    updateMetaContent('og:title', seoTitle, true);
    updateMetaContent('og:description', seoDescription, true);
    updateMetaContent('og:image', seoImage, true);
    updateMetaContent('og:url', seoUrl, true);
    updateMetaContent('og:type', type, true);
  }, [updateMetaContent, seoTitle, seoDescription, seoImage, seoUrl, type]);

  // Update Twitter Card tags
  const updateTwitterCard = useCallback(() => {
    updateMetaContent('twitter:title', seoTitle);
    updateMetaContent('twitter:description', seoDescription);
    updateMetaContent('twitter:image', seoImage);
  }, [updateMetaContent, seoTitle, seoDescription, seoImage]);

  // Update basic meta tags
  const updateBasicMeta = useCallback(() => {
    updateMetaContent('description', seoDescription);
    updateMetaContent('keywords', seoKeywords);
    updateMetaContent('author', author);
  }, [updateMetaContent, seoDescription, seoKeywords, author]);

  // Update canonical URL
  const updateCanonical = useCallback(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', seoUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', seoUrl);
      document.head.appendChild(canonical);
    }
  }, [seoUrl]);

  // Add structured data for specific page types
  const addPageStructuredData = useCallback(() => {
    if (type === 'article') {
      const articleData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: seoTitle,
        description: seoDescription,
        image: seoImage,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Person',
          name: personalData.fullName,
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': seoUrl,
        },
      };

      // Remove existing article schema
      const existingArticle = document.querySelector(
        'script[data-schema-type="article"]'
      );
      if (existingArticle) {
        existingArticle.remove();
      }

      // Add new article schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-type', 'article');
      script.textContent = JSON.stringify(articleData);
      document.head.appendChild(script);
    }
  }, [
    type,
    seoTitle,
    seoDescription,
    seoImage,
    author,
    publishedTime,
    modifiedTime,
    seoUrl,
  ]);

  // Main effect to update all SEO elements
  useEffect(() => {
    updateTitle(seoTitle);
    updateBasicMeta();
    updateOpenGraph();
    updateTwitterCard();
    updateCanonical();
    addPageStructuredData();
  }, [
    seoTitle,
    seoDescription,
    seoKeywords,
    seoImage,
    seoUrl,
    type,
    author,
    section,
    publishedTime,
    modifiedTime,
  ]);

  // Return useful functions for manual SEO updates
  return {
    updateTitle,
    updateMetaContent,
    updateOpenGraph,
    updateTwitterCard,
    updateBasicMeta,
    updateCanonical,
    seoData: {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
      image: seoImage,
      url: seoUrl,
      type,
      author,
    },
  };
};

/**
 * Predefined SEO configurations for common pages
 */
export const seoConfigs = {
  home: {
    title: `${personalData.fullName} - AI Prompt Specialist | Software Engineer - Portfolio`,
    description: `${personalData.fullName} - Professional AI Engineer & Software Developer specializing in machine learning, prompt engineering, and full-stack development. Explore my portfolio of AI-powered applications and innovative solutions.`,
    keywords: `${personalData.fullName}, Precious Okoyen, AI Engineer, Machine Learning, Prompt Engineering, Software Developer, Portfolio`,
    section: 'home',
  },

  about: {
    title: `About ${personalData.fullName} - AI Engineer & Technology Leader`,
    description: `Learn more about ${personalData.fullName}'s background, expertise in AI engineering, machine learning, and professional journey in technology innovation.`,
    keywords: `About ${personalData.fullName}, AI Engineer Background, Machine Learning Expert, Technology Leader`,
    section: 'about',
  },

  skills: {
    title: `${personalData.fullName} - Technical Skills | AI, ML & Software Development`,
    description: `Explore ${personalData.fullName}'s comprehensive technical skills in AI, machine learning, prompt engineering, and software development technologies.`,
    keywords: `${personalData.fullName} Skills, AI Skills, Machine Learning, Python, TensorFlow, React, Technical Expertise`,
    section: 'skills',
  },

  projects: {
    title: `${personalData.fullName} - AI Projects Portfolio | Machine Learning Applications`,
    description: `Discover ${personalData.fullName}'s innovative AI and machine learning projects, from prompt engineering platforms to neural network applications.`,
    keywords: `${personalData.fullName} Projects, AI Projects, Machine Learning Applications, Software Portfolio`,
    section: 'projects',
  },

  experience: {
    title: `${personalData.fullName} - Professional Experience | AI Engineering Career`,
    description: `${personalData.fullName}'s professional experience as AI Engineer, including roles at leading technology companies and achievements in machine learning.`,
    keywords: `${personalData.fullName} Experience, AI Engineer Career, Machine Learning Jobs, Professional Background`,
    section: 'experience',
  },

  contact: {
    title: `Contact ${personalData.fullName} - AI Engineer & Technology Consultant`,
    description: `Get in touch with ${personalData.fullName} for AI engineering opportunities, consulting, or collaboration on machine learning projects.`,
    keywords: `Contact ${personalData.fullName}, AI Engineer Contact, Machine Learning Consultant, Technology Collaboration`,
    section: 'contact',
  },
};

/**
 * Hook for using predefined SEO configurations
 */
export const usePageSEO = (pageKey, customConfig = {}) => {
  const config = {
    ...seoConfigs[pageKey],
    ...customConfig,
  };

  return useSEO(config);
};

/**
 * Hook for project-specific SEO
 */
export const useProjectSEO = project => {
  const config = {
    title: `${project.title} - ${personalData.fullName} | AI Project Portfolio`,
    description: `${project.description} Developed by ${personalData.fullName}, AI Engineer specializing in ${project.category}.`,
    keywords: `${project.title}, ${personalData.fullName}, ${project.technologies.join(', ')}, AI Project`,
    type: 'article',
    section: 'projects',
    image: project.image,
    publishedTime: project.startDate,
    modifiedTime: project.endDate,
  };

  return useSEO(config);
};

/**
 * Hook for blog post SEO (if blog is added)
 */
export const useBlogSEO = post => {
  const config = {
    title: `${post.title} - ${personalData.fullName} Blog`,
    description: post.excerpt || post.description,
    keywords: `${post.tags?.join(', ')}, ${personalData.fullName}, AI Blog, Technology`,
    type: 'article',
    section: 'blog',
    image: post.featuredImage,
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedDate,
  };

  return useSEO(config);
};

/**
 * Utility functions for SEO management
 */
export const seoUtils = {
  // Generate dynamic title based on section
  generateTitle: (section, customTitle) => {
    const base = `${personalData.fullName} - AI Engineer Portfolio`;
    if (customTitle) return `${customTitle} - ${base}`;

    const sectionTitles = {
      home: base,
      about: `About - ${base}`,
      skills: `Skills - ${base}`,
      projects: `Projects - ${base}`,
      experience: `Experience - ${base}`,
      contact: `Contact - ${base}`,
    };

    return sectionTitles[section] || base;
  },

  // Generate dynamic description
  generateDescription: (section, customDescription) => {
    if (customDescription) return customDescription;

    const baseDescription = personalData.seo.description;
    const sectionDescriptions = {
      home: baseDescription,
      about: `Learn more about ${personalData.fullName}'s background and expertise in AI engineering.`,
      skills: `Explore ${personalData.fullName}'s technical skills and expertise.`,
      projects: `Discover ${personalData.fullName}'s innovative AI and machine learning projects.`,
      experience: `${personalData.fullName}'s professional experience and career achievements.`,
      contact: `Get in touch with ${personalData.fullName} for opportunities and collaboration.`,
    };

    return sectionDescriptions[section] || baseDescription;
  },

  // Generate keywords for a section
  generateKeywords: (section, additionalKeywords = []) => {
    const baseKeywords = personalData.seo.keywords;
    const sectionKeywords = {
      home: [],
      about: ['About', 'Background', 'Biography'],
      skills: ['Skills', 'Technical Skills', 'Expertise'],
      projects: ['Projects', 'Portfolio', 'Work'],
      experience: ['Experience', 'Career', 'Professional Background'],
      contact: ['Contact', 'Hire', 'Consulting'],
    };

    return [
      ...baseKeywords,
      ...(sectionKeywords[section] || []),
      ...additionalKeywords,
    ].join(', ');
  },
};

export default useSEO;
