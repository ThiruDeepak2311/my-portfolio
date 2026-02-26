import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Send, CheckCircle, ExternalLink, Code, Cpu, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';

const App = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeTrack, setActiveTrack] = useState('home');
  const { scrollY } = useScroll();
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const heroY = useTransform(scrollY, [0, 800], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'portfolio',
      'template_1d32j2u',
      form.current,
      'JFp_pQe8ef06A21cE'
    )
    .then((result) => {
      console.log(result.text);
      setSubmitStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    })
    .catch((error) => {
      console.log(error.text);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  // AI/ML Engineer Track Data
  const aiProjects = [
    {
      title: "MedFusion: Vision-Language Framework",
      description: "Multimodal radiology VQA and report generation system combining ConvNeXt, fine-tuned CLIP (ViT-32B), and Med-LLaMA with residual feature fusion. 76.3% accuracy on SLAKE, 72.8% on PMC-VQA benchmarks.",
      tech: ["Computer Vision", "LLMs", "Healthcare AI", "PyTorch"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "Fintech Intelligence Pipeline",
      description: "AI-powered stock analysis platform with live market data (Polygon.io), LLaMA 3.2 sentiment/risk analysis, and automated investment insights. Flask APIs, React dashboard, PostgreSQL.",
      tech: ["LLMs", "Fintech", "Full-Stack", "Railway"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "HITL Curriculum Generator",
      description: "Automated curriculum generation pipeline using Ollama/Mistral with constrained prompts for structured JSON output mapped to competency standards. Async human-in-the-loop approval gate via webhooks. Dockerized for Railway.",
      tech: ["n8n", "Ollama/Mistral", "Docker", "Webhooks"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "MiniGPT: Transformer from Scratch",
      description: "22M parameter GPT implementation: token embeddings, multi-head self-attention, positional encoding, feed-forward layers. Training, generation, and top-k/nucleus sampling. 40 perplexity on WikiText-2.",
      tech: ["Deep Learning", "Transformers", "NLP", "PyTorch"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "SAP Component Extraction Tool",
      description: "Automated extraction from unstructured SAP schedule files using regex pattern matching. Multi-file upload with cumulative quantity aggregation by custom date filters. Deployed on Railway with Excel export.",
      tech: ["Python", "FastAPI", "Regex", "React"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "VirConvNet - 3D Object Detection",
      description: "Multimodal framework integrating LiDAR and RGB data with Stochastic Voxel Discard and NRConv. 90% voxel density reduction, 2× inference speedup, +3.42% AP improvement on KITTI.",
      tech: ["PyTorch", "Computer Vision", "LiDAR", "RGB Fusion"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    }
  ];

  const aiExperience = [
    {
      title: "Contract – AI/ML Software Engineer",
      company: "ORCA Digital Lean Solutions",
      duration: "Nov 2025 – Present",
      location: "Michigan, USA",
      icon: "🏭",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "KPI optimization framework for manufacturing: multi-tenant FastAPI backend with PostgreSQL",
        "Calculation engine for weighted scoring and cost-efficiency optimization",
        "Budget-constrained action plan generation using greedy algorithms",
        "7 internal tools shipped"
      ]
    },
    {
      title: "AI Engineer Intern",
      company: "CreatorOS by DRPCRD",
      duration: "Jan 2025 – Jul 2025",
      location: "London, England",
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Full-stack demographic and profanity detection platform for Instagram/TikTok",
        "PaddleOCR, OpenCV, and custom NLP pipelines",
        "Creator pricing prediction model with A/B testing, +15% campaign ROI",
        "FastAPI, pgvector, Docker, GitHub Actions CI/CD"
      ]
    },
    {
      title: "Research Intern",
      company: "IIT Hyderabad",
      duration: "May 2024 – Sep 2024",
      location: "Hyderabad, India",
      icon: "🔬",
      color: "from-green-500 to-emerald-500",
      highlights: [
        "VirConvNet: multimodal 3D object detection framework (LiDAR + RGB)",
        "Stochastic Voxel Discard and NRConv techniques",
        "90% voxel density reduction and 2× inference speedup",
        "+3.42% on KITTI 3D AP over Voxel-RCNN baseline"
      ]
    },
    {
      title: "Computer Vision Intern",
      company: "Tata Consultancy Services (TCS)",
      duration: "May 2023 – Jul 2023",
      location: "Chennai, India",
      icon: "👁️",
      color: "from-orange-500 to-red-500",
      highlights: [
        "YOLOv8 computer vision pipeline with OCR integration",
        "P&ID symbol classification with 95%+ accuracy",
        "Deployed as Dockerized Streamlit app for industrial inspections"
      ]
    },
    {
      title: "Data Analyst Intern",
      company: "Sports Mechanics",
      duration: "Dec 2023 – Feb 2024",
      location: "Chennai, India",
      icon: "🏏",
      color: "from-yellow-500 to-amber-500",
      highlights: [
        "Worked with tools for Player performance prediction and talent evaluation",
        "AI-powered commentary generation (Mistral-7B quantized)",
        "Live match notifications via OneSignal API, milestone tracking"
      ]
    }
  ];

  const aiSkills = [
    { category: "Core ML/AI", skills: ["Computer Vision", "NLP", "LLMs (LLaMA, Qwen, Mistral)", "Multimodal Systems", "RAG", "Agentic AI", "RLHF"] },
    { category: "Frameworks & Tools", skills: ["PyTorch", "OpenCV", "PaddleOCR", "LangChain", "HuggingFace", "n8n", "Ollama"] },
    { category: "Backend", skills: ["Python", "FastAPI", "Flask", "PostgreSQL", "pgvector", "SQLAlchemy"] },
    { category: "Infrastructure", skills: ["Docker", "AWS", "Azure", "GCP", "GitHub Actions", "Railway", "Vercel"] }
  ];

  // Frontend/Content Track Data
  const frontendProjects = [
    {
      title: "Velora Wealth",
      description: "Official website for an AMFI-registered financial advisory firm—service pages, founder profile, lead capture forms, and Google Analytics integration.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "Art Space Foundation",
      description: "Nonprofit organization website with Shadcn/UI components, GA4 analytics, donation flow UI, and volunteer registration pages.",
      tech: ["React 18", "TypeScript", "Framer Motion", "Shadcn/UI"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "SEO Diagnostic Tool (upGrowth)",
      description: "Full-stack website SEO analyzer—15 automated checks across 4 categories, weighted scoring with A–F grading. Freelance project for growth marketing consultancy.",
      tech: ["React", "FastAPI", "BeautifulSoup"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "SAP Component Extraction Tool",
      description: "Web tool for manufacturing teams to extract component data from SAP files—multi-file upload, date filtering, Excel export. Eliminated hours of manual data entry.",
      tech: ["React", "FastAPI", "Manufacturing"],
      github: "https://github.com/ThiruDeepak2311",
      link: "#"
    },
    {
      title: "Personal Portfolio",
      description: "Responsive portfolio showcasing projects, skills, and experience with modern UI/UX design. EmailJS contact form integration, smooth animations, and Vercel CI/CD deployment.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
      github: "https://github.com/ThiruDeepak2311",
      link: "https://deepak-portfolio-one.vercel.app/"
    }
  ];

  const frontendExperience = [
    {
      title: "AI Data Annotator",
      company: "OpSquad Technologies",
      duration: "Feb 2026 – Present",
      location: "India",
      icon: "🏷️",
      color: "from-indigo-500 to-blue-500",
      highlights: [
        "High-accuracy data annotation for AI/ML training",
        "Geospatial maps, images, and structured data for global clients",
        "Polygon annotations, bounding boxes, and QA workflows",
        "Precision-first methodology"
      ]
    },
    {
      title: "Freelance Content Writer",
      company: "MyMediTour",
      duration: "Oct 2025 – Feb 2026",
      location: "Remote, USA",
      icon: "✍️",
      color: "from-teal-500 to-cyan-500",
      highlights: [
        "Website copy, service descriptions, and patient-facing content",
        "U.S.-based medical tourism company",
        "Healthcare messaging and SEO-focused landing pages",
        "Brand voice development for international patient acquisition"
      ]
    },
    {
      title: "Content & YouTube Manager",
      company: "Masterclass Space",
      duration: "Jan 2025 – Sept 2025",
      location: "Singapore",
      icon: "🎬",
      color: "from-red-500 to-orange-500",
      highlights: [
        "Educational content for BITSAT and JEE preparation",
        "Structured study resources and doubt-solving initiatives",
        "YouTube channel management: video production, SEO optimization",
        "Scaling digital reach among competitive exam aspirants"
      ]
    },
    {
      title: "Blogger & Technical Writer",
      company: "AI ML Universe",
      duration: "Jul 2024 – Dec 2024",
      location: "Mumbai, India",
      icon: "📝",
      color: "from-violet-500 to-purple-500",
      highlights: [
        "10+ technical blogs on AI/ML, Generative AI, and LLMs",
        "Topics: GitHub Copilot, RAG systems, LLM training, AI prompting",
        "Simplified complex technical topics for beginner-to-advanced audiences"
      ]
    },
    {
      title: "AI Data Trainer",
      company: "Outlier.AI",
      duration: "Jan 2023 – Jun 2024",
      location: "USA",
      icon: "🤖",
      color: "from-pink-500 to-rose-500",
      highlights: [
        "RLHF tasks for LLM training",
        "Prompt evaluation, response ranking, and quality assessment",
        "Model fine-tuning contributions"
      ]
    }
  ];

  const frontendSkills = [
    { category: "Content & Writing", skills: ["Technical Writing", "Blog Writing", "SEO Copywriting", "Healthcare Content", "Educational Content"] },
    { category: "AI & Data", skills: ["Data Annotation", "RLHF", "Prompt Engineering", "LLM Evaluation", "Geospatial Labeling"] },
    { category: "Frontend", skills: ["React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Shadcn/UI"] },
    { category: "SEO & Analytics", skills: ["Google Analytics 4", "Keyword Research", "On-Page SEO", "Technical SEO", "YouTube SEO"] },
    { category: "Tools & Platforms", skills: ["Figma", "Canva", "Notion", "Git", "GitHub", "Vercel", "Railway", "cPanel", "YouTube Studio", "WordPress"] }
  ];

  // Shared Data
  const certifications = [
    { title: "IBM AI Developer", icon: "🤖", color: "from-blue-500 to-cyan-500" },
    { title: "IBM RAG and Agentic AI", icon: "🧠", color: "from-purple-500 to-pink-500" },
    { title: "AWS AI Practitioner", icon: "☁️", color: "from-orange-500 to-yellow-500" },
    { title: "IELTS Band 7.0", icon: "🌍", color: "from-green-500 to-emerald-500" },
    { title: "NPTEL Strategic Management (98%)", icon: "📊", color: "from-red-500 to-rose-500" }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'ai', label: 'AI Engineer', icon: Cpu },
    { id: 'frontend', label: 'Frontend Dev', icon: Code }
  ];

  // Get current track data
  const currentProjects = activeTrack === 'ai' ? aiProjects : activeTrack === 'frontend' ? frontendProjects : [];
  const currentExperience = activeTrack === 'ai' ? aiExperience : activeTrack === 'frontend' ? frontendExperience : [];
  const currentSkills = activeTrack === 'ai' ? aiSkills : activeTrack === 'frontend' ? frontendSkills : [];

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed w-6 h-6 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{ x: cursorPos.x - 12, y: cursorPos.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 backdrop-blur-md bg-black/50 border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTrack('home')}
          >
            DEEPAK.DEV
          </motion.div>
          
          {/* Main Track Navigation */}
          <div className="flex items-center space-x-1 md:space-x-2 bg-gray-900/80 rounded-full p-1 border border-gray-700/50">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTrack(item.id)}
                className={`relative px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all flex items-center space-x-1 md:space-x-2 ${
                  activeTrack === item.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTrack === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.icon && <item.icon className="w-4 h-4 relative z-10" />}
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                <span className="relative z-10 sm:hidden">{item.label.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>

          {/* Quick Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.a
              href="#contact"
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
            <motion.a
              href="https://github.com/ThiruDeepak2311"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/deepak-thirukkumaran-758598232/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative pt-20"
        style={{ y: heroY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10" />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-5xl mx-auto px-4 md:px-6 pt-16">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Deepak
            </span>
            <span className="text-white"> Thirukkumaran</span>
          </motion.h1>

          {/* Dynamic Subtitle based on track */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              {activeTrack === 'home' && (
                <>
                  <p className="text-xl md:text-2xl text-gray-300 mb-4">
                    <span className="text-purple-400">AI/ML Engineer</span> & <span className="text-pink-400">Frontend Developer</span>
                  </p>
                  <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    B.Tech in AI & Data Science from Shiv Nadar University. Building intelligent systems and beautiful interfaces. 
                    From computer vision at TCS to AI solutions at CreatorOS, I bridge the gap between complex algorithms and real-world impact.
                  </p>
                </>
              )}
              {activeTrack === 'ai' && (
                <>
                  <p className="text-xl md:text-2xl text-purple-400 mb-4">
                    AI/ML Engineer
                  </p>
                  <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Computer Vision • NLP • LLMs • Multimodal Systems • RAG • Agentic AI • RLHF<br/>
                    Currently building KPI optimization frameworks at ORCA Digital (7 tools shipped). Previously shipped AI solutions at CreatorOS and researched 3D object detection at IIT Hyderabad.
                  </p>
                </>
              )}
              {activeTrack === 'frontend' && (
                <>
                  <p className="text-xl md:text-2xl text-pink-400 mb-4">
                    Frontend Developer & Content Creator
                  </p>
                  <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    React • TypeScript • Tailwind CSS • Technical Writing • SEO • Data Annotation<br/>
                    Building client websites across healthcare, fintech, and education. Currently working on AI data annotation at OpSquad Technologies.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className="flex justify-center flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {activeTrack === 'home' ? (
              <>
                <motion.button
                  onClick={() => setActiveTrack('ai')}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:shadow-2xl transition-all flex items-center space-x-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cpu className="w-5 h-5" />
                  <span>AI Engineer</span>
                </motion.button>
                <motion.button
                  onClick={() => setActiveTrack('frontend')}
                  className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:shadow-2xl transition-all flex items-center space-x-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code className="w-5 h-5" />
                  <span>Frontend Dev</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.a
                  href="#projects"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  className="border-2 border-purple-500 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-purple-500/10 transition-all"
                  whileHover={{ scale: 1.05, borderColor: "#ec4899" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {activeTrack === 'ai' || activeTrack === 'home' ? (
              <>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">5+</div>
                  <div className="text-gray-400 text-xs md:text-sm">AI Internships</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">7</div>
                  <div className="text-gray-400 text-xs md:text-sm">Tools Shipped</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">95%+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Model Accuracy</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">90%</div>
                  <div className="text-gray-400 text-xs md:text-sm">Voxel Reduction</div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">5+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Client Projects</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">10+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Tech Blogs</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">3</div>
                  <div className="text-gray-400 text-xs md:text-sm">Countries</div>
                </motion.div>
                <motion.div className="text-center p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">7.0</div>
                  <div className="text-gray-400 text-xs md:text-sm">IELTS Band</div>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Resume Download Buttons */}
          <motion.div 
            className="flex justify-center flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.a
              href="/DeepakT_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-800/50 border border-purple-500/30 px-4 py-2 rounded-full text-sm text-purple-400 hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>AI/ML Resume</span>
            </motion.a>
            <motion.a
              href="/DeepakC_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-800/50 border border-pink-500/30 px-4 py-2 rounded-full text-sm text-pink-400 hover:bg-pink-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>Content/Frontend Resume</span>
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </motion.section>

      {/* Track-specific content */}
      <AnimatePresence mode="wait">
        {activeTrack !== 'home' && (
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Skills Section */}
            <motion.section 
              className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-900/50 to-purple-900/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Skills & Technologies
                </motion.h2>
                
                <div className={`grid gap-6 ${activeTrack === 'frontend' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
                  {currentSkills.map((skillGroup, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-700/50"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.skills.map((skill, j) => (
                          <span 
                            key={j}
                            className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section 
              id="projects" 
              className="py-16 md:py-20 px-4 md:px-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {activeTrack === 'ai' ? 'AI/ML Projects' : 'Frontend & Freelance Projects'}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {currentProjects.map((project, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-lg md:text-xl font-bold group-hover:text-purple-400 transition-colors mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, j) => (
                          <span 
                            key={j}
                            className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                          whileHover={{ x: 3 }}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </motion.a>
                        {project.link && project.link !== '#' && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-pink-400 hover:text-pink-300 transition-colors text-sm"
                            whileHover={{ x: 3 }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section 
              id="experience" 
              className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Experience
                </motion.h2>
                
                <div className="space-y-6 md:space-y-8">
                  {currentExperience.map((exp, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-gradient-to-br from-gray-800 to-gray-900 p-5 md:p-6 rounded-2xl border border-gray-700"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="text-3xl md:text-4xl"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {exp.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
                          <h4 className="text-lg md:text-xl font-bold text-white">{exp.title}</h4>
                          <span className="text-purple-400 text-sm">{exp.duration}</span>
                        </div>
                        <p className="text-base md:text-lg text-purple-300 mb-2">{exp.company} • {exp.location}</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {exp.highlights.map((highlight, j) => (
                            <li key={j} className="flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certifications - Always visible */}
      <motion.section 
        className="py-16 md:py-20 px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                className={`bg-gradient-to-r ${cert.color} p-[1px] rounded-full`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900 px-4 md:px-5 py-2 md:py-3 rounded-full flex items-center space-x-2">
                  <span className="text-lg md:text-xl">{cert.icon}</span>
                  <span className="text-sm md:text-base text-white font-medium">{cert.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section 
        className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-gray-900/50 to-purple-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl mb-4">🎓</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">B.Tech, Artificial Intelligence & Data Science</h3>
            <p className="text-purple-400 text-lg mb-2">Shiv Nadar University, Chennai</p>
            <p className="text-gray-400">2021 – 2025 • CGPA: 7.683</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-16 md:py-20 px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Open to full-time opportunities, freelance projects, and collaborations.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
              
              <form ref={form} onSubmit={sendEmail} className="space-y-5 md:space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                  >
                    <span>Failed to send. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Email Display */}
              <motion.a
                href="mailto:thirudeepak2003@gmail.com"
                className="flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-5 md:px-6 py-4 rounded-full hover:bg-purple-500/10 transition-all group"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 md:w-6 h-5 md:h-6 text-purple-400 group-hover:text-purple-300" />
                <span className="text-base md:text-lg text-white font-medium">thirudeepak2003@gmail.com</span>
              </motion.a>

              {/* Social Icons */}
              <div className="flex space-x-4 md:space-x-6 justify-center">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/deepak-thirukkumaran-758598232/", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/ThiruDeepak2311", label: "GitHub" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.2, rotate: 360, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.a>
                ))}
              </div>

              {/* Current Status */}
              <motion.div 
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 p-5 md:p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold text-base md:text-lg">Available for Opportunities</span>
                </div>
                <p className="text-white font-medium">Full-time roles & Freelance projects</p>
                <p className="text-gray-300 text-sm mt-2">Ready to start immediately</p>
              </motion.div>

              {/* Contact Details */}
              <motion.div 
                className="space-y-3 md:space-y-4 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📍</span>
                  <span>Chennai, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📱</span>
                  <span>+91-9940211754</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🕐</span>
                  <span>IST (UTC +5:30)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">⚡</span>
                  <span>Usually responds within 24 hours</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center text-gray-500 border-t border-gray-800">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-sm md:text-base"
        >
          © 2025 Deepak Thirukkumaran. Building intelligent systems & beautiful interfaces.
        </motion.p>
      </footer>
    </div>
  );
};

export default App;