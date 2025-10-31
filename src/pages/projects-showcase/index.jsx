import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import ProjectModal from './components/ProjectModal';
import ProjectStats from './components/ProjectStats';
import Button from '../../components/ui/Button';


const ProjectsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Projects Data
  const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    status: "Live",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    imageAlt: "Modern e-commerce website dashboard showing product analytics and sales charts on multiple screens",
    description: "A comprehensive e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.",
    detailedDescription: `Built a scalable e-commerce platform serving 10,000+ daily users with microservices architecture. Implemented real-time inventory tracking, multi-payment gateway integration, and AI-powered product recommendations. The platform achieved 99.9% uptime and reduced page load times by 40% through optimized caching strategies.`,
    technologies: ["React", "Node.js", "MongoDB", "Redis", "AWS", "Stripe", "Docker"],
    timeline: "6 months (Jan 2024 - Jun 2024)",
    teamSize: "5 Developers",
    role: "Lead Full Stack Developer",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/vikaskumar/ecommerce-platform",
    metrics: [
    { label: "Daily Users", value: "10K+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Load Time", value: "1.2s" },
    { label: "Conversion", value: "3.8%" }],

    features: [
    "Real-time inventory management",
    "Multi-payment gateway integration",
    "AI-powered recommendations",
    "Advanced analytics dashboard",
    "Mobile-responsive design",
    "SEO optimization"],

    challenges: [
    {
      title: "Scalability Issues",
      solution: "Implemented microservices architecture with Docker containers and load balancing to handle high traffic volumes."
    },
    {
      title: "Payment Security",
      solution: "Integrated PCI-compliant payment processing with end-to-end encryption and fraud detection systems."
    }]

  },
  {
    id: 2,
    title: "Task Management App",
    category: "Frontend",
    year: "2024",
    status: "Live",
    image: "https://images.unsplash.com/photo-1609188343737-366b8dc25152",
    imageAlt: "Clean task management interface showing kanban boards with colorful task cards and progress indicators",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    detailedDescription: `Developed a modern task management solution with real-time collaboration capabilities. Features include drag-and-drop kanban boards, time tracking, file attachments, and comprehensive reporting. The application supports teams of up to 100 members with role-based permissions and integrates with popular tools like Slack and Google Calendar.`,
    technologies: ["React", "TypeScript", "Socket.io", "Tailwind CSS", "Framer Motion"],
    timeline: "4 months (Mar 2024 - Jun 2024)",
    teamSize: "3 Developers",
    role: "Frontend Lead",
    liveUrl: "https://example-taskmanager.com",
    githubUrl: "https://github.com/vikaskumar/task-manager",
    metrics: [
    { label: "Active Teams", value: "500+" },
    { label: "Tasks Created", value: "50K+" },
    { label: "User Rating", value: "4.8/5" },
    { label: "Response Time", value: "200ms" }],

    features: [
    "Drag-and-drop kanban boards",
    "Real-time collaboration",
    "Time tracking and reporting",
    "File attachments and comments",
    "Integration with Slack & Calendar",
    "Mobile-responsive design"],

    challenges: [
    {
      title: "Real-time Synchronization",
      solution: "Implemented WebSocket connections with conflict resolution algorithms to ensure data consistency across multiple users."
    }]

  },
  {
    id: 3,
    title: "AI Chat Assistant",
    category: "AI/ML",
    year: "2024",
    status: "In Development",
    image: "https://images.unsplash.com/photo-1678995636988-5e0528853cf1",
    imageAlt: "Futuristic AI chat interface with glowing neural network patterns and conversation bubbles on dark background",
    description: "An intelligent chat assistant powered by machine learning algorithms with natural language processing capabilities.",
    detailedDescription: `Building an advanced AI chat assistant using transformer models and natural language processing. The system can understand context, maintain conversation history, and provide intelligent responses across multiple domains. Features include sentiment analysis, multi-language support, and integration with various business systems.`,
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker"],
    timeline: "8 months (Sep 2023 - Apr 2024)",
    teamSize: "4 Developers",
    role: "AI/ML Engineer",
    githubUrl: "https://github.com/vikaskumar/ai-chat-assistant",
    metrics: [
    { label: "Accuracy", value: "94%" },
    { label: "Languages", value: "12" },
    { label: "Response Time", value: "500ms" },
    { label: "Training Data", value: "1M+" }],

    features: [
    "Natural language understanding",
    "Context-aware responses",
    "Multi-language support",
    "Sentiment analysis",
    "Integration APIs",
    "Learning from interactions"],

    challenges: [
    {
      title: "Model Accuracy",
      solution: "Fine-tuned transformer models with domain-specific data and implemented continuous learning mechanisms."
    },
    {
      title: "Response Latency",
      solution: "Optimized model inference with caching strategies and deployed on GPU-accelerated infrastructure."
    }]

  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    category: "Data Science",
    year: "2023",
    status: "Live",
    image: "https://images.unsplash.com/photo-1722503585597-548c99b0320c",
    imageAlt: "Interactive data dashboard displaying colorful charts, graphs, and analytics on multiple monitor setup",
    description: "Interactive dashboard for complex data visualization with real-time analytics and customizable reporting features.",
    detailedDescription: `Created a comprehensive data visualization platform that processes millions of data points in real-time. The dashboard features interactive charts, customizable widgets, and automated report generation. Built with performance optimization to handle large datasets while maintaining smooth user interactions.`,
    technologies: ["D3.js", "React", "Python", "Pandas", "PostgreSQL", "Redis"],
    timeline: "5 months (Aug 2023 - Dec 2023)",
    teamSize: "2 Developers",
    role: "Full Stack Developer",
    liveUrl: "https://example-dashboard.com",
    githubUrl: "https://github.com/vikaskumar/data-dashboard",
    metrics: [
    { label: "Data Points", value: "10M+" },
    { label: "Charts", value: "50+" },
    { label: "Users", value: "2K+" },
    { label: "Load Time", value: "800ms" }],

    features: [
    "Real-time data processing",
    "Interactive chart library",
    "Customizable dashboards",
    "Automated reporting",
    "Export functionality",
    "Role-based access control"],

    challenges: [
    {
      title: "Performance with Large Datasets",
      solution: "Implemented data pagination, virtual scrolling, and optimized database queries with proper indexing."
    }]

  },
  {
    id: 5,
    title: "Mobile Banking App",
    category: "Mobile",
    year: "2023",
    status: "Live",
    image: "https://images.unsplash.com/photo-1687168644714-3343aa9b5af8",
    imageAlt: "Modern mobile banking app interface showing account balance, transaction history, and payment options on smartphone",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management.",
    detailedDescription: `Developed a secure mobile banking solution with end-to-end encryption and biometric authentication. The app supports real-time transactions, bill payments, investment tracking, and financial planning tools. Implemented advanced security measures including fraud detection and secure communication protocols.`,
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric API", "Encryption"],
    timeline: "10 months (Feb 2023 - Nov 2023)",
    teamSize: "6 Developers",
    role: "Mobile App Developer",
    liveUrl: "https://example-banking-app.com",
    metrics: [
    { label: "Downloads", value: "100K+" },
    { label: "Transactions", value: "1M+" },
    { label: "Security Score", value: "A+" },
    { label: "User Rating", value: "4.9/5" }],

    features: [
    "Biometric authentication",
    "Real-time transactions",
    "Bill payment system",
    "Investment tracking",
    "Financial planning tools",
    "Fraud detection"],

    challenges: [
    {
      title: "Security Compliance",
      solution: "Implemented bank-grade security with multi-layer encryption, secure key management, and regular security audits."
    },
    {
      title: "Cross-platform Consistency",
      solution: "Used React Native with platform-specific optimizations and comprehensive testing on multiple devices."
    }]

  },
  {
    id: 6,
    title: "Social Media Analytics",
    category: "Analytics",
    year: "2023",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    imageAlt: "Social media analytics dashboard showing engagement metrics, follower growth charts, and content performance data",
    description: "Comprehensive social media analytics platform with sentiment analysis, engagement tracking, and automated reporting.",
    detailedDescription: `Built a powerful social media analytics tool that aggregates data from multiple platforms and provides actionable insights. Features include sentiment analysis, competitor tracking, influencer identification, and automated report generation. The platform processes millions of social media posts daily using advanced NLP algorithms.`,
    technologies: ["Python", "React", "MongoDB", "Elasticsearch", "NLP", "API Integration"],
    timeline: "7 months (May 2023 - Nov 2023)",
    teamSize: "3 Developers",
    role: "Backend Developer",
    githubUrl: "https://github.com/vikaskumar/social-analytics",
    metrics: [
    { label: "Posts Analyzed", value: "5M+" },
    { label: "Platforms", value: "8" },
    { label: "Accuracy", value: "92%" },
    { label: "Reports Generated", value: "10K+" }],

    features: [
    "Multi-platform data aggregation",
    "Sentiment analysis",
    "Competitor tracking",
    "Influencer identification",
    "Automated reporting",
    "Real-time monitoring"],

    challenges: [
    {
      title: "API Rate Limits",
      solution: "Implemented intelligent rate limiting with queue management and distributed processing across multiple API keys."
    },
    {
      title: "Data Processing Scale",
      solution: "Built scalable processing pipeline with Apache Kafka and distributed computing to handle millions of posts daily."
    }]

  }];


  // Extract unique categories and technologies
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const technologies = ['All', ...new Set(projects.flatMap((p) => p.technologies))];

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects?.filter((project) => {
      const categoryMatch = selectedCategory === 'All' || project?.category === selectedCategory;
      const technologyMatch = selectedTechnology === 'All' || project?.technologies?.includes(selectedTechnology);
      return categoryMatch && technologyMatch;
    });
  }, [projects, selectedCategory, selectedTechnology]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTechnology('All');
  };

  return (
    <>
      <Helmet>
        <title>Projects Showcase - Cosmic Portfolio</title>
        <meta name="description" content="Explore my portfolio of innovative projects including e-commerce platforms, AI applications, and data visualization dashboards. Each project demonstrates technical excellence and creative problem-solving." />
        <meta name="keywords" content="portfolio, projects, full stack development, React, Node.js, AI, machine learning, data visualization" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>

              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary cosmic-glow mb-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}>

                <Icon name="FolderOpen" size={28} className="text-primary-foreground" />
              </motion.div>
              
              <h1 className="font-headline text-4xl md:text-6xl text-foreground mb-6">
                Project
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {" "}Showcase
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore my portfolio of innovative projects that demonstrate technical excellence,
                creative problem-solving, and measurable business impact across various domains.
              </p>
            </motion.div>

            {/* Project Statistics */}
            <ProjectStats projects={projects} />

            {/* Project Filters */}
            <ProjectFilter
              categories={categories}
              technologies={technologies}
              selectedCategory={selectedCategory}
              selectedTechnology={selectedTechnology}
              onCategoryChange={setSelectedCategory}
              onTechnologyChange={setSelectedTechnology}
              onClearFilters={handleClearFilters} />


            {/* Results Count */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>

              <p className="text-muted-foreground font-mono">
                Showing {filteredProjects?.length} of {projects?.length} projects
                {(selectedCategory !== 'All' || selectedTechnology !== 'All') &&
                <span className="ml-2 text-primary">
                    (filtered)
                  </span>
                }
              </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}>

              {filteredProjects?.map((project, index) =>
              <motion.div
                key={project?.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}>

                  <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails} />

                </motion.div>
              )}
            </motion.div>

            {/* No Results Message */}
            {filteredProjects?.length === 0 &&
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>

                <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-headline text-2xl text-foreground mb-4">
                  No Projects Found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No projects match your current filter criteria. Try adjusting your filters or clearing them to see all projects.
                </p>
                <Button
                variant="outline"
                onClick={handleClearFilters}>

                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Clear All Filters
                </Button>
              </motion.div>
            }
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 lg:px-8 bg-card/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>

              <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-6">
                Ready to Build Something
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {" "}Amazing?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's collaborate on your next project. I bring technical expertise,
                creative vision, and a commitment to delivering exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                  className="cosmic-glow">

                  <Icon name="Mail" size={20} className="mr-2" />
                  Start a Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://github.com/Vikaskumardane', '_blank')}>

                  <Icon name="Github" size={20} className="mr-2" />
                  View All Code
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal} />

      </div>
    </>);

};

export default ProjectsShowcase;