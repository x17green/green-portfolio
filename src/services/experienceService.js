import PropTypes from 'prop-types';
import { experienceData } from '../data/experience';
import { computedDataCache, userPrefsCache } from '../utils/cache';

// Experience Service with Comprehensive Caching

class ExperienceService {
  constructor() {
    this.cache = computedDataCache;
    this.prefsCache = userPrefsCache;

    // Cache key prefixes
    this.CACHE_KEYS = {
      ALL_EXPERIENCE: 'all_experience',
      ALL_EDUCATION: 'all_education',
      ALL_CERTIFICATIONS: 'all_certifications',
      CURRENT_ROLE: 'current_role',
      EXPERIENCE_STATS: 'experience_stats',
      SKILLS_FROM_EXP: 'skills_from_experience',
      TIMELINE: 'experience_timeline',
      FILTERED_EXP: 'filtered_experience_',
      COMPANY_LIST: 'company_list',
      TECH_EXPERIENCE: 'tech_experience_',
    };
  }

  // Get all work experience with caching
  getAllExperience() {
    const cached = this.cache.get(this.CACHE_KEYS.ALL_EXPERIENCE);
    if (cached) return cached;

    const experience = experienceData.work || [];
    this.cache.set(this.CACHE_KEYS.ALL_EXPERIENCE, experience);
    return experience;
  }

  // Get all education with caching
  getAllEducation() {
    const cached = this.cache.get(this.CACHE_KEYS.ALL_EDUCATION);
    if (cached) return cached;

    const education = experienceData.education || [];
    this.cache.set(this.CACHE_KEYS.ALL_EDUCATION, education);
    return education;
  }

  // Get all certifications with caching
  getAllCertifications() {
    const cached = this.cache.get(this.CACHE_KEYS.ALL_CERTIFICATIONS);
    if (cached) return cached;

    const certifications = experienceData.certifications || [];
    this.cache.set(this.CACHE_KEYS.ALL_CERTIFICATIONS, certifications);
    return certifications;
  }

  // Get current role with caching
  getCurrentRole() {
    const cached = this.cache.get(this.CACHE_KEYS.CURRENT_ROLE);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const current = experience.find(exp => exp.current) || experience[0];

    this.cache.set(this.CACHE_KEYS.CURRENT_ROLE, current);
    return current;
  }

  // Get experience statistics with caching
  getExperienceStats() {
    const cached = this.cache.get(this.CACHE_KEYS.EXPERIENCE_STATS);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const education = this.getAllEducation();
    const certifications = this.getAllCertifications();

    const stats = {
      totalExperience: experience.length,
      totalEducation: education.length,
      totalCertifications: certifications.length,
      yearsOfExperience: this.calculateTotalYears(experience),
      companiesWorked: this.getUniqueCompanies().length,
      currentRole: this.getCurrentRole()?.title || 'Not specified',
      mostUsedTechnologies: this.getMostUsedTechnologies(),
      industryDistribution: this.getIndustryDistribution(),
    };

    this.cache.set(this.CACHE_KEYS.EXPERIENCE_STATS, stats);
    return stats;
  }

  // Calculate total years of experience
  calculateTotalYears(experience) {
    let totalMonths = 0;

    experience.forEach(exp => {
      const startDate = new Date(
        exp.startDate || exp.period?.start || '2020-01-01'
      );
      const endDate = exp.current
        ? new Date()
        : new Date(exp.endDate || exp.period?.end || startDate);

      const monthsDiff =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

      totalMonths += Math.max(0, monthsDiff);
    });

    return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
  }

  // Get unique companies worked at
  getUniqueCompanies() {
    const cached = this.cache.get(this.CACHE_KEYS.COMPANY_LIST);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const companies = [...new Set(experience.map(exp => exp.company))];

    this.cache.set(this.CACHE_KEYS.COMPANY_LIST, companies);
    return companies;
  }

