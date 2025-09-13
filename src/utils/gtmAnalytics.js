// Google Tag Manager Analytics Utility
// GTM Container ID: GTM-WBNKPMQK
// GA4 Property ID: G-GC70XBEHGJ (configured within GTM)

/**
 * Check if GTM dataLayer is available
 * @returns {boolean} True if dataLayer is available
 */
export const isDataLayerAvailable = () => {
  return typeof window !== 'undefined' && Array.isArray(window.dataLayer);
};

/**
 * Push data to GTM dataLayer
 * @param {Object} data - Data to push to dataLayer
 */
export const pushToDataLayer = data => {
  if (!isDataLayerAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('GTM dataLayer not available:', data);
    }
    return;
  }

  window.dataLayer.push(data);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('📊 GTM Event pushed:', data);
  }
};

/**
 * Track page views
 * @param {string} pageTitle - The title of the page
 * @param {string} pagePath - The path of the page
 */
export const trackPageView = (
  pageTitle,
  pagePath = window.location.pathname
) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
    content_group1: 'Portfolio',
    user_properties: {
      visitor_type: 'portfolio_visitor',
      site_section: 'main',
    },
  });
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  pushToDataLayer({
    event: eventName,
    event_category: eventParams.category || 'engagement',
    event_action: eventParams.action || eventName,
    event_label: eventParams.label || '',
    value: eventParams.value || undefined,
    // Preserve all custom parameters
    ...eventParams,
    // Add timestamp for debugging
    event_timestamp: new Date().toISOString(),
  });
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
  pushToDataLayer({
    event: 'file_download',
    event_category: 'file_download',
    event_action: 'download',
    event_label: fileName,
    file_name: fileName,
    file_type: 'pdf',
    download_type: downloadType,
    download_source: 'portfolio',
    description: 'User downloaded resume PDF',
  });
};

/**
 * Track contact form interactions
 * @param {string} action - The action taken (form_start, form_submit, form_error)
 * @param {Object} formData - Additional form data
 */
export const trackContactForm = (action, formData = {}) => {
  pushToDataLayer({
    event: 'form_interaction',
    event_category: 'form_interaction',
    event_action: action,
    event_label: formData.formName || 'contact_form',
    form_name: formData.formName || 'contact_form',
    form_action: action,
    // Include relevant form data without PII
    has_name: !!formData.hasName,
    has_email: !!formData.hasEmail,
    has_subject: !!formData.hasSubject,
    has_message: !!formData.hasMessage,
    subject_category: formData.subject || '',
    contact_method: formData.contactMethod || '',
    ...formData,
  });
};

/**
 * Track social media clicks
 * @param {string} platform - Social media platform (linkedin, github, twitter, etc.)
 * @param {string} profileUrl - URL of the social profile
 */
