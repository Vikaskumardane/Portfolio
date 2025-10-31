import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsStats = ({ skills }) => {
  const totalSkills = skills?.length;
  const expertSkills = skills?.filter(skill => skill?.level >= 90)?.length;
  const advancedSkills = skills?.filter(skill => skill?.level >= 75 && skill?.level < 90)?.length;
  const totalExperience = Math.max(...skills?.map(skill => skill?.experience));
  const totalProjects = skills?.reduce((sum, skill) => sum + skill?.projects, 0);

  const stats = [
    {
      icon: 'Code2',
      label: 'Total Skills',
      value: totalSkills,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Star',
      label: 'Expert Level',
      value: expertSkills,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'TrendingUp',
      label: 'Advanced Level',
      value: advancedSkills,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'Calendar',
      label: 'Years Experience',
      value: `${totalExperience}+`,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: 'FolderOpen',
      label: 'Projects Built',
      value: `${totalProjects}+`,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-6 text-center hover:cosmic-glow transition-cosmic"
        >
          <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
            <Icon 
              name={stat?.icon} 
              size={24} 
              className={stat?.color} 
            />
          </div>
          <div className="text-2xl font-headline text-card-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground font-body">
            {stat?.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsStats;