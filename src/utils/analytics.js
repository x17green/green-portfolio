// Compatibility Layer for GTM Analytics Migration
// This file maintains backward compatibility while redirecting to GTM analytics

import {
  trackPageView as gtmTrackPageView,
  trackEvent as gtmTrackEvent,
  trackResumeDownload as gtmTrackResumeDownload,
  trackContactForm as gtmTrackContactForm,
  trackSocialClick as gtmTrackSocialClick,
  trackProjectInteraction as gtmTrackProjectInteraction,
  trackSkillInteraction as gtmTrackSkillInteraction,
  trackNavigation as gtmTrackNavigation,
  trackThemeChange as gtmTrackThemeChange,
  trackScrollDepth as gtmTrackScrollDepth,
  trackSearch as gtmTrackSearch,
  trackError as gtmTrackError,
  trackPerformance as gtmTrackPerformance,
  trackEngagementTime as gtmTrackEngagementTime,
  initializeAnalytics as gtmInitializeAnalytics,
  isDataLayerAvailable,
  pushToDataLayer,
  debugDataLayer,
} from './gtmAnalytics';

// Legacy GA4 function compatibility check
export const isGtagAvailable = () => {
  // For backward compatibility, check if GTM dataLayer is available instead
  return isDataLayerAvailable();
};

// Re-export all GTM functions with the same signatures for backward compatibility
export const trackPageView = gtmTrackPageView;
export const trackEvent = gtmTrackEvent;
export const trackResumeDownload = gtmTrackResumeDownload;
export const trackContactForm = gtmTrackContactForm;
export const trackSocialClick = gtmTrackSocialClick;
export const trackProjectInteraction = gtmTrackProjectInteraction;
export const trackSkillInteraction = gtmTrackSkillInteraction;
export const trackNavigation = gtmTrackNavigation;
export const trackThemeChange = gtmTrackThemeChange;
export const trackScrollDepth = gtmTrackScrollDepth;
export const trackSearch = gtmTrackSearch;
export const trackError = gtmTrackError;
export const trackPerformance = gtmTrackPerformance;
export const trackEngagementTime = gtmTrackEngagementTime;
export const initializeAnalytics = gtmInitializeAnalytics;

// Additional utility exports
export { isDataLayerAvailable, pushToDataLayer, debugDataLayer };

// Legacy note for developers
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('📊 Analytics: Using GTM implementation via compatibility layer');
}

// Default export maintaining the same structure as before
const analyticsCompat = {
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

  // Utilities
  isGtagAvailable,
  isDataLayerAvailable,
  pushToDataLayer,
  debugDataLayer,
};

export default analyticsCompat;