export const trackSocialClick = (platform, profileUrl = '') => {
  pushToDataLayer({
    event: 'social_interaction',
    event_category: 'social_media',
    event_action: 'click',
    event_label: platform,
    social_platform: platform,
    link_url: profileUrl,
    outbound_click: true,
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
  pushToDataLayer({
    event: 'project_interaction',
    event_category: 'portfolio_engagement',
    event_action: action,
    event_label: `${projectName}_${action}`,
    project_name: projectName,
    project_action: action,
    project_url: projectUrl,
    outbound_click: !!projectUrl,
  });
};

/**
 * Track skill card interactions
 * @param {string} skillName - Name of the skill
 * @param {string} action - Action taken (expand_details, collapse_details)
 * @param {string} category - Skill category (AI, Technical, Tools, Soft)
 */
export const trackSkillInteraction = (skillName, action, category = '') => {
  pushToDataLayer({
    event: 'skill_interaction',
    event_category: 'skills_engagement',
    event_action: action,
    event_label: `${skillName}_${action}`,
    skill_name: skillName,
    skill_category: category,
    skill_action: action,
  });
};

/**
 * Track navigation events
 * @param {string} section - Section navigated to (hero, about, skills, etc.)
 * @param {string} method - How navigation occurred (scroll, click, direct)
 */
export const trackNavigation = (section, method = 'click') => {
  pushToDataLayer({
    event: 'navigation',
    event_category: 'site_navigation',
    event_action: method,
    event_label: `${section}_${method}`,
    navigation_destination: section,
    navigation_method: method,
    navigation_source:
      method === 'footer_click'
        ? 'footer'
        : method === 'click'
          ? 'header'
          : 'other',
  });
};

/**
 * Track theme changes
 * @param {string} theme - Theme selected (light, dark)
 * @param {Object} metadata - Additional metadata about the theme change
 */
export const trackThemeChange = (theme, metadata = {}) => {
  pushToDataLayer({
    event: 'user_preference',
    event_category: 'user_preference',
    event_action: 'theme_change',
    event_label: theme,
    theme_selected: theme,
    theme_source: metadata.source || 'manual',
    previous_theme: metadata.previousTheme || null,
    is_system_preference: metadata.isSystemPreference || false,
    preference_method: metadata.method || 'toggle',
    description: `User changed theme to ${theme} mode`,
    ...metadata,
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
    pushToDataLayer({
      event: 'scroll_depth',
      event_category: 'user_engagement',
      event_action: 'scroll',
      event_label: `${percentage}%`,
      scroll_percentage: percentage,
      scroll_milestone: `${percentage}_percent`,
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
  pushToDataLayer({
    event: 'site_search',
    event_category: 'site_search',
    event_action: 'search',
    event_label: query,
    search_term: query,
    search_results: results,
    has_results: results > 0,
  });
};

/**
 * Track error events
 * @param {string} errorType - Type of error (javascript_error, network_error, etc.)
 * @param {string} errorMessage - Error message
 * @param {string} errorLocation - Where the error occurred
 */
export const trackError = (errorType, errorMessage, errorLocation = '') => {
  pushToDataLayer({
    event: 'exception',
    event_category: 'technical_issues',
    event_action: 'error',
    event_label: errorType,
    error_type: errorType,
    error_message: errorMessage.substring(0, 150), // Limit message length
    error_location: errorLocation,
    fatal: false,
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
  pushToDataLayer({
    event: 'performance_metric',
    event_category: 'web_vitals',
    event_action: 'measurement',
    event_label: metric,
    metric_name: metric,
    metric_value: Math.round(value),
    metric_unit: unit,
    custom_metric_1: value, // For GA4 custom metrics
    description: `Performance metric: ${metric}`,
  });
};

/**
 * Track user engagement time
 * @param {number} timeSpent - Time spent on page in seconds
 * @param {string} section - Section where time was spent
 */
export const trackEngagementTime = (timeSpent, section = 'page') => {
  pushToDataLayer({
    event: 'user_engagement',
    event_category: 'user_engagement',
    event_action: 'time_spent',
    event_label: section,
    engagement_time_msec: Math.round(timeSpent * 1000),
    time_spent_seconds: Math.round(timeSpent),
    section,
    description: `User spent ${Math.round(timeSpent)} seconds in ${section}`,
  });
};

/**
 * Initialize GTM with enhanced configuration
 * @param {boolean} hasConsent - Whether user has given consent for analytics
 */
export const initializeAnalytics = (hasConsent = true) => {
  if (!isDataLayerAvailable()) {
    // eslint-disable-next-line no-console
    console.warn('GTM dataLayer not available');
    return;
  }

  // Configure consent mode
  pushToDataLayer({
    event: 'consent_update',
    analytics_consent: hasConsent ? 'granted' : 'denied',
    ad_storage_consent: 'denied', // We don't use ads
    functionality_storage_consent: 'granted',
    personalization_storage_consent: 'denied',
    security_storage_consent: 'granted',
  });

  // Set user properties for better analytics
  pushToDataLayer({
    event: 'user_properties',
    user_properties: {
      visitor_type: 'portfolio_visitor',
      site_version: process.env.REACT_APP_VERSION || '1.0.0',
      build_env: process.env.NODE_ENV,
      content_category: 'portfolio',
      site_section: 'main',
    },
  });

  // Track initialization
  if (hasConsent) {
    pushToDataLayer({
      event: 'gtm_initialized',
      event_category: 'system',
      event_action: 'initialize',
      event_label: 'user_consent_granted',
      consent_granted: true,
      description: 'GTM initialized with user consent',
    });
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('📊 GTM Analytics initialized', {
      consent: hasConsent,
      dataLayerLength: window.dataLayer.length,
    });
  }
};

/**
 * Enhanced page view tracking with additional context
 * @param {string} pageTitle - Page title
 * @param {string} pagePath - Page path
 * @param {Object} additionalData - Additional page data
 */
export const trackEnhancedPageView = (
  pageTitle,
  pagePath,
  additionalData = {}
) => {
  pushToDataLayer({
    event: 'enhanced_page_view',
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
    page_referrer: document.referrer || 'direct',
    content_group1: 'Portfolio',
    content_group2: additionalData.section || 'main',
    page_load_time: performance.now(),
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    ...additionalData,
  });
};

/**
 * Batch event tracking for multiple events
 * @param {Array} events - Array of event objects
 */
export const trackBatchEvents = events => {
  if (!Array.isArray(events)) {
    // eslint-disable-next-line no-console
    console.warn('trackBatchEvents expects an array of events');
    return;
  }

  events.forEach((eventData, index) => {
    if (eventData.event) {
      // Add batch metadata
      const batchEvent = {
        ...eventData,
        batch_id: Date.now(),
        batch_index: index,
        batch_size: events.length,
      };
      pushToDataLayer(batchEvent);
    }
  });
};

/**
 * Debug function to inspect current dataLayer state
 * Only available in development mode
 */
export const debugDataLayer = () => {
  if (process.env.NODE_ENV !== 'development') {
    // eslint-disable-next-line no-console
    console.warn('debugDataLayer is only available in development mode');
    return;
  }

  if (!isDataLayerAvailable()) {
    // eslint-disable-next-line no-console
    console.log('❌ GTM dataLayer not available');
    return;
  }

  /* eslint-disable no-console */
  console.group('🔍 GTM DataLayer Debug Info');
  console.log('DataLayer Length:', window.dataLayer.length);
  console.log('Recent Events (last 10):', window.dataLayer.slice(-10));
  console.log('GTM Container Info:', window.google_tag_manager || 'Not loaded');
  console.groupEnd();
  /* eslint-enable no-console */
};

// Enhanced default export with all functions organized by category
const gtmAnalytics = {
  // Core tracking functions
  trackPageView,
  trackEvent,
  initializeAnalytics,

  // Interaction tracking
  trackSocialClick,
  trackContactForm,
  trackProjectInteraction,
  trackSkillInteraction,
  trackNavigation,

  // User behavior tracking
  trackThemeChange,
  trackScrollDepth,
  trackEngagementTime,
  trackResumeDownload,

  // Technical tracking
  trackError,
  trackPerformance,
  trackSearch,

  // Enhanced features
  trackEnhancedPageView,
  trackBatchEvents,

  // Utilities
  isDataLayerAvailable,
  pushToDataLayer,
  debugDataLayer,
};

export default gtmAnalytics;
