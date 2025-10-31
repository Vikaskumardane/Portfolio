import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineStats = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { threshold: 0.3, once: true });

  const stats = [
    {
      id: 1,
      icon: "Code",
      value: "50,000+",
      label: "Lines of Code",
      description: "Written across multiple projects and platforms",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "Users",
      value: "100K+",
      label: "Users Impacted",
      description: "Through applications and systems developed",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: "Zap",
      value: "95%",
      label: "Performance Boost",
      description: "Average improvement in application speed",
      color: "text-success"
    },
    {
      id: 4,
      icon: "Award",
      value: "12",
      label: "Certifications",
      description: "Professional certifications and achievements",
      color: "text-warning"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={statsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="my-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="font-headline text-3xl lg:text-4xl text-foreground mb-4"
            variants={itemVariants}
          >
            Career Impact Metrics
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg font-body max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Quantifiable achievements and measurable outcomes from my professional journey
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 text-center cosmic-shadow hover:cosmic-glow transition-cosmic group cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:cosmic-pulse transition-cosmic">
                <Icon 
                  name={stat?.icon} 
                  size={28} 
                  className={`${stat?.color} group-hover:scale-110 transition-cosmic`} 
                />
              </div>

              {/* Value */}
              <motion.div
                className={`font-headline text-3xl lg:text-4xl ${stat?.color} mb-2`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat?.value}
              </motion.div>

              {/* Label */}
              <h3 className="font-body font-semibold text-foreground text-lg mb-2">
                {stat?.label}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {stat?.description}
              </p>

              {/* Hover Effect Line */}
              <motion.div
                className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 group-hover:w-full transition-cosmic"
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-12 flex justify-center"
          variants={itemVariants}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineStats;