// Google Analytics utility functions for tracking events and page views
// Analytics ID: G-GC70XBEHGJ

/**
 * Check if Google Analytics is loaded and available
 * @returns {boolean} True if gtag is available
 */
export const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page views
 * @param {string} pageTitle - The title of the page
 * @param {string} pagePath - The path of the page (e.g., '/', '/about')
 */
export const trackPageView = (
  pageTitle,
  pagePath = window.location.pathname
) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not loaded');
    return;
  }

  window.gtag('config', 'G-GC70XBEHGJ', {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
  });

  console.log(`📊 Page view tracked: ${pageTitle} (${pagePath})`);
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not loaded');
    return;
  }

  window.gtag('event', eventName, {
    event_category: eventParams.category || 'engagement',
    event_label: eventParams.label || '',
    value: eventParams.value || 1,
    ...eventParams,
  });

  console.log(`📊 Event tracked: ${eventName}`, eventParams);
};

/**
 * Track resume downloads
 * @param {string} fileName - Name of the resume file
 * @param {string} downloadType - Type of download (button_click, direct_link, etc.)
 */
export const trackResumeDownload = (
  fileName = 'resume',
  downloadType = 'button_click'
) => {
  trackEvent('resume_download', {
    category: 'file_download',
    label: fileName,
    download_type: downloadType,
    description: 'User downloaded resume PDF',
  });
};

/**
 * Track contact form interactions
 * @param {string} action - The action taken (form_start, form_submit, form_error)
 * @param {Object} formData - Additional form data
 */
export const trackContactForm = (action, formData = {}) => {
  trackEvent('contact_form', {
    category: 'form_interaction',
    label: action,
    form_name: formData.formName || 'contact_form',
    ...formData,
  });
};

/**
 * Track social media clicks
 * @param {string} platform - Social media platform (linkedin, github, twitter, etc.)
 * @param {string} profileUrl - URL of the social profile
 */
export const trackSocialClick = (platform, profileUrl = '') => {
  trackEvent('social_click', {
    category: 'social_media',
    label: platform,
    link_url: profileUrl,
    description: `User clicked ${platform} profile link`,
  });
};

/**
 * Track project interactions
 * @param {string} projectName - Name of the project
 * @param {string} action - Action taken (view_demo, view_code, view_details)
 * @param {string} projectUrl - URL of the project
 */
export const trackProjectInteraction = (
  projectName,
  action,
  projectUrl = ''
) => {
  trackEvent('project_interaction', {
    category: 'portfolio_engagement',
    label: `${projectName}_${action}`,
    project_name: projectName,
    action_type: action,
    project_url: projectUrl,
  });
};

/**
 * Track skill card interactions
 * @param {string} skillName - Name of the skill
 * @param {string} action - Action taken (expand_details, collapse_details)
 * @param {string} category - Skill category (AI, Technical, Tools, Soft)
 */
export const trackSkillInteraction = (skillName, action, category = '') => {
  trackEvent('skill_interaction', {
    category: 'skills_engagement',
    label: `${skillName}_${action}`,
    skill_name: skillName,
    skill_category: category,
    action_type: action,
  });
};

/**
 * Track navigation events
 * @param {string} section - Section navigated to (hero, about, skills, etc.)
 * @param {string} method - How navigation occurred (scroll, click, direct)
 */
export const trackNavigation = (section, method = 'click') => {
  trackEvent('navigation', {
    category: 'site_navigation',
    label: `${section}_${method}`,
    destination: section,
    navigation_method: method,
  });
};

/**
 * Track theme changes
 * @param {string} theme - Theme selected (light, dark)
 */
export const trackThemeChange = theme => {
  trackEvent('theme_change', {
    category: 'user_preference',
    label: theme,
    theme_selected: theme,
    description: `User changed theme to ${theme} mode`,
  });
};

/**
 * Track scroll depth
 * @param {number} percentage - Percentage of page scrolled
 */
export const trackScrollDepth = percentage => {
  // Only track at specific milestones to avoid spam
  const milestones = [25, 50, 75, 90, 100];
  if (milestones.includes(percentage)) {
    trackEvent('scroll_depth', {
      category: 'user_engagement',
      label: `${percentage}%`,
      scroll_percentage: percentage,
      description: `User scrolled ${percentage}% of the page`,
    });
  }
};

/**
 * Track search queries (if search functionality is added)
 * @param {string} query - Search query
 * @param {number} results - Number of results returned
 */
export const trackSearch = (query, results = 0) => {
  trackEvent('search', {
    category: 'site_search',
    label: query,
    search_term: query,
    results_count: results,
  });
};

/**
 * Track error events
 * @param {string} errorType - Type of error (javascript_error, network_error, etc.)
 * @param {string} errorMessage - Error message
 * @param {string} errorLocation - Where the error occurred
 */
export const trackError = (errorType, errorMessage, errorLocation = '') => {
  trackEvent('error', {
    category: 'technical_issues',
    label: errorType,
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
    description: 'Application error occurred',
  });
};

/**
 * Track performance metrics
 * @param {string} metric - Performance metric name
 * @param {number} value - Metric value
 * @param {string} unit - Unit of measurement
 */
export const trackPerformance = (metric, value, unit = 'ms') => {
  trackEvent('performance', {
    category: 'web_vitals',
    label: metric,
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
    description: `Performance metric: ${metric}`,
  });
};

/**
 * Track user engagement time
 * @param {number} timeSpent - Time spent on page in seconds
 * @param {string} section - Section where time was spent
 */
export const trackEngagementTime = (timeSpent, section = 'page') => {
  trackEvent('engagement_time', {
    category: 'user_engagement',
    label: section,
    time_spent: timeSpent,
    section,
    description: `User spent ${timeSpent} seconds in ${section}`,
  });
};

/**
 * Initialize analytics with user consent
 * @param {boolean} hasConsent - Whether user has given consent for analytics
 */
export const initializeAnalytics = (hasConsent = true) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not available');
    return;
  }

  // Configure analytics based on consent
  window.gtag('consent', 'default', {
    analytics_storage: hasConsent ? 'granted' : 'denied',
    ad_storage: 'denied', // We don't use ads
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });

  // Track initialization
  if (hasConsent) {
    trackEvent('analytics_initialized', {
      category: 'system',
      label: 'user_consent_granted',
      description: 'Analytics initialized with user consent',
    });
  }

  console.log('📊 Google Analytics initialized', { consent: hasConsent });
};

// Default export with commonly used functions
// export default {
//   trackPageView,
//   trackEvent,
//   trackResumeDownload,
//   trackContactForm,
//   trackSocialClick,
//   trackProjectInteraction,
//   trackSkillInteraction,
//   trackNavigation,
//   trackThemeChange,
//   trackScrollDepth,
//   initializeAnalytics,
// };
