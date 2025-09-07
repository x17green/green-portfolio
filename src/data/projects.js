import {
  Psychology,
  HealthAndSafety,
  ShoppingCart,
  Chat,
  Image,
  Translate,
  TrendingUp,
  School,
} from "@mui/icons-material";

export const projectsData = [
  {
    id: 1,
    title: "AI-Powered Content Generation Platform",
    subtitle: "Advanced Prompt Engineering System",
    description:
      "Precious E. Okoyen developed a comprehensive platform that leverages multiple LLMs (GPT-4, Claude, Gemini) with sophisticated prompt engineering techniques to generate high-quality content across various domains. Features include chain-of-thought prompting, few-shot learning, and dynamic prompt optimization.",
    longDescription:
      "This platform represents Precious E. Okoyen's expertise in cutting-edge prompt engineering, combining multiple large language models to create a unified content generation system. The project includes advanced techniques such as prompt chaining, context management, and real-time optimization based on output quality metrics. Built with a microservices architecture, it can handle thousands of concurrent requests while maintaining consistent quality.",
    image: "/images/projects/ai-content-platform.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "Anthropic Claude",
      "Google Gemini",
      "Redis",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    category: "AI/ML",
    status: "Production",
    featured: true,
    demoUrl: "https://ai-content-demo.example.com",
    githubUrl: "https://github.com/precious-okoyen/ai-content-platform",
    liveUrl: "https://ai-content-platform.example.com",
    icon: <Psychology />,
    keyFeatures: [
      "Multi-model prompt orchestration",
      "Real-time quality scoring",
      "Custom prompt templates",
      "A/B testing for prompts",
      "Usage analytics dashboard",
      "API rate limiting and caching",
    ],
    metrics: {
      users: "10,000+",
      accuracy: "95%",
      responseTime: "1.2s",
      uptime: "99.9%",
    },
    challenges: [
      "Balancing multiple LLM APIs for optimal performance",
      "Implementing robust error handling and fallback mechanisms",
      "Optimizing prompt templates for different content types",
    ],
    learnings: [
      "Advanced prompt engineering techniques",
      "Multi-model orchestration strategies",
      "Scalable API architecture design",
    ],
  },
  {
    id: 2,
    title: "Neural Network Trading Bot",
    subtitle: "Deep Learning for Financial Markets",
    description:
      "Precious E. Okoyen developed an autonomous trading system using LSTM networks and transformer models to analyze market patterns, predict price movements, and execute trades. Incorporates sentiment analysis from news and social media data.",
    longDescription:
      "This sophisticated trading bot showcases Precious E. Okoyen's expertise in combining multiple deep learning architectures to create a comprehensive market analysis system. The project uses LSTM networks for time series prediction, transformer models for pattern recognition, and NLP models for sentiment analysis. The system processes real-time market data, news feeds, and social media sentiment to make informed trading decisions.",
    image: "/images/projects/trading-bot.jpg",
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Alpaca API",
      "WebSocket",
      "Redis",
      "MongoDB",
    ],
    category: "AI/ML",
    status: "Beta",
    featured: true,
    githubUrl: "https://github.com/precious-okoyen/neural-trading-bot",
    icon: <TrendingUp />,
    keyFeatures: [
      "LSTM-based price prediction",
      "Transformer pattern recognition",
      "Real-time sentiment analysis",
      "Risk management algorithms",
      "Backtesting framework",
      "Performance monitoring dashboard",
    ],
    metrics: {
      accuracy: "78%",
      roi: "+23.5%",
      sharpeRatio: "1.8",
      maxDrawdown: "-8.2%",
    },
    challenges: [
      "Handling market volatility and unexpected events",
      "Integrating multiple data sources in real-time",
      "Implementing robust risk management strategies",
    ],
    learnings: [
      "Time series forecasting with deep learning",
      "Multi-modal data fusion techniques",
      "Financial risk management principles",
    ],
  },
  {
    id: 3,
    title: "Smart Healthcare Diagnosis Assistant",
    subtitle: "AI-Powered Medical Image Analysis",
    description:
      "Precious E. Okoyen created a computer vision system that assists healthcare professionals in diagnosing medical conditions from X-rays, MRIs, and CT scans using convolutional neural networks and transfer learning.",
    longDescription:
      "This healthcare AI system demonstrates Precious E. Okoyen's expertise in applying state-of-the-art computer vision techniques to analyze medical images and provide diagnostic assistance. The project employs pre-trained CNN models fine-tuned on medical datasets, implements GRAD-CAM for explainable AI, and includes a user-friendly interface for healthcare professionals. The system achieved high accuracy in detecting various conditions while maintaining interpretability.",
    image: "/images/projects/healthcare-ai.jpg",
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "Flask",
      "React",
      "PostgreSQL",
      "AWS S3",
      "Docker",
    ],
    category: "AI/ML",
    status: "Research",
    featured: true,
    githubUrl: "https://github.com/precious-okoyen/healthcare-ai-diagnosis",
    icon: <HealthAndSafety />,
    keyFeatures: [
      "Multi-modal medical image analysis",
      "Explainable AI with GRAD-CAM",
      "HIPAA-compliant data handling",
      "Confidence scoring for predictions",
      "Integration with hospital systems",
      "Continuous learning pipeline",
    ],
    metrics: {
      accuracy: "94.2%",
      sensitivity: "91.8%",
      specificity: "96.5%",
      processingTime: "3.2s",
    },
    challenges: [
      "Ensuring HIPAA compliance and patient privacy",
      "Handling class imbalance in medical datasets",
      "Building trust with healthcare professionals",
    ],
    learnings: [
      "Medical image processing techniques",
      "Regulatory compliance in healthcare AI",
      "Explainable AI implementation",
    ],
  },
  {
    id: 4,
    title: "Intelligent E-commerce Recommendation Engine",
    subtitle: "Personalized Shopping Experience with ML",
    description:
      "Precious E. Okoyen built a sophisticated recommendation system using collaborative filtering, content-based filtering, and deep learning to provide personalized product recommendations and optimize user experience.",
    longDescription:
      "This e-commerce recommendation engine showcases Precious E. Okoyen's ability to combine multiple machine learning approaches to deliver highly personalized shopping experiences. The system uses collaborative filtering for user-based recommendations, content-based filtering for item similarity, and neural collaborative filtering for deep learning-enhanced predictions. It also includes real-time A/B testing capabilities and dynamic pricing optimization.",
    image: "/images/projects/ecommerce-ai.jpg",
    technologies: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "Apache Spark",
      "Redis",
      "Elasticsearch",
      "FastAPI",
      "React",
    ],
    category: "AI/ML",
    status: "Production",
    featured: false,
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl:
      "https://github.com/precious-okoyen/ecommerce-recommendation-engine",
    liveUrl: "https://smart-recommendations.example.com",
    icon: <ShoppingCart />,
    keyFeatures: [
      "Hybrid recommendation algorithms",
      "Real-time personalization",
      "A/B testing framework",
      "Dynamic pricing optimization",
      "Click-through rate optimization",
      "Scalable distributed processing",
    ],
    metrics: {
      ctr: "+34%",
      conversionRate: "+28%",
      revenueIncrease: "+42%",
      customerSatisfaction: "4.7/5",
    },
    challenges: [
      "Handling cold start problems for new users/items",
      "Scaling to millions of users and products",
      "Balancing exploration vs exploitation in recommendations",
    ],
    learnings: [
      "Large-scale recommendation system design",
      "Distributed computing with Apache Spark",
      "A/B testing best practices",
    ],
  },
  {
    id: 5,
    title: "Real-time Language Translation API",
    subtitle: "Multi-lingual Neural Machine Translation",
    description:
      "Precious E. Okoyen developed a high-performance API service providing real-time translation between 50+ languages using transformer-based neural machine translation models with context awareness and domain adaptation.",
    longDescription:
      "This translation API demonstrates Precious E. Okoyen's expertise in leveraging state-of-the-art transformer models to provide accurate, context-aware translations across multiple languages. The system includes domain-specific fine-tuning for technical, medical, and legal texts, implements caching strategies for improved performance, and provides confidence scores for translation quality. Built with a microservices architecture for high availability and scalability.",
    image: "/images/projects/translation-api.jpg",
    technologies: [
      "Python",
      "Transformers",
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
    category: "AI/ML",
    status: "Production",
    featured: false,
    demoUrl: "https://translation-demo.example.com",
    githubUrl: "https://github.com/precious-okoyen/neural-translation-api",
    liveUrl: "https://translate-api.example.com",
    icon: <Translate />,
    keyFeatures: [
      "Support for 50+ languages",
      "Context-aware translation",
      "Domain-specific models",
      "Batch translation processing",
      "Quality confidence scoring",
      "Rate limiting and caching",
    ],
    metrics: {
      languages: "50+",
      accuracy: "92%",
      throughput: "1000 req/s",
      latency: "200ms",
    },
    challenges: [
      "Maintaining translation quality across diverse languages",
      "Handling domain-specific terminology",
      "Optimizing for low-latency requirements",
    ],
    learnings: [
      "Neural machine translation techniques",
      "Multi-language model optimization",
      "High-performance API design",
    ],
  },
  {
    id: 6,
    title: "Conversational AI Chatbot Platform",
    subtitle: "Advanced NLP with Intent Recognition",
    description:
      "Precious E. Okoyen engineered a comprehensive chatbot platform featuring natural language understanding, intent classification, entity extraction, and dialogue management for customer service automation.",
    longDescription:
      "This chatbot platform showcases Precious E. Okoyen's ability to provide businesses with advanced conversational AI capabilities. It uses BERT-based models for intent classification, named entity recognition for extracting key information, and a sophisticated dialogue management system for maintaining context across conversations. The platform includes a visual bot builder, analytics dashboard, and integration capabilities with popular messaging platforms.",
    image: "/images/projects/chatbot-platform.jpg",
    technologies: [
      "Python",
      "BERT",
      "spaCy",
      "Rasa",
      "FastAPI",
      "React",
      "MongoDB",
      "WebSocket",
    ],
    category: "AI/ML",
    status: "Production",
    featured: false,
    demoUrl: "https://chatbot-demo.example.com",
    githubUrl: "https://github.com/username/ai-chatbot-platform",
    liveUrl: "https://chatbot-platform.example.com",
    icon: <Chat />,
    keyFeatures: [
      "Intent classification with BERT",
      "Named entity recognition",
      "Multi-turn conversation handling",
      "Visual bot builder interface",
      "Analytics and performance metrics",
      "Multi-platform integration",
    ],
    metrics: {
      accuracy: "89%",
      responseTime: "800ms",
      customerSatisfaction: "4.5/5",
      resolutionRate: "76%",
    },
    challenges: [
      "Handling ambiguous user intents",
      "Maintaining conversation context",
      "Integrating with existing business systems",
    ],
    learnings: [
      "Conversational AI design principles",
      "Natural language understanding techniques",
      "Dialogue management strategies",
    ],
  },
  {
    id: 7,
    title: "AI-Generated Art Gallery",
    subtitle: "Creative AI with GANs and Diffusion Models",
    description:
      "Precious E. Okoyen created an innovative platform that generates unique artwork using Generative Adversarial Networks and diffusion models, featuring style transfer, prompt-based generation, and NFT marketplace integration.",
    longDescription:
      "This creative AI platform demonstrates Precious E. Okoyen's exploration of the intersection between artificial intelligence and art. It implements various generative models including StyleGAN, DALL-E style architectures, and stable diffusion models to create unique artwork. The platform features a user-friendly interface for prompt-based generation, style transfer capabilities, and integration with blockchain technology for NFT creation and trading.",
    image: "/images/projects/ai-art-gallery.jpg",
    technologies: [
      "Python",
      "PyTorch",
      "Stable Diffusion",
      "FastAPI",
      "React",
      "Web3.js",
      "IPFS",
      "Ethereum",
    ],
    category: "AI/ML",
    status: "Beta",
    featured: false,
    demoUrl: "https://ai-art-demo.example.com",
    githubUrl: "https://github.com/precious-okoyen/ai-art-generator",
    icon: <Image />,
    keyFeatures: [
      "Multiple generative AI models",
      "Prompt-based art generation",
      "Style transfer algorithms",
      "NFT marketplace integration",
      "Community voting system",
      "Blockchain authentication",
    ],
    metrics: {
      artworksGenerated: "50,000+",
      users: "5,000+",
      nftsSold: "1,200+",
      generationTime: "15s",
    },
    challenges: [
      "Balancing creativity with computational efficiency",
      "Implementing fair and transparent NFT marketplace",
      "Handling copyright and intellectual property concerns",
    ],
    learnings: [
      "Generative AI model architectures",
      "Blockchain integration for digital assets",
      "Creative AI ethics and best practices",
    ],
  },
  {
    id: 8,
    title: "Automated Research Assistant",
    subtitle: "AI-Powered Academic Paper Analysis",
    description:
      "Precious E. Okoyen developed an intelligent research tool that automatically summarizes academic papers, extracts key insights, identifies research gaps, and suggests related work using advanced NLP and knowledge graphs.",
    longDescription:
      "This research assistant showcases Precious E. Okoyen's vision to revolutionize academic research by automating time-consuming tasks. It uses transformer models for document summarization, named entity recognition for extracting key concepts, and knowledge graph construction for identifying relationships between research areas. The system can process thousands of papers, identify trending topics, and provide personalized research recommendations.",
    image: "/images/projects/research-assistant.jpg",
    technologies: [
      "Python",
      "Transformers",
      "Neo4j",
      "spaCy",
      "Elasticsearch",
      "FastAPI",
      "React",
      "Docker",
    ],
    category: "AI/ML",
    status: "Research",
    featured: false,
    githubUrl: "https://github.com/precious-okoyen/ai-research-assistant",
    icon: <School />,
    keyFeatures: [
      "Automated paper summarization",
      "Key insight extraction",
      "Knowledge graph construction",
      "Research gap identification",
      "Citation network analysis",
      "Trend detection algorithms",
    ],
    metrics: {
      papersProcessed: "100,000+",
      accuracy: "87%",
      timeReduction: "80%",
      userSatisfaction: "4.6/5",
    },
    challenges: [
      "Handling diverse academic writing styles",
      "Maintaining accuracy across different research domains",
      "Scaling knowledge graph construction",
    ],
    learnings: [
      "Academic text processing techniques",
      "Knowledge graph construction and querying",
      "Large-scale document analysis systems",
    ],
  },
];

export const categories = [
  { name: "All", value: "all" },
  { name: "AI/ML", value: "AI/ML" },
  { name: "Web Development", value: "Web" },
  { name: "Mobile", value: "Mobile" },
  { name: "Data Science", value: "Data" },
];

export const technologies = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "OpenAI API",
  "Transformers",
  "scikit-learn",
  "Pandas",
  "NumPy",
  "Redis",
  "Elasticsearch",
];

export const getProjectsByCategory = (category) => {
  if (category === "all") return projectsData;
  return projectsData.filter((project) => project.category === category);
};

export const getFeaturedProjects = () => {
  return projectsData.filter((project) => project.featured);
};

export const getProjectById = (id) => {
  return projectsData.find((project) => project.id === parseInt(id));
};

export const getProjectsByTechnology = (tech) => {
  return projectsData.filter((project) =>
    project.technologies.some((technology) =>
      technology.toLowerCase().includes(tech.toLowerCase()),
    ),
  );
};
