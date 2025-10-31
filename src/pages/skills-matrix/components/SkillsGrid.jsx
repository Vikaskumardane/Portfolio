import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';

const SkillsGrid = ({ skills, activeCategory }) => {
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills?.filter(skill => skill?.categoryId === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="wait">
        {filteredSkills?.map((skill, index) => (
          <motion.div
            key={`${skill?.id}-${activeCategory}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <SkillCard skill={skill} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SkillsGrid;