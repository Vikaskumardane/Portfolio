import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectFilter = ({ 
  categories, 
  technologies, 
  selectedCategory, 
  selectedTechnology, 
  onCategoryChange, 
  onTechnologyChange,
  onClearFilters 
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || selectedTechnology !== 'All';

  return (
    <motion.div
      className="bg-card rounded-xl p-6 cosmic-border mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Categories */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="Folder" size={16} className="mr-2 text-primary" />
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex-1 lg:ml-8">
          <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="Code" size={16} className="mr-2 text-primary" />
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies?.slice(0, 8)?.map((tech) => (
              <Button
                key={tech}
                variant={selectedTechnology === tech ? "default" : "outline"}
                size="sm"
                onClick={() => onTechnologyChange(tech)}
                className="text-xs"
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:ml-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-primary"
            >
              <Icon name="X" size={14} className="mr-2" />
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          className="mt-4 pt-4 border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-mono">
                Category: {selectedCategory}
              </span>
            )}
            {selectedTechnology !== 'All' && (
              <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-md font-mono">
                Tech: {selectedTechnology}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectFilter;