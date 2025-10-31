import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects }) => {
  const stats = [
    {
      icon: 'FolderOpen',
      label: 'Total Projects',
      value: projects?.length,
      color: 'text-primary'
    },
    {
      icon: 'Globe',
      label: 'Live Projects',
      value: projects?.filter(p => p?.status === 'Live')?.length,
      color: 'text-success'
    },
    {
      icon: 'Code',
      label: 'Technologies',
      value: [...new Set(projects.flatMap(p => p.technologies))]?.length,
      color: 'text-secondary-foreground'
    },
    {
      icon: 'Users',
      label: 'Team Projects',
      value: projects?.filter(p => p?.teamSize && p?.teamSize !== '1 Developer')?.length,
      color: 'text-warning'
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          className="bg-card rounded-xl p-6 text-center cosmic-border hover:cosmic-glow transition-cosmic"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-background/50 mb-3 ${stat?.color}`}>
            <Icon name={stat?.icon} size={20} />
          </div>
          <div className="text-2xl font-headline text-card-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {stat?.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStats;