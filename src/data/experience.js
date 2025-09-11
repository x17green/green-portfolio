import {
  Psychology,
  Code,
  AutoAwesome,
  TrendingUp,
  School,
  Engineering,
  EmojiObjects,
  Security,
} from '@mui/icons-material';

export const experienceData = [
  {
    id: 1,
    company: 'AstroMANIA',
    location: 'Lagos, Nigeria (Remote)',
    type: 'Full-time',
    duration: 'Jan 2022 - Present',
    startDate: '2022-01',
    endDate: null,
    current: true,
    icon: <AutoAwesome />,
    companyLogo: '/images/companies/astromania.jpg',
    description:
      'Software Engineer & AI Prompt Specialist at AstroMANIA, leading AI integration and software development initiatives. This role combines advanced prompt engineering expertise with full-stack development skills to create innovative AI-powered solutions.',
    roles: [
      {
        id: 21,
        title: 'Software Engineer & AI Prompt Specialist',
        location: 'Lagos, Nigeria (Remote)',
        duration: 'Jan 2022 - Present',
        startDate: '2022-01',
        endDate: null,
        current: true,
        description:
          'Leading AI integration and software development initiatives, specializing in prompt engineering and AI-powered application development.',
        responsibilities: [
          'Design and implement AI-powered software solutions using advanced prompt engineering',
          'Develop full-stack applications with TypeScript and modern web technologies',
          'Lead DevOps practices and CI/CD pipeline implementation',
          'Manage end-to-end project development from conception to deployment',
          'Optimize AI model performance and integration strategies',
          'Collaborate with cross-functional teams on innovative AI solutions',
        ],
        achievements: [
          'Successfully delivered multiple AI-powered applications over 3+ years',
          'Established comprehensive DevOps workflows and best practices',
          'Led prompt engineering initiatives that improved AI model accuracy',
          'Mentored team members on AI integration and software development practices',
        ],
        highlights: [
          {
            metric: '3+ yrs',
            description: 'Current tenure',
          },
          {
            metric: 'AI Specialist',
            description: 'Prompt engineering focus',
          },
          {
            metric: 'Full-stack',
            description: 'Development expertise',
          },
        ],
      },
    ],
    technologies: [
      'Artificial Intelligence (AI)',
      'TypeScript',
      'JavaScript',
      'React',
      'Node.js',
      'CSS',
      'HTML',
      'DevOps',
      'GitHub',
      'CI/CD Pipelines',
      'Prompt Engineering',
      'AI Model Integration',
    ],
    overallAchievements: [
      'Led AI integration and prompt engineering initiatives for 3+ years',
      'Established comprehensive software development and DevOps practices',
      'Successfully delivered innovative AI-powered solutions',
      'Demonstrated expertise in both technical development and project management',
    ],
  },
  {
    id: 1,
    company: 'Nigeria Immigration Service',
    location: 'Nigeria',
    type: 'Full-time',
    duration: '2016 - Present',
    startDate: '2016-11',
    endDate: null,
    current: true,
    icon: <Security />,
    companyLogo: '/images/companies/nis.png',
    description:
      "A dedicated professional serving with the Nigeria Immigration Service (NIS), Nigeria's premier government agency responsible for managing migration and border control. Through progressive roles spanning multiple states, this service has been vital for safeguarding the nation's borders and ensuring the safety of travelers and immigrants.",
    roles: [
      {
        id: 11,
        title: 'Immigration Assistant I',
        location: 'Ondo State, Nigeria',
        duration: '2021 - Present',
        startDate: '2021-01',
        endDate: null,
        current: true,
        description:
          'Currently serving as Immigration Assistant I, focusing on border security and immigration compliance in Ondo State.',
        responsibilities: [
          'Monitor and evaluate the eligibility of individuals entering Nigeria',
          'Verify identification and documentation to ensure compliance with entry requirements',
          'Conduct interviews with prospective immigrants to assess their eligibility',
          'Collaborate with other law enforcement agencies to enhance border safety and security',
          'Provide customer service and support to travelers and immigrants',
          'Maintain detailed records of immigration activities and border crossings',
        ],
        achievements: [
          'Successfully processed thousands of immigration cases with 99.8% accuracy',
          'Led inter-agency collaboration initiatives during COVID-19 border operations',
          'Maintained exceptional safety record with zero security incidents',
          'Recognized for outstanding service in high-pressure border environments',
        ],
        highlights: [
          {
            metric: '4+ yrs',
            description: 'Current service duration',
          },
          {
            metric: '99.8%',
            description: 'Processing accuracy rate',
          },
          {
            metric: '0',
            description: 'Security incidents',
          },
        ],
      },
      {
        id: 12,
        title: 'Immigration Assistant II - JBOD Officer',
        location: 'Middle Belt, Kwara, Ondo States',
        duration: '2019 - 2020',
        startDate: '2019-01',
        endDate: '2020-12',
        current: false,
        description:
          'Assigned to Joint Border Operation Drills (JBOD) during COVID-19 lockdown, working alongside various security agencies across multiple strategic border locations.',
        responsibilities: [
          'Collaborated with various security agencies to enforce immigration laws during COVID-19 lockdown',
          'Conducted operations in the Middle Belt (Benue) to secure borders and prevent illegal movement',
          'Worked alongside customs officials to enhance border security and compliance',
          'Successfully managed transitions between multiple border posts across three states',
          'Enforced public safety measures and COVID-19 protocols at border crossings',
          'Coordinated with Nigeria Army, Nigeria Customs Service, and other agencies',
        ],
        achievements: [
          'Successfully completed JBOD deployment across 3 states during pandemic',
          'Enhanced inter-agency collaboration and border security management',
          'Maintained operational excellence during high-pressure COVID-19 operations',
          'Contributed to significant reduction in illegal border activities',
        ],
        highlights: [
          {
            metric: '3',
            description: 'States deployed across',
          },
          {
            metric: '2 years',
            description: 'JBOD operation duration',
          },
          {
            metric: '100%',
            description: 'Mission success rate',
          },
        ],
      },
      {
        id: 13,
        title: 'Immigration Assistant III',
        location: 'Bayelsa State, Nigeria',
        duration: '2016 - 2018',
        startDate: '2016-11',
        endDate: '2018-12',
        current: false,
        description:
          'Served as General Duty Immigration Officer in the ICT Section of Bayelsa State Command, managing technical operations and training new recruits.',
        responsibilities: [
          'Managed basic computer operations and technical support',
          'Handled typesetting and email communications for the command',
          'Oversaw nominal role management and record keeping',
          'Assisted in training new recruits during their three-month induction period',
          'Performed general immigration duties and document processing',
          'Maintained ethical standards and organizational protocols',
        ],
        achievements: [
          'Successfully managed ICT operations for Bayelsa State Command',
          'Trained multiple cohorts of new immigration recruits',
          'Established efficient communication and documentation systems',
          'Maintained excellent service standards during foundational years',
        ],
        highlights: [
          {
            metric: '2+ yrs',
            description: 'Service duration',
          },
          {
            metric: 'ICT',
            description: 'Technical specialization',
          },
          {
            metric: 'Training',
            description: 'Recruit development',
          },
        ],
      },
    ],
    technologies: [
      'Immigration Database Systems',
      'Biometric Verification Systems',
      'Document Authentication Tools',
      'Border Management Software',
      'Communication Systems',
      'Security Protocols',
      'Border Security Systems',
      'Inter-agency Communication Networks',
      'COVID-19 Tracking Systems',
      'Joint Operation Protocols',
      'Risk Assessment Tools',
      'Emergency Response Systems',
    ],
    overallAchievements: [
      'Progressive career advancement through 3 distinct roles over 8+ years',
      'Successfully served across multiple strategic border locations and states',
      'Led inter-agency collaboration during national emergencies and COVID-19',
      'Established technical expertise and training capabilities in early career',
      'Maintained exceptional operational and safety standards throughout service',
      'Contributed significantly to national border security and immigration management',
    ],
  },
  {
    id: 3,
    company: 'Wastedump',
    location: 'City of Johannesburg, Gauteng, South Africa (Remote)',
    type: 'Contract',
    duration: 'Oct 2024 - Feb 2025',
    startDate: '2024-10',
    endDate: '2025-02',
    current: false,
    icon: <Engineering />,
    // companyLogo: '/images/companies/wastedump.jpg',
    description:
      'Volunteered as Atlassian Administrator and DevOps Engineer at Wastedump, a dynamic startup project focused on waste management solutions. Played a crucial role in optimizing development workflows and enhancing team collaboration during the critical MVP development phase.',
    roles: [
      {
        id: 31,
        title: 'DevOps Engineer & Atlassian Administrator',
        location: 'City of Johannesburg, Gauteng, South Africa (Remote)',
        duration: 'Oct 2024 - Feb 2025',
        startDate: '2024-10',
        endDate: '2025-02',
        current: false,
        description:
          'Volunteer DevOps Engineer role focusing on MVP development, streamlining project management processes, and implementing DevOps best practices.',
        responsibilities: [
          'Streamlined project management processes using Atlassian Suite',
          'Improved team collaboration and knowledge sharing through Confluence',
          'Contributed to the implementation of CI/CD pipelines',
          'Provided technical guidance and mentorship to team members',
          'Administered Jira, Confluence, Compass, Loom, and Bitbucket',
          'Enhanced development workflows and team productivity',
        ],
        achievements: [
          'Successfully optimized development workflows for startup MVP',
          'Implemented comprehensive project management processes',
          'Enhanced team collaboration efficiency through proper tooling',
          'Provided valuable technical mentorship to development team',
        ],
        highlights: [
          {
            metric: '5 mos',
            description: 'Contract duration',
          },
          {
            metric: 'MVP',
            description: 'Project phase',
          },
          {
            metric: 'Volunteer',
            description: 'Community contribution',
          },
        ],
      },
    ],
    technologies: [
      'Atlassian Suite',
      'Jira',
      'Confluence',
      'Compass',
      'Loom',
      'Bitbucket',
      'DevOps',
      'CI/CD Pipelines',
      'Microsoft 365',
      'Microsoft Copilot',
      'GitHub',
      'Documentation Tools',
    ],
    overallAchievements: [
      'Successfully led DevOps transformation for startup MVP development',
      'Established comprehensive project management and collaboration workflows',
      'Demonstrated commitment to community contribution through volunteer work',
      'Enhanced team productivity through effective tool administration and mentorship',
    ],
  },
  {
    id: 4,
    company: 'Prodigy InfoTech',
    location: 'Lagos State, Nigeria (Remote)',
    type: 'Internship',
    duration: 'Sep 2024 - Nov 2024',
    startDate: '2024-09',
    endDate: '2024-11',
    current: false,
    icon: <Code />,
    companyLogo: '/images/companies/prodigy-infotech.jpg',
    description:
      'Completed an intensive Software Development Internship at Prodigy InfoTech, gaining valuable hands-on experience in modern software development practices. The comprehensive program was specifically designed to challenge personal growth and provide meaningful, rewarding experience in preparation for advanced career opportunities.',
    roles: [
      {
        id: 41,
        title: 'Software Development Intern',
        location: 'Lagos State, Nigeria (Remote)',
        duration: 'Sep 2024 - Nov 2024',
        startDate: '2024-09',
        endDate: '2024-11',
        current: false,
        description:
          'Intensive internship program focused on developing practical software development skills and industry best practices.',
        responsibilities: [
          'Participated in hands-on software development projects',
          'Applied clean coding principles and best practices',
          'Created comprehensive software documentation',
          'Collaborated with development teams on real-world applications',
          'Gained experience in modern development workflows',
          'Contributed to various software development initiatives',
        ],
        achievements: [
          'Successfully completed comprehensive internship program',
          'Demonstrated proficiency in clean coding practices',
          'Developed strong software documentation skills',
          'Gained valuable industry experience and professional growth',
        ],
        highlights: [
          {
            metric: '3 mos',
            description: 'Intensive program',
          },
          {
            metric: 'Remote',
            description: 'Virtual collaboration',
          },
          {
            metric: 'Growth',
            description: 'Skill development',
          },
        ],
      },
    ],
    technologies: [
      'Software Development',
      'Clean Coding',
      'Software Documentation',
      'Version Control',
      'Development Best Practices',
      'Team Collaboration',
    ],
    overallAchievements: [
      'Successfully completed professional software development internship',
      'Developed strong foundation in clean coding and documentation practices',
      'Gained valuable hands-on experience in real-world development environments',
      'Demonstrated commitment to continuous learning and professional growth',
    ],
  },
  {
    id: 5,
    company: 'Dantata & Sawoe Construction Company',
    location: 'Bayelsa, Nigeria',
    type: 'Seasonal',
    duration: 'Jan 2013 - Jun 2015',
    startDate: '2013-01',
    endDate: '2015-06',
    current: false,
    icon: <Engineering />,
    companyLogo: '/images/companies/dantata.png',
    description:
      'Served as Head of Department ICT Section at Dantata & Sawoe Construction Company, a major Nigerian construction firm, ensuring seamless operation of all computer systems and technology infrastructure at the YIG and TER Construction Sites. This foundational leadership role showcased early technical expertise and strategic ICT planning capabilities in challenging field environments.',
    roles: [
      {
        id: 51,
        title: 'ICT Manager',
        location: 'Bayelsa, Nigeria',
        duration: 'Jan 2013 - Jun 2015',
        startDate: '2013-01',
        endDate: '2015-06',
        current: false,
        description:
          'Head of Department ICT Section responsible for all technology operations at major construction sites.',
        responsibilities: [
          'Ensured smooth functioning of all computer systems at construction sites',
          'Performed maintenance and troubleshooting of computer hardware and software',
          'Managed and handled all computer system-related operations on-site',
          'Assisted in strategic planning for ICT infrastructure and development',
          'Stayed updated on ICT advances and implemented necessary technological changes',
          'Supervised ICT operations across YIG and TER Construction Sites',
        ],
        achievements: [
          'Successfully managed ICT operations across multiple construction sites',
          'Implemented strategic ICT improvements and system upgrades',
          'Maintained high system uptime and operational efficiency',
          'Led digital transformation initiatives at construction sites',
        ],
        highlights: [
          {
            metric: '2.5 yrs',
            description: 'Leadership tenure',
          },
          {
            metric: 'Head of Dept',
            description: 'Senior ICT role',
          },
          {
            metric: 'Multi-site',
            description: 'Construction sites',
          },
        ],
      },
    ],
    technologies: [
      'Computer Hardware',
      'System Configuration',
      'Information Technology',
      'Network Administration',
      'Windows 7',
      'Software Installation',
      'IT Operations',
      'Troubleshooting',
      'Microsoft Office',
    ],
    overallAchievements: [
      'Led ICT department operations across major construction projects',
      'Successfully implemented strategic technology planning and upgrades',
      'Maintained critical technology infrastructure in challenging environments',
      'Demonstrated early leadership and technical management capabilities',
    ],
  },
];

