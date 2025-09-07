import {
  Psychology,
  Code,
  AutoAwesome,
  TrendingUp,
  School,
  Engineering,
  EmojiObjects,
} from "@mui/icons-material";

export const experienceData = [
  {
    id: 1,
    title: "Senior AI Engineer & Prompt Engineering Lead",
    company: "TechVision AI Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    duration: "2023 - Present",
    startDate: "2023-01",
    endDate: null,
    current: true,
    icon: <Psychology />,
    companyLogo: "/images/companies/techvision.jpg",
    description:
      "Precious E. Okoyen leads the development of next-generation AI systems with a focus on prompt engineering and large language model optimization. Spearheads initiatives that bridge cutting-edge AI research with practical business applications.",
    responsibilities: [
      "Lead a team of 8 AI engineers in developing advanced prompt engineering frameworks",
      "Architect and implement multi-modal AI systems using GPT-4, Claude, and custom models",
      "Design and optimize prompting strategies that increased model accuracy by 35%",
      "Built automated prompt testing and validation pipelines serving 10M+ requests/month",
      "Collaborate with product teams to integrate AI capabilities into customer-facing applications",
      "Mentor junior engineers and conduct technical workshops on AI best practices",
    ],
    achievements: [
      "Developed proprietary prompt optimization framework adopted company-wide",
      "Led the creation of AI safety protocols reducing model hallucinations by 60%",
      "Published 3 research papers on prompt engineering techniques",
      "Reduced AI inference costs by 40% through optimization strategies",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "OpenAI API",
      "Anthropic Claude",
      "LangChain",
      "Vector Databases",
      "AWS SageMaker",
      "Docker",
      "Kubernetes",
      "FastAPI",
    ],
    highlights: [
      {
        metric: "35%",
        description: "Increase in model accuracy",
      },
      {
        metric: "10M+",
        description: "API requests handled monthly",
      },
      {
        metric: "40%",
        description: "Reduction in inference costs",
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "InnovateTech Labs",
    location: "Palo Alto, CA",
    type: "Full-time",
    duration: "2021 - 2023",
    startDate: "2021-03",
    endDate: "2023-01",
    current: false,
    icon: <AutoAwesome />,
    companyLogo: "/images/companies/innovatetech.jpg",
    description:
      "Precious E. Okoyen developed and deployed machine learning models for predictive analytics and automation. Focused on deep learning architectures and real-time inference systems for enterprise clients.",
    responsibilities: [
      "Designed and implemented CNN and RNN models for computer vision and NLP tasks",
      "Built end-to-end ML pipelines from data ingestion to model deployment",
      "Optimized model performance for real-time inference in production environments",
      "Collaborated with data science teams to translate research into scalable solutions",
      "Implemented MLOps practices including model versioning and automated testing",
      "Conducted A/B testing for model performance evaluation and improvement",
    ],
    achievements: [
      "Improved prediction accuracy by 25% through advanced feature engineering",
      "Reduced model training time by 50% using distributed computing techniques",
      "Successfully deployed 15+ ML models to production serving 1M+ users",
      "Established company-wide MLOps standards and best practices",
    ],
    technologies: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Apache Spark",
      "MLflow",
      "Kubeflow",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Git",
    ],
    highlights: [
      {
        metric: "25%",
        description: "Improvement in prediction accuracy",
      },
      {
        metric: "15+",
        description: "ML models deployed to production",
      },
      {
        metric: "50%",
        description: "Reduction in training time",
      },
    ],
  },
  {
    id: 3,
    title: "AI Research Intern → Full-time Developer",
    company: "Neural Dynamics Research",
    location: "Stanford, CA",
    type: "Internship → Full-time",
    duration: "2019 - 2021",
    startDate: "2019-06",
    endDate: "2021-03",
    current: false,
    icon: <EmojiObjects />,
    companyLogo: "/images/companies/neuraldynamics.jpg",
    description:
      "Precious E. Okoyen started as a research intern and transitioned to full-time role. Contributed to cutting-edge AI research while developing practical applications for neural network optimization and automated machine learning.",
    responsibilities: [
      "Conducted research on novel neural network architectures and optimization techniques",
      "Implemented and tested state-of-the-art deep learning models",
      "Developed automated hyperparameter tuning frameworks",
      "Collaborated with PhD researchers on published academic papers",
      "Built prototypes for neural architecture search (NAS) systems",
      "Participated in code reviews and technical design discussions",
    ],
    achievements: [
      "Co-authored 2 peer-reviewed papers published in top-tier AI conferences",
      "Developed AutoML framework that reduced manual tuning effort by 70%",
      "Won 'Best Innovation Award' for novel neural architecture optimization approach",
      "Graduated from intern to full-time developer in record 8 months",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "NumPy",
      "Matplotlib",
      "Jupyter",
      "Git",
      "Linux",
      "CUDA",
      "OpenCV",
    ],
    highlights: [
      {
        metric: "2",
        description: "Published research papers",
      },
      {
        metric: "70%",
        description: "Reduction in manual tuning",
      },
      {
        metric: "8 months",
        description: "Promotion to full-time",
      },
    ],
  },
  {
    id: 4,
    title: "Software Development Engineer",
    company: "CloudScale Solutions",
    location: "San Jose, CA",
    type: "Full-time",
    duration: "2018 - 2019",
    startDate: "2018-07",
    endDate: "2019-06",
    current: false,
    icon: <Code />,
    companyLogo: "/images/companies/cloudscale.jpg",
    description:
      "Precious E. Okoyen developed scalable web applications and backend services. Gained foundational experience in software engineering practices while building interest in AI and machine learning applications.",
    responsibilities: [
      "Built and maintained RESTful APIs using Node.js and Express.js",
      "Developed responsive web applications with React and modern JavaScript",
      "Implemented database designs and optimizations for high-traffic applications",
      "Participated in agile development cycles and sprint planning",
      "Wrote comprehensive unit and integration tests",
      "Collaborated with UX/UI designers and product managers",
    ],
    achievements: [
      "Improved application performance by 60% through code optimization",
      "Led migration of legacy system to modern cloud-based architecture",
      "Implemented CI/CD pipelines that reduced deployment time by 80%",
      "Mentored 2 junior developers and conducted code review sessions",
    ],
    technologies: [
      "JavaScript",
      "Node.js",
      "React",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Jest",
      "Git",
    ],
    highlights: [
      {
        metric: "60%",
        description: "Performance improvement",
      },
      {
        metric: "80%",
        description: "Reduction in deployment time",
      },
      {
        metric: "2",
        description: "Junior developers mentored",
      },
    ],
  },
];

export const educationData = [
  {
    id: 1,
    degree: "Master of Science in Artificial Intelligence",
    institution: "Stanford University",
    location: "Stanford, CA",
    duration: "2016 - 2018",
    gpa: "3.9/4.0",
    icon: <School />,
    logo: "/images/education/stanford.jpg",
    description:
      "Precious E. Okoyen specialized in machine learning, deep learning, and natural language processing. Thesis on 'Advanced Prompt Engineering Techniques for Large Language Models'.",
    coursework: [
      "Advanced Machine Learning (CS229)",
      "Deep Learning (CS230)",
      "Natural Language Processing (CS224N)",
      "Computer Vision (CS231N)",
      "AI Ethics and Safety (CS181)",
      "Neural Network Architectures (CS236)",
    ],
    achievements: [
      "Graduated Summa Cum Laude",
      "Dean's List for 4 consecutive semesters",
      "Research Assistant under Prof. Andrew Ng",
      "Winner of Stanford AI Challenge 2017",
    ],
    thesis: {
      title: "Advanced Prompt Engineering Techniques for Large Language Models",
      advisor: "Prof. Christopher Manning",
      summary:
        "Precious E. Okoyen's research on optimizing prompt strategies for improved LLM performance across diverse tasks.",
    },
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    duration: "2012 - 2016",
    gpa: "3.8/4.0",
    icon: <Engineering />,
    logo: "/images/education/berkeley.jpg",
    description:
      "Precious E. Okoyen built a strong foundation in computer science fundamentals with emphasis on algorithms, data structures, and software engineering principles.",
    coursework: [
      "Data Structures and Algorithms (CS61B)",
      "Computer Architecture (CS61C)",
      "Operating Systems (CS162)",
      "Database Systems (CS186)",
      "Software Engineering (CS169)",
      "Artificial Intelligence (CS188)",
    ],
    achievements: [
      "Magna Cum Laude graduate",
      "President of Computer Science Student Association",
      "Teaching Assistant for CS61A (3 semesters)",
      "Hackathon winner - Berkeley AI Challenge",
    ],
    projects: [
      "Senior Capstone: Intelligent Tutoring System using Machine Learning",
      "Distributed File System implementation in C++",
      "Web-based Collaborative Code Editor",
    ],
  },
];

export const certificationsData = [
  {
    id: 1,
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    issueDate: "2023-08",
    expiryDate: "2026-08",
    credentialId: "AWS-MLS-2023-12345",
    icon: <TrendingUp />,
    skills: [
      "AWS SageMaker",
      "ML Pipeline",
      "Model Deployment",
      "Data Engineering",
    ],
  },
  {
    id: 2,
    name: "Google Cloud Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    issueDate: "2023-05",
    expiryDate: "2025-05",
    credentialId: "GCP-PMLE-2023-67890",
    icon: <AutoAwesome />,
    skills: ["Vertex AI", "TensorFlow", "ML Ops", "BigQuery ML"],
  },
  {
    id: 3,
    name: "OpenAI GPT Specialist Certification",
    issuer: "OpenAI",
    issueDate: "2023-03",
    expiryDate: "2024-03",
    credentialId: "OAI-GPS-2023-54321",
    icon: <Psychology />,
    skills: [
      "Prompt Engineering",
      "GPT Models",
      "API Integration",
      "Fine-tuning",
    ],
  },
  {
    id: 4,
    name: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    issueDate: "2022-11",
    expiryDate: "2025-11",
    credentialId: "TF-DEV-2022-98765",
    icon: <EmojiObjects />,
    skills: ["TensorFlow", "Keras", "Deep Learning", "Model Optimization"],
  },
];

export const experienceStats = {
  totalYears: 6,
  companiesWorked: 4,
  projectsCompleted: 50,
  teamsLed: 3,
  papersPublished: 5,
  certificationsEarned: 12,
};

// Utility functions
export const getCurrentPosition = () => {
  return experienceData.find((exp) => exp.current);
};

export const getExperienceByCompany = (company) => {
  return experienceData.filter((exp) =>
    exp.company.toLowerCase().includes(company.toLowerCase()),
  );
};

export const getTotalExperienceYears = () => {
  return experienceStats.totalYears;
};

export const getSkillsFromExperience = () => {
  const allTechnologies = experienceData.flatMap((exp) => exp.technologies);
  return [...new Set(allTechnologies)]; // Remove duplicates
};

export const getExperienceByDateRange = (startYear, endYear) => {
  return experienceData.filter((exp) => {
    const expStartYear = parseInt(exp.startDate.split("-")[0]);
    const expEndYear = exp.endDate
      ? parseInt(exp.endDate.split("-")[0])
      : new Date().getFullYear();
    return expStartYear <= endYear && expEndYear >= startYear;
  });
};
