import {
  Psychology,
  Code,
  DataObject,
  CloudQueue,
  Storage,
  AutoAwesome,
  SmartToy,
  Analytics,
  Api,
  Web,
  Terminal,
  GitHub,
  DeveloperMode,
  Memory,
  Speed,
  Lightbulb,
  Groups,
  School,
  EmojiObjects,
} from "@mui/icons-material";

export const skillsData = [
  // AI & Machine Learning
  {
    skill: "Prompt Engineering",
    level: 95,
    icon: <Psychology />,
    category: "AI",
    description:
      "Expert in crafting optimized prompts for LLMs including GPT-4, Claude, and Gemini. Specializing in chain-of-thought, few-shot, and advanced prompting techniques.",
  },
  {
    skill: "Large Language Models",
    level: 92,
    icon: <SmartToy />,
    category: "AI",
    description:
      "Extensive experience with GPT models, BERT, T5, and custom fine-tuning. Proficient in model evaluation, optimization, and deployment.",
  },
  {
    skill: "Machine Learning",
    level: 90,
    icon: <AutoAwesome />,
    category: "AI",
    description:
      "Deep understanding of supervised/unsupervised learning, neural networks, and ensemble methods. Experience with scikit-learn, XGBoost, and custom algorithms.",
  },
  {
    skill: "Deep Learning",
    level: 88,
    icon: <Memory />,
    category: "AI",
    description:
      "Proficient in TensorFlow, PyTorch, and Keras. Experience with CNNs, RNNs, Transformers, and GANs for various AI applications.",
  },
  {
    skill: "Natural Language Processing",
    level: 87,
    icon: <Analytics />,
    category: "AI",
    description:
      "Expertise in text processing, sentiment analysis, named entity recognition, and language generation using spaCy, NLTK, and Hugging Face.",
  },
  {
    skill: "Computer Vision",
    level: 82,
    icon: <EmojiObjects />,
    category: "AI",
    description:
      "Experience with image classification, object detection, and segmentation using OpenCV, YOLO, and custom CNN architectures.",
  },

  // Technical Skills
  {
    skill: "Python",
    level: 95,
    icon: <Code />,
    category: "Technical",
    description:
      "Advanced Python programming for AI/ML, data science, and backend development. Proficient with pandas, numpy, matplotlib, and Flask/FastAPI.",
  },
  {
    skill: "JavaScript/TypeScript",
    level: 85,
    icon: <Web />,
    category: "Technical",
    description:
      "Modern JavaScript/TypeScript for full-stack development. Experience with React, Node.js, and AI model integration in web applications.",
  },
  {
    skill: "SQL & Databases",
    level: 83,
    icon: <Storage />,
    category: "Technical",
    description:
      "Proficient in PostgreSQL, MongoDB, and vector databases. Experience with data modeling, optimization, and AI-driven query generation.",
  },
  {
    skill: "API Development",
    level: 88,
    icon: <Api />,
    category: "Technical",
    description:
      "RESTful and GraphQL API design and development. Experience with microservices architecture and AI model serving via APIs.",
  },

  // Cloud & DevOps
  {
    skill: "AWS",
    level: 86,
    icon: <CloudQueue />,
    category: "Tools",
    description:
      "AWS certified with experience in SageMaker, Lambda, EC2, S3, and Bedrock for AI model training and deployment.",
  },
  {
    skill: "Docker & Kubernetes",
    level: 82,
    icon: <DeveloperMode />,
    category: "Tools",
    description:
      "Containerization and orchestration for AI applications. Experience with MLOps pipelines and scalable model deployment.",
  },
  {
    skill: "Git & Version Control",
    level: 90,
    icon: <GitHub />,
    category: "Tools",
    description:
      "Advanced Git workflows, branching strategies, and collaborative development. Experience with DVC for ML model versioning.",
  },
  {
    skill: "MLOps & CI/CD",
    level: 85,
    icon: <Terminal />,
    category: "Tools",
    description:
      "MLOps best practices with GitHub Actions, Jenkins, and MLflow. Automated testing, deployment, and monitoring of ML models.",
  },

  // Data & Analytics
  {
    skill: "Data Science",
    level: 89,
    icon: <DataObject />,
    category: "Technical",
    description:
      "End-to-end data science workflows including data cleaning, EDA, feature engineering, and statistical analysis using pandas and scipy.",
  },
  {
    skill: "Data Visualization",
    level: 84,
    icon: <Analytics />,
    category: "Technical",
    description:
      "Creating insightful visualizations with matplotlib, seaborn, plotly, and D3.js. Experience with dashboard development using Streamlit.",
  },

  // Soft Skills
  {
    skill: "Problem Solving",
    level: 95,
    icon: <Lightbulb />,
    category: "Soft",
    description:
      "Analytical thinking and creative problem-solving approach. Experience breaking down complex AI challenges into manageable solutions.",
  },
  {
    skill: "Team Leadership",
    level: 88,
    icon: <Groups />,
    category: "Soft",
    description:
      "Leading cross-functional AI teams and mentoring junior developers. Experience with agile methodologies and project management.",
  },
  {
    skill: "Technical Writing",
    level: 90,
    icon: <School />,
    category: "Soft",
    description:
      "Clear technical documentation, research papers, and blog posts about AI/ML topics. Experience with grant writing and technical proposals.",
  },
  {
    skill: "Performance Optimization",
    level: 87,
    icon: <Speed />,
    category: "Technical",
    description:
      "Optimizing AI models for production environments. Experience with model quantization, pruning, and inference acceleration.",
  },
];

export const skillCategories = [
  {
    name: "AI & Machine Learning",
    color: "#1976d2",
    skills: skillsData.filter((skill) => skill.category === "AI"),
  },
  {
    name: "Technical Skills",
    color: "#00e676",
    skills: skillsData.filter((skill) => skill.category === "Technical"),
  },
  {
    name: "Tools & Platforms",
    color: "#ff9800",
    skills: skillsData.filter((skill) => skill.category === "Tools"),
  },
  {
    name: "Soft Skills",
    color: "#9c27b0",
    skills: skillsData.filter((skill) => skill.category === "Soft"),
  },
];

export const getSkillsByCategory = (category) => {
  return skillsData.filter((skill) => skill.category === category);
};

export const getSkillByName = (skillName) => {
  return skillsData.find((skill) => skill.skill === skillName);
};