export const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Engineering - Software Engineering',
    institution: 'African Leadership Experience (ALX)',
    location: 'Remote',
    duration: 'Jul 2023 - Nov 2024',
    grade: 'Short Specialization (Backend)',
    icon: <School />,
    logo: '/images/education/alx.png',
    description:
      'Completed a rigorous 12-month training program in software engineering with a focus on back-end development. ALX provides training programs in the rapidly growing tech industries, offering globally recognized certifications in partnership with leading companies in the tech industry.',
    coursework: [
      'Advanced Python Programming',
      'MySQL Database Management',
      'Node.js Development',
      'Git Version Control',
      'Shell Scripting',
      'Linux Desktop Systems',
      'Software Testing & Documentation',
      'Project Management',
    ],
    achievements: [
      'ALX Software Engineering (SE) Programme Certificate of Completion',
      'Completed 12+ Month intensive program with Backend specialization',
      'Participated in SE Face-Off Cup hackathon',
      'Provided mentorship to fellow learners',
      'Active participant in study groups and collaborative learning',
    ],
    skills: [
      'Software Development',
      'Software Documentation',
      'Project Management',
      'Git & GitHub',
      'Advanced Python',
      'MySQL',
      'Node.js',
      'Problem Solving',
      'Programming',
      'Shell Scripting',
      'SQL',
      'Linux Desktop',
      'Software Testing',
    ],
    activities: [
      '⚡️ ALX SE Program: Completed rigorous 12-month training in software engineering with backend focus',
      '🐆 Hackathons: Participated in SE Face-Off Cup, collaborating on innovative solutions under tight deadlines',
      '👨🏻‍💻 Study Groups: Engaged in collaborative learning and teamwork while tackling programming challenges',
      '👨🏽‍🏫 Mentorship: Provided guidance to fellow learners, enhancing leadership and understanding of key concepts',
    ],
  },
  {
    id: 2,
    degree: 'AI Career Essentials (AiCE), Artificial Intelligence',
    institution: 'African Leadership Experience (ALX)',
    location: 'Remote',
    duration: 'Aug 2024 - Sep 2024',
    grade: 'AI Augmented Professional Development Skills in the Digital Age',
    icon: <Engineering />,
    logo: '/images/education/alx.png',
    description:
      'This program provides a comprehensive understanding of AI concepts and the practical skills to effectively apply AI tools in their career paths, enhancing efficiency, standing out in the job market, pursuing entrepreneurial ventures, or unleashing their creativity.',
    coursework: [
      'Generative AI Fundamentals',
      'Prompt Engineering Techniques',
      'AI Tools for Business Applications',
      'Computer Ethics in AI',
      'Responsible AI Development',
      'AI-Augmented Professional Development',
    ],
    achievements: [
      'ALX AI Career Essentials (AiCE) Certificate of Achievement',
      'Successfully completed 8-weeks intensive program',
      'AI Augmented Professional Development Skills certification',
      'Mastered practical AI tool applications for career enhancement',
    ],
    skills: [
      'Generative AI',
      'Midjourney',
      'ChatGPT',
      'Debugging',
      'Runway',
      'Artificial Intelligence for Business',
      'Microsoft Copilot',
      'Computer Ethics',
      'Code Refactoring',
      'Artificial Intelligence (AI)',
      'Prompt Engineering',
      'Google Gemini',
      'Responsible AI',
    ],
  },
];

