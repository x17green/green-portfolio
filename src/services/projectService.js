import { PropTypes } from 'prop-types';
import { projectsData, categories } from '../data/projects';
import { projectsCache, computedDataCache } from '../utils/cache';

// Project Service with Comprehensive Caching

class ProjectService {
  constructor() {
    this.cache = projectsCache;
    this.computedCache = computedDataCache;
    this.statsCache = computedDataCache;

    // Cache key prefixes
    this.CACHE_KEYS = {
      ALL_PROJECTS: 'all_projects',
      CATEGORY: 'category_',
      TECHNOLOGY: 'tech_',
      FEATURED: 'featured_projects',
      PROJECT_BY_ID: 'project_id_',
      SEARCH: 'search_',
      STATS: 'project_stats',
      FILTERED_STATS: 'filtered_stats_',
      TECH_USAGE: 'tech_usage',
      CATEGORY_COUNTS: 'category_counts',
    };
  }

  // Get all projects with caching
  getAllProjects() {
    const cached = this.cache.get(this.CACHE_KEYS.ALL_PROJECTS);
    if (cached) return cached;

    // Clone data to prevent mutations
    const projects = JSON.parse(JSON.stringify(projectsData));
    this.cache.set(this.CACHE_KEYS.ALL_PROJECTS, projects);
    return projects;
  }

  // Get projects by category with caching
  getProjectsByCategory(category) {
    if (category === 'all') {
      return this.getAllProjects();
    }

    const cacheKey = this.CACHE_KEYS.CATEGORY + category;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const filtered = projectsData.filter(
      project => project.category === category
    );

    this.cache.set(cacheKey, filtered);
    return filtered;
  }

  // Get featured projects with caching
  getFeaturedProjects() {
    const cached = this.cache.get(this.CACHE_KEYS.FEATURED);
    if (cached) return cached;

    const featured = projectsData.filter(project => project.featured);
    this.cache.set(this.CACHE_KEYS.FEATURED, featured);
    return featured;
  }

  // Get project by ID with caching
  getProjectById(id) {
    const cacheKey = this.CACHE_KEYS.PROJECT_BY_ID + id;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const project = projectsData.find(
      project => project.id === parseInt(id, 10)
    );

    if (project) {
      this.cache.set(cacheKey, project);
    }
    return project;
  }

  // Get projects by technology with caching
  getProjectsByTechnology(tech) {
    const cacheKey = this.CACHE_KEYS.TECHNOLOGY + tech.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const filtered = projectsData.filter(project =>
      project.technologies.some(technology =>
        technology.toLowerCase().includes(tech.toLowerCase())
      )
    );

    this.cache.set(cacheKey, filtered);
    return filtered;
  }

