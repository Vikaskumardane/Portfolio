import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import FAQSection from './components/FAQSection';
import Icon from '../../components/AppIcon';

const Contact = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Contact - Cosmic Portfolio | Vikaskumar Dane';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Get in touch with Vikaskumar Dane for web development projects, technical consulting, and collaboration opportunities. Professional full-stack developer available for hire.');
    }
  }, []);

  const stats = [
    {
      icon: 'MessageSquare',
      value: '12h',
      label: 'Response Time',
      description: 'Average email response'
    },
    {
      icon: 'Users',
      value: '50+',
      label: 'Happy Clients',
      description: 'Successful projects delivered'
    },
    {
      icon: 'Globe',
      value: '10+',
      label: 'Countries',
      description: 'International collaborations'
    },
    {
      icon: 'Award',
      value: '99%',
      label: 'Success Rate',
      description: 'Projects completed on time'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-primary font-semibold text-sm">Contact Station</span>
            </div>
            
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Let's Build Something
              <span className="block text-primary cosmic-glow">Extraordinary</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your vision into reality? Whether you're a startup looking to launch your first product or an enterprise seeking to innovate, I'm here to help you navigate the digital cosmos and create solutions that drive real results.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 cosmic-glow">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="font-headline text-2xl text-foreground mb-1">
                  {stat?.value}
                </div>
                <div className="font-semibold text-foreground text-sm mb-1">
                  {stat?.label}
                </div>
                <div className="text-muted-foreground text-xs">
                  {stat?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2" id="contact-form">
              <ContactForm />
            </div>
            
            {/* Contact Info - Takes 1 column */}
            <div className="space-y-8">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </section>
      {/* Call to Action */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center cosmic-shadow border border-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 cosmic-glow">
              <Icon name="Rocket" size={32} className="text-primary" />
            </div>
            
            <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-4">
              Ready to Launch Your Project?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing list of satisfied clients who've transformed their ideas into successful digital products. Let's discuss how we can bring your vision to life with cutting-edge technology and exceptional user experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-cosmic cosmic-glow"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Start Your Project
              </button>
              
              <button
                onClick={() => window.open('https://calendly.com/vikas-dane', '_blank')}
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-surface/10 transition-cosmic"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow">
                <Icon name="Zap" size={16} className="text-primary-foreground" />
              </div>
              <span className="font-headline text-xl text-foreground">Cosmic Portfolio</span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6">
              Full Stack Engineer • Building extraordinary digital experiences
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/in/vikaskumar-dane' },
                { name: 'GitHub', icon: 'Github', url: 'https://github.com/vikas-dane' },
                { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/vikas_dane' },
                { name: 'Email', icon: 'Mail', url: 'mailto:vikas.dane@example.com' }
              ]?.map((social) => (
                <button
                  key={social?.name}
                  onClick={() => window.open(social?.url, '_blank')}
                  className="w-10 h-10 bg-surface/20 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-cosmic"
                >
                  <Icon name={social?.icon} size={18} />
                </button>
              ))}
            </div>
            
            <div className="border-t border-border pt-8">
              <p className="text-muted-foreground text-sm">
                © {new Date()?.getFullYear()} Vikaskumar Dane. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;