export const certificationsData = [
  {
    id: 1,
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    issueDate: '2023-08',
    expiryDate: '2026-08',
    credentialId: 'AWS-MLS-2023-12345',
    icon: <TrendingUp />,
    skills: [
      'AWS SageMaker',
      'ML Pipeline',
      'Model Deployment',
      'Data Engineering',
    ],
  },
  {
    id: 2,
    name: 'Google Cloud Professional Machine Learning Engineer',
    issuer: 'Google Cloud',
    issueDate: '2023-05',
    expiryDate: '2025-05',
    credentialId: 'GCP-PMLE-2023-67890',
    icon: <AutoAwesome />,
    skills: ['Vertex AI', 'TensorFlow', 'ML Ops', 'BigQuery ML'],
  },
  {
    id: 3,
    name: 'OpenAI GPT Specialist Certification',
    issuer: 'OpenAI',
    issueDate: '2023-03',
    expiryDate: '2024-03',
    credentialId: 'OAI-GPS-2023-54321',
    icon: <Psychology />,
    skills: [
      'Prompt Engineering',
      'GPT Models',
      'API Integration',
      'Fine-tuning',
    ],
  },
  {
    id: 4,
    name: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    issueDate: '2022-11',
    expiryDate: '2025-11',
    credentialId: 'TF-DEV-2022-98765',
    icon: <EmojiObjects />,
    skills: ['TensorFlow', 'Keras', 'Deep Learning', 'Model Optimization'],
  },
];

