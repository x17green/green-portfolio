import PropTypes from 'prop-types';
import { personalData } from '../data/personal';
import { skillsData } from '../data/skills';
import { computedDataCache, userPrefsCache, imageCache } from '../utils/cache';
import { storage, userPrefs } from '../utils/storage';
import { experienceService } from './experienceService';
import { projectService } from './projectService';

// Application Service for Global Data and Cache Management

class AppService {
  constructor() {
    this.cache = computedDataCache;
    this.userCache = userPrefsCache;
    this.imgCache = imageCache;
    this.initialized = false;

    // Cache key prefixes
    this.CACHE_KEYS = {
      APP_STATS: 'app_statistics',
      PERSONAL_DATA: 'personal_data',
      SKILLS_DATA: 'skills_data',
      GLOBAL_SEARCH: 'global_search_',
      USER_PREFERENCES: 'user_preferences',
      APP_CONFIG: 'app_config',
      PERFORMANCE_METRICS: 'performance_metrics',
      NAVIGATION_STATS: 'navigation_stats',
      THEME_STATS: 'theme_usage_stats',
    };

    // Initialize on creation
    this.initialize();
  }

  // Initialize the application service
  async initialize() {
    if (this.initialized) return;

    try {
      // Preload critical data
      await this.preloadCriticalData();

      // Setup performance monitoring
      this.setupPerformanceMonitoring();

      // Setup storage listeners
      this.setupStorageListeners();

      this.initialized = true;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.log('AppService initialized successfully');
      }
    } catch (error) {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.error('Failed to initialize AppService:', error);
    }
  }

  // Preload critical data for better performance
  async preloadCriticalData() {
    // Preload project and experience data
    projectService.preloadCache();
    experienceService.preloadCache();

    // Cache personal data
    this.getPersonalData();

    // Cache skills data
    this.getSkillsData();

    // Load user preferences
    this.getUserPreferences();
  }

  // Get personal data with caching
  getPersonalData() {
    const cached = this.cache.get(this.CACHE_KEYS.PERSONAL_DATA);
    if (cached) return cached;

    // Clone to prevent mutations
    const data = JSON.parse(JSON.stringify(personalData));
    this.cache.set(this.CACHE_KEYS.PERSONAL_DATA, data);
    return data;
  }

  // Get skills data with caching
  getSkillsData() {
    const cached = this.cache.get(this.CACHE_KEYS.SKILLS_DATA);
    if (cached) return cached;

    // Clone to prevent mutations
    const data = JSON.parse(JSON.stringify(skillsData));
    this.cache.set(this.CACHE_KEYS.SKILLS_DATA, data);
    return data;
  }

  // Get comprehensive application statistics
  getAppStatistics() {
    const cached = this.cache.get(this.CACHE_KEYS.APP_STATS);
    if (cached) return cached;

    const projectStats = projectService.getProjectStats();
    const experienceStats = experienceService.getExperienceStats();
    const personalData = this.getPersonalData();
    const skillsData = this.getSkillsData();

    const stats = {
      projects: projectStats,
      experience: experienceStats,
      personal: {
        name: personalData.name,
        title: personalData.title,
        location: personalData.location,
        socialLinks: Object.keys(personalData.social || {}).length,
      },
      skills: {
        categories: Object.keys(skillsData).length,
        totalSkills: Object.values(skillsData).reduce(
          (total, category) => total + (category.length || 0),
          0
        ),
      },
      cache: this.getCacheStatistics(),
      lastUpdated: new Date().toISOString(),
    };

    this.cache.set(this.CACHE_KEYS.APP_STATS, stats);
    return stats;
  }

  // Global search across all data
  globalSearch(query) {
    if (!query || query.trim().length < 2) {
      return {
        projects: projectService.getAllProjects(),
        experience: experienceService.getAllExperience(),
        education: experienceService.getAllEducation(),
        certifications: experienceService.getAllCertifications(),
        skills: this.getSkillsData(),
      };
    }

    const normalizedQuery = query.toLowerCase().trim();
    const cacheKey = this.CACHE_KEYS.GLOBAL_SEARCH + normalizedQuery;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const results = {
      projects: projectService.searchProjects(query),
      ...experienceService.searchExperience(query),
      skills: this.searchSkills(query),
      personal: this.searchPersonalData(query),
    };

    // Add relevance scores
    results.summary = {
      totalResults:
        results.projects.length +
        results.experience.length +
        results.education.length +
        results.certifications.length +
        results.skills.length,
      query: normalizedQuery,
      timestamp: Date.now(),
    };

    this.cache.set(cacheKey, results);
    return results;
  }

  // Search skills data
  searchSkills(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const skillsData = this.getSkillsData();
    const matchedSkills = [];

    Object.entries(skillsData).forEach(([category, skills]) => {
      if (Array.isArray(skills)) {
        skills.forEach(skill => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          if (skillName.toLowerCase().includes(normalizedQuery)) {
            matchedSkills.push({
              skill: skillName,
              category,
              level: typeof skill === 'object' ? skill.level : undefined,
            });
          }
        });
      }
    });

    return matchedSkills;
  }

  // Search personal data
  searchPersonalData(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const personal = this.getPersonalData();
    const matches = [];

    // Search in various personal data fields
    const searchableFields = [
      'name',
      'title',
      'bio',
      'description',
      'location',
    ];

    searchableFields.forEach(field => {
      if (
        personal[field] &&
        personal[field].toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          field,
          value: personal[field],
          type: 'personal',
        });
      }
    });

    // Search in about content if available
    if (personal.about && personal.about.content) {
      personal.about.content.forEach((paragraph, index) => {
        if (paragraph.toLowerCase().includes(normalizedQuery)) {
          matches.push({
            field: 'about',
            value: paragraph,
            type: 'about',
            index,
          });
        }
      });
    }

    return matches;
  }

  // User preferences management
  getUserPreferences() {
    const cached = this.userCache.get(this.CACHE_KEYS.USER_PREFERENCES);
    if (cached) return cached;

    const preferences = {
      theme: userPrefs.getTheme(),
      language: userPrefs.getLanguage(),
      settings: userPrefs.getSettings(),
      recentItems: userPrefs.getRecentItems(),
      visitCount: this.getVisitCount(),
      lastVisit: this.getLastVisit(),
    };

    this.userCache.set(this.CACHE_KEYS.USER_PREFERENCES, preferences);
    return preferences;
  }

  // Update user preferences
  updateUserPreferences(newPrefs) {
    const currentPrefs = this.getUserPreferences();
    const updatedPrefs = { ...currentPrefs, ...newPrefs };

    // Update individual storage items
    if (newPrefs.theme) userPrefs.setTheme(newPrefs.theme);
    if (newPrefs.language) userPrefs.setLanguage(newPrefs.language);
    if (newPrefs.settings) userPrefs.setSettings(newPrefs.settings);

    // Update cache
    this.userCache.set(this.CACHE_KEYS.USER_PREFERENCES, updatedPrefs);

    return updatedPrefs;
  }

  // Track user visit
  trackVisit() {
    const visitCount = this.getVisitCount() + 1;
    const timestamp = Date.now();

    storage.setItem('visit_count', visitCount);
    storage.setItem('last_visit', timestamp);

    // Clear cached preferences to force refresh
    this.userCache.delete(this.CACHE_KEYS.USER_PREFERENCES);

    return { visitCount, timestamp };
  }

  // Get visit count
  getVisitCount() {
    return storage.getItem('visit_count', 0);
  }

  // Get last visit timestamp
  getLastVisit() {
    return storage.getItem('last_visit', Date.now());
  }

  // Performance monitoring
  setupPerformanceMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor cache performance
    this.trackCachePerformance();

    // Monitor navigation patterns
    this.trackNavigationPatterns();
  }

  // Track cache performance
  trackCachePerformance() {
    const cacheStats = this.getCacheStatistics();

    this.cache.set(this.CACHE_KEYS.PERFORMANCE_METRICS, {
      ...cacheStats,
      timestamp: Date.now(),
      memoryUsage: this.getMemoryUsage(),
    });
  }

  // Get memory usage if available
  getMemoryUsage() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  // Track navigation patterns
  trackNavigationPatterns() {
    const navStats = storage.getItem('navigation_stats', {
      pageViews: {},
      totalViews: 0,
      lastUpdated: Date.now(),
    });

    this.cache.set(this.CACHE_KEYS.NAVIGATION_STATS, navStats);
  }

  // Record page view
  recordPageView(page) {
    const navStats = this.cache.get(this.CACHE_KEYS.NAVIGATION_STATS) || {
      pageViews: {},
      totalViews: 0,
    };

    navStats.pageViews[page] = (navStats.pageViews[page] || 0) + 1;
    navStats.totalViews += 1;
    navStats.lastUpdated = Date.now();

    this.cache.set(this.CACHE_KEYS.NAVIGATION_STATS, navStats);
    storage.setItem('navigation_stats', navStats);

    return navStats;
  }

  // Setup storage event listeners
  setupStorageListeners() {
    // Listen for theme changes across tabs
    storage.addListener('theme', ({ value }) => {
      this.userCache.delete(this.CACHE_KEYS.USER_PREFERENCES);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.log('Theme changed to:', value);
      }
    });

    // Listen for settings changes
    storage.addListener('settings', ({ value }) => {
      this.userCache.delete(this.CACHE_KEYS.USER_PREFERENCES);
    });
  }

  // Get comprehensive cache statistics
  getCacheStatistics() {
    return {
      app: this.cache.getStats(),
      user: this.userCache.getStats(),
      images: this.imgCache.getStats(),
      projects: projectService.getCacheStats(),
      experience: experienceService.getCacheStats(),
    };
  }

  // Clear all application caches
  clearAllCaches() {
    this.cache.clear();
    this.userCache.clear();
    this.imgCache.clear();
    projectService.clearCache();
    experienceService.clearCache();

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.log('All application caches cleared');
    }
  }

  // Export application data
  exportData() {
    return {
      statistics: this.getAppStatistics(),
      preferences: this.getUserPreferences(),
      cacheStats: this.getCacheStatistics(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  // Get application health status
  getHealthStatus() {
    const cacheStats = this.getCacheStatistics();
    const totalCacheSize = Object.values(cacheStats).reduce(
      (total, stat) => total + (stat.size || 0),
      0
    );

    return {
      status: 'healthy',
      initialized: this.initialized,
      cacheSize: totalCacheSize,
      services: {
        projects: projectService.getCacheStats().size > 0,
        experience: experienceService.getCacheStats().size > 0,
        app: this.cache.size() > 0,
      },
      timestamp: Date.now(),
    };
  }

  // Optimization recommendations
  getOptimizationRecommendations() {
    const cacheStats = this.getCacheStatistics();
    const recommendations = [];

    // Check cache hit rates
    Object.entries(cacheStats).forEach(([service, stats]) => {
      const hitRate = parseFloat(stats.hitRate?.replace('%', '') || 0);

      if (hitRate < 50) {
        recommendations.push({
          type: 'cache_performance',
          service,
          message: `Low cache hit rate (${stats.hitRate}) for ${service}`,
          suggestion: 'Consider preloading frequently accessed data',
        });
      }
    });

    // Check cache sizes
    const totalCacheItems = Object.values(cacheStats).reduce(
      (total, stat) => total + (stat.size || 0),
      0
    );

    if (totalCacheItems > 1000) {
      recommendations.push({
        type: 'memory_usage',
        message: `High cache usage: ${totalCacheItems} items`,
        suggestion:
          'Consider reducing cache sizes or implementing more aggressive cleanup',
      });
    }

    return recommendations;
  }
}

// Create singleton instance
export const appService = new AppService();

// Export individual methods for easier importing
export const {
  getAppStatistics,
  globalSearch,
  getUserPreferences,
  updateUserPreferences,
  trackVisit,
  recordPageView,
  getCacheStatistics,
  clearAllCaches,
  exportData,
  getHealthStatus,
  getOptimizationRecommendations,
} = appService;

appService.propTypes = {
  this: PropTypes.object,
  process: PropTypes.object,
  console: PropTypes.object,
  projectService: PropTypes.object,
  experienceService: PropTypes.object,
  JSON: PropTypes.object,
  personalData: PropTypes.object,
  Object: PropTypes.object,
  category: PropTypes.object,
  query: PropTypes.object,
  results: PropTypes.object,
  Date: PropTypes.object,
  Array: PropTypes.object,
  skills: PropTypes.object,
  skill: PropTypes.object,
  skillName: PropTypes.object,
  matchedSkills: PropTypes.object,
  searchableFields: PropTypes.object,
  matches: PropTypes.object,
  personal: PropTypes.object,
  content: PropTypes.object,
  paragraph: PropTypes.object,
  userPrefs: PropTypes.object,
  newPrefs: PropTypes.object,
  storage: PropTypes.object,
  performance: PropTypes.object,
  navStats: PropTypes.object,
  stat: PropTypes.object,
  stats: PropTypes.object,
  recommendations: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  index: PropTypes.number,
  count: PropTypes.number,
  size: PropTypes.number,
  loading: PropTypes.bool,
};

export default appService;
