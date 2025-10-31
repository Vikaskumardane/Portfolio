import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import TimelineHeader from './components/TimelineHeader';
import TimelineItem from './components/TimelineItem';
import TimelineNavigation from './components/TimelineNavigation';
import TimelineStats from './components/TimelineStats';

const ExperienceTimeline = () => {
  const [activeExperience, setActiveExperience] = useState(null);

  // Real experience data based on user's resume
  const experiences = [
  {
    id: 1,
    position: "Software Engineer",
    company: "Capgemini",
    companyLogo: "https://images.unsplash.com/photo-1688234700123-b5e6ae5d4e66",
    companyLogoAlt: "Capgemini logo featuring professional blue corporate branding",
    duration: "June 2024 – Present",
    location: "India",
    icon: "Rocket",
    description: "Collaborating with cross-functional teams on end-to-end application migration to ROSA. Leading security enhancements and API development using Java and Spring Boot microservices architecture.",
    achievements: [
    "Collaborated with cross-functional teams on the end-to-end migration of applications to ROSA, applying problem-solving skills to establish an agile infrastructure that reduced costs by 30%",
    "Enhanced application security and made key decision-making contributions by integrating Snyk into the CI/CD pipeline, automating vulnerability scanning and reducing critical risks by 40%",
    "Applied strong communication skills to gather requirements for developing and optimizing scalable RESTful APIs and enterprise applications using Java and Spring Boot microservices architecture, boosting efficiency by 20%",
    "Utilized Kubernetes, Prometheus, and AWS Code Pipeline to increase deployment frequency by 10%"],

    technologies: ["Java", "Spring Boot", "Kubernetes", "AWS", "Prometheus", "Snyk", "ROSA", "CI/CD"]
  },
  {
    id: 2,
    position: "Web Developer",
    company: "SocioWave Media Agency",
    companyLogo: "https://images.unsplash.com/photo-1725949036991-f0f53d1e7c42",
    companyLogoAlt: "Creative media agency logo with modern digital design elements",
    duration: "Feb 2023 - Feb 2024",
    location: "India",
    icon: "Code",
    description: "Focused on redesigning legacy websites for optimal SEO and developing JavaScript/Tailwind e-commerce interfaces. Collaborated with stakeholders to deliver solutions that significantly boosted sales conversions.",
    achievements: [
    "Leveraged problem-solving skills to redesign 3 legacy sites for optimal SEO, increasing organic visitors by over 150/month",
    "Developed JavaScript/Tailwind e-commerce interfaces, collaborating with stakeholders to deliver solutions that boosted sales conversions by 25%"],

    technologies: ["JavaScript", "Tailwind CSS", "SEO", "E-commerce", "Web Development"]
  },
  {
    id: 3,
    position: "Web Development and Designing Intern",
    company: "Oasis Infobyte",
    companyLogo: "https://images.unsplash.com/photo-1708516680374-ca7f7e7684e1",
    companyLogoAlt: "Tech startup logo with vibrant colors and modern geometric design",
    duration: "May 2022 - Jun 2022",
    location: "India",
    icon: "Lightbulb",
    description: "Created various landing pages for brands and developed WordPress websites. Gained foundational experience in responsive web development and performance optimization.",
    achievements: [
    "Created various landing pages for brands and developed a WordPress website for a digital agency",
    "Developed a responsive WordPress website for a digital agency, improving user experience and reducing page load time by 20%"],

    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "Responsive Design", "Performance Optimization"]
  }];


  const handleExperienceClick = (experienceId) => {
    setActiveExperience(experienceId);
  };

  const handleNavigate = (experienceId) => {
    setActiveExperience(experienceId);
  };

  useEffect(() => {
    // Set first experience as active on load
    if (experiences?.length > 0) {
      setActiveExperience(experiences?.[0]?.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Timeline Navigation */}
      <TimelineNavigation
        experiences={experiences}
        activeExperience={activeExperience}
        onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <TimelineHeader />

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-border to-primary opacity-30"></div>

            {/* Timeline Items */}
            <div className="relative z-10">
              {experiences?.map((experience, index) =>
              <div key={experience?.id} id={`experience-${experience?.id}`}>
                  <TimelineItem
                  experience={experience}
                  index={index}
                  isLast={index === experiences?.length - 1}
                  onItemClick={handleExperienceClick} />

                </div>
              )}
            </div>
          </div>

          {/* Career Impact Stats */}
          <TimelineStats />

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>

            <div className="bg-card border border-border rounded-xl p-8 cosmic-shadow">
              <h2 className="font-headline text-2xl lg:text-3xl text-foreground mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground font-body text-lg mb-6 max-w-2xl mx-auto">
                Let's collaborate on your next project and create solutions that drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold cosmic-glow hover:scale-105 transition-cosmic"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/contact'}>

                  Get In Touch
                </motion.button>
                <motion.button
                  className="px-8 py-3 border border-border text-foreground rounded-lg font-body font-semibold hover:bg-primary/10 transition-cosmic"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/projects-showcase'}>

                  View Projects
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>);

};

export default ExperienceTimeline;