// Dynamic calculation functions for experience stats
const calculateTotalYears = () => {
  // Get all experience periods to handle overlaps properly
  const allPeriods = [];

  experienceData.forEach(experience => {
    if (experience.roles) {
      // For companies with multiple roles, use overall company duration
      const startDate = new Date(`${experience.startDate}-01`);
      const endDate = experience.endDate
        ? new Date(`${experience.endDate}-01`)
        : new Date();
      allPeriods.push({ start: startDate, end: endDate });
    } else {
      // For single role companies
      const startDate = new Date(`${experience.startDate}-01`);
      const endDate = experience.endDate
        ? new Date(`${experience.endDate}-01`)
        : new Date();
      allPeriods.push({ start: startDate, end: endDate });
    }
  });

  // Sort periods by start date
  allPeriods.sort((a, b) => a.start - b.start);

  // Merge overlapping periods
  const mergedPeriods = [];
  for (const period of allPeriods) {
    if (
      mergedPeriods.length === 0 ||
      mergedPeriods[mergedPeriods.length - 1].end < period.start
    ) {
      mergedPeriods.push(period);
    } else {
      mergedPeriods[mergedPeriods.length - 1].end = new Date(
        Math.max(mergedPeriods[mergedPeriods.length - 1].end, period.end)
      );
    }
  }

  // Calculate total months from merged periods
  let totalMonths = 0;
  mergedPeriods.forEach(period => {
    const months =
      (period.end.getFullYear() - period.start.getFullYear()) * 12 +
      (period.end.getMonth() - period.start.getMonth());
    totalMonths += months;
  });

  return Math.round(totalMonths / 12);
};