  // Search projects with caching
  searchProjects(query) {
    if (!query || query.trim().length < 2) {
      return this.getAllProjects();
    }

    const normalizedQuery = query.toLowerCase().trim();
    const cacheKey = this.CACHE_KEYS.SEARCH + normalizedQuery;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const searchResults = projectsData.filter(project => {
      const searchableText = [
        project.title,
        project.subtitle,
        project.description,
        project.longDescription,
        project.category,
        ...project.technologies,
        ...(project.features || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    this.cache.set(cacheKey, searchResults);
    return searchResults;
  }

  // Get project statistics with caching
  getProjectStats() {
    const cached = this.computedCache.get(this.CACHE_KEYS.STATS);
    if (cached) return cached;

    const stats = {
      total: projectsData.length,
      featured: projectsData.filter(p => p.featured).length,
      categories: this.getCategoryStats(),
      technologies: this.getTechnologyStats(),
      statusDistribution: this.getStatusDistribution(),
      averageMetrics: this.getAverageMetrics(),
    };

    this.computedCache.set(this.CACHE_KEYS.STATS, stats);
    return stats;
  }

  // Get category statistics
  getCategoryStats() {
    const cached = this.computedCache.get(this.CACHE_KEYS.CATEGORY_COUNTS);
    if (cached) return cached;

    const categoryStats = {};

    categories.forEach(category => {
      if (category !== 'all') {
        categoryStats[category] = projectsData.filter(
          project => project.category === category
        ).length;
      }
    });

    this.computedCache.set(this.CACHE_KEYS.CATEGORY_COUNTS, categoryStats);
    return categoryStats;
  }

  // Get technology usage statistics
  getTechnologyStats() {
    const cached = this.computedCache.get(this.CACHE_KEYS.TECH_USAGE);
    if (cached) return cached;

    const techUsage = {};

    projectsData.forEach(project => {
      project.technologies.forEach(tech => {
        techUsage[tech] = (techUsage[tech] || 0) + 1;
      });
    });

    // Sort by usage frequency
    const sortedTech = Object.entries(techUsage)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [tech, count]) => {
        acc[tech] = count;
        return acc;
      }, {});

    this.computedCache.set(this.CACHE_KEYS.TECH_USAGE, sortedTech);
    return sortedTech;
  }

  // Get status distribution
  getStatusDistribution() {
    const statusCount = {};

    projectsData.forEach(project => {
      const status = project.status || 'completed';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return statusCount;
  }

  // Get average metrics
  getAverageMetrics() {
    const metrics = {
      technologiesPerProject: 0,
      featuresPerProject: 0,
    };

    const totalTechs = projectsData.reduce(
      (sum, project) => sum + (project.technologies?.length || 0),
      0
    );

    const totalFeatures = projectsData.reduce(
      (sum, project) => sum + (project.features?.length || 0),
      0
    );

    metrics.technologiesPerProject = totalTechs / projectsData.length;
    metrics.featuresPerProject = totalFeatures / projectsData.length;

    return metrics;
  }

  // Get filtered statistics for a specific category
  getFilteredStats(category) {
    if (category === 'all') {
      return this.getProjectStats();
    }

    const cacheKey = this.CACHE_KEYS.FILTERED_STATS + category;
    const cached = this.computedCache.get(cacheKey);
    if (cached) return cached;

    const categoryProjects = this.getProjectsByCategory(category);

    const stats = {
      total: categoryProjects.length,
      featured: categoryProjects.filter(p => p.featured).length,
      technologies: this.getTechStatsForProjects(categoryProjects),
      averageMetrics: this.getAverageMetricsForProjects(categoryProjects),
    };

    this.computedCache.set(cacheKey, stats);
    return stats;
  }

  // Helper: Get technology stats for specific projects
  getTechStatsForProjects(projects) {
    const techUsage = {};

    projects.forEach(project => {
      project.technologies.forEach(tech => {
        techUsage[tech] = (techUsage[tech] || 0) + 1;
      });
    });

    return Object.entries(techUsage)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [tech, count]) => {
        acc[tech] = count;
        return acc;
      }, {});
  }

  // Helper: Get average metrics for specific projects
  getAverageMetricsForProjects(projects) {
    if (projects.length === 0)
      return { technologiesPerProject: 0, featuresPerProject: 0 };

    const totalTechs = projects.reduce(
      (sum, project) => sum + (project.technologies?.length || 0),
      0
    );

    const totalFeatures = projects.reduce(
      (sum, project) => sum + (project.features?.length || 0),
      0
    );

    return {
      technologiesPerProject: totalTechs / projects.length,
      featuresPerProject: totalFeatures / projects.length,
    };
  }

  // Get most used technologies (cached)
  getMostUsedTechnologies(limit = 10) {
    const techStats = this.getTechnologyStats();

    return Object.entries(techStats)
      .slice(0, limit)
      .map(([tech, count]) => ({ technology: tech, count }));
  }

  // Get recent projects (by ID or date if available)
  getRecentProjects(limit = 5) {
    const cacheKey = `recent_projects_${limit}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    // Sort by ID descending (assuming higher ID = more recent)
    const recent = [...projectsData]
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);

    this.cache.set(cacheKey, recent);
    return recent;
  }

  // Get related projects (by shared technologies)
  getRelatedProjects(projectId, limit = 3) {
    const cacheKey = `related_${projectId}_${limit}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const project = this.getProjectById(projectId);
    if (!project) return [];

    const related = projectsData
      .filter(p => p.id !== projectId)
      .map(p => {
        const sharedTechs = p.technologies.filter(tech =>
          project.technologies.includes(tech)
        ).length;

        return { ...p, sharedTechs };
      })
      .filter(p => p.sharedTechs > 0)
      .sort((a, b) => b.sharedTechs - a.sharedTechs)
      .slice(0, limit);

    this.cache.set(cacheKey, related);
    return related;
  }

  // Clear all caches
  clearCache() {
    this.cache.clear();
    this.computedCache.clear();
  }

  // Clear specific cache category
  clearCategoryCache(category) {
    const cacheKey = this.CACHE_KEYS.CATEGORY + category;
    this.cache.delete(cacheKey);

    // Also clear related computed stats
    const filteredStatsKey = this.CACHE_KEYS.FILTERED_STATS + category;
    this.computedCache.delete(filteredStatsKey);
  }

  // Get cache statistics
  getCacheStats() {
    return {
      project: this.cache.getStats(),
      computed: this.computedCache.getStats(),
    };
  }

  // Preload commonly accessed data
  preloadCache() {
    // Preload all categories
    categories.forEach(category => {
      if (category !== 'all') {
        this.getProjectsByCategory(category);
      }
    });

    // Preload featured projects
    this.getFeaturedProjects();

    // Preload stats
    this.getProjectStats();

    // Preload most common technologies
    const topTechs = ['React', 'Python', 'JavaScript', 'Node.js', 'TypeScript'];
    topTechs.forEach(tech => {
      this.getProjectsByTechnology(tech);
    });
  }
}

// Create singleton instance
export const projectService = new ProjectService();

// Export individual methods for easier importing
export const {
  getAllProjects,
  getProjectsByCategory,
  getFeaturedProjects,
  getProjectById,
  getProjectsByTechnology,
  searchProjects,
  getProjectStats,
  getFilteredStats,
  getMostUsedTechnologies,
  getRecentProjects,
  getRelatedProjects,
  clearCache,
  getCacheStats,
  preloadCache,
} = projectService;

projectService.propTypes = {
  this: PropTypes.object,
  JSON: PropTypes.object,
  projectsData: PropTypes.object,
  project: PropTypes.object,
  tech: PropTypes.object,
  technology: PropTypes.object,
  query: PropTypes.object,
  searchableText: PropTypes.object,
  categories: PropTypes.object,
  Object: PropTypes.object,
  metrics: PropTypes.object,
  categoryProjects: PropTypes.object,
  projects: PropTypes.object,
  Node: PropTypes.object,
  topTechs: PropTypes.object,
  title: PropTypes.string,
  count: PropTypes.number,
};

export default projectService;