  // Get most used technologies from experience
  getMostUsedTechnologies(limit = 10) {
    const cached = this.cache.get(this.CACHE_KEYS.SKILLS_FROM_EXP);
    if (cached) return cached.slice(0, limit);

    const experience = this.getAllExperience();
    const techCount = {};

    experience.forEach(exp => {
      const technologies = exp.technologies || exp.skills || [];
      technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    const sortedTech = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .map(([tech, count]) => ({ technology: tech, count }));

    this.cache.set(this.CACHE_KEYS.SKILLS_FROM_EXP, sortedTech);
    return sortedTech.slice(0, limit);
  }

  // Get industry distribution
  getIndustryDistribution() {
    const experience = this.getAllExperience();
    const industryCount = {};

    experience.forEach(exp => {
      const industry = exp.industry || exp.sector || 'Technology';
      industryCount[industry] = (industryCount[industry] || 0) + 1;
    });

    return industryCount;
  }

  // Get experience timeline with caching
  getExperienceTimeline() {
    const cached = this.cache.get(this.CACHE_KEYS.TIMELINE);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const education = this.getAllEducation();

    const timeline = [
      ...experience.map(exp => ({
        ...exp,
        type: 'work',
        startDate: exp.startDate || exp.period?.start,
        endDate: exp.endDate || exp.period?.end,
      })),
      ...education.map(edu => ({
        ...edu,
        type: 'education',
        startDate: edu.startDate || edu.period?.start,
        endDate: edu.endDate || edu.period?.end,
      })),
    ].sort((a, b) => {
      const aDate = new Date(a.startDate || '2020-01-01');
      const bDate = new Date(b.startDate || '2020-01-01');
      return bDate - aDate; // Most recent first
    });

    this.cache.set(this.CACHE_KEYS.TIMELINE, timeline);
    return timeline;
  }

  // Filter experience by technology
  getExperienceByTechnology(tech) {
    const cacheKey = this.CACHE_KEYS.TECH_EXPERIENCE + tech.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const filtered = experience.filter(exp => {
      const technologies = exp.technologies || exp.skills || [];
      return technologies.some(technology =>
        technology.toLowerCase().includes(tech.toLowerCase())
      );
    });

    this.cache.set(cacheKey, filtered);
    return filtered;
  }

  // Get experience by company
  getExperienceByCompany(company) {
    const cacheKey = this.CACHE_KEYS.FILTERED_EXP + company.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const experience = this.getAllExperience();
    const filtered = experience.filter(exp =>
      exp.company.toLowerCase().includes(company.toLowerCase())
    );

    this.cache.set(cacheKey, filtered);
    return filtered;
  }

  // Get recent experience (last N positions)
  getRecentExperience(limit = 3) {
    const experience = this.getAllExperience();
    return experience
      .sort((a, b) => {
        const aDate = new Date(a.startDate || a.period?.start || '2020-01-01');
        const bDate = new Date(b.startDate || b.period?.start || '2020-01-01');
        return bDate - aDate;
      })
      .slice(0, limit);
  }

  // Get experience highlights
  getExperienceHighlights() {
    const experience = this.getAllExperience();
    const highlights = [];

    experience.forEach(exp => {
      if (exp.achievements && exp.achievements.length > 0) {
        highlights.push({
          company: exp.company,
          title: exp.title,
          achievements: exp.achievements,
          period:
            exp.period || `${exp.startDate} - ${exp.endDate || 'Present'}`,
        });
      }
    });

    return highlights;
  }

  // Get skill progression over time
  getSkillProgression() {
    const timeline = this.getExperienceTimeline();
    const skillProgression = {};

    timeline.forEach(item => {
      const skills = item.technologies || item.skills || [];
      const year = new Date(item.startDate || '2020-01-01').getFullYear();

      skills.forEach(skill => {
        if (!skillProgression[skill]) {
          skillProgression[skill] = {};
        }
        skillProgression[skill][year] =
          (skillProgression[skill][year] || 0) + 1;
      });
    });

    return skillProgression;
  }

  // Search experience and education
  searchExperience(query) {
    if (!query || query.trim().length < 2) {
      return {
        experience: this.getAllExperience(),
        education: this.getAllEducation(),
        certifications: this.getAllCertifications(),
      };
    }

    const normalizedQuery = query.toLowerCase().trim();
    const experience = this.getAllExperience();
    const education = this.getAllEducation();
    const certifications = this.getAllCertifications();

    const searchInItem = item => {
      const searchableText = [
        item.title || item.degree || item.name,
        item.company || item.institution || item.issuer,
        item.description,
        ...(item.technologies || item.skills || []),
        ...(item.responsibilities || []),
        ...(item.achievements || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    };

    return {
      experience: experience.filter(searchInItem),
      education: education.filter(searchInItem),
      certifications: certifications.filter(searchInItem),
    };
  }

  // Get years of experience with specific technology
  getYearsWithTechnology(tech) {
    const experience = this.getExperienceByTechnology(tech);
    return this.calculateTotalYears(experience);
  }

  // Clear all caches
  clearCache() {
    this.cache.clear();
  }

  // Clear specific cache
  clearSpecificCache(key) {
    this.cache.delete(key);
  }

  // Get cache statistics
  getCacheStats() {
    return this.cache.getStats();
  }

  // Preload commonly accessed data
  preloadCache() {
    this.getAllExperience();
    this.getAllEducation();
    this.getAllCertifications();
    this.getCurrentRole();
    this.getExperienceStats();
    this.getExperienceTimeline();
    this.getUniqueCompanies();

    // Preload common technologies
    const commonTechs = ['React', 'Python', 'JavaScript', 'Node.js', 'AI'];
    commonTechs.forEach(tech => {
      this.getExperienceByTechnology(tech);
    });
  }
}

// Create singleton instance
export const experienceService = new ExperienceService();

// Export individual methods for easier importing
export const {
  getAllExperience,
  getAllEducation,
  getAllCertifications,
  getCurrentRole,
  getExperienceStats,
  getExperienceTimeline,
  getExperienceByTechnology,
  getExperienceByCompany,
  getRecentExperience,
  getMostUsedTechnologies,
  searchExperience,
  getYearsWithTechnology,
  clearCache,
  getCacheStats,
  preloadCache,
} = experienceService;

experienceService.propTypes = {
  this: PropTypes.object,
  experienceData: PropTypes.object,
  experience: PropTypes.object,
  exp: PropTypes.object,
  education: PropTypes.object,
  certifications: PropTypes.object,
  endDate: PropTypes.object,
  startDate: PropTypes.object,
  Math: PropTypes.object,
  cached: PropTypes.object,
  technologies: PropTypes.object,
  Object: PropTypes.object,
  sortedTech: PropTypes.object,
  edu: PropTypes.object,
  tech: PropTypes.object,
  technology: PropTypes.object,
  company: PropTypes.object,
  highlights: PropTypes.object,
  timeline: PropTypes.object,
  item: PropTypes.object,
  skills: PropTypes.object,
  query: PropTypes.object,
  searchableText: PropTypes.object,
  Node: PropTypes.object,
  commonTechs: PropTypes.object,
  title: PropTypes.string,
  name: PropTypes.string,
  count: PropTypes.number,
};

export default experienceService;