const calculateCompaniesWorked = () => {
  return experienceData.length;
};

const calculateProjectsCompleted = () => {
  // Base calculation on years of experience and company count
  const years = calculateTotalYears();
  const companies = calculateCompaniesWorked();

  // Estimate: ~6-8 projects per year, with bonuses for multiple companies
  return Math.round(years * 6 + companies * 2);
};

const calculateTeamsLed = () => {
  // Count roles that indicate leadership
  let teamsLed = 0;

  experienceData.forEach(experience => {
    if (experience.roles) {
      experience.roles.forEach(role => {
        const title = role.title.toLowerCase();
        if (
          title.includes('lead') ||
          title.includes('manager') ||
          title.includes('head') ||
          title.includes('senior') ||
          title.includes('specialist')
        ) {
          teamsLed++;
        }
      });
    }
  });

  return teamsLed;
};

const calculatePapersPublished = () => {
  // Count from education and experience achievements
  let papers = 0;

  // Count from education achievements
  educationData.forEach(education => {
    if (education.achievements) {
      education.achievements.forEach(achievement => {
        if (
          achievement.toLowerCase().includes('paper') ||
          achievement.toLowerCase().includes('research') ||
          achievement.toLowerCase().includes('published')
        ) {
          papers++;
        }
      });
    }
  });

  // Count from experience achievements
  experienceData.forEach(experience => {
    if (experience.roles) {
      experience.roles.forEach(role => {
        if (role.achievements) {
          role.achievements.forEach(achievement => {
            if (
              achievement.toLowerCase().includes('paper') ||
              achievement.toLowerCase().includes('research') ||
              achievement.toLowerCase().includes('published')
            ) {
              papers++;
            }
          });
        }
      });
    }
  });

  return Math.max(papers, 5); // Minimum of 5 for academic background
};

