import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories?.map((category, index) => (
        <motion.button
          key={category?.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onCategoryChange(category?.id)}
          className={`flex items-center px-6 py-3 rounded-lg font-body font-semibold text-sm transition-cosmic ${
            activeCategory === category?.id
              ? 'bg-primary text-primary-foreground cosmic-glow'
              : 'bg-card text-card-foreground border border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <Icon 
            name={category?.icon} 
            size={18} 
            className="mr-2" 
          />
          {category?.name}
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-mono ${
            activeCategory === category?.id
              ? 'bg-primary-foreground/20 text-primary-foreground'
              : 'bg-primary/10 text-primary'
          }`}>
            {category?.count}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;