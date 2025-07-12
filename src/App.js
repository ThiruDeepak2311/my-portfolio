import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const App = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
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
        "Developed YOLOv8 solution for P&ID component detection",
        "Achieved 95% accuracy exceeding baselines by 10%",
        "Integrated solution into Streamlit app for real-time use"
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

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed w-6 h-6 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: cursorPos.x - 12, y: cursorPos.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        
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
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-12 mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Deepak
            </span>
            <span className="text-white"> Thirukkumaran</span>
          </motion.h1>
          
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
              { number: "4+", label: "Industry Internships" },
              { number: "6+", label: "Major Projects" },
              { number: "95%", label: "Best Model Accuracy" },
              { number: "90%", label: "Performance Improvement" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
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
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide leading-tight py-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ lineHeight: '1.2' }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
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
                    <span 
                      key={j}
                      className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-xs"
                    >
                      {tech}
                    </span>
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
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience & Achievements
          </motion.h2>
          
          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-white">Professional Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, i) => (
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

          {/* Achievements Grid */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center text-white">Achievements & Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            "Every algorithm I write is a step closer to making AI truly beneficial for humanity"
          </motion.p>

          <motion.p 
            className="text-lg text-gray-400 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Open to collaborations, research opportunities, and innovative AI projects.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Email Display */}
            <motion.a
              href="mailto:thirudeepak2003@gmail.com"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-6 py-3 rounded-full hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5 text-purple-400" />
              <span className="text-lg text-white font-medium">thirudeepak2003@gmail.com</span>
            </motion.a>

            {/* Social Icons */}
            <div className="flex space-x-8">
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
          </motion.div>

          <motion.div 
            className="mt-12 text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>📍 Chennai, India</p>
            <p>📱 +91-9940211754</p>
          </motion.div>
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