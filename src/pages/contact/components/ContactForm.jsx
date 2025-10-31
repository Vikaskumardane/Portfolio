import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypeOptions = [
    { value: 'web-app', label: 'Web Application Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'api', label: 'API Development' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'maintenance', label: 'Website Maintenance' },
    { value: 'other', label: 'Other Project Type' }
  ];

  const budgetOptions = [
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Project)' },
    { value: '1-2weeks', label: '1-2 Weeks' },
    { value: '1month', label: '1 Month' },
    { value: '2-3months', label: '2-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          newsletter: false,
          urgency: 'normal'
        });
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
      <div className="mb-8">
        <h3 className="font-headline text-2xl text-foreground mb-2">
          Start Your Project
        </h3>
        <p className="text-muted-foreground">
          Ready to build something extraordinary? Let's discuss your vision and create a solution that exceeds expectations.
        </p>
      </div>
      {submitStatus === 'success' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 cosmic-glow">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h4 className="font-headline text-xl text-foreground mb-2">
            Message Sent Successfully!
          </h4>
          <p className="text-muted-foreground mb-4">
            Thank you for reaching out. I'll review your project details and respond within 24 hours.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSubmitStatus(null)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData?.name}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@company.com"
              value={formData?.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <Input
            label="Company/Organization"
            type="text"
            name="company"
            placeholder="Your Company Name (Optional)"
            value={formData?.company}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Project Type"
              placeholder="Select project type"
              options={projectTypeOptions}
              value={formData?.projectType}
              onChange={(value) => handleSelectChange('projectType', value)}
              required
            />
            
            <Select
              label="Budget Range"
              placeholder="Select budget range"
              options={budgetOptions}
              value={formData?.budget}
              onChange={(value) => handleSelectChange('budget', value)}
              required
            />
          </div>

          <Select
            label="Project Timeline"
            placeholder="When do you need this completed?"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleSelectChange('timeline', value)}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Project Details *
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your project vision, specific requirements, target audience, and any technical preferences you have in mind..."
              value={formData?.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-cosmic"
            />
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Subscribe to project updates and tech insights"
              description="Get notified about new projects, technical articles, and industry insights"
              name="newsletter"
              checked={formData?.newsletter}
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Project Inquiry'}
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              <Icon name="Clock" size={16} className="inline mr-1" />
              Typical response time: Within 24 hours
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;