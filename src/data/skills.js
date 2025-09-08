import {
  Psychology,
  Code,
  CloudQueue,
  Storage,
  SmartToy,
  Analytics,
  Api,
  Web,
  Terminal,
  GitHub,
  DeveloperMode,
  Speed,
  Lightbulb,
  Groups,
  School,
  Security,
  Psychology as Resilience,
  Visibility,
  TrendingUp,
  Handshake,
  Build,
  FlashOn,
} from '@mui/icons-material';

export const skillsData = [
  // AI & Machine Learning
  {
    skill: 'Prompt Engineering',
    level: 95,
    icon: <Psychology />,
    category: 'AI',
    description:
      'Expert in crafting optimized prompts for LLMs including GPT-4, Claude, and Gemini. Specializing in chain-of-thought, few-shot, and advanced prompting techniques.',
  },
  {
    skill: 'Large Language Models',
    level: 75,
    icon: <SmartToy />,
    category: 'AI',
    description:
      'Extensive experience with GPT models, BERT, T5, and custom fine-tuning. Proficient in model evaluation, optimization, and deployment.',
  },
  // {
  //   skill: "Machine Learning",
  //   level: 90,
  //   icon: <AutoAwesome />,
  //   category: "AI",
  //   description:
  //     "Deep understanding of supervised/unsupervised learning, neural networks, and ensemble methods. Experience with scikit-learn, XGBoost, and custom algorithms.",
  // },
  // {
  //   skill: "Deep Learning",
  //   level: 88,
  //   icon: <Memory />,
  //   category: "AI",
  //   description:
  //     "Proficient in TensorFlow, PyTorch, and Keras. Experience with CNNs, RNNs, Transformers, and GANs for various AI applications.",
  // },
  {
    skill: 'Natural Language Processing',
    level: 79,
    icon: <Analytics />,
    category: 'AI',
    description:
      'Expertise in text processing, sentiment analysis, named entity recognition, and language generation using Hugging Face.',
  },
  {
    skill: 'AI Agent Development',
    level: 92,
    icon: <SmartToy />,
    category: 'AI',
    description:
      'Expert in developing system prompts for AI Agents to follow when building scalable solutions. Specialized in creating agents for various development phases and automation tasks.',
  },
  {
    skill: 'System Prompt Engineering',
    level: 95,
    icon: <Build />,
    category: 'AI',
    description:
      "Highly proficient in crafting sophisticated system prompts for documentation, optimization, testing, and prototyping. Expert 'Vibe Coder' leveraging AI for accelerated development workflows.",
  },
  {
    skill: 'AI-Assisted Development',
    level: 90,
    icon: <FlashOn />,
    category: 'AI',
    description:
      'Proficient in using AI for daily development activities with critical thinking. Expert at leveraging AI to accomplish goals and complete tasks faster than traditional approaches.',
  },
  // {
  //   skill: "Computer Vision",
  //   level: 82,
  //   icon: <EmojiObjects />,
  //   category: "AI",
  //   description:
  //     "Experience with image classification, object detection, and segmentation using OpenCV, YOLO, and custom CNN architectures.",
  // },

  // Technical Skills
  {
    skill: 'Python',
    level: 85,
    icon: <Code />,
    category: 'Technical',
    description:
      'Advanced Python programming for AI/ML and backend development. Proficient with Flask frameworks, Streamlit, and FastAPI for web applications.',
  },
  {
    skill: 'C Programming',
    level: 75,
    icon: <Code />,
    category: 'Technical',
    description:
      'Solid foundation in C programming with hands-on experience in system-level programming and algorithmic problem solving.',
  },
  {
    skill: 'JavaScript/TypeScript',
    level: 89,
    icon: <Web />,
    category: 'Technical',
    description:
      'Proficient in JavaScript for full-stack development. Experience with foundational React, Node.js, and AI model integration in web applications.',
  },
  {
    skill: 'HTML & CSS',
    level: 82,
    icon: <Web />,
    category: 'Technical',
    description:
      'Competent in HTML and CSS for web development fundamentals. Experience with responsive design and modern CSS frameworks.',
  },
  {
    skill: 'SQL Databases',
    level: 83,
    icon: <Storage />,
    category: 'Technical',
    description:
      'Skilled in SQL databases including MySQL and PostgreSQL. Experience with database optimization, complex queries, and data modeling.',
  },
  {
    skill: 'NoSQL Databases',
    level: 78,
    icon: <Storage />,
    category: 'Technical',
    description:
      'Proficient in NoSQL databases including MongoDB and Redis. Focus on document storage, caching strategies, and database integration.',
  },
  {
    skill: 'API Development',
    level: 88,
    icon: <Api />,
    category: 'Technical',
    description:
      'Experienced in building RESTful APIs and implementing authentication protocols including OAuth and JWT. Proficient with microservices architecture.',
  },

  // Cloud & DevOps
  {
    skill: 'AWS Deployment',
    level: 70,
    icon: <CloudQueue />,
    category: 'Tools',
    description:
      'Knowledgeable in AWS deployment strategies including EC2, S3, Lambda, and SageMaker for scalable application deployment.',
  },
  {
    skill: 'Docker & Containerization',
    level: 82,
    icon: <DeveloperMode />,
    category: 'Tools',
    description:
      'Knowledgeable in containerization with Docker for application deployment. Experience with DevOps practices and scalable software deployment.',
  },
  {
    skill: 'Git & Version Control',
    level: 90,
    icon: <GitHub />,
    category: 'Tools',
    description:
      'Advanced Git workflows, branching strategies, and collaborative development. Experience with version control best practices.',
  },
  {
    skill: 'CI/CD Pipelines',
    level: 78,
    icon: <Terminal />,
    category: 'Tools',
    description:
      'Knowledgeable in CI/CD pipelines for automated testing and deployment. Experience with DevOps practices and continuous integration workflows.',
  },

  // Data & Analytics
  // {
  //   skill: "Data Science",
  //   level: 89,
  //   icon: <DataObject />,
  //   category: "Technical",
  //   description:
  //     "End-to-end data science workflows including data cleaning, EDA, feature engineering, and statistical analysis using pandas and scipy.",
  // },
  // {
  //   skill: "Data Visualization",
  //   level: 84,
  //   icon: <Analytics />,
  //   category: "Technical",
  //   description:
  //     "Creating insightful visualizations with matplotlib, seaborn, plotly, and D3.js. Experience with dashboard development using Streamlit.",
  // },

  // Soft Skills
  {
    skill: 'Problem Solving',
    level: 95,
    icon: <Lightbulb />,
    category: 'Soft',
    description:
      'Analytical thinking and creative problem-solving approach. Experienced in breaking down complex challenges into manageable solutions.',
  },
  {
    skill: 'Team Leadership',
    level: 88,
    icon: <Groups />,
    category: 'Soft',
    description:
      'Leading cross-functional Development teams and mentoring junior developers. Experience with agile methodologies and project management tools like Jira, Trello, and Bitbucket.',
  },
  {
    skill: 'Technical Writing',
    level: 90,
    icon: <School />,
    category: 'Soft',
    description:
      'Clear technical documentation, research papers, and blog posts about Tech, AI & Web3 topics. Experience with grant writing and technical proposals.',
  },
  {
    skill: 'Performance Optimization',
    level: 87,
    icon: <Speed />,
    category: 'Technical',
    description:
      'Optimizing AI models for production environments. Experience with model quantization, pruning, and inference acceleration.',
  },
  {
    skill: 'Adaptability & Resilience',
    level: 92,
    icon: <Resilience />,
    category: 'Soft',
    description:
      'Demonstrated resilience through challenging transitions and adaptability in diverse environments. 8+ years of experience adapting to evolving immigration policies and technology landscapes.',
  },
  {
    skill: 'Detail-Oriented Analysis',
    level: 94,
    icon: <Visibility />,
    category: 'Soft',
    description:
      'Enthusiastic and detail-oriented approach to software engineering. Proven track record in meticulous analysis from 8+ years as an immigration officer specializing in character management.',
  },
  {
    skill: 'Critical Thinking',
    level: 89,
    icon: <Psychology />,
    category: 'Soft',
    description:
      'Strong analytical and critical thinking skills developed through complex problem-solving in immigration law and ICT management. Applied to breaking down technical challenges.',
  },
  {
    skill: 'Security & Compliance',
    level: 91,
    icon: <Security />,
    category: 'Soft',
    description:
      'Award-winning track record in security, safety, and character management. Deep understanding of compliance frameworks and risk assessment from immigration officer background.',
  },
  {
    skill: 'Innovation & Growth Mindset',
    level: 88,
    icon: <TrendingUp />,
    category: 'Soft',
    description:
      'Passionate about technology and innovation with a drive for impactful solutions. Committed to continuous learning and leveraging diverse skills to tackle real-world challenges.',
  },
  {
    skill: 'Professional Networking',
    level: 85,
    icon: <Handshake />,
    category: 'Soft',
    description:
      'Strong networking and relationship-building skills. Eager to connect with fellow professionals who share passion for innovation and collaborative problem-solving.',
  },
];

export const skillCategories = [
  {
    name: 'AI & Machine Learning',
    color: '#1976d2',
    skills: skillsData.filter(skill => skill.category === 'AI'),
  },
  {
    name: 'Technical Skills',
    color: '#00e676',
    skills: skillsData.filter(skill => skill.category === 'Technical'),
  },
  {
    name: 'Tools & Platforms',
    color: '#ff9800',
    skills: skillsData.filter(skill => skill.category === 'Tools'),
  },
  {
    name: 'Soft Skills',
    color: '#9c27b0',
    skills: skillsData.filter(skill => skill.category === 'Soft'),
  },
];

export const getSkillsByCategory = category => {
  return skillsData.filter(skill => skill.category === category);
};

export const getSkillByName = skillName => {
  return skillsData.find(skill => skill.skill === skillName);
};
