import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

/* ===== Motion helpers (moves: count-up, typewriter, kinetic type, punch-in, checklist, bar fill) ===== */

// Count-up: rolls a number like "99.2%" or "12+" to its value when it scrolls into view
const CountUp = ({ value, duration = 1800 }) => {
  const ref = useRef(null);
  const match = String(value).match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    let raf;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); // power4.out
        setDisplay((target * eased).toFixed(decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (el) obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, decimals, duration]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>{display}{suffix}</span>;
};

// Typewriter: types and deletes a rotating list of phrases
const Typewriter = ({ words, typeSpeed = 70, deleteSpeed = 35, pause = 1600 }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span>
      {text}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-purple-400 ml-1 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
    </span>
  );
};

// Kinetic letters: each letter slams in, stretching from squashed to full height
const KineticLetters = ({ text, className = '', delay = 0 }) => (
  <span className="inline-block">
    {text.split('').map((ch, i) => (
      <motion.span
        key={i}
        className={`inline-block ${className}`}
        style={{ transformOrigin: 'bottom' }}
        initial={{ opacity: 0, y: 60, scaleY: 0.2, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
        transition={{ delay: delay + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {ch === ' ' ? ' ' : ch}
      </motion.span>
    ))}
  </span>
);

// Kinetic heading with punch-in: words slam in one by one, whole line zooms from big to normal
const KineticHeading = ({ text, className = '' }) => (
  <motion.h2
    className={`text-5xl font-bold text-center tracking-wide leading-tight py-4 ${className}`}
    initial={{ scale: 1.25, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.6 }}
    style={{ lineHeight: '1.2' }}
  >
    {text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, skewX: i % 2 === 0 ? 12 : -12 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        transition={{ delay: 0.1 + i * 0.12, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {word}
      </motion.span>
    ))}
  </motion.h2>
);

const App = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeProfile, setActiveProfile] = useState('ai'); // 'ai' | 'frontend'
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
  const { scrollYProgress } = useScroll();
  // Removed heroOpacity to prevent text from fading out

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
      'portfolio', // Your EmailJS service ID
      'template_1d32j2u', // Your EmailJS template ID  
      form.current,
      'JFp_pQe8ef06A21cE' // Your public key
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

  const projects = [
    {
      title: "Rocketlane: Multi-Agent Onboarding Automation",
      description: "Multi-agent customer onboarding system with LangGraph — Intake/Routing and Communication agents with validation guardrails, escalation handling, and voice-based tier confirmation via Vapi. Integrated Gmail monitoring, Rocketlane APIs, and Slack provisioning. Powered by Groq Llama 3.3 70B; validated with 14 automated tests.",
      tech: ["LangGraph", "Vapi", "Groq", "Agentic AI"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Forward Deployed Engineering"
    },
    {
      title: "Tendering AI - Bid Intelligence Platform",
      description: "Multi-agent AI system for Oil & Gas tender automation orchestrating 8 agents across qualification, BOM generation, supplier evaluation, and proposal assembly. HITL approval workflows and a Gemini-powered qualification agent for automated Go/No-Go decisions.",
      tech: ["LLMs", "Multi-Agent Systems", "Gemini", "Full-Stack"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Stealth"
    },
    {
      title: "MedFusion: Vision-Language Framework",
      description: "Multimodal radiology VQA and report generation system combining ConvNeXt, fine-tuned CLIP (ViT-32B), and Med-LLaMA with residual feature fusion. 76.3% accuracy on SLAKE, 72.8% on PMC-VQA benchmarks.",
      tech: ["Computer Vision", "LLMs", "Healthcare AI", "PyTorch"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "Fintech Intelligence Pipeline",
      description: "Time-series-driven stock analysis platform processing live market data (Polygon.io) with LLaMA 3.2-based trend and risk scoring to generate driver-based investment insights. Deployed with Flask APIs, React dashboard, PostgreSQL, and Railway CI/CD.",
      tech: ["LLMs", "Time-Series", "Full-Stack", "Railway"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "HITL Curriculum Generator",
      description: "Automated curriculum generation pipeline using Ollama/Mistral with constrained prompts for structured JSON output mapped to competency standards. Async human-in-the-loop approval gate via webhooks. Dockerized for Railway deployment.",
      tech: ["n8n", "Ollama/Mistral", "Docker", "Webhooks"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "SAP Component Extraction Tool",
      description: "Web tool for manufacturing teams to extract component data from unstructured SAP schedule files using regex pattern matching. Multi-file upload, cumulative quantity aggregation by custom date filters. Deployed on Railway with Excel export.",
      tech: ["Python", "FastAPI", "React", "Manufacturing"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Freelance"
    },
    {
      title: "VirConvNet - 3D Object Detection",
      description: "Advanced multimodal framework integrating LiDAR and RGB data. Achieved 90% voxel density reduction and 3.42% AP improvement on KITTI dataset.",
      tech: ["PyTorch", "Computer Vision", "LiDAR", "RGB Fusion"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "IIT Hyderabad Research"
    },
    {
      title: "Social Media Analytics OCR System",
      description: "End-to-end system extracting demographics from Instagram/TikTok screenshots using PaddleOCR, OpenCV, and rule-based algorithms.",
      tech: ["PaddleOCR", "OpenCV", "AWS", "Docker"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "CreatorOS London"
    },
    {
      title: "MiniGPT-Med Medical Imaging",
      description: "Medical report generation system using EVA-CLIP-18B with LLaMA 3, featuring visual question answering for medical image interpretation.",
      tech: ["LLaMA 3", "EVA-CLIP", "Medical AI", "PyTorch"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "RAG Chatbot for PDF Documents",
      description: "Retrieval-Augmented Generation chatbot with FAISS-based vector search achieving <500ms response time using Cohere API and Hugging Face.",
      tech: ["LangChain", "FAISS", "Cohere API", "Streamlit"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "P&ID Component Detection",
      description: "Computer vision solution using YOLOv8 detecting 32 P&ID components with 95% accuracy, exceeding baselines by 10%.",
      tech: ["YOLOv8", "Computer Vision", "Streamlit", "Python"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Tata Consultancy Services"
    },
    {
      title: "Text-to-Video Press Release System",
      description: "Multilingual system with ESRGAN-powered enhancement, reducing video production time by 70%. Winner at Smart India Hackathon 2023.",
      tech: ["ESRGAN", "NLP", "Computer Vision", "Streamlit"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Smart India Hackathon Winner"
    }
  ];

  const experience = [
    {
      title: "Contract – AI/ML Software Engineer",
      company: "ORCA Digital Lean Solutions",
      duration: "Nov 2025 – Present",
      location: "Michigan, USA",
      type: "contract",
      icon: "🏭",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "KPI optimization framework for manufacturing: multi-tenant FastAPI backend with PostgreSQL",
        "Calculation engine for weighted scoring and cost-efficiency optimization",
        "Budget-constrained action plan generation using greedy algorithms",
        "Real-time KPI dashboards and trend-tracking tools for factory floor teams"
      ]
    },
    {
      title: "AI Engineer Intern",
      company: "CreatorOS by DRPCRD",
      duration: "Jan 2025 - Jul 2025",
      location: "London",
      type: "internship",
      icon: "💼",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Built complete OCR system for social media analytics",
        "Deployed profanity detection pipeline with video processing",
        "Led CI/CD lifecycle with GitHub Actions and AWS infrastructure",
        "Designed predictive pricing models using ML regression"
      ]
    },
    {
      title: "Research Intern",
      company: "IIT Hyderabad",
      duration: "May 2024 - Sep 2024",
      location: "Hyderabad",
      type: "research",
      icon: "🔬",
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Developed VirConvNet multimodal 3D object detection",
        "Introduced StVD and NRConv techniques",
        "Achieved 90% voxel density reduction",
        "Published-level research with 3.42% AP improvement"
      ]
    },
    {
      title: "Data Analyst Intern",
      company: "Sports Mechanics",
      duration: "Dec 2023 - Feb 2024",
      location: "Chennai",
      type: "internship",
      icon: "📊",
      color: "from-orange-500 to-red-500",
      highlights: [
        "Engineered analytical models for cricket performance",
        "Developed proprietary AI systems for player analysis",
        "Improved data-driven decision making processes"
      ]
    },
    {
      title: "Computer Vision Intern",
      company: "Tata Consultancy Services",
      duration: "May 2023 - Jul 2023",
      location: "Chennai",
      type: "internship",
      icon: "👁️",
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Developed YOLOv8 solution for P&ID component detection with 99.2% mAP50 and 94.8% mAP50-95",
        "Integrated SAHI tiling and EasyOCR for text extraction from engineering diagrams",
        "Reduced manual inspection time by 40% through Streamlit-based real-time deployment"
      ]
    }
  ];

  const achievements = [
    {
      title: "Smart India Hackathon Winner",
      issuer: "Government of India",
      date: "2023",
      type: "award",
      icon: "🏆",
      color: "from-yellow-500 to-amber-500"
    },
    {
      title: "Top 50 - Cricket & Coding Challenge",
      issuer: "IIT Madras",
      date: "2024",
      type: "competition",
      icon: "🥇",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "B.Tech AI & Data Science",
      issuer: "Shiv Nadar University Chennai",
      date: "2025",
      type: "degree",
      icon: "🎓",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "NPTEL Blockchain Certification",
      issuer: "IIT/IISc",
      date: "2024",
      type: "certification",
      icon: "📜",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "IELTS English Certification",
      issuer: "British Council",
      date: "2024",
      type: "certification",
      icon: "🌍",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "NPTEL LLM Certification",
      issuer: "IIT/IISc",
      date: "2024",
      type: "certification",
      icon: "🤖",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const frontendProjects = [
    {
      title: "Tendering AI – Full-Stack Platform",
      description: "End-to-end web platform for Oil & Gas bid intelligence. Built React frontend with multi-step wizard flows, real-time agent status updates, and proposal assembly UI. FastAPI backend with WebSocket-based progress streaming.",
      tech: ["React", "FastAPI", "WebSocket", "Tailwind CSS"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Stealth"
    },
    {
      title: "KPI Dashboard – ORCA Manufacturing",
      description: "Real-time factory floor KPI dashboard with trend-tracking charts, multi-tenant workspace switching, and budget-constrained action plan views. Built with React, Recharts, and a FastAPI/PostgreSQL backend.",
      tech: ["React", "Recharts", "FastAPI", "PostgreSQL"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "ORCA Digital Lean Solutions"
    },
    {
      title: "Fintech Stock Intelligence UI",
      description: "React dashboard consuming live market data from Polygon.io. Interactive time-series charts, risk scoring cards, and driver-based investment insight panels. Deployed with Railway CI/CD.",
      tech: ["React", "Chart.js", "Flask", "Railway"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "SAP Component Extraction Tool",
      description: "Clean React web app for manufacturing teams. Multi-file upload with drag-and-drop, date-filter controls, cumulative quantity aggregation table, and one-click Excel export. Shipped to production on Railway.",
      tech: ["React", "Python", "FastAPI", "Excel Export"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Freelance"
    },
    {
      title: "MedFusion – Medical Imaging UI",
      description: "Interactive radiology VQA interface built in Streamlit. Drag-and-drop image upload, question input, visual attention map overlays, and report generation output panels.",
      tech: ["Streamlit", "Python", "OpenCV", "UI/UX"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Personal Project"
    },
    {
      title: "P&ID Detection – Streamlit App",
      description: "Real-time computer vision deployment UI for TCS. Streamlit app allowing engineers to upload P&ID drawings and instantly view detected components with bounding boxes and OCR-extracted text.",
      tech: ["Streamlit", "YOLOv8", "EasyOCR", "Python"],
      github: "https://github.com/ThiruDeepak2311",
      organization: "Tata Consultancy Services"
    }
  ];

  const frontendExperience = [
    {
      title: "Contract – AI/ML Software Engineer",
      company: "ORCA Digital Lean Solutions",
      duration: "Nov 2025 – Present",
      location: "Michigan, USA",
      type: "contract",
      icon: "🏭",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Built React KPI dashboards with Recharts for real-time factory floor monitoring",
        "Designed multi-tenant workspace UI with role-based access and data isolation",
        "Created interactive action plan builder with budget sliders and priority controls",
        "Integrated FastAPI WebSocket endpoints for live trend-tracking updates"
      ]
    },
    {
      title: "AI Engineer Intern",
      company: "CreatorOS by DRPCRD",
      duration: "Jan 2025 - Jul 2025",
      location: "London",
      type: "internship",
      icon: "💼",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Designed analytics dashboards for social media performance metrics",
        "Built React components for OCR result visualization with image overlays",
        "Integrated AWS S3 file pipelines with frontend upload flows",
        "Developed pricing model UI with input forms and result summary cards"
      ]
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "Independent",
      duration: "2024 – Present",
      location: "Remote",
      type: "freelance",
      icon: "🧑‍💻",
      color: "from-pink-500 to-purple-500",
      highlights: [
        "SAP component extraction tool with drag-and-drop file upload and Excel export",
        "Delivered production-ready React apps with Railway CI/CD pipelines",
        "Built REST API-backed UIs with FastAPI and deployed on Railway",
        "Responsive Tailwind CSS layouts with mobile-first design approach"
      ]
    },
    {
      title: "Smart India Hackathon – Frontend Lead",
      company: "Team of 6",
      duration: "2023",
      location: "National",
      type: "competition",
      icon: "🏆",
      color: "from-yellow-500 to-amber-500",
      highlights: [
        "Led frontend development for Text-to-Video press release system",
        "Built multilingual input UI with video preview and download flows",
        "Streamlit-based deployment showcased live to national judges",
        "Won 1st place — Government of India Smart India Hackathon 2023"
      ]
    }
  ];

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed w-6 h-6 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: cursorPos.x - 12, y: cursorPos.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Scroll progress bar (bar fill move) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-40 backdrop-blur-md bg-black/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            DEEPAK.DEV
          </motion.div>

          {/* Profile Switcher */}
          <div className="flex items-center bg-gray-900/80 border border-gray-700 rounded-full p-1">
            <motion.button
              onClick={() => setActiveProfile('ai')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeProfile === 'ai'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              🤖 AI Engineer
            </motion.button>
            <motion.button
              onClick={() => setActiveProfile('frontend')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeProfile === 'frontend'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              🎨 Frontend Dev
            </motion.button>
          </div>

          <div className="flex space-x-8">
            {['About', 'Projects', 'Experience', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-purple-400 transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="about" 
        className="min-h-screen flex items-center justify-center relative"
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

        <div className="text-center z-10 max-w-5xl mx-auto px-6 pt-32">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-16">
            <KineticLetters
              text="Deepak"
              delay={0.5}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
            />
            <span className="inline-block">&nbsp;</span>
            <KineticLetters text="Thirukkumaran" delay={0.8} className="text-white" />
          </h1>

          <motion.div
            className="text-xl md:text-2xl font-semibold text-purple-300 mb-12 h-8"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Typewriter
              words={[
                'AI/ML Engineer',
                'Multi-Agent Systems Builder',
                'Computer Vision Researcher',
                'Frontend Developer',
                'Founder @ Stealth Startup'
              ]}
            />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Born and raised in Chennai, my journey with technology began with academic excellence with achieving centum in Social Science during my Class 10 CBSE exams.
            <br />
            <span className="text-purple-400">When I started my B.Tech in AI & Data Science at SNU Chennai, little did I know that AI would explode globally alongside my studies.</span>
          </motion.p>

          <motion.p 
            className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            Navigating post-COVID challenges while diving deep into cutting-edge tech for four years shaped my resilience.
            <br />
            Each internship became a stepping stone in my career, from computer vision at TCS to sports analytics at SportsMechanics, research at IIT Hyderabad, and finally engineering AI solutions at CreatorOS.
            <br />
            <span className="text-white font-medium">My recent role as an AI Engineer at a startup taught me to bridge the gap between complex algorithms and real-world business needs, working alongside non-technical teams.</span>
          </motion.p>

          <motion.p 
            className="text-lg text-purple-300 mb-8 leading-relaxed max-w-4xl mx-auto font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            The coincidence that AI's revolutionary growth paralleled my own learning journey and we evolved together,
            <br />
            and now I'm ready to shape the future with current tech heads.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6 flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <motion.a
              href="#projects"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="border-2 border-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05, borderColor: "#ec4899" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Key Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {[
              { number: "5+", label: "Industry Roles" },
              { number: "12+", label: "Major Projects" },
              { number: "99.2%", label: "Best Model Accuracy" },
              { number: "40%", label: "Efficiency Improvement" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  <CountUp value={stat.number} />
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
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

      {/* Profile Banner */}
      <motion.div
        key={activeProfile}
        className={`relative z-10 mt-24 mx-6 rounded-2xl p-4 text-center border ${
          activeProfile === 'ai'
            ? 'bg-purple-900/20 border-purple-500/30 text-purple-300'
            : 'bg-cyan-900/20 border-cyan-500/30 text-cyan-300'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium">
          {activeProfile === 'ai'
            ? '🤖 Viewing: AI / ML Engineer profile — projects, experience & research in computer vision, LLMs, and multi-agent systems'
            : '🎨 Viewing: Frontend Developer profile — UI projects, dashboards, and full-stack product builds'}
        </span>
      </motion.div>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="min-h-screen py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <KineticHeading text={activeProfile === 'ai' ? 'Featured Projects' : 'Product & UI Builds'} className="mb-16" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeProfile === 'ai' ? projects : frontendProjects).map((project, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors group"
                initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {project.organization}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <motion.span
                      key={j}
                      className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-xs"
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + j * 0.08, type: 'spring', stiffness: 400, damping: 14 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        className="py-20 px-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <KineticHeading text="Experience & Achievements" className="mb-16" />
          
          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-white">
              {activeProfile === 'ai' ? 'Professional Experience' : 'Development Experience'}
            </h3>
            <div className="space-y-8">
              {(activeProfile === 'ai' ? experience : frontendExperience).map((exp, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="text-4xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {exp.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                      <span className="text-purple-400 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-lg text-purple-300 mb-2">{exp.company} • {exp.location}</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {exp.highlights.map((highlight, j) => (
                        <motion.li
                          key={j}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + j * 0.15, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="text-green-400 mr-2 font-bold"
                            initial={{ scale: 0, rotate: -90 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.45 + j * 0.15, type: 'spring', stiffness: 500, damping: 12 }}
                            viewport={{ once: true }}
                          >
                            ✓
                          </motion.span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center text-white">Achievements & Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors group relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 3) * 0.1, type: 'spring', stiffness: 260, damping: 13 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" }}
                  viewport={{ once: true }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="text-3xl"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${achievement.color} bg-opacity-20 text-white font-medium`}>
                        {achievement.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {achievement.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      {achievement.issuer}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">
                        {achievement.date}
                      </span>
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${achievement.color}`}
                        animate={{ 
                          boxShadow: [`0 0 0 0 rgba(168, 85, 247, 0.7)`, `0 0 0 8px rgba(168, 85, 247, 0)`]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <KineticHeading text="Let's Connect" className="mb-8" />
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            "Every algorithm I write is a step closer to making AI truly beneficial for humanity"
          </motion.p>

          <motion.p 
            className="text-lg text-gray-400 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Open to collaborations, research opportunities, and innovative AI projects.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
              
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
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
                    rows="5"
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

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                  >
                    <span>Failed to send message. Please try again or email me directly.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Email Display */}
              <motion.a
                href="mailto:thirudeepak2003@gmail.com"
                className="flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-6 py-4 rounded-full hover:bg-purple-500/10 transition-all group"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                <span className="text-lg text-white font-medium">thirudeepak2003@gmail.com</span>
              </motion.a>

              {/* Social Icons */}
              <div className="flex space-x-6 justify-center">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/deepak-thirukkumaran-758598232/", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/ThiruDeepak2311", label: "GitHub" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.2, rotate: 360, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-8 h-8 text-white" />
                  </motion.a>
                ))}
              </div>

              {/* Current Status */}
              <motion.div 
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 font-semibold text-lg">Current Status</span>
                </div>
                <p className="text-white font-medium">Looking for full-time opportunities</p>
                <p className="text-gray-300 text-sm mt-2">Ready to start immediately</p>
              </motion.div>

              {/* Contact Details */}
              <motion.div 
                className="space-y-4 text-gray-400"
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
      <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          © 2025 Deepak Thirukkumaran. Building tomorrow's intelligent systems, one commit at a time.
        </motion.p>
      </footer>
    </div>
  );
};

export default App;