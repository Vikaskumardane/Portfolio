import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import HeroLanding from './pages/hero-landing';
import About from './pages/about';
import SkillsMatrix from './pages/skills-matrix';
import ProjectsShowcase from './pages/projects-showcase';
import ExperienceTimeline from './pages/experience-timeline';
import Contact from './pages/contact';
import InterstellarSplashScreen from './pages/interstellar-splash-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<InterstellarSplashScreen />} />
          <Route path="/home" element={<HeroLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills-matrix" element={<SkillsMatrix />} />
          <Route path="/projects-showcase" element={<ProjectsShowcase />} />
          <Route path="/experience-timeline" element={<ExperienceTimeline />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
