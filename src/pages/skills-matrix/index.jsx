import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import CategoryFilter from './components/CategoryFilter';
import SkillsGrid from './components/SkillsGrid';
import SkillsStats from './components/SkillsStats';
import CosmicBackground from './components/CosmicBackground';
import Icon from '../../components/AppIcon';

const SkillsMatrix = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skillsData = [
    {
      id: 1,
      name: "React.js",
      category: "Frontend",
      categoryId: "frontend",
      icon: "Code2",
      level: 95,
      experience: 4,
      projects: 25,
      description: "Expert in building scalable, performant React applications with modern hooks, context API, and component architecture patterns.",
      technologies: ["JSX", "Hooks", "Context", "Redux", "Next.js"]
    },
    {
      id: 2,
      name: "Node.js",
      category: "Backend",
      categoryId: "backend",
      icon: "Server",
      level: 90,
      experience: 3,
      projects: 18,
      description: "Proficient in server-side JavaScript development, API design, and microservices architecture using Node.js ecosystem.",
      technologies: ["Express", "Fastify", "Socket.io", "JWT", "Passport"]
    },
    {
      id: 3,
      name: "AWS Cloud",
      category: "Cloud",
      categoryId: "cloud",
      icon: "Cloud",
      level: 85,
      experience: 2,
      projects: 12,
      description: "Certified AWS practitioner with hands-on experience in EC2, S3, Lambda, RDS, and CloudFormation for scalable deployments.",
      technologies: ["EC2", "S3", "Lambda", "RDS", "CloudWatch"]
    },
    {
      id: 4,
      name: "JavaScript",
      category: "Programming",
      categoryId: "programming",
      icon: "Zap",
      level: 95,
      experience: 5,
      projects: 40,
      description: "Advanced JavaScript developer with deep understanding of ES6+, async programming, and modern development patterns.",
      technologies: ["ES6+", "Async/Await", "Promises", "Modules", "Classes"]
    },
    {
      id: 5,
      name: "Python",
      category: "Programming",
      categoryId: "programming",
      icon: "Code",
      level: 80,
      experience: 3,
      projects: 15,
      description: "Skilled in Python development for web applications, data processing, and automation scripts with Django and Flask.",
      technologies: ["Django", "Flask", "Pandas", "NumPy", "Requests"]
    },
    {
      id: 6,
      name: "MongoDB",
      category: "Database",
      categoryId: "database",
      icon: "Database",
      level: 85,
      experience: 3,
      projects: 20,
      description: "Experienced in NoSQL database design, aggregation pipelines, and performance optimization for MongoDB applications.",
      technologies: ["Mongoose", "Aggregation", "Indexing", "Sharding", "Atlas"]
    },
    {
      id: 7,
      name: "PostgreSQL",
      category: "Database",
      categoryId: "database",
      icon: "HardDrive",
      level: 80,
      experience: 2,
      projects: 14,
      description: "Proficient in relational database design, complex queries, and performance tuning for PostgreSQL systems.",
      technologies: ["SQL", "Joins", "Triggers", "Views", "Procedures"]
    },
    {
      id: 8,
      name: "Docker",
      category: "DevOps",
      categoryId: "devops",
      icon: "Package",
      level: 75,
      experience: 2,
      projects: 16,
      description: "Containerization expert with Docker for application deployment, multi-stage builds, and orchestration workflows.",
      technologies: ["Dockerfile", "Compose", "Volumes", "Networks", "Registry"]
    },
    {
      id: 9,
      name: "Git & GitHub",
      category: "Tools",
      categoryId: "tools",
      icon: "GitBranch",
      level: 90,
      experience: 5,
      projects: 50,
      description: "Advanced version control with Git, GitHub workflows, branching strategies, and collaborative development practices.",
      technologies: ["Branching", "Merging", "Actions", "Hooks", "Workflows"]
    },
    {
      id: 10,
      name: "TypeScript",
      category: "Programming",
      categoryId: "programming",
      icon: "FileCode",
      level: 85,
      experience: 2,
      projects: 12,
      description: "Strong typing advocate with TypeScript for large-scale applications, interfaces, generics, and advanced type patterns.",
      technologies: ["Interfaces", "Generics", "Decorators", "Modules", "Types"]
    },
    {
      id: 11,
      name: "Next.js",
      category: "Frontend",
      categoryId: "frontend",
      icon: "Globe",
      level: 90,
      experience: 3,
      projects: 15,
      description: "Full-stack React framework expertise with SSR, SSG, API routes, and performance optimization for production applications.",
      technologies: ["SSR", "SSG", "API Routes", "Image Opt", "Deployment"]
    },
    {
      id: 12,
      name: "Tailwind CSS",
      category: "Frontend",
      categoryId: "frontend",
      icon: "Palette",
      level: 95,
      experience: 3,
      projects: 30,
      description: "Utility-first CSS framework mastery for rapid UI development, custom designs, and responsive web applications.",
      technologies: ["Utilities", "Components", "Responsive", "Dark Mode", "Plugins"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3X3', count: skillsData?.length },
    { id: 'frontend', name: 'Frontend', icon: 'Monitor', count: skillsData?.filter(s => s?.categoryId === 'frontend')?.length },
    { id: 'backend', name: 'Backend', icon: 'Server', count: skillsData?.filter(s => s?.categoryId === 'backend')?.length },
    { id: 'programming', name: 'Programming', icon: 'Code2', count: skillsData?.filter(s => s?.categoryId === 'programming')?.length },
    { id: 'database', name: 'Database', icon: 'Database', count: skillsData?.filter(s => s?.categoryId === 'database')?.length },
    { id: 'cloud', name: 'Cloud', icon: 'Cloud', count: skillsData?.filter(s => s?.categoryId === 'cloud')?.length },
    { id: 'devops', name: 'DevOps', icon: 'Settings', count: skillsData?.filter(s => s?.categoryId === 'devops')?.length },
    { id: 'tools', name: 'Tools', icon: 'Wrench', count: skillsData?.filter(s => s?.categoryId === 'tools')?.length }
  ];

  return (
    <>
      <Helmet>
        <title>Skills Matrix - Cosmic Portfolio | Vikaskumar Dane</title>
        <meta name="description" content="Explore my technical competencies in an interactive skills matrix. Categorized expertise in frontend, backend, cloud, and more technologies." />
        <meta name="keywords" content="skills, technical competencies, React, Node.js, AWS, JavaScript, Python, full stack developer" />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <CosmicBackground />
        <Header />
        
        <div className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                  <Icon name="Zap" size={16} className="text-primary mr-2" />
                  <span className="text-primary font-mono text-sm">Skills Galaxy</span>
                </div>
                
                <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                  Technical
                  <span className="text-primary block">Competencies</span>
                </h1>
                
                <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore my technical universe through an interactive matrix of skills, 
                  technologies, and expertise levels. Each skill represents years of 
                  dedicated learning and real-world application.
                </p>
              </motion.div>

              {/* Skills Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <SkillsStats skills={skillsData} />
              </motion.div>
            </div>
          </section>

          {/* Skills Matrix Section */}
          <section className="py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CategoryFilter 
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <SkillsGrid 
                  skills={skillsData}
                  activeCategory={activeCategory}
                />
              </motion.div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-12 cosmic-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Rocket" size={32} className="text-primary" />
                </div>
                
                <h2 className="font-headline text-3xl md:text-4xl text-card-foreground mb-4">
                  Ready to Build Something Amazing?
                </h2>
                
                <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's combine these technical skills to create innovative solutions 
                  for your next project. From concept to deployment, I bring the 
                  expertise to make it happen.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/projects-showcase'}
                    className="px-8 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:cosmic-glow transition-cosmic"
                  >
                    <Icon name="FolderOpen" size={18} className="inline mr-2" />
                    View Projects
                  </button>
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="px-8 py-3 bg-transparent border border-border text-foreground font-body font-semibold rounded-lg hover:border-primary hover:text-primary transition-cosmic"
                  >
                    <Icon name="Mail" size={18} className="inline mr-2" />
                    Get In Touch
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SkillsMatrix;