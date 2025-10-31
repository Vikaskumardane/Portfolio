import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfessionalSummary = () => {
  const highlights = [
    {
      metric: "2.5+",
      label: "Years Experience",
      description: "Full-stack development across multiple industries"
    },
    {
      metric: "10+",
      label: "Projects Delivered",
      description: "From startups to enterprise-level applications"
    },
    {
      metric: "99.9%",
      label: "Uptime Achieved",
      description: "Reliable, scalable production systems"
    },
    {
      metric: "2s",
      label: "Load Time",
      description: "Optimized performance across all applications"
    }
  ];

  const expertise = [
    "React & Next.js Ecosystem",
    "Node.js & Express Backend",
    "AWS Cloud Architecture",
    "Database Design & Optimization",
    "DevOps & CI/CD Pipelines",
    "Mobile-First Development"
  ];

  return (
    <div className="space-y-12">
      {/* Professional Overview */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-headline text-foreground">
            Full Stack Engineer & Digital Architect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-lg">
            Passionate Full Stack Engineer with a proven track record of transforming complex business requirements into scalable, high-performance digital solutions. Specializing in React ecosystem, Node.js backends, and AWS cloud architecture.
          </p>
          <p>
            My approach combines the precision of spacecraft engineering with creative problem-solving, ensuring every application I build is not just functional, but exceptional. From concept to deployment, I architect digital experiences that drive measurable business results and exceed user expectations.
          </p>
          <p>
            Currently focused on building next-generation web applications that leverage cutting-edge technologies while maintaining the reliability and performance standards that modern businesses demand.
          </p>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights?.map((item, index) => (
          <div 
            key={index}
            className="text-center p-6 rounded-lg bg-card/30 border border-border hover:border-primary/30 transition-cosmic group"
          >
            <div className="space-y-2">
              <div className="text-3xl font-headline text-primary group-hover:cosmic-glow transition-cosmic">
                {item?.metric}
              </div>
              <div className="text-sm font-body font-semibold text-foreground">
                {item?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {item?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Core Expertise */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Icon name="Code2" size={24} className="text-primary" />
          <h3 className="text-xl font-body font-semibold text-foreground">
            Core Expertise
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expertise?.map((skill, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-4 rounded-lg bg-card/20 border border-border hover:border-primary/20 transition-cosmic group"
            >
              <div className="w-2 h-2 rounded-full bg-primary group-hover:cosmic-glow transition-cosmic"></div>
              <span className="text-sm font-body text-foreground">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Philosophy Quote */}
      <div className="relative p-8 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20">
        <div className="absolute top-4 left-4">
          <Icon name="Quote" size={24} className="text-primary/50" />
        </div>
        <div className="pl-8 space-y-4">
          <p className="text-lg font-body text-foreground italic">
            "In the vast expanse of technology, I don't just write code—I craft digital experiences that bridge the gap between human needs and technological possibilities. Every project is an opportunity to push boundaries and create something extraordinary."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;