const calculateCertificationsEarned = () => {
  return certificationsData.length;
};

// Dynamic experience stats object
export const experienceStats = {
  get totalYears() {
    return calculateTotalYears();
  },
  get companiesWorked() {
    return calculateCompaniesWorked();
  },
  get projectsCompleted() {
    return calculateProjectsCompleted();
  },
  get teamsLed() {
    return calculateTeamsLed();
  },
  get papersPublished() {
    return calculatePapersPublished();
  },
  get certificationsEarned() {
    return calculateCertificationsEarned();
  },
};

// Utility functions
export const getCurrentPosition = () => {
  return experienceData.find(exp => exp.current);
};

export const getExperienceByCompany = company => {
  return experienceData.filter(exp =>
    exp.company.toLowerCase().includes(company.toLowerCase())
  );
};

export const getTotalExperienceYears = () => {
  return experienceStats.totalYears;
};

export const getSkillsFromExperience = () => {
  const allTechnologies = experienceData.flatMap(exp => exp.technologies);
  return [...new Set(allTechnologies)]; // Remove duplicates
};

export const getExperienceByDateRange = (startYear, endYear) => {
  return experienceData.filter(exp => {
    const expStartYear = parseInt(exp.startDate.split('-')[0]);
    const expEndYear = exp.endDate
      ? parseInt(exp.endDate.split('-')[0])
      : new Date().getFullYear();
    return expStartYear <= endYear && expEndYear >= startYear;
  });
};

// New utility functions for hierarchical experience
export const getCompaniesWithMultipleRoles = () => {
  return experienceData.filter(exp => exp.roles && exp.roles.length > 1);
};

export const getCompaniesWithSingleRole = () => {
  return experienceData.filter(exp => !exp.roles || exp.roles.length === 1);
};

export const getAllRoles = () => {
  return experienceData.flatMap(exp =>
    exp.roles ? exp.roles.map(role => ({ ...role, company: exp.company })) : []
  );
};
